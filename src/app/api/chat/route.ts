import { getProvider, SYSTEM_PROMPT } from "@/lib/ai";
import type { ChatMessage } from "@/lib/ai/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGES = 24;
const MAX_CONTENT_LENGTH = 4000;

export async function POST(req: Request) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const rawMessages = Array.isArray(body.messages) ? body.messages : [];
  if (rawMessages.length === 0) {
    return Response.json({ error: "No messages provided." }, { status: 400 });
  }

  const messages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...rawMessages
      .slice(-MAX_MESSAGES)
      .map((m) => ({
        role: m.role === "assistant" || m.role === "user" ? m.role : "user",
        content: String(m.content ?? "").slice(0, MAX_CONTENT_LENGTH),
      }))
      .filter((m) => m.content.trim().length > 0),
  ];

  if (messages.length === 1) {
    return Response.json({ error: "No messages provided." }, { status: 400 });
  }

  const provider = getProvider();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const delta of provider.streamChat({
          messages,
          signal: req.signal,
        })) {
          controller.enqueue(encoder.encode(delta));
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong.";
        controller.enqueue(encoder.encode(`\n\n_I hit an issue: ${message}_`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}