# Fraevo — Website

The premium website for **Fraevo**, an AI-native software engineering company.

> Software, shipped at speed.

Built with Next.js (App Router), React 19, TypeScript, Tailwind CSS v4 and
Framer Motion (via the `motion` package).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

```bash
npm run dev        # dev server
npm run build      # production build
npm run start      # serve production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Structure

```
src/
  app/                    # routes, layout, metadata, sitemap, robots, manifest
    api/
      chat/route.ts       # streaming chat API
      leads/route.ts      # lead capture
  components/             # page sections (Hero, Services, CaseStudies, …)
    chat/                 # AI project consultant (overlay, markdown, lead form)
    ui/                   # shared primitives (Button, Reveal, Eyebrow, …)
  lib/ai/                 # LLM provider abstraction + client-side project analysis
```

## AI chat

The **Fraevo AI** project consultant is architected so the LLM provider can be
swapped without touching the frontend:

```
Frontend ──> /api/chat ──> LLM provider ──> OpenAI-compatible endpoint
```

All keys live in server-side environment variables only (see `.env.example`).

Without a key, a built-in keyword-based provider answers so the site is fully
usable in demos. With a key, it streams from a real model:

```bash
AI_API_KEY=sk-...           # required for a real model
AI_PROVIDER=openai          # openai | openrouter | together | custom
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
```

To add a new provider (Anthropic, Gemini, open-source), implement the
`LLMProvider` interface in `src/lib/ai/providers/` and register it in
`src/lib/ai/index.ts`.

## Leads

Leads submitted through the contact form or at the end of an AI conversation
are stored as JSON in `data/leads/` (git-ignored) and logged to the server.
Swap this for your CRM or email service in `src/app/api/leads/route.ts`.

## Design system

- **Colors:** near-black `#0a0b0d`, warm off-white `#eceee9`, neutral grays,
  single lime accent `#c9f06b` used sparingly.
- **Type:** Space Grotesk (display), Inter (body), JetBrains Mono (labels).
- **Motion:** scroll-reveals, scroll-driven hero pipeline, sticky process
  stage, streaming chat, magnetic buttons. Respects `prefers-reduced-motion`.

## Deployment

Standard Next.js deployment (Vercel, etc.). Set the `AI_*` env vars on the
host. For file-based lead storage, use a persistent volume or swap the storage
implementation for a database.
