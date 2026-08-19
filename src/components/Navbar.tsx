"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useChat } from "@/components/chat/ChatContext";
import { cn } from "@/lib/utils";

const links = [
  { label: "What We Build", href: "#services" },
  { label: "How We Work", href: "#approach" },
  { label: "Work", href: "#work" },
  { label: "AI", href: "#ai" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openChat } = useChat();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-line/80 bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          className={cn(
            "container-x flex items-center justify-between transition-all duration-500",
            scrolled ? "h-16" : "h-20"
          )}
        >
          <a
            href="#top"
            className="group relative z-10 font-display text-xl font-semibold tracking-tight text-ink"
            aria-label="Fraevo — back to top"
          >
            Fraevo
            <span className="text-accent">.</span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-[13px] font-medium tracking-tight text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openChat}
              className="group hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[13px] font-medium text-accent-ink transition-all duration-300 hover:bg-accent-strong sm:inline-flex"
            >
              Start a Project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-bg lg:hidden"
          >
            <div className="container-x flex h-20 items-center justify-between">
              <span className="font-display text-xl font-semibold tracking-tight text-ink">
                Fraevo<span className="text-accent">.</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="container-x flex flex-1 flex-col justify-center gap-2 pb-16">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
                  className="group flex items-baseline gap-4 border-b border-line-soft py-5"
                >
                  <span className="font-mono text-xs text-accent">
                    0{i + 1}
                  </span>
                  <span className="font-display text-3xl font-medium tracking-tight text-ink transition-colors group-hover:text-accent">
                    {link.label}
                  </span>
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-10"
              >
                <button
                  onClick={() => {
                    setOpen(false);
                    openChat();
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-medium text-accent-ink"
                >
                  Start a Project
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}