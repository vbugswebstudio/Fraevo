"use client";

import { useEffect, useRef } from "react";
import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const fine = window.matchMedia("(pointer: fine)");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  fine.addEventListener("change", callback);
  reduce.addEventListener("change", callback);
  return () => {
    fine.removeEventListener("change", callback);
    reduce.removeEventListener("change", callback);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const getServerSnapshot = () => false;

export function CursorGlow() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 3;
    let cx = tx;
    let cy = ty;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `translate3d(${cx - 300}px, ${cy - 300}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[600px] w-[600px] rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(201,240,107,0.045) 0%, rgba(201,240,107,0.015) 40%, transparent 70%)",
      }}
    />
  );
}