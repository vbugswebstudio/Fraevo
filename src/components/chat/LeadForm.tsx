"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeadFormProps {
  summary?: Record<string, unknown>;
  onDone?: () => void;
}

export function LeadForm({ summary, onDone }: LeadFormProps) {
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
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, summary }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("done");
      onDone?.();
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center rounded-2xl border border-accent/30 bg-accent/[0.06] px-6 py-10 text-center"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15">
          <Check className="h-5 w-5 text-accent" />
        </span>
        <h3 className="mt-4 font-display text-xl font-medium text-ink">
          Got it — thank you.
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
          A Fraevo engineer will reach out at{" "}
          <span className="text-ink-soft">{form.email}</span> shortly. Your
          conversation summary is attached to this request.
        </p>
      </motion.div>
    );
  }

  const field =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-faint transition-colors focus:border-accent/60 focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
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
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        placeholder="Company (optional)"
        className={field}
        autoComplete="organization"
      />
      <textarea
        required
        rows={3}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="What are you looking to build?"
        className={cn(field, "resize-none")}
      />
      {status === "error" && (
        <p className="text-sm text-red-400">{error}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-medium text-accent-ink transition-all hover:bg-accent-strong disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send it"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
      <p className="text-center font-mono text-[10px] tracking-wider text-faint">
        We reply within one business day. No spam.
      </p>
    </form>
  );
}