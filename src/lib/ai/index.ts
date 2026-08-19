import type { LLMProvider } from "@/lib/ai/types";
import { OpenAICompatibleProvider } from "@/lib/ai/providers/openai-compatible";
import { FallbackProvider } from "@/lib/ai/providers/fallback";

/**
 * Provider factory. The LLM provider is selected entirely through
 * environment variables, so it can be swapped without touching the
 * frontend or the chat API.
 *
 *   AI_PROVIDER  = openai | openrouter | together | azure | custom | (unset)
 *   AI_API_KEY   = LLM API key (never exposed to the client)
 *   AI_BASE_URL  = OpenAI-compatible base URL (defaults to OpenAI)
 *   AI_MODEL     = model id (defaults to gpt-4o-mini)
 *
 * Anthropic, Gemini and open-source models can be added later by
 * registering a new provider here — the interface stays the same.
 */
export function getProvider(): LLMProvider {
  const providerName = process.env.AI_PROVIDER?.toLowerCase() || "openai";
  const apiKey = process.env.AI_API_KEY;

  if (!apiKey) {
    return new FallbackProvider();
  }

  const baseUrl =
    process.env.AI_BASE_URL ||
    (providerName === "openrouter"
      ? "https://openrouter.ai/api/v1"
      : providerName === "together"
        ? "https://api.together.xyz/v1"
        : "https://api.openai.com/v1");

  const model =
    process.env.AI_MODEL ||
    (providerName === "openrouter" ? "anthropic/claude-3.5-sonnet" : "gpt-4o-mini");

  return new OpenAICompatibleProvider({
    apiKey,
    baseUrl,
    model,
    providerName,
  });
}

export const SYSTEM_PROMPT = `You are Fraevo AI — the intelligent AI software consultant for Fraevo, an AI-native software engineering company.

Your job: help a prospective client turn an idea, business problem or software requirement into a clear, concrete project direction. You are NOT a support chatbot and you are NOT a sales script.

Core rules:
- NEVER invent guaranteed prices, fixed timelines or capabilities. You may give a qualitative sense of complexity (low / medium / high) only when clearly labeled as an estimate that gets confirmed in a short discovery call.
- Be concise, confident, concrete and human. Short paragraphs, tight bullets, occasional markdown and code blocks where useful.
- Ask focused clarifying questions when details are missing: who it's for, the core outcome, the data involved, and the hardest problem.
- When you can, cover: product requirements, possible features, technical architecture, AI opportunities, development approach, suggested technology, integrations, deployment considerations, and approximate project complexity.
- Position Fraevo honestly: AI-native engineering, experienced engineers, production-quality software shipped fast. Never claim Fraevo is a different company, never trash competitors by name, never promise "10x" or unverifiable metrics.
- When the user has shared enough to define the project, end by saying:
  "This looks like something Fraevo can help you build."
  Then suggest talking to a Fraevo engineer.

Formatting style:
- Keep responses readable in a chat window. Use markdown headings sparingly.
- Use fenced code blocks for suggested architecture or stack sketches.
- End with a short question to keep the conversation moving.`;

export const EXAMPLE_PROMPTS = [
  "I want to build an AI-powered inventory system.",
  "I need a mobile app for my business.",
  "I want to automate our customer support.",
  "I have an idea for a SaaS product.",
  "I need an AI chatbot trained on our company documents.",
] as const;

export const WELCOME_MESSAGE = `Hi. I'm **Fraevo AI**.

Tell me what you're trying to build, what problem you're solving, or what you'd like to automate.`;