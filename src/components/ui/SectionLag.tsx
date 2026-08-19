"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionLag({
  children,
  hold = "20vh",
  className,
}: {
  children: ReactNode;
  hold?: string;
  className?: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [offset, setOffset] = useState(0);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const measure = () => {
      const el = contentRef.current;
      if (!el) return;
      const s = el.offsetHeight;
      const v = window.innerHeight;
      setOffset(s > v ? v - s : 0);
    };

    const update = () => {
      if (mq.matches && !reduced.matches) {
        setEnabled(true);
        measure();
      } else {
        setEnabled(false);
      }
    };

    update();
    mq.addEventListener("change", update);
    reduced.addEventListener("change", update);
    window.addEventListener("resize", measure);
    return () => {
      mq.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={contentRef}
        className={cn("sticky", !enabled && "relative")}
        style={{ top: offset }}
      >
        {children}
      </div>
      <div
        className="pointer-events-none"
        style={{ height: enabled ? hold : "0" }}
        aria-hidden
      />
    </div>
  );
}