import type { LLMProvider, StreamChatParams } from "@/lib/ai/types";
import { analyzeProject } from "@/lib/ai/analyze";

/**
 * Keyword-based assistant used when no LLM API key is configured.
 * Keeps the site fully functional for demos and previews without
 * any external dependencies. Swap in a real provider via env vars.
 */
export class FallbackProvider implements LLMProvider {
  readonly id = "fallback";

  async *streamChat({ messages }: StreamChatParams): AsyncIterable<string> {
    const userMessages = messages.filter((m) => m.role === "user");
    const isFirst = userMessages.length <= 1;
    const summary = analyzeProject(userMessages);
    const lower = (userMessages.at(-1)?.content ?? "").toLowerCase();

    let reply = "";

    if (isFirst && !looksLikeAQuestion(lower)) {
      reply = [
        `Let's explore that together. I can help you think through **${summary.project}** — the features, the architecture, the AI opportunities and how to get it to production.`,
        ``,
        `To give you something useful rather than generic, a few quick questions:`,
        ``,
        `1. Who is this **for**? (your team, customers, the public)`,
        `2. What is the **core outcome** — what should it let someone do that they can't do today?`,
        `3. Do you have a sense of the **data** involved, and where it lives today?`,
        ``,
        `Answer any of these and I'll sketch the product direction, the likely architecture and the rough complexity.`,
      ].join("\n");
    } else {
      const features = summary.features.length
        ? summary.features.join(", ")
        : "to be defined together in discovery";
      const tech = summary.tech.length
        ? `\`${summary.tech.join("`, `")}\``
        : "final stack defined in architecture — typically Python or Node.js with a modern frontend";

      const complexity =
        summary.type === "AI Product"
          ? "medium-to-high — AI products need good data foundations and careful evaluation"
          : "medium — clear scope and a strong foundation from day one";

      reply = [
        `Here's how I'd approach **${summary.project}** — positioned as a ${summary.type.toLowerCase()}:`,
        ``,
        `### Product direction`,
        `- **Core outcome:** one clear thing the product must do brilliantly, surrounded by a clean experience`,
        `- **Core features:** ${features}`,
        `- **AI opportunity:** where AI genuinely removes work or adds insight — not AI for its own sake`,
        ``,
        `### Technical approach`,
        `- **Suggested stack:** ${tech}`,
        `- **Architecture:** a pragmatic, modular design that ships fast and scales when you need it`,
        `- **Deployment:** automated, staged releases with monitoring from day one`,
        ``,
        `### Rough complexity`,
        `${complexity}. We'd confirm this during a short discovery — before any commitment.`,
        ``,
        `> **This looks like something Fraevo can help you build.**`,
        ``,
        `Want to go deeper on any of this — or talk to a Fraevo engineer directly?`,
      ].join("\n");
    }

    for (let i = 0; i < reply.length; i += 24) {
      yield reply.slice(i, i + 24);
      await new Promise((r) => setTimeout(r, 8));
    }
  }
}

function looksLikeAQuestion(text: string): boolean {
  return /\?$/.test(text.trim()) || /\b(what|how|who|why|when|where|can you|tell me about)\b/.test(text);
}