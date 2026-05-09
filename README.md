# Note Trainer

[![GitHub](https://img.shields.io/badge/license-MIT-green)](https://github.com/Pettor/app-pixi-image-editor/blob/main/LICENSE)
[![Actions Main](../../actions/workflows/main.yml/badge.svg)](../../actions/workflows/main.yml)
[![Coverage](https://img.shields.io/badge/coverage-%E2%89%A580%25-brightgreen)](../../actions/workflows/ci.yml)
[![Storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg)](https://pettor.github.io/app-pixi-image-editor/storybook/)

A progressive web app for learning to read sheet music and building a deeper understanding of music theory — on desktop and mobile.

## Live Demo

- **[Live Application Demo](https://pettor.github.io/app-note-trainer/app/)** - See the main application
- **[Storybook Component Library](https://pettor.github.io/app-note-trainer/storybook/)** - Explore the component documentation

## What it does

Note Trainer provides interactive exercises and drills that help musicians at any level:

- **Note recognition** — identify notes on the staff quickly and accurately
- **Interval training** — hear and name the distance between two notes
- **Theory fundamentals** — understand how notes relate to scales, keys, and chords
- **Spaced repetition** — exercises adapt to your progress so you spend time where it counts

The app works offline as a PWA and is designed for short, focused practice sessions on both phone and desktop.

## Quick start

### Prerequisites

- Node.js 22 or higher
- pnpm (via corepack)

### Installation

```bash
corepack enable
pnpm install
pnpm dev
```

App runs at `https://localhost:5173`.

### Available scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm test` | Run unit/component tests |
| `pnpm test:e2e` | Run Playwright E2E tests |
| `pnpm lint` | Run ESLint |
| `pnpm storybook` | Start Storybook (localhost:9050) |

## Project structure

```
apps/
  web/          # Main React app (React 19 + Vite + HeroUI v3)
  storybook/    # Component documentation
  e2e/          # Playwright end-to-end tests
packages/
  ui/           # Shared UI components
  react/        # Reusable React hooks
configs/        # Shared ESLint, Tailwind, TypeScript, Vite configs
design/tokens/  # Style Dictionary design tokens
docs/           # Architecture and pattern reference
```

For architectural detail see the [`docs/`](./docs/) folder:

- [`docs/architecture.md`](./docs/architecture.md) — four-layer architecture and provider hierarchy
- [`docs/structure.md`](./docs/structure.md) — full directory tree for `apps/web`
- [`docs/patterns.md`](./docs/patterns.md) — Controller pattern, route hooks, atom co-location
- [`docs/packages.md`](./docs/packages.md) — workspace package responsibilities

## Tech stack

- **React 19** · **TypeScript** · **Vite 8** · **Turborepo**
- **Tailwind CSS 4** · **HeroUI v3**
- **TanStack Router** (file-based, hash history) · **TanStack Query**
- **Jotai** (global state) · **react-intl** (i18n)
- **Vitest** + **Playwright** (testing) · **Storybook 10**
- **PWA** via Workbox — offline support, installable on all platforms

## License

MIT
