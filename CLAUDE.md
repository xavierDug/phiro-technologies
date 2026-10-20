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

### Rendering and motion (performance rules)

- Sections are **server components** that take a `locale` prop and read copy with `getDictionary(locale)`. Client code is limited to leaf islands: `Navbar`, `LocaleSwitcher`, `components/motion/*`, `HeroStage`, `ProjectIndex`, `ContactForm`, `ArticleRail`, `NumberTicker`.
- One animation library: `motion` (`motion/react`). `MotionProvider` (in `SiteChrome`) wraps the site in `LazyMotion` (features loaded async, `strict`) and `MotionConfig reducedMotion="user"`. Use `m.*` elements, never `motion.*` — the full component pulls the layout/drag engines into the shared vendor chunk for every page.
- Above-the-fold entrances are **CSS** (`.page-in`, `.word-rise`, `.fade-up` in `globals.css`) so the LCP element paints without waiting for hydration. Below the fold use `Reveal` / `RevealGroup` / `RevealItem` from `components/motion/reveal`.
- `useLiteMotion()` is true for reduced motion, touch, data saver or modest hardware (≤4 cores / ≤4 GB). Gate anything continuous (parallax, cursor-following) on it. Only animate `opacity` and `transform`.
- Client components must not import long-form content (`content/projects*.ts`, blog posts): pass a summary from the server instead (see `toProjectSummary`).

### Styling

- Tailwind v4, CSS-first: all tokens live in `:root` + `@theme inline` in `src/app/globals.css` (there is no `tailwind.config.ts`). Light editorial palette: `paper` ground, `ink` text, `muted`/`faint`, `panel`/`card` surfaces, `line`/`line-strong` hairlines, and `gold` used **only as a fill** (primary button, the `.accent` highlighter, status dot) — gold text on paper fails contrast. The dark band (`ClosingCta` + `Footer`) uses the `on-ink*` tokens and `.accent-on-ink`.
- Headlines follow one pattern: plain words + one serif-italic accent word + punctuation — use `Headline` / `SectionHeading` from `components/ui/headline`. Buttons are pills via `ButtonLink` / `buttonStyles` (`components/ui/button-link`).
- `src/lib/utils.ts` exports `cn()` = `clsx` + `tailwind-merge`.
- `och-planner.css` defines its own CSS custom properties (`--och-blue`, `--och-ink`, `--och-text`, etc.) consumed via arbitrary-value Tailwind classes — keep campaign-specific tokens there rather than in `globals.css`. It restores its own heading weight and focus ring because the main site's are tuned for the light theme.

### Dependencies worth knowing about before reaching for them

- Runtime deps are deliberately few: `next`, `react`, `motion`, `lucide-react` (all icons), `class-variance-authority`, `clsx`, `tailwind-merge`. WebGL/canvas effects (Aurora, LightRays, Particles, three, vanta, ogl, gsap) were removed in the light redesign for performance — don't reintroduce them without measuring on a throttled CPU.
- Fonts come from `next/font/google` (Geist, Geist Mono, Inter Tight 500/600, Instrument Serif).
