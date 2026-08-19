"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useChat } from "@/components/chat/ChatContext";
import { submitLead } from "@/lib/leads";

export function FinalCTA() {
  const { open: openChat } = useChat();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">(
    "idle"
  );
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await submitLead(form);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  const field =
    "w-full rounded-xl border border-light-line bg-white px-4 py-3 text-sm text-light-ink placeholder:text-light-muted/70 transition-colors focus:border-light-ink focus:outline-none";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-light py-28 text-light-ink md:py-40"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[800px] -translate-x-1/2 rounded-full bg-black/[0.03] blur-[100px]" />
      <div className="container-x relative grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-light-muted">
              Start a project
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-[clamp(2.8rem,6.5vw,5.8rem)] font-medium leading-[0.98] tracking-[-0.04em]">
              Have a problem
              <br />
              worth solving?
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 font-display text-xl font-medium tracking-tight text-light-muted md:text-2xl">
              Let&apos;s turn it into software.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact-form"
                className="group inline-flex items-center gap-2.5 rounded-full bg-light-ink px-7 py-3.5 text-sm font-medium text-light transition-all duration-300 hover:bg-black/85 hover:scale-[1.02]"
              >
                Start a Project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <button
                onClick={openChat}
                className="group inline-flex items-center gap-2.5 rounded-full border border-black/20 px-7 py-3.5 text-sm font-medium transition-all duration-300 hover:border-light-ink hover:bg-light-ink hover:text-light hover:scale-[1.02]"
              >
                Talk to Fraevo AI
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.28}>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-light-muted/70">
              hello@fraevo.com
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={30}>
          <div id="contact-form" className="rounded-3xl border border-light-line bg-white p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.2)] md:p-10">
            {status === "done" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-light-ink">
                  <Check className="h-6 w-6 text-light" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-medium tracking-tight">
                  Message received.
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-light-muted">
                  Thanks, {form.name.split(" ")[0]}. A Fraevo engineer will get
                  back to you at{" "}
                  <span className="font-medium text-light-ink">
                    {form.email}
                  </span>{" "}
                  within one business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-light-muted">
                    Tell us what you&apos;re building
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Name"
                    className={field}
                    autoComplete="name"
                  />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email"
                    className={field}
                    autoComplete="email"
                  />
                </div>
                <input
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                  placeholder="Company (optional)"
                  className={field}
                  autoComplete="organization"
                />
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="What do you want to build, and what problem does it solve?"
                  className={`${field} resize-none`}
                />
                {status === "error" && (
                  <p className="text-sm text-red-600">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-light-ink px-5 py-3.5 text-sm font-medium text-light transition-all hover:bg-black/85 disabled:opacity-60"
                >
                  {status === "loading" ? "Sending…" : "Send message"}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <p className="text-center font-mono text-[10px] tracking-wider text-light-muted/70">
                  We reply within one business day. Your information stays
                  private.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}