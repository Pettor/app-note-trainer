# Packages

This document tours the workspace packages. Packages differ from apps in two ways:

- They export a public API through a hand-maintained `src/index.ts` barrel.
- They use `PascalCase` folder names internally (historical — kept consistent across packages).

For the `apps/web` layered structure, see [structure.md](./structure.md).

## Workspace layout

```
packages/
├── react/       # @package/react   — reusable best-practice React 19 hooks
├── ui/          # @package/ui      — cross-app UI (logos, layouts, icons)
└── storybook/   # @package/storybook — Storybook decorators and helpers

configs/
├── eslint/      # @config/eslint       — shared ESLint configs
├── tailwind/    # @config/tailwind     — shared Tailwind config
├── typescript/  # @config/typescript   — shared tsconfig bases
└── vite/        # @config/vite         — Vite config factory functions

design/
└── tokens/      # @design/tokens       — Style Dictionary design tokens
```

## `@package/react`

Reusable best-practice hooks that complement React 19. Zero runtime dependencies beyond React itself.

```
packages/react/src/
├── Browser/              # Hooks for browser and window APIs
│   ├── UseCopyToClipboard.ts
│   ├── UseDocumentTitle.ts
│   ├── UseLocalStorage.ts
│   └── UseMediaQuery.ts
├── Dom/                  # Hooks for DOM elements and events
│   ├── UseClickOutside.ts
│   ├── UseEventListener.ts
│   └── UseIntersectionObserver.ts
├── State/                # React state utility hooks
│   └── UseDebounce.ts
├── Lifecycle/            # Component lifecycle hooks
│   ├── UseIsFirstRender.ts
│   └── UseIsMounted.ts
└── index.ts
```

### Hooks

**Browser**

| Hook | Signature | Purpose |
| --- | --- | --- |
| `useCopyToClipboard` | `() → { copiedText, copy(text) }` | Clipboard API wrapper; `copy` returns `true` on success |
| `useDocumentTitle` | `(title: string) → void` | Sets `document.title` whenever `title` changes |
| `useLocalStorage` | `<T>(key, initialValue) → [T, setter]` | `useState` backed by `localStorage`; syncs across tabs via the `storage` event |
| `useMediaQuery` | `(query: string) → boolean` | Tracks a CSS media query using native `matchMedia`; reactive to viewport changes |
| `useBreakpoint` | `(size: "sm"\|"md"\|"lg"\|"xl"\|"2xl") → boolean` | Tailwind-breakpoint shorthand over `useMediaQuery` |

**Dom**

| Hook | Signature | Purpose |
| --- | --- | --- |
| `useClickOutside` | `(ref, handler) → void` | Fires `handler` on `mousedown`/`touchstart` outside the ref'd element |
| `useEventListener` | `(target, event, handler, options?) → void` | Attaches a DOM event listener with automatic cleanup; stable via `useRef` |
| `useIntersectionObserver` | `(ref, options?) → IntersectionObserverEntry \| undefined` | Tracks when an element enters or exits the viewport |

**State**

| Hook | Signature | Purpose |
| --- | --- | --- |
| `useDebounce` | `<T>(value, delay) → T` | Returns a debounced copy of `value`; resets the timer on every change |

**Lifecycle**

| Hook | Signature | Purpose |
| --- | --- | --- |
| `useIsFirstRender` | `() → boolean` | Returns `true` only on the first render of a component |
| `useIsMounted` | `() → () => boolean` | Returns a getter that is `true` while the component is mounted; safe for async callbacks |

## `@package/ui`

Cross-app shared UI. Components here must be consumable by **any** app (not just `apps/web`).

```
packages/ui/src/
├── Branding/
│   ├── Logo/
│   └── LogoFull/
├── Icons/
│   └── Social/           # GithubIcon, LinkedInIcon
├── Layout/
│   ├── Background/       # BlueFadeBackground, GridBackground
│   ├── BasicLayout/
│   └── NavbarLayout/
├── Navigation/
│   └── Navbar/
├── Storybook/            # UI-specific story helpers
├── main.css              # Tailwind layer the package contributes
└── index.ts
```

Every component folder has `<ComponentName>.tsx` + `<ComponentName>.stories.tsx`. Stories use the `Shared/<Category>/<ComponentName>` title pattern — see [naming.md#story-titles](./naming.md#story-titles).

## `@package/storybook`

Storybook decorators consumed by stories in both `apps/web` and `packages/ui`.

Notable export:

- `ContainerDecorator` — centres a component inside a sized container. Use it for form/card stories that would otherwise render at full width.

## `@design/tokens`

Design tokens built with **Style Dictionary 5** in W3C token format.

Exports:

- `@design/tokens/css` → `variables.css` (CSS custom properties — imported in `apps/web/src/main.css`).
- `@design/tokens/tailwind` → `theme.js` (Tailwind colour palette consumed by `@config/tailwind`).

## Configs

Each `configs/*` package is a small shared config used by apps and other packages:

| Package | Purpose |
| --- | --- |
| `@config/eslint` | Base ESLint configs (root, React, Node) |
| `@config/tailwind` | Shared Tailwind config including the design tokens palette |
| `@config/typescript` | `tsconfig` bases (`base.json`, `react.json`, `node.json`) |
| `@config/vite` | Vite config factories (web, library, storybook) |

## Apps at a glance

| App | Stack | Entry | Port |
| --- | --- | --- | --- |
| `apps/web` | React 19, Vite 8, Tailwind 4, HeroUI v3, TanStack Router | `src/main.tsx` | 5173 (HTTPS) |
| `apps/storybook` | Storybook 10 + Vite builder | `main.ts` | 9050 |
| `apps/e2e` | Playwright 1.58, Chromium | `src/specs/*.spec.ts` | — (runs against 5173) |

For app-specific architecture, see [architecture.md](./architecture.md).
