# Harsh Lakhara — Developer Portfolio & Client Showcase

A premium, cinematic, single-page portfolio built to convert visitors into
clients. Dark art-directed design, scroll motion, a reusable project-inquiry
flow, and an honest contact pipeline.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion ·
Lucide + Simple Icons**.

---

## Quick start

```bash
npm install          # install dependencies
npm run dev          # start the dev server  -> http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
```

Node 18.18+ (tested on Node 20).

### Responsive audit (optional)

The site is mobile-first and audited with Playwright across 320px → 1920px. To
re-run the automated check (horizontal-overflow + console-error detection at
every target viewport, plus menu/modal/FAQ interaction passes, with
screenshots):

```bash
npm run build && npm run start -- -p 3062          # terminal 1
BASE_URL=http://localhost:3062 npm run test:responsive   # terminal 2
```

Screenshots are written to `./.responsive-screens` (gitignored). Playwright is a
devDependency only; run `npx playwright install chromium` once to fetch the
browser.

---

## Personalise it (start here)

Almost everything is driven by typed config files in [`src/data`](src/data) —
you rarely need to touch components.

| File | What it controls |
| --- | --- |
| [`src/data/profile.ts`](src/data/profile.ts) | Name, title, bio, **email, WhatsApp number**, social links, hero copy, availability, asset paths, SEO. |
| [`src/data/projects.ts`](src/data/projects.ts) | Project cards + case studies. Set `liveUrl`/`repoUrl` only when a real link exists. |
| [`src/data/services.ts`](src/data/services.ts) | The four service cards. |
| [`src/data/pricing.ts`](src/data/pricing.ts) | Pricing packages + the pricing disclaimer. |
| [`src/data/skills.ts`](src/data/skills.ts) | Tech-stack groups (toggle `enabled` to hide). |
| [`src/data/process.ts`](src/data/process.ts) | The 5-step process timeline. |
| [`src/data/faqs.ts`](src/data/faqs.ts) | FAQ accordion. |
| [`src/data/expectations.ts`](src/data/expectations.ts) | "What You Can Expect" + **real testimonials** (empty by default). |
| [`src/data/videos.ts`](src/data/videos.ts) | "Work in Motion" items. |
| [`src/data/nav.ts`](src/data/nav.ts) | Nav links. |

### Contact details (already configured)

These are set to the real values in [`src/data/profile.ts`](src/data/profile.ts):

- WhatsApp / phone: `+91 73570 81980` → `https://wa.me/917357081980`
- GitHub: `https://github.com/Harshlakhara4`
- LinkedIn: `https://www.linkedin.com/in/harsh-lakhara-981b6b361/`

**Email is intentionally off.** `profile.email` is `null`, so every email CTA is
hidden and WhatsApp is the primary channel. Set a real address there to switch
email CTAs back on. Still worth updating before launch: `profile.siteUrl`
(currently `https://harshlakhara.dev`).

### Hero video (generated — already included)

`public/videos/hero-loop.mp4` is an **original** procedural animation (soft
drifting violet/blue glows, orbiting light trails, depth particles; no text, no
logos) rendered by [`scripts/generate_hero_video.py`](scripts/generate_hero_video.py).

- Specs: 1280×720, 24 fps, ~10 s, H.264 / yuv420p, **~410 KB**, seamless loop,
  composed to keep the left side dark for the headline.
- Poster `public/images/hero-poster.webp` is a frame from the same render.
- Re-render (edits colors/motion in the script):
  ```bash
  pip install numpy Pillow imageio imageio-ffmpeg   # one-time (Python deps only)
  python scripts/generate_hero_video.py
  ```
  `imageio-ffmpeg` bundles a static FFmpeg binary, so no system FFmpeg is needed.
  These are render-time deps only — they are **not** part of the web app bundle.

---

## Assets (all optional — graceful fallbacks everywhere)

Nothing breaks if these are missing; the UI falls back cleanly.

| Asset | Path | Fallback when missing |
| --- | --- | --- |
| Hero background video | `public/videos/hero-loop.mp4` *(generated, included)* | Animated gradient + poster. The hero checks the file **at render time**, so a missing video never 404s. Video is skipped on phones and under reduced-motion (poster shown instead). |
| Hero poster | `public/images/hero-poster.webp` *(generated, included)* | Gradient background. |
| Profile portrait | set `profile.profileImage` to e.g. `/images/profile.jpg` | Styled monogram panel. |
| Project covers | set `project.cover` per project | A tasteful abstract product-mockup preview (never a misleading stock photo). |
| Work-in-Motion videos | set each item's `src` in `videos.ts` | Animated preview card; the modal explains none is attached yet. |
| OG / social image | `public/images/og-image.svg` *(included)* | — |
| Favicon | `public/favicon.svg` *(included)* | — |

