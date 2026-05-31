# Design

## Theme

Dark. Scene: a returning resident opens their personal cloud at night from the couch, calm low light, wanting to reach one service in two taps. Near-black indigo background, soft aurora glow in the hero only.

## Color

Strategy: Restrained (product default). Accent appears on primary actions and current-state indicators only.

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

Aurora glow: `radial-gradient` positioned behind the hero heading, blending `--primary` at ~8% opacity into `--bg`. Used once, on the landing hero only. Not repeated on the dashboard.

Room category tints (applied to room-band backgrounds, very subtle):

| Room | Category color hint |
|---|---|
| Watch | `oklch(0.55 0.18 285 / 0.06)` — violet |
| Listen | `oklch(0.70 0.16 145 / 0.06)` — green |
| Photos | `oklch(0.65 0.16 55 / 0.06)` — amber |
| AI | `oklch(0.60 0.18 200 / 0.06)` — teal |
| Network | `oklch(0.60 0.15 240 / 0.06)` — blue |
| Develop | `oklch(0.65 0.12 180 / 0.06)` — cyan |

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

Line length: 65ch max for prose blocks. Tile descriptions: 2 lines max.
`text-wrap: balance` on display heading. `text-wrap: pretty` on body paragraphs.

## Components

### App Tile

- `border-radius: 12px`
- Background: `--surface`
- Border: `1px solid --border`
- Hover: background → `--surface-raised`, border-color → `--primary` at 40% opacity, `transform: translateY(-2px)`, shadow `0 4px 16px oklch(0 0 0 / 0.3)`
- No paired `border + box-shadow` as pure decoration (impeccable ban). Border-color shift only on hover.
- Icon: 32px inline SVG, color `--ink-muted`, on hover → `--primary`
- Name: `small` weight 600, `--ink`
- Description: `small` weight 400, `--ink-muted`, 2-line clamp
- Category pill: `label` size, uppercase, `--primary-muted` bg, `--primary` color

### Sign-in Button

- Background: `--primary`
- Text: white (`oklch(1 0 0)`)
- Radius: 8px
- Padding: 0.75rem 1.75rem
- Hover: `--primary-hover`
- Focus: `outline: 2px solid --primary`, `outline-offset: 2px`
- Transition: background 150ms ease-out

### Top Bar

- Background: `--surface` with `backdrop-filter: blur(12px)`, `border-bottom: 1px solid --border`
- Position: sticky top
- Height: 56px
- Contains: wordmark (left), account menu trigger (right)

### Account Menu

- Trigger: avatar circle (initials), name, chevron
- Dropdown: native popover, `position: fixed` escape
- Items: view profile link (Authentik), sign out

### Room Band

- Full-width section with subtle category-tinted background
- Room label: h2 + category icon, left-aligned
- Tiles: CSS Grid `repeat(auto-fit, minmax(240px, 1fr))`, gap 16px, max 4 columns

### Skeleton

- Matches room band shape
- Animated shimmer: `background: linear-gradient(90deg, --surface 25%, --surface-raised 50%, --surface 75%)`, `background-size: 200% 100%`, `animation: shimmer 1.5s infinite`
- `@media (prefers-reduced-motion)`: static placeholder, no shimmer

## Motion

All transitions: 150–200ms, `ease-out`.

- Tile hover lift: `transform: translateY(-2px)`, `box-shadow` growth, `border-color` shift.
- Account menu: `opacity 0→1`, `transform: translateY(-4px)→0`, 150ms ease-out.
- Tile entrance on dashboard load: stagger `animation-delay` per tile (0, 30, 60, 90ms...), `opacity 0→1` + `translateY(8px→0)`, 200ms ease-out. Visible default state; animation enhances.
- `@media (prefers-reduced-motion: reduce)`: no translate, opacity-only or instant.

## Icons

Inline SVGs per app, 32×32 viewBox. Style: simple, single-color, line-weight consistent (~1.5px stroke or filled shape). No external icon CDN. Located in `components/icons/`.

Room icons: small 16px glyphs inline with room labels.

## Spacing Scale

4px base unit. Common steps: 4, 8, 12, 16, 24, 32, 48, 64, 96.

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

- Mobile (< 640px): single column tiles, condensed hero, top bar collapses wordmark to icon.
- Tablet (640–1024px): 2-column tiles.
- Desktop (> 1024px): 3–4 column tiles, full hero.
- No fluid clamp on body type. Hero display text does use `clamp(2rem, 5vw, 3.5rem)` (max well under 6rem cap).
