"use client";

import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const pillars = [
  {
    index: "01",
    title: "Engineering",
    text: "Experienced engineers who care about how software behaves in production — not just how it looks in a demo.",
  },
  {
    index: "02",
    title: "AI",
    text: "AI is in our workflow and in our products. We build intelligent systems, not AI bolt-ons.",
  },
  {
    index: "03",
    title: "Speed",
    text: "Better processes, AI-assisted development and fewer handoffs. Fast without cutting quality.",
  },
  {
    index: "04",
    title: "Quality",
    text: "Production-grade code, automated testing and clean architecture. Built to be maintained.",
  },
  {
    index: "05",
    title: "Partnership",
    text: "We work like your team — honest, communicative and invested in the outcome.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative border-t border-line-soft bg-surface/30 py-28 md:py-40"
    >
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow index="09">About Fraevo</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,4.8vw,4.1rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
                We build software for{" "}
                <span className="italic text-accent">what&apos;s next.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
                Fraevo is an AI-native software engineering company focused on
                building intelligent digital products, custom software and
                automation for ambitious businesses.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <a
                href="#contact"
                className="group mt-8 inline-flex items-center gap-2 font-medium text-ink transition-colors hover:text-accent"
              >
                About Fraevo
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Stagger className="border-t border-line">
            {pillars.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <div className="group flex gap-6 border-b border-line py-8 md:gap-10">
                  <span className="shrink-0 font-mono text-xs tracking-[0.2em] text-faint transition-colors duration-300 group-hover:text-accent">
                    {pillar.index}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-medium tracking-tight text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                      {pillar.text}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}