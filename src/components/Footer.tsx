import Link from "next/link";
import { ArrowUp } from "lucide-react";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "AI", href: "#ai" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/fraevo", Icon: LinkedInIcon },
  { label: "GitHub", href: "https://github.com/fraevo", Icon: GitHubIcon },
  { label: "Instagram", href: "https://www.instagram.com/fraevo", Icon: InstagramIcon },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              href="#top"
              className="font-display text-2xl font-semibold tracking-tight text-ink"
            >
              Fraevo<span className="text-accent">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              AI-native software engineering. We build intelligent digital
              products, custom software and automation — shipped at speed.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
              Company
            </p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-ink-soft transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
              Social
            </p>
            <ul className="mt-5 space-y-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-accent"
                  >
                    <social.Icon className="h-4 w-4" />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
              Contact
            </p>
            <a
              href="mailto:hello@fraevo.com"
              className="mt-5 inline-block text-sm text-ink-soft transition-colors hover:text-accent"
            >
              hello@fraevo.com
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 md:flex-row md:items-center">
          <p className="font-mono text-[11px] tracking-wider text-faint">
            © {new Date().getFullYear()} Fraevo. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-mono text-[11px] tracking-wider text-faint transition-colors hover:text-ink-soft"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-mono text-[11px] tracking-wider text-faint transition-colors hover:text-ink-soft"
            >
              Terms
            </Link>
            <a
              href="#top"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-all hover:border-accent/50 hover:text-accent"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}