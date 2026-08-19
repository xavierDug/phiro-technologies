# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # dev server with Turbopack
npm run dev:webpack   # dev server without Turbopack (fallback if a Turbopack bug blocks work)
npm run build         # production build
npm run start          # serve the production build
npm run lint            # eslint (next/core-web-vitals + next/typescript)
```

There is no test suite/framework configured in this repo (no test script, no test runner dependency). Don't assume Jest/Vitest exist — check with the user before adding one.

## Architecture

Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4. Path alias `@/*` → `./src/*`.

### Two independent surfaces under `src/app`

1. **`(site)`** — the main Phiro Technologies marketing site (home, about, projects, contact). Shares chrome via `src/app/(site)/layout.tsx`, which wraps children in `Navbar`/`Footer` from `src/components`.
2. **`och-planner`** — a standalone cold-email campaign landing page. It lives *outside* the `(site)` route group specifically so it never inherits Phiro's navbar/footer (see the comment in `(site)/layout.tsx`). It has its own layout, its own stylesheet (`och-planner.css`, scoped under an `.och-scope` class), `robots: noindex`, and its own component/content folders (`_components`, `_content` — underscore-prefixed so Next.js excludes them from routing). Treat it as a self-contained feature; don't reach into it from the main site or vice versa.

### Clean architecture, enforced by example

`src/app/api/leads/och-planner/route.ts` (the only API route in the app) is the reference implementation for how request handling is supposed to be layered here — read it before adding another route:

```
route.ts (transport only: parse request, map result → HTTP response)
  → lead-validation.ts   (src/server/leads) — pure functions, unknown → validated DTO, no I/O
  → lead-notification.service.ts (src/server/leads) — business rule: "a lead becomes an email"
    → resend.client.ts (src/server/email) — thin fetch wrapper over the Resend REST API
```

`lead.dto.ts` is the shared contract (types + a type guard, no logic) that both the client form (`och-planner/_components/lead-form.tsx`) and the server import — the single source of truth for what a valid lead looks like. Follow this shape (DTO → validate → service → transport-thin route handler) for any new API route rather than putting logic in the route handler.

`src/server/**` is intended to be server-only (it reads `RESEND_API_KEY` etc. via `process.env`). The `server-only` package isn't installed to enforce this at build time — noted in `resend.client.ts` as deliberate for now, not an oversight.

### Preline UI wiring

Preline (the UI kit behind some of the interactive components, e.g. the navbar's mobile collapse) needs manual re-init on client-side navigation since it isn't React-aware. `PrelineScriptWrapper` (`src/components`) dynamically imports `PrelineScript` with `ssr: false`; `PrelineScript` calls `window.HSStaticMethods.autoInit()` on mount and on every pathname change. The `Window.HSStaticMethods` type comes from `global.d.ts`. If you add a new Preline component, it needs `autoInit()` to have run after navigation — this wiring is why.

### Styling

- Tailwind v4, config-first via `tailwind.config.ts` (theme extensions: `gold` color, `blob` keyframes) plus CSS-first config via `@theme inline` in `src/app/globals.css`.
- `globals.css` also pulls in `preline/variants.css` and sources `node_modules/preline/dist/*.js` via `@source` so Tailwind picks up Preline's own classes.
- `src/lib/utils.ts` exports a minimal `cn()` class joiner — intentionally not `clsx` + `tailwind-merge` (see the doc comment); don't swap it in without checking whether conflict resolution is actually needed first.
- `och-planner.css` defines its own CSS custom properties (`--och-blue`, `--och-ink`, `--och-text`, etc.) consumed via arbitrary-value Tailwind classes (`text-[var(--och-...)]`) — keep campaign-specific tokens there rather than in `globals.css`.

### Dependencies worth knowing about before reaching for them

- `three` and `vanta` are installed but not currently referenced anywhere in `src` — don't assume a Vanta background is wired up somewhere; it isn't (yet).
- `framer-motion` is used for page-load/scroll animations on the main site (e.g. `(site)/page.tsx`).
- Icons: `lucide-react` (used in och-planner) and `react-icons` (used on the main site) both exist — check which a given file already uses before adding a new icon import to it.
