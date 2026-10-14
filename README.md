# Rachit Garg — software engineering portfolio

A production-oriented Next.js App Router portfolio that leads with shipped
professional work and uses independent AI products to show broader product and
full-stack engineering range. The interface stays server-rendered by default and
uses three small, purposeful GSAP islands only on the homepage.

## Run locally

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. For a production preview:

```sh
npm run check
npm run build
npm start -- --hostname 127.0.0.1 --port 3100
```

Then run the HTTP smoke suite in another PowerShell terminal:

```powershell
$env:PORTFOLIO_URL = 'http://127.0.0.1:3100'
npm run test:smoke
```

## Routes and information architecture

- `/`: quiet Hero → dark Production → Independent Products → Journey → About →
  dark Contact. Journey contains the Experience, Toolkit and Now anchors.
- `/resume`: a fast, print-friendly engineering overview with view and download
  actions for the supplied PDF.
- `/work/sringeri-net`: production modernization, content flow and Engineering Diff.
- `/work/asset-management-system`: role-aware workflow and state-driven UI rules.
- `/work/papertrail`: repository-verified RAG architecture, tradeoffs and demo.
- `/work/unstuck`: coaching behavior, AI interaction constraints and demo.

Unknown project slugs return a real 404. When `NEXT_PUBLIC_SITE_URL` is configured,
the sitemap includes the homepage, resume and all four static case-study routes.

## Content architecture

- `src/data/profile.ts` owns public positioning, email, location and profile links.
- `src/data/experience.ts` models employment separately from foundation/apprenticeship
  work and contains supporting proof links.
- `src/data/projects.ts` owns project facts, metrics, narrative fields, links and media.
- `src/data/toolkit.ts` owns the compact toolkit and current-direction content.
- `src/components/sections` contains homepage chapters. Static content remains in
  Server Components; the hero proof and two narrow project-motion wrappers are the
  only client islands.
- `src/components/projects` contains the shared case-study layout, Engineering Diff,
  project-specific system/workflow views and the isolated GSAP wrappers.
- `src/styles/home.css` contains homepage-only art direction so inverse chapters and
  timeline layouts do not affect the resume or case studies.

Project content stays separate from presentation so links, facts and metrics have one
source. Optional narrative fields render only when there is verified supporting
content; missing team details, adoption figures and decision history are not filled
with invented copy.

## Experience and project boundaries

The Journey chapter shows a chronological progression from Geekster foundation/apprenticeship,
to the Intentive SDE internship, to the current Leviosa production role. FigPro is
supporting apprenticeship evidence rather than a fifth equal-weight case study.

Sringeri and the Asset Management System use abstract system views and typography;
they contain no screenshots or private internal data. Sringeri links to its public
site. The AMS case explains frontend business-state rules without implying that UI
rules replace server-side authorization, and it uses only the supplied 30% and 25%
outcomes.

Papertrail architecture was checked against its public repository. The case study
covers workspace-scoped retrieval, signed uploads, citations, quotas, cleanup,
testing/CI and the current synchronous-processing tradeoff. unStuck's repository is
private, so its case study focuses on the supplied product intent and visible coaching
flow and shows a `Source private` note rather than a GitHub action.

## Resume and public contact policy

`public/resume/rachit-garg-resume.pdf` is an unchanged copy of the selected
`Rachit-resume-2026.pdf`; the site does not generate or rewrite the PDF. The `/resume`
route is an HTML overview drawn from verified portfolio data, with direct view and
download links and dedicated print CSS. It does not embed a large PDF viewer.

Public contact is intentionally limited to:

- Email: `rachitgarg56@gmail.com`
- LinkedIn: `https://linkedin.com/in/rachitgarg56`
- GitHub: `https://github.com/Rachitgarg56`
- Location: Bengaluru

There is no public phone number, WhatsApp, Instagram or contact form.

## Media and accessibility

Papertrail and unStuck recordings appear only on their case-study pages as native
`<video>` elements with `controls`, `playsInline`, `preload="none"` and poster images.
They do not autoplay and are absent from the homepage and critical render path. Each
video has a written screen walkthrough, but the walkthrough is explicitly not an
audio transcript.

The original Papertrail recording still contains a clideo.com watermark. Accurate
captions/transcripts and a clean recording remain deferred in `remainings.txt`.

Accessibility foundations include one main and h1 per page, a skip link, semantic
headings and lists, visible focus, 44px+ interactive targets, responsive navigation,
written alternatives beside media, and reduced-motion handling for the existing GSAP
interactions. Essential content is present in server HTML and remains readable without
JavaScript.

## Design and performance

The existing warm ivory, graphite, burnt-orange and semantic-green system is retained.
Graphite is used for the Production and Contact chapters, with a pale success green
reserved for verified improvements on those dark surfaces. Geist remains the only
bundled font. Professional proof stays ahead of independent products, and project
screenshots retain their own product identities.

Server Components remain the default. No dependency was added in this refinement.
GSAP remains confined to the homepage's hero proof switcher, Sringeri Engineering
Diff and AMS workflow progression; the production smoke suite checks that its runtime
does not reach case-study or resume routes. Videos use no preload, static images retain
explicit dimensions, and the supplied resume is served as a small static PDF.

## Public origin and deployment

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the final HTTP(S)
origin with no path, query, credentials or hash. Rebuild after setting it. With an
origin, routes emit canonical URLs, the sitemap is populated and robots permit
crawling. Without one, canonicals are omitted, the sitemap is empty and robots
disallow crawling. No domain has been invented and deployment is outside this task.

## Verification

On 2026-10-14:

- `npm run lint` passed with zero warnings.
- `npm run typecheck` passed, including Next route generation and strict TypeScript.
- `npm run build` passed. The first sandboxed attempt compiled but its worker was
  blocked by `spawn EPERM`; the same build completed with worker permission.
- All 18 production smoke tests passed against `http://127.0.0.1:3100`.
- The suite verifies routes, metadata/social images, internal links and fragments,
  404s, assets, sitemap policy, verified metrics, confidentiality boundaries, contact
  and experience content, FigPro, resume/PDF delivery, native media behavior and GSAP
  isolation.
- Headless Chrome 153 rendered the production homepage at 320px, 390px, 768px,
  1024px, 1280px and 1440px. Each chapter and the project-specific visual systems
  were inspected; every measured view reported `scrollWidth === clientWidth`.
- A 720 CSS-pixel layout at 2x device scale was inspected as a 200% layout simulation.
  Chrome reported no console warnings, runtime exceptions or hydration errors.
- axe-core reported zero violations on the homepage, resume and all four case-study
  routes after correcting the global home-link accessible name.
- Automated browser checks verified HeroProof mouse/focus switching, stable proof
  height, one-time AMS playback, reduced-motion rendering and live preference changes,
  and complete JavaScript-disabled diff/workflow content.
- A throttled mobile browser profile (150ms latency, 1.6Mbps down, 4x CPU) measured a
  1.3s FCP/LCP and zero CLS after the optimized portrait response was cached by the
  local production image pipeline. No video request entered the homepage load.
- The homepage script graph is 212,954 gzip bytes, 117 bytes above the prior two-GSAP
  refinement baseline. Case-study bundles remain unchanged and contain no GSAP.

An interactive browser surface was unavailable, so manual keyboard/focus testing,
native 200% browser zoom, real-device touch and Lighthouse remain incomplete and are
recorded in `remainings.txt`. Passing build, HTTP and headless rendering checks does
not replace those checks before publication.
