"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

const headline = ["Software,", "shipped", "at", "speed."];

function Words() {
  return (
    <h1
      aria-label="Software, shipped at speed."
      className="font-display text-[clamp(2.9rem,8.6vw,7.6rem)] font-medium leading-[0.98] tracking-[-0.04em] text-ink"
    >
      {headline.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
          <motion.span
            className={
              word === "speed."
                ? "inline-block text-accent italic"
                : "inline-block"
            }
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.35 + i * 0.08,
            }}
          >
            {word}
          </motion.span>
          {i < headline.length - 1 && <span> </span>}
        </span>
      ))}
    </h1>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative bg-bg pt-32 md:pt-40">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[120px]" />
      </div>

      <div className="container-x relative">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="eyebrow mb-4 flex items-center gap-3"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          AI-native software engineering
        </motion.p>

        <div className="max-w-5xl">
          <Words />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl"
          >
            AI-native software engineering for companies that want to build,
            launch and scale faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Button href="#contact" variant="accent" arrow>
                Start a Project
              </Button>
            </Magnetic>
            <Button href="#work" variant="ghost" arrow={false}>
              Explore Our Work
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-y-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <path d="M12 4v15" strokeLinecap="round" />
                <path d="M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-faint"
          >
            <span>AI Engineering</span>
            <span aria-hidden className="text-accent">
              ·
            </span>
            <span>Product Development</span>
            <span aria-hidden className="text-accent">
              ·
            </span>
            <span>Software Engineering</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}