"use client";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const categories = [
  {
    name: "AI",
    code: "// 01",
    items: ["LLMs", "RAG", "Agents", "Machine Learning", "Computer Vision"],
  },
  {
    name: "Engineering",
    code: "// 02",
    items: ["Python", "Node.js", "FastAPI", "React", "Next.js"],
  },
  {
    name: "Data",
    code: "// 03",
    items: ["PostgreSQL", "MongoDB", "Vector Databases", "Data Pipelines"],
  },
  {
    name: "Cloud",
    code: "// 04",
    items: ["AWS", "GCP", "Docker", "Kubernetes"],
  },
];

export function Technology() {
  return (
    <section
      id="technology"
      className="relative border-t border-line-soft bg-surface/30 py-28 md:py-40"
    >
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow index="05">Technology</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-[clamp(2.1rem,4.6vw,3.9rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
                A technical ecosystem, not a logo wall.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="max-w-sm text-base leading-relaxed text-muted">
              The tools we actually use — chosen for reliability and
              performance, then combined around your product.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 0.08} y={22}>
              <div className="group flex h-full flex-col rounded-2xl border border-line bg-elevated p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-faint">
                    {cat.code}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-line transition-colors duration-300 group-hover:bg-accent" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-ink">
                  {cat.name}
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-wide text-ink-soft transition-colors duration-300 group-hover:border-accent/40 group-hover:text-ink"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
            Only technologies we work with — no filler
          </p>
        </Reveal>
      </div>
    </section>
  );
}