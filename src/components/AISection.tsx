"use client";

import {
  MessagesSquare,
  Database,
  Workflow,
  Repeat2,
  LineChart,
  ScanEye,
  ArrowUpRight,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    icon: MessagesSquare,
    title: "LLMs",
    text: "Intelligent applications and copilots.",
  },
  {
    icon: Database,
    title: "RAG",
    text: "Connect AI to private business knowledge.",
  },
  {
    icon: Workflow,
    title: "AI Agents",
    text: "Systems that reason, plan and execute tasks.",
  },
  {
    icon: Repeat2,
    title: "Automation",
    text: "Replace repetitive workflows with intelligent systems.",
  },
  {
    icon: LineChart,
    title: "Predictive AI",
    text: "Forecasting, analytics and intelligent decision support.",
  },
  {
    icon: ScanEye,
    title: "Computer Vision",
    text: "Visual intelligence for real-world applications.",
  },
];

export function AISection() {
  return (
    <section
      id="ai"
      className="relative border-t border-line-soft bg-surface/30 py-28 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Eyebrow index="03">AI-native engineering</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-6 font-display text-[clamp(2.2rem,4.8vw,4.1rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
                  AI isn&apos;t an add-on.
                  <br />
                  <span className="italic text-accent">It&apos;s how we build.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
                  AI is integrated into the engineering workflow itself — not
                  bolted on at the end. It speeds up every stage of building
                  your product.
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="mt-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                  <span className="flex h-2 w-2 animate-pulse rounded-full bg-accent" />
                  Six disciplines, one workflow
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {capabilities.map((cap, i) => (
                <Reveal key={cap.title} delay={(i % 2) * 0.08 + Math.floor(i / 2) * 0.05} y={22}>
                  <div
                    className={cn(
                      "group relative h-full overflow-hidden rounded-2xl border border-line bg-elevated p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_20px_60px_-20px_rgba(201,240,107,0.12)]",
                      i === 0 && "border-accent/40"
                    )}
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/[0.06] blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-surface transition-all duration-500 group-hover:border-accent/50 group-hover:bg-accent/[0.08]">
                        <cap.icon className="h-5 w-5 text-ink-soft transition-colors duration-500 group-hover:text-accent" />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-faint opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent group-hover:opacity-100" />
                    </div>
                    <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-ink">
                      {cap.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {cap.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}