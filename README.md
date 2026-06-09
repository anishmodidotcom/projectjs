# Jayna Sippy — Personal Brand Website

A premium personal-brand site for Jayna Sippy: brand consultant, marketer, and founder of Drive Me Social.

## Stack

- **Next.js 15.5** (App Router, TypeScript, `src/` directory)
- **React 19**
- **Tailwind CSS 3** with custom design tokens
- **Framer Motion** for animations
- **Lenis** for smooth scroll
- **react-simple-maps** + **world-atlas** + **d3-geo** for the travel map (topojson bundled locally — no CDN fetch)
- **clsx** + **tailwind-merge** for class utilities

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

## Deploy on Vercel

1. Import the repo at [vercel.com/new](https://vercel.com/new).
2. Framework is auto-detected as Next.js — no build settings needed.
3. No environment variables required for v1.
4. Push to `main` to deploy production.

## Project layout

```
src/
├── app/
│   ├── api/contact/route.ts   # contact form endpoint (honeypot + in-memory rate limit)
│   ├── opengraph-image.tsx    # 1200x630 OG image via next/og
│   ├── globals.css            # tokens, typography utilities, keyframes
│   ├── layout.tsx             # fonts, metadata, SmoothScroll, Cursor
│   └── page.tsx               # composes all sections
├── components/
│   ├── Cursor.tsx             # custom desktop cursor
│   ├── SmoothScroll.tsx       # Lenis init + expose on window.__lenis
│   └── sections/
│       ├── Hero.tsx
│       ├── Story.tsx
│       ├── Services.tsx
│       ├── Brands.tsx
│       ├── Travel.tsx
│       ├── Instagram.tsx
│       ├── Stats.tsx
│       ├── Contact.tsx
│       └── Footer.tsx
├── hooks/
│   ├── usePrefersReducedMotion.ts
│   └── useCountUp.ts
└── lib/
    ├── motion.ts              # shared Framer variants
    └── utils.ts               # cn()
```

## Animations & accessibility

All scroll-reveal, hover, marquee, count-up, and cursor animations are gated on `(prefers-reduced-motion: reduce)` — they render in their final state with no motion when the user prefers reduced motion. All interactive elements have a visible berry focus ring.

## Security

Headers configured in `next.config.ts` and applied on every route:

- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self'; frame-ancestors 'self';`

All assets (fonts, map topojson) are self-hosted/bundled — no third-party network calls at runtime.

## PLACEHOLDERS TO REPLACE BEFORE/AFTER LAUNCH

1. **Instagram feed tiles** — `src/components/sections/Instagram.tsx`. Currently 6 styled placeholder tiles with captions. Wire to a live feed (Behold.so or IG Graph API) once account access is available; keep grid markup identical.
2. **Brand logos** — `src/components/sections/Brands.tsx`. Currently a marquee of styled text chips. Swap for real brand logos once provided.
3. **Contact form email integration** — `src/app/api/contact/route.ts` currently `console.log`s the payload. Wire to an email service (Resend, SES) once configured; add the API key as a Vercel env var.
4. **Follower / stat numbers** — `src/components/sections/Stats.tsx`. Update `25.9k`, `6+`, `12k` if/when they change.
5. **Production domain** — `src/app/layout.tsx` sets `metadataBase: https://jaynasippy.com` as a placeholder. Replace with the real production URL before launch.
6. **OG image polish** — `src/app/opengraph-image.tsx` uses a system serif fallback (cannot bundle Fraunces inside the edge runtime without extra setup). When ready, load the Fraunces woff2 from a local file inside the route and pass it via `fonts: [...]` to `ImageResponse` for a typography-perfect OG.
