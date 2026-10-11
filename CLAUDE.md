# Palettly – Instructions for Claude Code

Palettly is a web tool for designers to test colors and fonts in real time on a realistic preview website. Inspired by realtimecolors.com, but not a copy: more colors, per-section overrides, better export.

**Read these files before writing any code:**
- `SPEC.md` – features, behavior, roadmap (source of truth for *what* to build)
- `SECURITY.md` – mandatory security rules (apply from the first line of code, never "later")

## Tech stack

- Vite + React + TypeScript (strict mode)
- Tailwind CSS + CSS Custom Properties (all colors, fonts and sizes are CSS variables set at runtime)
- Zustand for state (palette, fonts, section overrides, theme)
- Zod for validating all external input (URL hash, uploads, imported data)
- Fonts: self-hosted via Fontsource, curated list, Latin subset, WOFF2, lazy loaded
- Hosting: Cloudflare Pages or Vercel (security headers must be configurable)
- No backend, no database, no accounts in V1

## Commands

- `npm install` – install dependencies
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run lint` – ESLint
- `npm run typecheck` – `tsc --noEmit`
- `npm run test` – unit tests (Vitest)
- `npm audit` – must show no high/critical issues before release

## Project structure (target)

```
src/
  components/
    toolbar/        # bottom settings bar (desktop) / bottom sheet (mobile)
    preview/        # preview sections (Navbar, Hero, Pricing, ...)
    ui/             # small shared components
  store/            # Zustand stores
  lib/
    color/          # color math, contrast (WCAG), dark-mode derivation
    export/         # CSS vars, Tailwind config, JSON, HEX list, PNG
    share/          # URL hash encode/decode + Zod validation
    fonts/          # font list, loader
  data/             # curated font list, default palette
```

## Code rules

- TypeScript strict, no `any`. Small, focused components. Named exports.
- Styling only through CSS variables and Tailwind classes. Never hardcode colors in preview components; always use the variables (`--color-primary`, etc.).
- Preview sections must be self-contained and receive their colors through CSS variables so section overrides work by scoping variables on the section element.
- Accessibility: semantic HTML, keyboard navigation for the whole toolbar, visible focus states, ARIA labels on icon buttons.
- Performance: lazy load fonts and heavy sections, avoid unnecessary re-renders (selectors in Zustand), keep the bundle small.
- UI language: English. Code, comments, commit messages: English.
- No `dangerouslySetInnerHTML`, no `eval`, no inline event-handler strings. See `SECURITY.md`.
- Add unit tests for: color math, contrast calculation, dark-mode derivation, share-link encode/decode/validation, export generators.

## Workflow

- Work in small steps. After each feature: lint, typecheck, test, then commit.
- Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`).
- Never commit secrets, `.env` files or generated font files.
- If something in `SPEC.md` is unclear or conflicts with `SECURITY.md`, stop and ask instead of guessing. Security wins.
