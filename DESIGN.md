# Design

## Theme

Dark. Scene: a returning resident opens their personal cloud at night from the couch, calm low light, wanting to reach one service in two taps. Near-black indigo background. Landing page: animated mesh gradient with slow-drifting color blobs. Dashboard: settled dark with subtle top ambient glow.

## Color

Strategy: Committed. Each service tile carries a rich gradient that fills a full panel. The tiles are the color on the page; the dark background is negative space between them.

All values in OKLCH.

| Token | OKLCH | Role |
|---|---|---|
| `--bg` | `oklch(0.12 0.018 280)` | Page background — near-black with faint indigo undertone |
| `--surface` | `oklch(0.17 0.016 280)` | Cards, panels, nav bar |
| `--surface-raised` | `oklch(0.21 0.015 280)` | Hover state, elevated tiles |
| `--border` | `oklch(0.26 0.014 280)` | Subtle borders |
| `--ink` | `oklch(0.94 0.005 280)` | Primary text — near-white, faint indigo cast |
| `--ink-muted` | `oklch(0.62 0.010 280)` | Secondary text, labels |
| `--ink-faint` | `oklch(0.40 0.010 280)` | Placeholder, disabled |
| `--primary` | `oklch(0.62 0.19 285)` | Violet — primary brand, sign-in button, focus rings |
| `--primary-hover` | `oklch(0.68 0.18 285)` | Button hover |
| `--primary-muted` | `oklch(0.62 0.08 285 / 0.15)` | Tile category tint backgrounds |
| `--accent` | `oklch(0.80 0.10 55)` | Warm peach — accent on hero, highlights |
| `--accent-muted` | `oklch(0.80 0.06 55 / 0.12)` | Subtle warm tint |
| `--error` | `oklch(0.65 0.20 25)` | Error states |
| `--success` | `oklch(0.70 0.16 145)` | Success states |

### Tile gradients

Each service tile has a unique full-panel gradient. Lightness range 0.28–0.52 ensures white text passes WCAG AA contrast.

| App | Gradient | Glow color |
|---|---|---|
| Jellyfin | `oklch(0.48 0.18 280)` → `oklch(0.28 0.16 295)` | Violet |
| Jellyseerr | `oklch(0.50 0.20 335)` → `oklch(0.30 0.18 350)` | Magenta |
| Navidrome | `oklch(0.52 0.16 50)` → `oklch(0.35 0.18 25)` | Warm amber |
| Immich | `oklch(0.50 0.15 175)` → `oklch(0.30 0.14 210)` | Teal |
| Open WebUI | `oklch(0.50 0.15 145)` → `oklch(0.30 0.13 170)` | Green |
| Hermes | `oklch(0.45 0.17 245)` → `oklch(0.28 0.15 270)` | Blue |
| NetBird | `oklch(0.45 0.12 155)` → `oklch(0.28 0.10 180)` | Sage |
| Gitea | `oklch(0.50 0.17 55)` → `oklch(0.33 0.15 30)` | Amber |

### Landing page mesh gradient

Three animated radial gradient blobs on a near-black base (`oklch(0.07 0.015 280)`):
- Blob 1: `oklch(0.40 0.18 285)` at 18% opacity, top-left, 25s drift
- Blob 2: `oklch(0.35 0.14 200)` at 14% opacity, bottom-right, 30s drift
- Blob 3: `oklch(0.42 0.12 50)` at 7% opacity, center-right, 22s drift

All blobs use `filter: blur(120px)` and slow alternate ease-in-out animations.

## Typography

One family: Inter (via `next/font/google`). No display/body pairing needed.

Scale (fixed rem, not fluid for body):

| Step | Size | Weight | Usage |
|---|---|---|---|
| display | 3.5rem | 700 | Hero heading only, letter-spacing -0.02em |
| h1 | 2rem | 700 | Page-level headings |
| h2 | 1.25rem | 600 | Room labels |
| body | 1rem | 400 | Descriptions, paragraphs |
| small | 0.875rem | 400 | Labels, captions, muted text |
| label | 0.75rem | 500 | Category pills, nav items, uppercase only when ≤4 words |

Line length: 65ch max for prose blocks.
`text-wrap: balance` on display heading. `text-wrap: pretty` on body paragraphs.

## Components

### App Tile (Panel)

Full rich-gradient panel, not a small icon square.

