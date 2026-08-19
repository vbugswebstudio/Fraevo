"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ArrowRight, X } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface CaseStudy {
  id: string;
  title: string;
  tagline: string;
  tags: string[];
  problem: string;
  solution: string;
  tech: string[];
  outcome: string;
  accent?: string;
}

const cases: CaseStudy[] = [
  {
    id: "inventory",
    title: "AI Inventory Intelligence",
    tagline: "Transforming operational data into predictive inventory decisions.",
    tags: ["AI", "Machine Learning", "Analytics", "Automation"],
    problem:
      "Inventory decisions relied on spreadsheets, experience and guesswork — slow to update, impossible to scale, and blind to what was coming next.",
    solution:
      "A forecasting platform that learns from historical and operational data, predicts demand, and flags stock issues before they become problems.",
    tech: ["Python", "FastAPI", "PostgreSQL", "ML", "React"],
    outcome:
      "Predictive, automated inventory decisions in a clear, real-time dashboard — turning operational data into foresight.",
  },
  {
    id: "copilot",
    title: "Customer Support Copilot",
    tagline: "An AI assistant trained on company knowledge, embedded in existing workflows.",
    tags: ["LLM", "RAG", "Agents"],
    problem:
      "Support teams repeated answers to the same questions and couldn't quickly access knowledge scattered across the company.",
    solution:
      "A RAG-powered copilot grounded in the company's own documentation, integrated directly into their support desk.",
    tech: ["LLM", "RAG", "Vector Database", "Python", "Next.js"],
    outcome:
      "Instant, accurate answers for customers and agents — grounded in verified sources, never made up.",
  },
  {
    id: "field-ops",
    title: "Field Operations Platform",
    tagline: "Custom software connecting field teams, scheduling and live data in one system.",
    tags: ["Custom Software", "Mobile", "Real-time"],
    problem:
      "Field teams juggled separate tools for jobs, dispatch and reporting — losing time, context and data quality.",
    solution:
      "A custom web and mobile platform with live scheduling, offline capability and integrated reporting.",
    tech: ["React", "Next.js", "Node.js", "PostgreSQL"],
    outcome:
      "One system for the whole operation — from dispatch to delivered work, visible in real time.",
  },
];

function InventoryVisual() {
  return (
    <div className="relative flex h-full items-center justify-center p-6">
      <svg viewBox="0 0 320 180" className="h-full w-full max-w-[380px]">
        <defs>
          <linearGradient id="inv-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9f06b" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#c9f06b" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="0"
            y1={i * 45 + 15}
            x2="320"
            y2={i * 45 + 15}
            stroke="rgba(255,255,255,0.06)"
          />
        ))}
        <path
          d="M10 150 L60 130 L105 138 L150 100 L195 112 L240 70 L310 48 L310 180 L10 180 Z"
          fill="url(#inv-fill)"
        />
        <path
          d="M10 150 L60 130 L105 138 L150 100 L195 112 L240 70 L310 48"
          fill="none"
          stroke="#c9f06b"
          strokeWidth="2.5"
        />
        <path
          d="M310 48 L340 30"
          fill="none"
          stroke="#c9f06b"
          strokeWidth="2"
          strokeDasharray="4 5"
        />
        <circle cx="240" cy="70" r="4" fill="#c9f06b" />
        <circle cx="240" cy="70" r="8" fill="none" stroke="#c9f06b" opacity="0.4" />
        <text x="250" y="80" fontSize="9" fontFamily="monospace" fill="#8a909a">
          forecast
        </text>
      </svg>
      <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-accent/40 bg-bg/80 px-3 py-1.5 backdrop-blur">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        <span className="font-mono text-[10px] tracking-wider text-ink-soft">
          LIVE FORECAST
        </span>
      </div>
    </div>
  );
}

function CopilotVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-6">
      <div className="ml-auto max-w-[70%] rounded-2xl rounded-tr-sm border border-line bg-elevated px-4 py-3 text-sm text-ink-soft">
        Can you explain our return policy?
      </div>
      <div className="max-w-[75%] rounded-2xl rounded-tl-sm border border-accent/30 bg-accent/[0.07] px-4 py-3">
        <p className="text-sm text-ink">
          Sure — our policy covers unused items within 30 days. Here&apos;s the
          full process:
        </p>
        <div className="mt-2 space-y-1.5">
          <div className="h-1.5 w-40 rounded bg-ink/15" />
          <div className="h-1.5 w-32 rounded bg-ink/15" />
          <div className="h-1.5 w-36 rounded bg-ink/15" />
        </div>
      </div>
      <div className="max-w-[65%] rounded-2xl rounded-tl-sm border border-line bg-elevated px-4 py-3 text-sm text-ink-soft">
        How long does it take?
      </div>
      <div className="flex items-center gap-2 pl-1 pt-1">
        <span className="flex h-2 w-2 animate-pulse rounded-full bg-accent" />
        <span className="font-mono text-[10px] tracking-wider text-accent">
          RAG · SOURCES: 24 DOCUMENTS
        </span>
      </div>
    </div>
  );
}

