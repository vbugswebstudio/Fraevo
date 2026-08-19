"use client";

import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "accent" | "ghost" | "light" | "outline-light";

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  arrow?: boolean;
  icon?: React.ReactNode;
}

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-all duration-300 select-none cursor-pointer";

const variants: Record<Variant, string> = {
  accent:
    "bg-accent text-accent-ink hover:bg-accent-strong hover:shadow-[0_0_0_6px_rgba(201,240,107,0.1)] hover:scale-[1.02] active:scale-[0.98]",
  ghost:
    "border border-white/15 text-ink hover:border-accent/60 hover:bg-white/[0.04] hover:scale-[1.02] active:scale-[0.98]",
  light:
    "bg-light-ink text-light hover:bg-black/85 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]",
  "outline-light":
    "border border-black/20 text-light-ink hover:border-light-ink hover:bg-light-ink hover:text-light hover:scale-[1.02] active:scale-[0.98]",
};

export function Button({
  children,
  variant = "accent",
  href,
  onClick,
  type = "button",
  className,
  arrow = false,
  icon,
}: ButtonProps) {
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <svg
          className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden
        >
          <path d="M4 12h15" strokeLinecap="round" />
          <path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {icon}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={cn(base, variants[variant], className)}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(base, variants[variant], className)}
    >
      {inner}
    </button>
  );
}

export function MagneticButton(props: ButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 16, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 160, damping: 16, mass: 0.5 });

  function handleMove(e: ReactMouseEvent) {
    const el = ref.current?.parentElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  }

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-block"
    >
      <motion.span
        ref={ref}
        style={{ x: sx, y: sy }}
        className="inline-block"
      >
        <Button {...props} />
      </motion.span>
    </div>
  );
}