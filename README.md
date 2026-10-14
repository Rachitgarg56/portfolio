# Rachit Garg — frontend / product engineering portfolio

A local Next.js App Router portfolio with a homepage and four statically generated
project pages. Professional work leads; independent products show complementary
product and AI engineering work. Nothing has been publicly deployed.

## Start the project

Use Node.js 22 or newer. From the project directory:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production preview:

```sh
npm run check
npm run build
npm start -- --hostname 127.0.0.1 --port 3100
```

Open http://127.0.0.1:3100. In a second PowerShell terminal:

```powershell
$env:PORTFOLIO_URL = 'http://127.0.0.1:3100'
npm run test:smoke
```

`npm run check` runs ESLint with zero tolerated warnings, Next route-type
generation and strict TypeScript. The smoke suite uses Node's built-in runner
against the production server; it does not install browser/test dependencies.

## Structure and editing

- `src/data/profile.ts`: identity, positioning and supplied public profiles.
- `src/data/experience.ts`: supplied employers, roles and dates, with no inferred
  mapping between employers and projects.
- `src/data/projects.ts`: the four typed project records, professional/independent
  grouping, contributions, verified technologies, optional comparisons, live/source/
  article links and media descriptions. Numeric results are not required for a
  personal project. Keep approximate results qualified.
- `src/components/sections`: hero with a project index, production work, independent
  products, experience and about. Content is visible without expanding anything.
- `src/components/projects`: shared case study, explicit Before/After comparisons,
  project links and static retrieval/coaching flow illustrations.
- `src/components/layout`: page container, labelled section, shared header/footer.
- `src/app/work/[slug]`: static project pages and per-project social images. Unknown
  slugs return 404. Adding verified project data also updates the sitemap and routes.
- `src/styles`: shared tokens, responsive composition and the licensed local Geist
  font. `src/lib` holds origin configuration and social-image generation.
- `public/images` and `public/media`: real frames and original supplied recordings.
- `tests/smoke.test.mjs`: production HTTP, navigation, metadata and asset verification.

The five content routes are `/`, `/work/sringeri-net`,
`/work/asset-management-system`, `/work/papertrail` and `/work/unstuck`.

## Content evidence and boundaries

Professional contributions, historical figures, employer names and dates are
supplied by Rachit. No team composition or undocumented decision history is added.
Frontend editing rules are distinguished from backend authorization.

