"use client";

import { motion } from "motion/react";
import {
  ArrowDown,
  GitBranch,
  FileText,
  PenTool,
  Code2,
  FlaskConical,
  Rocket,
  CalendarRange,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const steps = [
  { icon: FileText, label: "Requirements", note: "long workshops, endless specs" },
  { icon: PenTool, label: "Design", note: "handoffs, reviews, sign-offs" },
  { icon: Code2, label: "Development", note: "manual work, parallel teams" },
  { icon: FlaskConical, label: "Testing", note: "near the end, slow feedback" },
  { icon: Rocket, label: "Deployment", note: "heavy release cycles" },
];

export function Problem() {
  return (
    <section id="problem" className="relative border-t border-line-soft py-28 md:py-40">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow index="01">The problem</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,4.8vw,4.1rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
                Software shouldn&apos;t take months to get started.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
                Traditional software development is slowed down by repetitive
                work, long feedback loops and unnecessary handoffs.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-surface px-5 py-3">
                <CalendarRange className="h-4 w-4 text-faint" />
                <span className="font-mono text-xs tracking-[0.15em] text-faint">
                  TYPICAL DELIVERY: MONTHS
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-line">
              <GitBranch className="h-4 w-4 text-muted" />
            </div>
            <p className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
              Idea
            </p>
          </div>

          <Stagger className="relative mt-0">
            {steps.map((step, i) => (
              <StaggerItem key={step.label}>
                <div className="relative border-l border-line-soft pl-8 md:pl-12">
                  <span className="absolute -left-[5px] top-9 h-2.5 w-2.5 rounded-full border border-line bg-bg" />
                  <div className="group flex items-center gap-4 py-4 md:py-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface transition-colors duration-300 group-hover:border-accent/50">
                      <step.icon className="h-4.5 w-4.5 text-ink-soft" />
                    </div>
                    <div className="flex-1">
                      <p className="flex items-baseline gap-3">
                        <span className="font-mono text-[11px] text-faint">
                          {String(i + 2).padStart(2, "0")}
                        </span>
                        <span className="font-display text-xl font-medium tracking-tight text-ink md:text-2xl">
                          {step.label}
                        </span>
                      </p>
                      <p className="mt-1 text-sm text-faint">{step.note}</p>
                    </div>
                    <span className="hidden font-mono text-xs tracking-[0.2em] text-faint/70 sm:block">
                      +WEEKS
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-2">
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-elevated px-6 py-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/[0.04]">
                <CalendarRange className="h-5 w-5 text-faint" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <span className="font-display text-2xl font-medium tracking-tight text-faint md:text-3xl">
                    Months
                  </span>
                  <span className="font-mono text-xs tracking-[0.2em] text-faint">
                    FEEDBACK AT THE END
                  </span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-bg">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-faint via-muted to-faint"
                  />
                </div>
              </div>
            </div>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-8 flex items-center justify-center gap-3 text-faint">
              <ArrowDown className="h-4 w-4 animate-bounce" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em]">
                months of friction
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col items-center rounded-2xl border border-accent/25 bg-accent/[0.05] px-8 py-10 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15">
                <Rocket className="h-5 w-5 text-accent" />
              </div>
              <p className="mt-5 font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
                Fraevo does the same journey.{" "}
                <span className="italic text-accent">Faster.</span>
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                Same starting point. A better process — AI-assisted engineering,
                continuous validation and fast releases.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}