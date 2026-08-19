"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUp,
  ArrowUpRight,
  Copy,
  RefreshCw,
  Sparkles,
  X,
} from "lucide-react";
import { Markdown } from "@/components/chat/Markdown";
import { LeadForm } from "@/components/chat/LeadForm";
import {
  EXAMPLE_PROMPTS,
  WELCOME_MESSAGE,
} from "@/lib/ai";
import { analyzeProject } from "@/lib/ai/analyze";
import type { ChatMessage } from "@/lib/ai/types";
import { cn } from "@/lib/utils";

interface UIMessage extends ChatMessage {
  id: string;
  streaming?: boolean;
}

let idCounter = 0;
const nextId = () => `m${Date.now()}-${idCounter++}`;

const LEAD_PHRASE = "something Fraevo can help you build";

export function ChatSession({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<UIMessage[]>([
    { id: nextId(), role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const summary = useMemo(
    () => analyzeProject(messages),
    [messages]
  );

  const readyToConnect = useMemo(
    () =>
      messages.some(
        (m) => m.role === "assistant" && m.content.toLowerCase().includes(LEAD_PHRASE)
      ) && !streaming,
    [messages, streaming]
  );

  async function streamCompletion(history: ChatMessage[]) {
    const assistantId = nextId();
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", streaming: true },
    ]);
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Request failed");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: m.content + chunk } : m
          )
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content:
                  m.content ||
                  `_I hit a connection issue. Could you try again?_`,
              }
            : m
        )
      );
    } finally {
      setStreaming(false);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, streaming: false } : m
        )
      );
    }
  }

  async function send(content?: string) {
    const text = (content ?? input).trim();
    if (!text || streaming) return;
    setInput("");
    const userMsg: ChatMessage = { role: "user", content: text };
    const history: ChatMessage[] = [
      ...messages.filter((m) => m.role !== "system").map(({ role, content }) => ({ role, content })),
      userMsg,
    ];
    setMessages((prev) => [...prev, { ...userMsg, id: nextId() }]);
    await streamCompletion(history);
  }

  async function regenerate() {
    if (streaming) return;
    const lastAssistantIndex = [...messages]
      .reverse()
      .findIndex((m) => m.role === "assistant");
    if (lastAssistantIndex === -1) return;
    const idx = messages.length - 1 - lastAssistantIndex;
    const trimmed = messages.slice(0, idx);
    const history: ChatMessage[] = trimmed
      .filter((m) => m.role !== "system")
      .map(({ role, content }) => ({ role, content }));
    if (history.length === 0) return;
    setMessages(trimmed);
    await streamCompletion(history);
  }

  function copyMessage(content: string) {
    navigator.clipboard.writeText(content);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    send();
  }

  const showPrompts = messages.length <= 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[80] flex flex-col bg-bg"
    >
      <header className="border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15">
              <Sparkles className="h-4 w-4 text-accent" />
            </span>
            <div>
              <p className="font-display text-sm font-semibold tracking-tight text-ink">
                Fraevo AI
              </p>
              <p className="font-mono text-[10px] tracking-[0.18em] text-faint">
                    AI SOFTWARE CONSULTANT
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent/50"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[1fr_300px]">
            <div className="flex min-h-0 flex-col">
              <div
                ref={scrollRef}
                className="scrollbar-none min-h-0 flex-1 space-y-6 overflow-y-auto px-4 py-8 md:px-6"
              >
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "flex",
                      m.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[92%] md:max-w-[80%]",
                        m.role === "user"
                          ? "rounded-2xl rounded-br-md border border-accent/25 bg-accent/[0.07] px-4 py-3"
                          : "w-full"
                      )}
                    >
                      {m.role === "assistant" ? (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                              Fraevo AI
                            </span>
                          </div>
                          <div className="mt-2">
                            {m.content ? (
                              <Markdown content={m.content} />
                            ) : (
                              <TypingDots />
                            )}
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            {!m.streaming && m.content && (
                              <>
                                <button
                                  onClick={() => copyMessage(m.content)}
                                  className="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[10px] text-faint transition-colors hover:bg-surface hover:text-ink"
                                >
                                  <Copy className="h-3 w-3" />
                                  copy
                                </button>
                                <button
                                  onClick={regenerate}
                                  className="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[10px] text-faint transition-colors hover:bg-surface hover:text-ink"
                                >
                                  <RefreshCw className="h-3 w-3" />
                                  regenerate
                                </button>
                              </>
                            )}
                          </div>
                        </>
                      ) : (
                        <p className="whitespace-pre-wrap text-[14.5px] leading-relaxed text-ink">
                          {m.content}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}

                {showPrompts && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                      Try something like
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {EXAMPLE_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => send(prompt)}
                          className="rounded-full border border-line bg-surface px-4 py-2.5 text-left text-[13px] text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-ink"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <AnimatePresence>
                  {readyToConnect && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-4 rounded-2xl border border-accent/30 bg-accent/[0.06] p-6"
                    >
                      <p className="font-display text-lg font-medium tracking-tight text-ink">
                        Want to take this further?
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        A real engineer will review your project and get back to
                        you within one business day.
                      </p>
                      {showLeadForm ? (
                        <div className="mt-5">
                          <LeadForm summary={summary as unknown as Record<string, unknown>} />
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowLeadForm(true)}
                          className="group mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-all hover:bg-accent-strong"
                        >
                          Talk to a Fraevo Engineer
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-t border-line bg-bg/90 px-4 py-4 backdrop-blur md:px-6">
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto flex w-full max-w-2xl items-end gap-2 rounded-2xl border border-line bg-surface px-3 py-2 transition-colors focus-within:border-accent/60"
                >
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    rows={1}
                    placeholder="Describe your idea, problem or project…"
                    className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-2 py-2.5 text-sm text-ink placeholder:text-faint focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || streaming}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-ink transition-all hover:bg-accent-strong disabled:opacity-40"
                    aria-label="Send message"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                </form>
                <p className="mx-auto mt-2 max-w-2xl text-center font-mono text-[10px] tracking-wider text-faint">
                  Fraevo AI explores your project with you. No guaranteed prices
                  or timelines — those come from an engineer.
                </p>
              </div>
            </div>

            <aside className="hidden border-l border-line bg-surface/40 lg:block">
              <div className="scrollbar-none h-full overflow-y-auto p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                  Project Summary
                </p>
                <div className="mt-5 space-y-6">
                  <SummaryBlock label="PROJECT" value={summary.project} />
                  <SummaryBlock label="TYPE" value={summary.type} />
                  <SummaryBlock
                    label="CORE FEATURES"
                    value={
                      summary.features.length
                        ? summary.features.join(", ")
                        : "—"
                    }
                  />
                  <SummaryBlock
                    label="TECHNOLOGY"
                    value={
                      summary.tech.length ? summary.tech.join(", ") : "—"
                    }
                  />
                  <SummaryBlock label="NEXT STEP" value={summary.nextStep} accent />
                </div>
                <div className="mt-8 rounded-xl border border-line bg-bg p-4">
                  <p className="text-xs leading-relaxed text-faint">
                    Your conversation is summarized here as you go. It&apos;s
                    attached to the request when you connect with an engineer.
                  </p>
                </div>
              </div>
        </aside>
      </div>
    </motion.div>
  );
}

export function ChatOverlay({
  sessionId,
  isOpen,
  onClose,
}: {
  sessionId: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && <ChatSession key={sessionId} onClose={onClose} />}
    </AnimatePresence>
  );
}

function SummaryBlock({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.2em] text-faint">
        {label}
      </p>
      <p
        className={cn(
          "mt-1.5 text-sm font-medium leading-snug",
          accent ? "text-accent" : "text-ink"
        )}
      >
        {value}
      </p>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-accent"
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}