See [`public/videos/README.md`](public/videos/README.md) for encoding tips.

> Only use media you own or are licensed to use. Don't embed copyrighted
> promotional footage.

---

## Contact form & email delivery

The form (and the inquiry modal) post to [`src/app/api/contact/route.ts`](src/app/api/contact/route.ts).
Because email is off by default, **WhatsApp is the primary channel**: the form
has an always-visible WhatsApp button that opens a prefilled message, and the
inquiry modal prefills it with the selected service/package.

- **No email provider configured (default):** the API honestly returns
  `501 { configured: false }`. The UI then shows a **WhatsApp fallback** (and an
  email fallback only if `profile.email` is set) — it never fakes a "message
  sent" success.
- **With a provider:** set the env vars below and the route sends via
  [Resend](https://resend.com) (no SDK dependency — plain `fetch`).

Copy `.env.example` → `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=re_xxxxxxxx          # from resend.com
CONTACT_FROM_EMAIL=inquiries@your-verified-domain.com
CONTACT_TO_EMAIL=you@your-inbox.com
```

Secrets stay server-side (the route is `runtime = "nodejs"`); nothing sensitive
is exposed to the client. Spam protection: a honeypot field + server-side
validation.

To use a different provider (Nodemailer/SendGrid/etc.), swap the `fetch` call in
the route — the client contract (`{ ok, configured, error }`) is all it relies on.

---

## The inquiry flow

Project "View Case Study", service "Discuss This Service", and pricing
"Get a Custom Quote" buttons all open **one** shared inquiry modal
([`InquiryProvider`](src/components/providers/InquiryProvider.tsx)) with the
relevant service / package / project **preselected**. The modal lazy-loads, so
its code stays out of the initial bundle.

---

## Project structure

```
src/
  app/
    layout.tsx          # fonts, metadata, OG/Twitter, viewport
    page.tsx            # section composition (wrapped in InquiryProvider)
    globals.css         # design tokens + base styles
    robots.ts, sitemap.ts
    api/contact/route.ts
  components/
    layout/   Navbar, Footer
    sections/ Hero, Projects, VideoShowcase, About, Skills, Services,
              Process, Pricing, Testimonials, FAQ, Contact, FinalCTA
    projects/ ProjectCard, ProjectCaseStudy, ProjectVisual
    contact/  ContactForm, InquiryModal
    providers/InquiryProvider
    ui/       Button, Container, SectionHeading, Reveal, Modal
  data/                 # all editable content (see table above)
  lib/      utils.ts, assets.ts (server-only fs check)
public/     images/, videos/, favicon.svg
```

---

## Design & engineering notes

- **Palette / type:** defined once in [`tailwind.config.ts`](tailwind.config.ts)
  and `globals.css`. Fluid headings via `clamp()`; Space Grotesk (display),
  Inter (body), JetBrains Mono (labels), all via `next/font` (no layout shift).
- **Motion:** Framer Motion for entrances, scroll reveals, modal/accordion/
  timeline transitions. Every animation respects `prefers-reduced-motion`, and
  content is always visible regardless of whether animations run.
- **Accessibility:** semantic landmarks, skip link, visible focus rings, labelled
  form fields with inline validation, accessible dialogs (focus trap, Escape,
  backdrop close, scroll lock, focus restore) and an ARIA accordion.
- **Performance:** server components by default; the contact modal is
  code-split; `next/image` for raster images; posters-first video (video is only
  mounted when a showcase item is opened); minimal dependencies.
- **Honesty:** no invented testimonials, metrics, client names, or deployments.
  Project statuses are labelled truthfully; links only render when real.

---

## Current limitations / what to supply

- Update `profile.siteUrl` to your real domain (WhatsApp, phone, GitHub and
  LinkedIn are already set to real values).
- Hero video + poster are **generated and included**. Add project screenshots
  (`project.cover`) and a portrait (`profile.profileImage`) when ready — both
  optional; the site looks finished without them.
- Add real testimonials in `expectations.ts` to switch that section from
  "What You Can Expect" to a testimonials grid automatically.
- Optional: set `profile.email` + the Resend env vars to turn on email CTAs and
  server email delivery. Until then, WhatsApp is the contact channel.
