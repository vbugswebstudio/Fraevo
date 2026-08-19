"use client";

import { motion } from "motion/react";
import { Check, X, Zap } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const comparison = [
  {
    traditional: "Long planning phases",
    fraevo: "Rapid discovery",
  },
  {
    traditional: "Manual, repetitive work",
    fraevo: "AI-assisted engineering",
  },
  {
    traditional: "Multiple handoffs",
    fraevo: "Integrated teams",
  },
  {
    traditional: "Slow feedback loops",
    fraevo: "Continuous feedback",
  },
  {
    traditional: "Long release cycles",
    fraevo: "Fast releases",
  },
];

export function Speed() {
  return (
    <section
      id="speed"
      className="relative overflow-hidden border-t border-line-soft py-28 md:py-40"
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-accent/[0.04] blur-[120px]" />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">Built for speed</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-[clamp(2.3rem,5.4vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
              Built for speed.
              <br />
              <span className="text-ink-soft">Engineered for production.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              We use AI throughout the software development lifecycle to reduce
              repetitive work, accelerate iteration and shorten the path from
              concept to production. Fast doesn&apos;t mean low quality — it
              means better processes, AI and experienced engineering.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-20 grid overflow-hidden rounded-3xl border border-line md:grid-cols-2">
            <div className="relative border-b border-line bg-bg/60 md:border-b-0 md:border-r">
              <div className="px-8 py-10 md:px-12">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface">
                    <X className="h-3.5 w-3.5 text-faint" />
                  </span>
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-faint">
                    Traditional development
                  </h3>
                </div>
                <ul className="mt-10 space-y-7">
                  {comparison.map((row, i) => (
                    <motion.li
                      key={row.traditional}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay: i * 0.07 }}
                      className="flex items-center gap-4"
                    >
                      <span className="text-faint/60">{row.traditional}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-0 bg-accent/[0.03]" />
              <div className="relative px-8 py-10 md:px-12">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15">
                    <Zap className="h-3.5 w-3.5 text-accent" fill="currentColor" />
                  </span>
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                    Fraevo
                  </h3>
                </div>
                <ul className="mt-10 space-y-7">
                  {comparison.map((row, i) => (
                    <motion.li
                      key={row.fraevo}
                      initial={{ opacity: 0, x: 14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay: i * 0.07 }}
                      className="flex items-center gap-4"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15">
                        <Check className="h-3 w-3 text-accent" />
                      </span>
                      <span className="font-medium text-ink">{row.fraevo}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
            No inflated promises — just a process that removes the friction
          </p>
        </Reveal>
      </div>
    </section>
  );
}