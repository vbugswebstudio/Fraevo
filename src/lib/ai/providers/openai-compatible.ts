import type { LLMProvider, StreamChatParams } from "@/lib/ai/types";

export interface OpenAICompatibleConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  providerName?: string;
}

/**
 * A provider for any LLM that exposes an OpenAI-compatible
 * `/chat/completions` streaming endpoint (OpenAI, OpenRouter,
 * Together, Azure OpenAI, local servers, etc.).
 */
export class OpenAICompatibleProvider implements LLMProvider {
  readonly id: string;

  constructor(private config: OpenAICompatibleConfig) {
    this.id = config.providerName ?? "openai-compatible";
  }

  async *streamChat({ messages, signal }: StreamChatParams): AsyncIterable<string> {
    const url = `${this.config.baseUrl.replace(/\/$/, "")}/chat/completions`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: this.config.model,
        messages,
        stream: true,
        temperature: 0.6,
        max_tokens: 900,
      }),
      signal,
    });

    if (!response.ok || !response.body) {
      const detail = await response.text().catch(() => "");
      throw new Error(
        `LLM request failed (${response.status})${detail ? `: ${detail.slice(0, 300)}` : ""}`
      );
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice(5).trim();
        if (payload === "[DONE]") return;
        try {
          const json = JSON.parse(payload);
          const delta: string | undefined = json.choices?.[0]?.delta?.content;
          if (delta) yield delta;
        } catch {
          // ignore malformed chunks
        }
      }
    }
  }
}