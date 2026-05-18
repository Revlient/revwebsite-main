# Revlient — Creative Studio Website

Marketing homepage for **Revlient Intercontinental LLP**, a creative studio.
Tagline: _"We Craft Digital Legacies"._

This repository is the **creative studio site**. ERP / CRM / automation
buyers are a separate audience served by a separate site, **Revlient
Systems** — this site forks dignified traffic there (high in the hero, with
one quiet cross-sell elsewhere) but stays focused on creative work.

## Stack

- **Next.js 16** (App Router), **React 19**
- **JavaScript** (no TypeScript)
- **Plain CSS**, one global stylesheet (`app/globals.css`) — no Tailwind, no
  CSS Modules. This is deliberate.
- **Three.js** for the restrained hero 3D background
- Server Components by default; `"use client"` only where a browser API is
  genuinely needed (scroll, IntersectionObserver, pointer, WebGL)
- The homepage is statically prerendered

## Getting started

Requires **Node 20+** (developed on Node 22).

```bash
npm install
npm run dev      # http://localhost:3000
```

### Production build

```bash
npm run build    # builds clean; homepage prerenders as static
npm run start    # serve the production build
```

## Project structure

```
app/
  layout.js              Root layout + base SEO metadata
  page.js                Homepage — assembles the sections in order
  globals.css            The single global stylesheet (design tokens at top)
  lib/
    site.js              Cross-cutting constants (brand, CTA target, nav,
                         the Revlient Systems fork URL)
  components/
    Nav.js               Persistent top nav + CTA (client)
    Hero.js              Hero content/message (server) — readable w/o 3D
    HeroBackground.js    Lazy loader for the 3D (client, next/dynamic)
    HeroCanvas.js        Three.js scene (client)
    ClientStrip.js       Credibility strip
    WhyRevlient.js       The sharp WHY — three pillars
    Work.js              Case studies (problem → built → result)
    Proof.js             Testimonial
    Services.js          Four services framed as outcomes
    Process.js           Discover / Design / Build / Launch
    Studio.js            Team & personality
    FinalCTA.js          Closing CTA (anchor: #start)
    Footer.js            Footer + quiet systems cross-sell
    Reveal.js            Reusable scroll-reveal wrapper (client)
    StickyCTA.js         Floating CTA after the hero (client)
```

**Editing content:** every section keeps its copy in a data array at the
top of its component file. Edit the data, not repeated markup.

## Performance & accessibility

A 3D site that stutters destroys the credibility the 3D was meant to build,
so the hero 3D is held to a contract:

- `devicePixelRatio` capped at **1.75**
- Three.js is **lazy-loaded** client-side (`next/dynamic`, `ssr: false`) and
  off the critical path — the hero text paints immediately
- A CSS depth gradient renders in **< 1s**, with or without WebGL
- `prefers-reduced-motion`: a single static frame, **no animation loop**
- The animation pauses when the tab is hidden or the hero scrolls off-screen
- All Three.js resources are disposed on unmount
- The hero is **fully readable** (headline, CTAs, fork) if the 3D never
  loads — the message is the spine, the 3D is enhancement

The persistent **"Start a project"** CTA is reachable at all times: in the
nav, in the hero, as a floating sticky button after the hero, and in the
closing section.

## ⚠️ Placeholder content — do not ship as fact

Fabricated proof is a real business risk for this studio, so **nothing
invented is presented as real**. Everything below is clearly marked in the
UI and/or with `TODO` code comments:

- **Client names** (`ClientStrip.js`, `Work.js`) — placeholders
- **Case-study metrics** (`Work.js`) — values render as `—` with a visible
  `TODO` badge; no invented numbers
- **Testimonial** (`Proof.js`) — placeholder, visibly flagged
- **Team members** (`Studio.js`) — placeholder names/roles
- **Contact email & social links** — placeholders
- **Revlient Systems URL** (`lib/site.js`) — confirm the real production URL
- **WHY copy** (`WhyRevlient.js`) — sharp placeholder for the team to lock

## Suggested follow-on tasks (not in this build)

1. **`/start` enquiry form** — the conversion endpoint. Fields: name,
   email, project type, budget range (also pre-qualifies leads), short
   brief. One screen. Then point `CTA_HREF` in `app/lib/site.js` at it.
2. **Case-study detail pages** under `app/work/[slug]` — the place for
   deeper, immersive storytelling (opt-in, off the homepage path).
3. **SEO pass** — per-page metadata, real Open Graph image, favicon,
   `sitemap.xml`, `robots.txt`.
4. **Replace all placeholder content** with real, verified material.
5. _(Future hero direction)_ The mark is built from separate panels so the
   logo can later assemble from its facets on load — the per-panel loop
   hook is marked in `HeroCanvas.js`.
