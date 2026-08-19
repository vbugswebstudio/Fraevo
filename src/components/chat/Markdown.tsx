"use client";

import { useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy } from "lucide-react";

function CodeBlock({ children }: { children?: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const text = String(children ?? "").replace(/\n$/, "");
  return (
    <div className="group/code relative mt-3 overflow-hidden rounded-xl border border-line bg-bg">
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
          code
        </span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          }}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[10px] text-muted transition-colors hover:bg-surface hover:text-ink"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-accent" /> copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" /> copy
            </>
          )}
        </button>
      </div>
      <pre className="scrollbar-none overflow-x-auto p-4">
        <code className="font-mono text-[13px] leading-relaxed text-ink-soft">
          {children}
        </code>
      </pre>
    </div>
  );
}

const components = {
  p: ({ children }: { children?: ReactNode }) => (
    <p className="my-3 leading-relaxed text-ink-soft first:mt-0 last:mb-0">
      {children}
    </p>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  em: ({ children }: { children?: ReactNode }) => (
    <em className="italic text-ink">{children}</em>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="my-3 space-y-1.5 pl-5">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="my-3 list-decimal space-y-1.5 pl-5">{children}</ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="leading-relaxed text-ink-soft marker:text-accent">
      {children}
    </li>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="my-3 rounded-r-xl border-l-2 border-accent bg-accent/[0.06] px-4 py-3">
      <span className="text-ink">{children}</span>
    </blockquote>
  ),
  h1: ({ children }: { children?: ReactNode }) => (
    <h1 className="my-3 font-display text-lg font-medium text-ink">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="my-3 font-display text-lg font-medium text-ink">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="my-3 font-display text-base font-medium text-ink">
      {children}
    </h3>
  ),
  a: ({
    children,
    href,
  }: {
    children?: ReactNode;
    href?: string;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
    >
      {children}
    </a>
  ),
  code: ({
    inline,
    children,
  }: {
    inline?: boolean;
    children?: ReactNode;
  }) => {
    if (inline) {
      return (
        <code className="rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-accent">
          {children}
        </code>
      );
    }
    return <CodeBlock>{children}</CodeBlock>;
  },
};

export function Markdown({ content }: { content: string }) {
  return (
    <div className="text-[14.5px]">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}