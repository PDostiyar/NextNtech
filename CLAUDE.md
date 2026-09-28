# NextNTech.org — Project Context for Claude Code

## Mission
NextNTech.org is a free, non-profit, ad-free coding education platform for kids and
young people. Tagline: "What's next in technology — for you and your kids."
Principle: no payment, subscription, or paywall ever stands between a learner and a lesson.

## Reference material (read before building anything)
- docs/nextntech-demo-v3-1.jsx — the APPROVED DESIGN. Match its look, layout, colors,
  components, copy, and interactions closely. It is a single-file prototype; re-implement
  it as a properly structured Next.js app, do not copy it as one file.
- docs/NextNTech-Complete-Project-Package.md — product spec, features, roadmap
- docs/NextNTech-Architecture-and-Setup-Guide.md — schema and API baseline
- docs/NextNTech-Curriculum-Outline.md — all six courses and their modules
- docs/BUILD-PHASES.md — the six phase prompts; build one phase at a time

Where this CLAUDE.md and the docs disagree, THIS FILE WINS (it contains later decisions).

## Repository
- GitHub repo already exists: PDostiyar/NextNtech. Do not create a new repo; push to it.

## Tech stack (decided)
- Next.js 15, App Router, TypeScript (strict), React Server Components by default
- Tailwind CSS v4 with design tokens from the demo (see Design System below)
- PostgreSQL + Prisma ORM. Local: Docker Compose. Hosted: Neon or Supabase Postgres
- Auth.js v5 (next-auth) with Prisma adapter. Providers: Google, Facebook, LinkedIn,
  Microsoft Entra ID (personal + work accounts, covers Outlook/Hotmail), and
  email + password (Credentials, bcrypt). Database sessions where possible.
- next-intl for i18n: locales en (default), fa (Dari), ps (Pashto); fa/ps are RTL
- CodeMirror 6 (@uiw/react-codemirror) for all code editors
- Pyodide (real Python in the browser, lazy-loaded) for Python playgrounds
- sql.js (SQLite in WebAssembly) for SQL playgrounds
- pdf-lib for certificates
- Resend for transactional email (verification, parental consent)
- Zod for all input validation; Vitest for unit tests; Playwright for end-to-end tests
- Content management: built into the app as an admin area at /admin
  (lessons stored in Postgres). Do NOT add a separate Strapi server — one deployable
  app is simpler to host and maintain. Keep the content model clean so a headless
  CMS could be added later if needed.

## Design system (from the demo — keep exactly)
Colors:
  ink #0E2258 · lapis #16337F · lapisSoft #2A4BAE · saffron #F5A524 · turquoise #2EC4B6
  paper #F4F6FB · line #DDE3F0 · body text #3A4666 · green #2E933C · red #D64545
Course colors:
  frontend #2EC4B6 · backend #2A4BAE · fullstack #F5A524 · python #7C5CD6
  mobile #E4572E · career #2E933C
Logo: eight-pointed star SVG (polygon points in demo's Star8) + wordmark
  "NextN" (white) "Tech" (saffron) ".org" (turquoise)
Fonts: Nunito Sans for Latin; Vazirmatn for Dari/Pashto (via next/font)
Rules:
- Each course's color flows into its course page, module cards, lesson borders,
  buttons, playground frame, video player, and completion stars
- Course cards tint (color at ~8% opacity) and lift on hover; the selected/last-opened
  course shows a filled tint (~13%) and a ✓ badge
- Rounded corners 12–16px, generous padding, friendly and kid-appropriate
- Mobile-first; every page must work well at 375px width
- Use CSS logical properties (ms-, me-, ps-, pe-, start-, end-) everywhere so RTL
  works automatically. Never hard-code left/right.

## Core product rules
- All courses and modules are open in ANY order. No forced sequence, no locks.
- Every lesson = text + visuals + video button + audio (woman/man voice) +
  practice playground + 3–5 quiz questions.
- Quiz grading happens ON THE SERVER. Never send correct answers to the client before
  the learner answers. The answer endpoint returns correct/incorrect + explanation.
- Every answer is saved to the learner's history. Progress, streaks, and daily goal
  update from saved data.
- Guests can read lessons and use playgrounds; saving progress requires an account.
- Certificate is issued automatically when all published lessons in a course are
  completed; it has a public verification page.

## Child safety & privacy (non-negotiable — learners may be minors)
- Signup asks for birth year. Under 13: email signup only (social providers require
  13+), a parent/guardian email is required, and the account stays limited
  (no progress saving, no certificate name display) until the parent clicks a
  consent link. Build this flow fully.
- Collect minimum data: name, email, birth year, locale, progress. Nothing else.
- No third-party trackers, no ads. Analytics only via a cookieless tool (Plausible or
  Umami), behind an env flag.
- No user-to-user messaging or public profiles in v1.
- Playground iframes: sandbox="allow-scripts" ONLY (never allow-same-origin).
- Rate-limit auth and answer endpoints.

## Engineering conventions
- Structure: app/[locale]/... for pages, app/api/... for routes, lib/ for server logic,
  components/ for UI, content/ for seed lesson content, prisma/ for schema and seed.
- Server Actions or route handlers with Zod validation; never trust client input.
- Role check (LEARNER | ADMIN) on every admin route and action, server-side.
- Secrets only in env vars. Maintain .env.example with every variable documented.
- Write tests for grading, streak calculation, certificate eligibility, and the
  under-13 consent flow.
- After each phase: run lint, typecheck, and tests; fix everything; update README.md;
  commit with a clear message; push to GitHub.
- Ask me before: adding a paid service, changing the stack, or deleting data/migrations.