Papertrail's implementation was inspected in the public
[support-agent repository](https://github.com/Rachitgarg56/support-agent) on
2026-10-07, including ingestion/retrieval routes, SQL, cleanup, UI, tests and CI.
Rationale and lessons also come from Rachit's
[Papertrail build story](https://medium.com/@rachitgarg56/building-papertrail-a-production-minded-rag-document-q-a-app-e3f799b0ace3),
read through his public Medium feed. The repository is authoritative for current
implementation; the supplied video is explicitly presented as a recording, not
proof of the current deployed version. Test files were inspected, not executed as
part of this portfolio's verification. No adoption or retrieval-quality scores are
claimed.

unStuck's story comes from Rachit's supplied product intent and the visible launch
walkthrough. Its source is private/inaccessible publicly, so no stack, architecture,
automated enforcement guarantees or unverified implementation details are claimed.
The live product is linked; the inaccessible GitHub URL is not a public CTA.

No contact address, LinkedIn or resume was provided. Those actions remain omitted.
GitHub and Medium profile links now use the supplied project author identities.
There is no empty blog, experiment listing or unStuck article placeholder.

## Design and performance

The introduction leads with Rachit's name, role and product focus. A small project
index makes all four stories discoverable. Professional outcomes stay next to the
work they describe, rather than being repeated in a separate metrics section.
Papertrail's wide workspace preview and unStuck's portrait walkthrough have
different compositions and preserve their original aspect ratios.

The hero uses a recruiter-focused 60/40 composition: positioning, evidence and the
primary action lead on the left, while Rachit's updated portrait provides a restrained
supporting presence on the right. On smaller screens the complete engineering message
and action appear before the portrait. The project index sits in its own row below the
main hero. The 5472×3648 source was resized to 2400px wide and encoded as an 84-quality
WebP (151,070 bytes); the original Downloads file is untouched. `next/image` supplies
intrinsic dimensions and responsive formats. Because the portrait is visible in the
initial hero, it loads eagerly with high fetch priority; project screenshots remain
lazy loaded. The portrait is static and is not added to the GSAP choreography.

Warm ivory, graphite, neutral panels and a restrained burnt-orange accent frame
the projects. Green is reserved for improved metrics and successful outcomes;
product screenshots retain their original colors. Geist remains the only font (29,400-byte WOFF2,
`next/font/local`, swap). System monospace is used for labels. Fluid type, a 4px
spacing base, a 76rem container, visible dividers and bounded reading widths are
defined in shared tokens/styles. Supporting text is 15px, technology labels and
captions 14px, and uppercase section labels 13px. Body text remains at least 16px.
Metadata colors are mirrored in `src/lib/brand.ts` because generated social images
cannot read page CSS.

Server Components remain the default. Two small homepage boundaries use GSAP
3.15.0 and the official `@gsap/react` 2.1.2 integration:

- `hero-proof.tsx`: four native buttons change a supporting proof line. Fine-pointer
  hover, focus and click/tap share one selection. The initial Performance proof is
  server-rendered; buttons enable after hydration. Grid-stacked panels reserve the
  longest proof's height. Only the selected proof moves 4px over 200ms, with a polite
  live region and no hero entrance animation.
- `diff-motion.tsx`: receives the server-rendered `sringeri-diff.tsx` through a
  children slot. A native IntersectionObserver watches the heading, then runs one
  650ms arrow/result/note sequence per mount. Values are always readable. Delayed
  animations are recorded in both scoped component and media contexts; observers
  disconnect and inline styles revert during teardown or preference changes.

Reduced-motion users see final states immediately. Changes to that preference
cancel in-flight animation without replaying the current proof or diff. Rapid
keyword changes revert superseded motion. Case studies retain their static diffs.
Shared links back to the homepage disable route prefetch so they do not pull the
animation runtime onto case-study visits speculatively. There is no ScrollTrigger,
smooth-scroll layer, second animation library, analytics or new media widget.

Real WebP previews use `next/image`, explicit dimensions, responsive sizes and
native lazy loading. Videos are ordinary links, not embedded players or preloads:
the MP4 bytes are fetched only when the visitor opens the recording. No autoplay,
third-party iframe or consent-dependent media service is introduced.

Accessibility foundations include one main and h1 per page, a skip link, semantic
headings, visible focus (including light focus on dark media), generous interactive
targets, wrapped mobile navigation and reduced-motion CSS. Essential narratives,
links and figures are server HTML. Browser verification remains necessary.

## Media provenance and remaining preparation

The supplied originals are copied unchanged:

- `paper-trail.mp4` → `public/media/papertrail-demo.mp4`: 66.34 seconds,
  1906×898, 4,228,946 bytes, with its original audio.
- `unstuck-launch.mp4` → `public/media/unstuck-demo.mp4`: 71.90 seconds,
  1080×1350, 10,069,515 bytes, with its original narration.

The WebP previews are full frames at 65 seconds (Papertrail) and 24 seconds
(unStuck), encoded at quality 85. No UI elements were fabricated or watermarks
removed. Source files under the user's Videos folder are untouched. FFmpeg was an
existing local inspection tool; it is not a project build or runtime dependency.

Papertrail's supplied recording contains a clideo.com watermark. Replace it and
its preview with a clean original when available. The narration has not been
transcribed or verified. On-page walkthroughs describe visible screens and are
explicitly not audio transcripts. Accurate captions/transcripts remain required
before treating the optional recordings as fully accessible media. Do not invent
subtitles from the product narrative. An inline narrated player should wait for
those captions; the current links preserve access to the supplied originals.

## Origin and future deployment

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the real
HTTP(S) origin, without a path, query, credentials or hash. Rebuild after changes.
The same setting must be present when running the smoke suite (which loads
`.env.local` if available).

With an origin, each page emits its canonical URL, the sitemap lists all five
pages, and robots.txt permits crawling. Without one, canonicals are omitted, the
sitemap is empty, and robots.txt disallows crawling. Next may warn about the local
metadataBase default; no public domain has been invented.

A Node-compatible Next.js host can run `npm run build` followed by `npm start`.
No CMS, database or API credentials are needed. Deploying is a separate task.

## Verification and handoff

The production smoke suite checks all five pages, unique route metadata/social
images, landmarks, headings, IDs, fragment targets, internal destinations, asset
responses, 404s, canonical/sitemap policy and the supplied professional figures.
It also checks personal-project live/source/article links, private source handling,
absence of fabricated numeric outcomes, image dimensions/lazy loading and MP4
range responses for seeking. Refinement checks cover the server-rendered hero
controls, four Sringeri transformations, employer/date content and GSAP isolation
from all four case-study script graphs. It does not test either product's backend.

Current implementation checks and measured results are recorded in
`artifacts/verification.txt` during local verification (ignored from version
control). On 2026-10-08, lint, strict TypeScript and the production build passed.
All eleven production smoke tests passed against port 3100 with no public origin
configured. To accommodate the environment's child-process restriction, the same
suite runs inside the sandbox without a separate worker using:

```powershell
$env:PORTFOLIO_URL = 'http://127.0.0.1:3100'
node --env-file-if-exists=.env.local tests/smoke.test.mjs
```

New palette text contrast checks ranged from 5.08:1 to 14.68:1. The two full-frame
WebP source images total 146,838 bytes before responsive optimization. These are
asset/contrast measurements, not a browser performance or accessibility audit.

Initial script sizes, measured by summing gzip-compressed script files referenced
by production HTML, changed from 184,295 to 212,837 bytes on the homepage: an
increase of 28,542 bytes. Direct Sringeri and Papertrail loads remain 184,295 bytes;
the smoke suite verifies that no case-study script graph contains GSAP. This is a
bundle-size comparison, not a measured network waterfall or Lighthouse score.
Baseline and final inventories are in the ignored `artifacts/refinement-*.json`
files. Shared home links have prefetch disabled to avoid speculative GSAP loading.

Browser and native Computer Use connections are unavailable in this
environment. These checks therefore remain **incomplete**:

- Rendered visual review at 320px, 390px, 768px and desktop; 200% zoom and wrapping.
- Keyboard order, skip-link focus, fragment navigation and visible focus in use.
- Keyword hover/focus/tap, rapid switching, live announcements and proof height.
- JavaScript-disabled and reduced-motion browser behavior, including preference
  changes during a timeline, one-time diff playback and route-remount cleanup.
- Browser console errors and hydration warnings (build/server checks do not cover these).
- Browser accessibility audit and mobile Lighthouse against the production build.
- Caption/transcript review and native playback of the optional recorded demos.

Passing HTTP/build checks does not establish visual quality or publish readiness.
No Lighthouse or field Core Web Vitals result is claimed. Review the actual pages
in a connected browser before publishing.

## Dependency choices

Existing versions are preserved. Only `gsap` and `@gsap/react` were added, with exact
versions and an updated lockfile. The installed Next lint plugins support ESLint 9;
do not force an incompatible major upgrade. Dependency security status should be
checked separately before deployment; this implementation does not claim a fresh
registry audit.
