# Repository Guidelines

## Project Structure & Module Organization
Quick Printz is a Vite + React + TypeScript SPA. `src/main.tsx` bootstraps `App`, which lazy-loads routes from `src/pages`. Shared widgets live in `src/components`, while raw shadcn primitives stay isolated in `src/components/ui` until wrapped. Keep hooks in `src/hooks`, API helpers in `src/lib`, and Supabase logic in `src/integrations/supabase` to confine side effects. Static assets belong in `public/`, imported imagery goes in `src/assets/`, and production bundles emit to `dist/`. Place feature tests under `src/__tests__/`.

## Build, Test, and Development Commands
- `pnpm install` — sync dependencies whenever lockfiles change.
- `pnpm dev` — run Vite with HMR; requires a populated `.env.local`.
- `pnpm build` — generate optimized assets for deployment.
- `pnpm build:dev` — produce a debuggable build that keeps dev-only flags.
- `pnpm preview` — serve the latest build for smoke checks.
- `pnpm lint` — run ESLint; the pipeline fails on any violation.

## Coding Style & Naming Conventions
Author only functional TypeScript components with two-space indentation and double quotes. Pages/components use `PascalCase.tsx`, hooks and utilities use `camelCase.ts`, and CSS lives in Tailwind classes or extracted helper strings. Always import through the `@/` alias instead of deep relatives. ESLint plus Prettier enforce hook rules, ordered imports, and consistent formatting, so run `pnpm lint` before committing.

## Testing Guidelines
There is no default automated suite, so every change must at least pass `pnpm lint` and a manual `pnpm dev` tour of `/`, `/products`, `/contact`, and `/pricing`. When adding critical behavior (pricing math, Supabase mutations, media uploads), add Vitest + Testing Library specs in `src/__tests__/featureName.test.tsx` and document the new `pnpm test` command in your PR. Capture screenshots or gifs for any UI-impacting work.

## Commit & Pull Request Guidelines
Commits stay short, imperative, and Title Case (e.g., `Add Bag Designer State`), and each should tackle a single concern. Pull requests must outline the problem, solution, verification steps (commands plus routes exercised), linked issues, and before/after visuals when UI shifts. Call out schema migrations or env changes so reviewers can reproduce locally without surprises.

## Security & Configuration Tips
Copy `env/env.txt` to `.env.local` and fill `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, and every `VITE_BAG_DESIGNS_*`. Never commit secrets; coordinate rotations through `supabase/config.toml`. Validate Supabase row-level policies whenever you touch customer data or introduce new tables.
