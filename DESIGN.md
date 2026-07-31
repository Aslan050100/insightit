# Design

## Theme

Premium dark with iOS-style liquid glass. Cool steel / silver accent on near-black navy. Frosted translucent surfaces, soft depth, restrained glow (appears only on hover). Signature motif: an animated "node-graph" automation pipeline. Never purple, never neon, never template-y.

## Color

Background layers (deep → elevated):
- `base` `#070B14` — page
- `surface-1` `#0C1220`, `surface-2` `#131B2E`, `surface-3` `#1B2540`

Accent — cool steel / silver (neutral, minimal; interactive + one gradient keyword per heading only):
- `accent` `#9DB0CE`, `accent-2` `#C6D3E8`, `accent-deep` `#7C92B6`, `accent-fg` `#0A1322`

Text: `#EAF1FB` primary · `#9FB0C9` muted · `#5E7196` faint
Lines: `rgba(146,170,209, .12)` / `.22`

Rules: no purple "AI gradient". Steel glow halo only on hover, never permanent. Selection + eyebrow lines use the steel gradient.

## Typography

- Display / headings: **Manrope** (500–800), tracking `-0.02em`, line-height `1.1`
- Body: **Inter**, line-height `1.6`
- Subsets: `latin` + `cyrillic` + `cyrillic-ext` (Kazakh glyphs ә ғ қ ң ө ұ ү һ і)
- Loaded via `next/font` as CSS variables `--font-manrope` / `--font-inter`
- Scale: H1 `2.5 → 3.75rem`, H2 `~2.7rem`, body `0.875–1.125rem`

## Layout & Spacing

- Container `max-w-6xl` (72rem), padding `1.25–2rem`
- Section rhythm: `.section-py` `4.5rem → 7rem` (md+)
- Editorial, asymmetric: left-weighted hero, bento case grid, 2/3+1/3 offsets — **not** centered identical-card rows
- Radii: `sm .5` · `md .75` · `lg 1` · `xl 1.25` · `2xl 1.5` · `3xl 2rem` (rounded-full for buttons/chips)

## Components

- **Glass buttons** `.glass-btn`: translucent + `backdrop-blur(24px)` + top sheen gradient + inset specular highlights + soft shadow. Primary = steel tint (`bg-accent/30`), secondary = faint (`bg-white/5`). Hover brightens.
- **Glass cards** `.card-surface`: `backdrop-blur(16px)` + sheen + specular. Border/shadow are quiet at rest; **steel glow + lift appear only on hover**. `.card-accent` = featured (steel border + slightly more present surface), still glows only on hover.
- **Glass chips** `.glass-chip` (badges/pills), **glass navbar** (`.glass-dark`, always on) + **glass language toggle**.
- **Client logos**: shown in original brand colors on white chips, in a paused-on-hover marquee.
- Custom primitives (no shadcn runtime); `lucide-react` icons tinted steel; brand logo = node-graph SVG wordmark (placeholder until real logo).

## Motion

- **Scroll-reveal**: blur-focus rise — elements fade up *and* sharpen from blur (`fadeInUp` / `slideInLeft/Right` with `filter: blur`), staggered for grids.
- **Parallax** on the hero node-graph; **scroll-progress bar** (steel gradient) at top; **logo marquee**; **animated node-graph** (flowing dashed connections + breathing nodes).
- **Page transitions** (fade), micro-interactions (hover `scale-1.02`, card lift `-translate-y-1`, glow).
- Everything gated by `prefers-reduced-motion` (the global media query freezes animations).

## Tech

Next.js 16 (App Router) · React 19 · Tailwind v4 (CSS-first `@theme` in `src/app/globals.css`) · `motion` (Framer Motion) · TypeScript. Bilingual via `[locale]` segment + typed dictionaries (`src/content/ru.ts` canon, `kz.ts`). Deploy: Vercel.
