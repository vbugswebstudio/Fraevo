"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Search,
  PenTool,
  Code2,
  ShieldCheck,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    icon: Search,
    title: "Understand",
    text: "Understand the business, users, requirements and technical constraints.",
  },
  {
    icon: PenTool,
    title: "Design",
    text: "Transform the idea into a clear product experience and technical architecture.",
  },
  {
    icon: Code2,
    title: "Build",
    text: "Use AI-native development workflows combined with experienced engineering.",
  },
  {
    icon: ShieldCheck,
    title: "Validate",
    text: "Continuously test, review and iterate instead of waiting until the end.",
  },
  {
    icon: Rocket,
    title: "Ship",
    text: "Deploy production-ready software quickly and safely.",
  },
  {
    icon: TrendingUp,
    title: "Scale",
    text: "Continue improving, optimizing and scaling the product.",
  },
];

export function Approach() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 80%", "end 55%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="approach"
      className="relative border-t border-line-soft bg-surface/30 py-28 md:py-40"
    >
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow index="02">The Fraevo approach</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-[clamp(2.3rem,5vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
                From idea to production.
                <br />
                <span className="italic text-accent">Faster.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="max-w-sm text-base leading-relaxed text-muted">
              A clear, repeatable process. Each phase is compressed with AI —
              without compressing quality.
            </p>
          </Reveal>
        </div>

        <div ref={lineRef} className="relative mt-20">
          <div className="hidden md:block">
            <div className="absolute left-0 right-0 top-[18px] h-px bg-line" />
            <motion.div
              style={{ scaleX }}
              className="absolute left-0 right-0 top-[18px] h-px origin-left bg-accent"
            />
            <div className="relative z-[1] grid grid-cols-6 gap-6">
              {steps.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08} y={20}>
                  <div className="group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg transition-all duration-300 group-hover:border-accent/60">
                      <span className="font-mono text-[10px] text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-faint">
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <div className="relative space-y-0">
              {steps.map((step, i) => (
                <div key={step.title} className="relative flex gap-5 pb-10 last:pb-0">
                  {i < steps.length - 1 && (
                    <span className="absolute left-[17px] top-9 h-[calc(100%-1.5rem)] w-px bg-line" />
                  )}
                  <div className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-bg">
                    <span className="font-mono text-[10px] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <Reveal delay={0.05} y={16} className="flex-1">
                    <div>
                      <h3 className="font-display text-lg font-medium tracking-tight text-ink">
                        <step.icon className="mr-2 inline h-4 w-4 text-accent" />
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-faint">
                        {step.text}
                      </p>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}