- `border-radius: 16px`
- Background: full-panel gradient (`var(--app-gradient)`)
- No border or box-shadow at rest (gradient creates its own visual edge)
- `min-height: 180px`, `padding: 28px 24px`
- Interior: material-depth overlay (light at top, dark at bottom via `::before`)
- Icon: 44px inline SVG, white, `drop-shadow(0 2px 6px oklch(0 0 0 / 0.25))`
- Action label: 1.0625rem, weight 600, white
- Service name: 0.75rem, weight 500, `oklch(1 0 0 / 0.6)`
- Description: 0.8125rem, weight 400, `oklch(1 0 0 / 0.55)`, 2-line clamp, max-width 240px
- Hover: `translateY(-4px) scale(1.015)`, colored glow shadow (`0 16px 40px var(--glow-color)`)
- Active: `translateY(-1px) scale(0.99)`, 100ms
- Focus: `outline: 2px solid oklch(1 0 0 / 0.6)`, `outline-offset: 3px`

### Sign-in Button

- Background: `--primary`
- Text: white (`oklch(1 0 0)`)
- Radius: 8px
- Padding: 0.75rem 1.75rem
- Hover: `--primary-hover`
- Focus: `outline: 2px solid --primary`, `outline-offset: 2px`
- Transition: background 150ms ease-out

### Top Bar

- Background: `oklch(0.08 0.012 280 / 0.85)` with `backdrop-filter: blur(20px)`, `border-bottom: 1px solid oklch(1 0 0 / 0.04)`
- Position: sticky top
- Height: 64px
- Contains: monogram "J" badge (30px, rounded, violet-tinted) + wordmark "JiangLabs" (left), account menu trigger (right)

### Account Menu

- Trigger: avatar circle (initials), name, chevron
- Dropdown: native popover, `position: fixed` escape
- Items: view profile link (Authentik), sign out

### Landing Page Monogram

- 72px square, `border-radius: 18px`
- Background: `oklch(0.62 0.19 285 / 0.1)`
- Animated glow pulse via `box-shadow` (4s cycle, violet at 12% opacity)
- "J" letter: 2rem, weight 700, `oklch(0.75 0.16 285)`
- No `border` property (glow-pulse handles the edge via `box-shadow: 0 0 0 1px`)

### Room Section

- Room label: compact uppercase heading (0.75rem, 600 weight, `oklch(0.50 0.01 280)`) + 16px category icon, left-aligned, no trailing divider line
- Tiles: CSS Grid `repeat(auto-fill, minmax(280px, 1fr))`, gap 20px
- Dashboard max-width: 1200px

### Skeleton

- Matches room band shape
- Animated shimmer: `background: linear-gradient(90deg, --surface 25%, --surface-raised 50%, --surface 75%)`, `background-size: 200% 100%`, `animation: shimmer 1.5s infinite`
- `@media (prefers-reduced-motion)`: static placeholder, no shimmer

## Motion

All transitions: 150–300ms, expo ease-out `cubic-bezier(0.16, 1, 0.3, 1)`.

- **Landing mesh gradient:** 3 blobs drift position, 20–30s alternate, ease-in-out.
- **Monogram glow pulse:** `box-shadow` opacity + spread cycle, 4s infinite, ease-in-out.
- **Dashboard tile entrance:** staggered fade-up, 300ms per tile with 40ms stagger, expo ease-out. Visible default state; animation enhances.
- **Tile hover:** `translateY(-4px) scale(1.015)` + colored glow shadow, 250ms expo ease-out.
- **Tile active:** `translateY(-1px) scale(0.99)`, 100ms.
- **Account menu:** `opacity 0→1`, `transform: translateY(-4px)→0`, 150ms ease-out.
- `@media (prefers-reduced-motion: reduce)`: all transforms disabled, opacity-only or instant. Mesh blobs static. Monogram glow static ring.

## Icons

Inline SVGs per app, 32×32 viewBox (rendered at 44px in tiles). Style: simple, single-color (`currentColor`), line-weight consistent (~1.5px stroke or filled shape). No external icon CDN. Located in `components/icons/`.

Room icons: small 16px glyphs inline with room labels.

## Spacing Scale

4px base unit. Common steps: 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64, 80, 96.

## Z-index Scale

| Layer | Value |
|---|---|
| default | 0 |
| sticky (top bar) | 10 |
| dropdown | 20 |
| modal-backdrop | 30 |
| modal | 40 |
| toast | 50 |
| tooltip | 60 |

## Responsive

- Mobile (< 640px): single column tiles, condensed greeting, top bar collapses wordmark to monogram only.
- Tablet (640–1024px): 2-column tiles, `max-width: 900px`.
- Desktop (> 1024px): 3-column tiles (via `minmax(280px, 1fr)`), full `max-width: 1200px`.
- No fluid clamp on body type.
