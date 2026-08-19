"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { useChat } from "@/components/chat/ChatContext";

const exchanges = [
  {
    user: "I want to build an AI-powered inventory system.",
    bot: "Great starting point. That usually means forecasting, demand signals and a RAG assistant for your own data. What's the hardest decision you make today?",
  },
  {
    user: "I need a mobile app for my business.",
    bot: "Let's define who it's for first. Is it for your customers, your field team, or both? That changes the whole experience.",
  },
  {
    user: "I want to automate our customer support.",
    bot: "Automation works best when grounded in real knowledge. If we connect your support docs, an AI copilot can answer instantly — and escalate when it should.",
  },
  {
    user: "I have an idea for a SaaS product.",
    bot: "A SaaS product is a marathon, not a sprint. We'd start with the core outcome, then a tight architecture that can scale with you.",
  },
];

export function AIChatSection() {
  const { open: openChat } = useChat();
  const [index, setIndex] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTyping(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % exchanges.length);
        setTyping(false);
      }, 1400);
    }, 6200);
    return () => clearInterval(interval);
  }, []);

  const current = exchanges[index];

  return (
    <section
      id="ai-consultant"
      className="relative overflow-hidden border-t border-line-soft py-28 md:py-40"
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[140px]" />

      <div className="container-x relative grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <Eyebrow index="08">AI project consultant</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-[clamp(2.3rem,5vw,4.3rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
              Tell us what you{" "}
              <span className="italic text-accent">want to build.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
              Describe your idea, business problem or software requirement.
              Fraevo AI will help you understand what it could take to build it
              — features, architecture, AI opportunities and complexity.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <button
              onClick={openChat}
              className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-ink transition-all duration-300 hover:bg-accent-strong hover:scale-[1.02]"
            >
              Talk to Fraevo AI
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-10 flex flex-wrap gap-2">
              {exchanges.map((ex) => (
                <span
                  key={ex.user}
                  className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-faint"
                >
                  {ex.user.length > 34
                    ? `${ex.user.slice(0, 34)}…`
                    : ex.user}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={30}>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/25 via-transparent to-transparent" />
            <div className="relative overflow-hidden rounded-3xl border border-line bg-bg/90 backdrop-blur">
              <div className="flex items-center gap-2 border-b border-line px-5 py-4">
                <span className="flex h-2.5 w-2.5 rounded-full bg-line" />
                <span className="flex h-2.5 w-2.5 rounded-full bg-line" />
                <span className="flex h-2.5 w-2.5 rounded-full bg-accent/60" />
                <span className="ml-3 flex items-center gap-2 font-mono text-[11px] tracking-wider text-faint">
                  <Sparkles className="h-3 w-3 text-accent" />
                  FRAEVO AI · CONSULTANT
                </span>
              </div>
              <div className="space-y-4 p-6 md:p-8">
                <motion.div
                  key={`u-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="ml-auto max-w-[85%] rounded-2xl rounded-br-md border border-accent/25 bg-accent/[0.07] px-4 py-3 text-sm text-ink"
                >
                  {current.user}
                </motion.div>

                <div className="max-w-[92%]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                    Fraevo AI
                  </p>
                  <div className="mt-2 rounded-2xl rounded-tl-sm border border-line bg-elevated px-4 py-3.5">
                    <AnimatePresence mode="wait">
                      {typing ? (
                        <motion.div
                          key="typing"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-1.5 py-1.5"
                        >
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="h-1.5 w-1.5 rounded-full bg-accent"
                              animate={{ opacity: [0.2, 1, 0.2], y: [0, -3, 0] }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.18,
                              }}
                            />
                          ))}
                        </motion.div>
                      ) : (
                        <motion.p
                          key={`b-${index}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-sm leading-relaxed text-ink-soft"
                        >
                          {current.bot}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <div className="h-px flex-1 bg-line" />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-faint">
                    LIVE PREVIEW
                  </span>
                  <div className="h-px flex-1 bg-line" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}