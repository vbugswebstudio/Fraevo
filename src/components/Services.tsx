"use client";

import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const services = [
  {
    index: "01",
    title: "AI Products",
    text: "LLM applications, RAG systems, AI agents, AI copilots and intelligent automation.",
    tags: ["LLM", "RAG", "Agents", "Copilots"],
  },
  {
    index: "02",
    title: "Custom Software",
    text: "Business platforms, SaaS products, internal tools and enterprise applications.",
    tags: ["SaaS", "Internal Tools", "Enterprise"],
  },
  {
    index: "03",
    title: "Web Applications",
    text: "High-performance web platforms designed for real-world users and workloads.",
    tags: ["Web Apps", "Dashboards", "Platforms"],
  },
  {
    index: "04",
    title: "Mobile Applications",
    text: "Modern mobile experiences for Android and iOS.",
    tags: ["iOS", "Android", "Cross-platform"],
  },
  {
    index: "05",
    title: "Automation",
    text: "Intelligent workflows that connect systems and reduce repetitive work.",
    tags: ["Workflows", "Integrations", "AI Agents"],
  },
  {
    index: "06",
    title: "Product Engineering",
    text: "From MVP to production-grade systems and continuous product development.",
    tags: ["MVP", "Scale", "Product-led"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative border-t border-line-soft py-28 md:py-40">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Eyebrow index="04">What we build</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-6 font-display text-[clamp(2.2rem,4.8vw,4.1rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
                  Technology built around{" "}
                  <span className="text-ink-soft">your business.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
                  We don&apos;t sell hours or tech stacks. We build software
                  that solves real business problems — engineered to be used,
                  maintained and scaled.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-line">
              {services.map((service, i) => (
                <Reveal key={service.title} delay={i * 0.04} y={18}>
                  <a
                    href="#contact"
                    className="group relative flex items-center gap-6 border-b border-line py-8 transition-colors duration-300 hover:bg-white/[0.02] md:gap-10 md:py-9"
                  >
                    <span className="shrink-0 font-mono text-xs tracking-[0.2em] text-faint transition-colors duration-300 group-hover:text-accent">
                      {service.index}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-medium tracking-tight text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                        {service.title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                        {service.text}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-faint transition-colors duration-300 group-hover:border-accent/30 group-hover:text-ink-soft"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}