function FieldOpsVisual() {
  const jobs = [
    { id: "JOB-1042", status: "In progress", tone: "accent" },
    { id: "JOB-1039", status: "Scheduled", tone: "ink" },
    { id: "JOB-1031", status: "Complete", tone: "dim" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-6">
      <div className="flex items-center justify-between px-1">
        <span className="font-mono text-[10px] tracking-wider text-faint">
          DISPATCH BOARD
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-accent">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          3 LIVE
        </span>
      </div>
      {jobs.map((job) => (
        <div
          key={job.id}
          className="flex items-center justify-between rounded-xl border border-line bg-surface/60 px-4 py-3"
        >
          <span className="font-mono text-xs text-ink">{job.id}</span>
          <span
            className={cn(
              "flex items-center gap-2 text-xs",
              job.tone === "accent"
                ? "text-accent"
                : job.tone === "ink"
                  ? "text-ink-soft"
                  : "text-faint"
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                job.tone === "accent" ? "bg-accent" : "bg-faint"
              )}
            />
            {job.status}
          </span>
        </div>
      ))}
    </div>
  );
}

const visuals = {
  inventory: InventoryVisual,
  copilot: CopilotVisual,
  "field-ops": FieldOpsVisual,
};

function CaseCard({
  study,
  featured,
  onOpen,
}: {
  study: CaseStudy;
  featured?: boolean;
  onOpen: () => void;
}) {
  const Visual = visuals[study.id as keyof typeof visuals];
  return (
    <Reveal delay={featured ? 0 : 0.1}>
      <button
        onClick={onOpen}
        className={cn(
          "group block w-full overflow-hidden rounded-3xl border border-line bg-surface text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_30px_80px_-30px_rgba(201,240,107,0.15)]",
          featured && "md:grid md:grid-cols-2"
        )}
      >
        <div className="relative overflow-hidden border-b border-line bg-elevated md:border-b-0 md:border-r">
          <div className="grid-bg absolute inset-0 opacity-40" />
          <div className="relative aspect-[16/10]">
            <Visual />
          </div>
          <div className="absolute left-4 top-4 flex gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line bg-bg/80 px-2.5 py-1 font-mono text-[10px] tracking-wider text-ink-soft backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between p-8 md:p-10">
          <div>
            <h3 className="font-display text-2xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-accent md:text-3xl">
              {study.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {study.tagline}
            </p>
          </div>
          <div className="mt-8 flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-ink-soft">
            View Case Study
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
          </div>
        </div>
      </button>
    </Reveal>
  );
}

export function CaseStudies() {
  const [active, setActive] = useState<CaseStudy | null>(null);

  return (
    <section
      id="work"
      className="relative border-t border-line-soft py-28 md:py-40"
    >
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow index="06">Selected work</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,4.8vw,4.1rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
                Built to solve{" "}
                <span className="italic text-accent">real problems.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="max-w-sm text-base leading-relaxed text-muted">
              A look at the kind of software we build — each one a product, not
              a project.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-6">
          <CaseCard
            study={cases[0]}
            featured
            onOpen={() => setActive(cases[0])}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {cases.slice(1).map((study) => (
              <CaseCard
                key={study.id}
                study={study}
                onOpen={() => setActive(study)}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-line bg-bg sm:rounded-3xl"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-bg/90 px-6 py-4 backdrop-blur">
                <span className="font-mono text-xs tracking-[0.2em] text-muted">
                  CASE STUDY
                </span>
                <button
                  onClick={() => setActive(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent/50"
                  aria-label="Close case study"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-10 p-6 md:grid-cols-5 md:p-10">
                <div className="md:col-span-2">
                  <div className="flex flex-wrap gap-2">
                    {active.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-accent/30 bg-accent/[0.06] px-3 py-1 font-mono text-[10px] tracking-wider text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-5 font-display text-3xl font-medium leading-tight tracking-tight text-ink">
                    {active.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">
                    {active.tagline}
                  </p>
                  <div className="mt-8 rounded-2xl border border-line bg-surface p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                      Technology
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {active.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-ink-soft"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-8 md:col-span-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                      Problem
                    </p>
                    <p className="mt-2 leading-relaxed text-ink-soft">
                      {active.problem}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                      Solution
                    </p>
                    <p className="mt-2 leading-relaxed text-ink-soft">
                      {active.solution}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-accent/25 bg-accent/[0.05] p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                      Outcome
                    </p>
                    <p className="mt-2 leading-relaxed text-ink">
                      {active.outcome}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-line px-6 py-6 md:px-10">
                <a
                  href="#contact"
                  onClick={() => setActive(null)}
                  className="group inline-flex items-center gap-2 font-medium text-ink transition-colors hover:text-accent"
                >
                  Want something built like this? Let&apos;s talk
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}