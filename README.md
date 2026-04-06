# Earthstrong Canada

A full-stack corporate website for **Earthstrong Canada** — a Western Canadian agricultural crop nutrition and soil analysis company, subsidiary of Floratine Products Group. Built from scratch as a portfolio project with a complete custom design system.

**Live →** [earthstrong.ca](https://earthstrong-canada.vercel.app) &nbsp;·&nbsp; **Parent Company →** [Floratine Products Group](https://floratine.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router + TypeScript) |
| Styling | SCSS (BEM `es-` namespace) — zero Tailwind in production |
| Animation | GSAP 3 + ScrollTrigger + `@gsap/react` |
| Smooth Scroll | Lenis |
| Font | Urbanist (Google Fonts via `next/font`) |
| Deploy | Vercel |

---

## Key Features

### ✦ Page Transitions — Stairs

Custom **Stairs** curtain transition on every route change. Five dark columns rise left-to-right (cover), then drop top-to-bottom (reveal), with a white flash-guard layer behind them to prevent any new-page flicker.

- GSAP `timeline` with per-column `scaleY` tween and `stagger: { each: 0.07 }`
- `transformOrigin` is switched inside the timeline (`"bottom center"` → `"top center"`) to avoid an immediate jump
- `usePathname()` triggers the sequence on every App Router navigation
- Initial load starts columns fully visible (scaleY:1) and lifts them off — no separate intro state needed
- `prefers-reduced-motion` respected via GSAP's built-in media query support

### ✦ Hero Slider

Full-screen GSAP-driven image slider with dot pagination and auto-advance.

- Three slides with crossfade `autoAlpha` transitions — 5-second auto-advance
- Per-word stagger reveal on title (`opacity 0 → 1`, `y: 20 → 0`)
- Active dot expands from `10px` circle → `48px` pill via CSS transition; a `scaleX` fill bar tracks remaining slide time
- `ScrollBadge` — rotating SVG "SCROLL" ring (CSS `animation: spin 15s linear infinite`), fades in with the first slide

### ✦ Scroll Animations

All content animations use GSAP ScrollTrigger with a consistent vocabulary across pages.

- **Text reveal** — `clipPath: "inset(0 100% 0 0)"` → `"inset(0 0% 0 0)"`, 1.2s `power4.out`, fires at `top 85%`
- **Fade up** — `y: 60, opacity: 0` → `y: 0, opacity: 1`, 1s `power3.out`, stagger 0.15s on grids
- **Parallax** — large section images scrub `y` offset against scroll position
- **Scroll overlay** — full-viewport dark panel scrubs away as user scrolls into content sections (Mission, Vision)

### ✦ BEM Design System

All styles written in SCSS using a strict `es-[block]__[element]--[modifier]` convention with an `es-` (Earthstrong) namespace. Zero Tailwind utility classes in production HTML.

- Custom CSS variables and SCSS tokens in `_variables.scss` — color, typography, spacing, easing
- Mixin library in `_mixins.scss` — `container`, `section-padding`, `pill-btn`, `label-text`, responsive breakpoints (`sm` / `md` / `lg`)
- Sass `@use` module system throughout (no deprecated `@import`)
- All partials imported once in `globals.scss` — single cascade, no specificity conflicts

### ✦ Nutrition Products — Dynamic Routing

Six products rendered via `generateStaticParams()` with a single shared data source.

- `src/data/nutrition.ts` — single source of truth for all product data (name, slug, description, features, sub-products, hero image)
- `NutritionClient.tsx` list view + `/nutrition/[slug]` detail page both import from the same file
- Sub-product expansion, PDF spec sheet links, and feature benefit lists all driven from typed interfaces

### ✦ Partner Marquee

Infinite horizontal ticker of dealer/partner names in the dark footer band.

- Two identical sets of items concatenated — CSS `@keyframes es-marquee` translates `-50%` on repeat
- `animation-play-state: paused` on hover
- No JavaScript — pure CSS

### ✦ Performance

- All hero and product images in WebP (converted from JPG via ImageMagick)
- `next/image` with `formats: ["image/avif", "image/webp"]`, per-image `sizes` prop
- `next/font` for zero-CLS font loading (Urbanist Variable)
- `LenisProvider` for smooth scroll wraps only client tree — SSR-safe
- GSAP registered once in `src/lib/gsap-config.ts`, imported as a side-effect in the root layout

### ✦ Accessibility

- Skip-to-content link rendered in root layout (`#main-content`)
- All nav landmarks labelled (`aria-label`)
- `sr-only` headings on pages with no visible `<h1>` (Contact)
- Focus-visible ring preserved site-wide — no `outline: none` overrides
- WCAG AA contrast maintained on hero overlays (dual-direction gradient)

### ✦ SEO

- Per-page `<title>`, meta description, Open Graph, Twitter Card via Next.js `metadata` export
- `robots.ts` and `sitemap.ts` generated at build time
- `favicon.svg` — scalable brand icon, no raster fallbacks needed

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout — font, skip link, Header, Footer, PageLoader
│   ├── page.tsx              # Homepage
│   ├── not-found.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── products/
│   │   ├── page.tsx          # Products index with filter tabs
│   │   └── [slug]/page.tsx   # Product detail — 6 static routes
│   ├── nutrition/
│   │   ├── page.tsx          # Nutrition list (NutritionClient)
│   │   └── [slug]/page.tsx   # Nutrition product detail
│   ├── vision/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── login/page.tsx        # UI-only — no auth
│   ├── legal/page.tsx
│   └── cookie-policy/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # Fixed header — scroll-reactive bg, mobile overlay
│   │   ├── Footer.tsx        # Dark footer — brand / nav / contact / legal
│   │   ├── PageLoader.tsx    # Stairs page transition (GSAP)
│   │   ├── LenisProvider.tsx # Smooth scroll wrapper
│   │   └── ScrollUpBadge.tsx # Rotating "SCROLL UP" SVG in footer
│   ├── home/
│   │   ├── HeroSlider.tsx    # Full-screen GSAP slider
│   │   ├── ScrollBadge.tsx   # Rotating hero badge
│   │   ├── ManifestoSection.tsx
│   │   ├── FeaturedProduct.tsx
│   │   ├── ProductGrid.tsx   # 2-col grid
│   │   ├── SmallProductCards.tsx # 3-col grid
│   │   └── PartnerMarquee.tsx
│   ├── products/
│   │   ├── ProductFilterTabs.tsx
│   │   ├── ProductCard.tsx
│   │   ├── NextProduct.tsx   # Bottom-of-page "next" banner
│   │   └── ...
│   ├── nutrition/
│   │   └── NutritionClient.tsx # List + detail in one client component
│   ├── about/
│   │   ├── MissionStatement.tsx
│   │   ├── TeamProfiles.tsx
│   │   ├── TeamMember.tsx
│   │   └── ClientGrid.tsx
│   ├── vision/
│   │   ├── VisionHero.tsx
│   │   ├── ServicePillars.tsx
│   │   └── ClientShowcase.tsx
│   └── shared/
│       ├── SubpageHero.tsx
│       └── Badge.tsx
├── data/
│   ├── nutrition.ts          # Single source of truth for all 6 nutrition products
│   ├── products.ts           # Legacy products data
│   ├── team.ts               # 6 team members
│   ├── partners.ts           # 6 dealer partners, grouped by province
│   ├── navigation.ts
│   └── site.ts               # Company name, email, phone, tagline
├── lib/
│   └── gsap-config.ts        # Registers ScrollTrigger once, re-exported everywhere
├── styles/
│   ├── globals.scss          # Entry point — @use all partials in order
│   ├── _variables.scss       # $c-*, $f-*, $bp-*, easing tokens
│   ├── _mixins.scss          # container, section-padding, breakpoints, pill-btn
│   ├── _reset.scss
│   ├── _base.scss
│   ├── _animations.scss      # @keyframes es-marquee, es-spin
│   ├── _layout.scss          # .es-header, .es-footer, .es-loader, .es-mobile-menu
│   ├── _home.scss            # .es-hero, .es-manifesto, .es-featured, …
│   ├── _about.scss
│   ├── _vision.scss
│   ├── _contact.scss
│   ├── _login.scss
│   ├── _products.scss
│   ├── _nutrition.scss
│   └── _pages.scss           # .es-legal, .es-not-found
└── types/
    └── index.ts              # Product, TeamMember, Partner, NavItem, SiteConfig
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero slider, manifesto, featured product, product grids, partner marquee |
| `/products` | Product index with expertise filter tabs |
| `/products/[slug]` | Product detail — 6 static routes (solumetrix, harbor-brands, collect-n-go, cove, fjord, advanced-crop-nutrition) |
| `/nutrition` | Nutrition product list with category filter |
| `/nutrition/[slug]` | Nutrition product detail with sub-products and spec sheets |
| `/vision` | Company vision — pillars, service areas, partner showcase |
| `/about` | Mission statement, leadership team, dealer network |
| `/contact` | Email + phone + dealer network |
| `/login` | Dealer login UI (no auth — UI prototype only) |
| `/legal` | Privacy Policy |
| `/cookie-policy` | Cookie usage disclosure |

---

## Setup

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Start dev server
npm run dev
# → localhost:3000

# 3. Build for production
npm run build
npm start
```

No environment variables required — all data is static.

---

## Design System

Colors, typography, and spacing tokens are defined in `src/styles/_variables.scss`.

| Token | Value | Usage |
|---|---|---|
| `$c-green` | `#2D5A27` | Primary — logo, CTA buttons, accents |
| `$c-teal` | `#7EBEC5` | Secondary — link hover |
| `$c-cream` | `#EFE9E7` | Light section backgrounds |
| `$c-dark` | `#1a1a1a` | Footer, page loader columns, dark sections |
| `$c-charcoal` | `#333333` | Body text |
| `$c-orange` | `#E87A2E` | Accent — badges, icons |
| Font | Urbanist | Variable (100–900), geometric sans-serif |
| Container | `max-w-[1440px]` | `px-6` / `px-12` / `px-20` |
| Section padding | `py-20` → `py-40` | Scales from mobile to desktop |

---

## Architecture Notes

### SCSS Module System

All partials use Sass `@use` (Dart Sass) — `@import` is fully removed.

Every partial that needs tokens or mixins declares its own `@use 'variables' as *` / `@use 'mixins' as *` at the top. `globals.scss` then imports all partials in dependency order using `@use 'name' as *`.

### GSAP Initialization

`src/lib/gsap-config.ts` registers `ScrollTrigger` once and re-exports `gsap`. All components import from this file rather than from `gsap` directly. The file is also imported as a side-effect in `layout.tsx` to guarantee registration before any component mounts.

### Data Layer

All product data lives in `src/data/nutrition.ts` as a single typed array. Both the list view (`NutritionClient.tsx`) and the detail page (`/nutrition/[slug]/page.tsx`) import from this file. `generateStaticParams()` on the detail page derives its slugs from the same array — no duplication.

### z-index Layers

| Layer | z-index |
|---|---|
| Page content | 0 |
| Header | 50 |
| Mobile menu overlay | 40 |
| Page loader — white bg | 101 |
| Page loader — columns | 102 |

---

*Earthstrong Canada website by [CreativeMoon](https://creativemoon.ca). Portfolio project — not for redistribution.*
