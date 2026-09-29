# ✴️ NextNTech.org

**What's next in technology — for you and your kids.** NextNTech.org is a free,
non-profit, ad-free coding school for kids and young people, in **English, Dari (دری) and
Pashto (پښتو)**. Learners pick any of six courses (front-end, back-end, full-stack, Python,
mobile apps, careers) and learn through short visual lessons, hands-on practice and quick
quizzes. It's built for families everywhere — including Afghan families at home and in the
diaspora who read Dari or Pashto first — and is open to community contributors.

| Environment | URL                                                                      | Git branch | Hosting                                          |
| ----------- | ------------------------------------------------------------------------ | ---------- | ------------------------------------------------ |
| Production  | https://nextntech.org                                                    | `main`     | cPanel → Node.js app (AI App Hosting)            |
| Staging     | https://stage.nextntech.org                                              | `staging`  | cPanel → Node.js app (AI App Hosting)            |
| Repo        | [github.com/PDostiyar/NextNtech](https://github.com/PDostiyar/NextNtech) | –          | **public** · MIT license · contributions welcome |

> The hosted sites are not live yet — see [§5 Deploying](#5-deploying-hosting) and
> [§14 Production notes](#14-production-notes).

### Overview

![NextNTech.org home page](docs/screenshots/home.jpg)

**What visitors can do today:** browse all six courses, open any course in any order, read
the 14 written lessons (with diagrams and code samples), switch the whole site between
English, Dari and Pashto (right-to-left), and invite friends with ready-made share
messages for X, LinkedIn, Facebook and Instagram. Coming next: live code playgrounds,
video, audio narration, server-graded quizzes, accounts, progress, streaks and
certificates.

| Courses                                          | Course page                                             | Lesson                                      |
| ------------------------------------------------ | ------------------------------------------------------- | ------------------------------------------- |
| ![All courses](docs/screenshots/courses.jpg)     | ![Back-End course](docs/screenshots/course.jpg)         | ![HTML lesson](docs/screenshots/lesson.jpg) |
| **Dari (RTL)**                                   | **Pashto (RTL)**                                        | **About**                                   |
| ![Home in Dari](docs/screenshots/home-dari.jpg)  | ![Course in Pashto](docs/screenshots/course-pashto.jpg) | ![About](docs/screenshots/about.jpg)        |
| **Mobile**                                       | **Mobile, Dari**                                        | **Dark mode**                               |
| ![Mobile home](docs/screenshots/mobile-home.jpg) | ![Mobile Dari course](docs/screenshots/mobile-dari.jpg) | Not used                                    |

#### Why we're building this

> **Every kid deserves to become a technology geek.** No payment, no subscription, and no
> paywall should ever stand between a curious young mind and learning to build the future.

Most good coding courses sit behind a paywall, are only in English, or are full of ads and
trackers. NextNTech.org is the education arm of the **#NextNTech** channels (YouTube,
Facebook, TikTok):

- **Free forever.** Every course, quiz and certificate. No ads, no upsells.
- **Made for kids.** Short lessons, friendly visuals, hands-on practice, instant feedback.
- **In their language.** Full right-to-left support for Dari and Pashto.
- **Safe by design.** Minimal data, parental consent for under-13s, no trackers, no
  messaging between users.
- **Start anywhere.** No locked order — jump straight into Back-End if you like.

#### What learners get

|     | Course                        | What you learn                                               |
| --- | ----------------------------- | ------------------------------------------------------------ |
| 🎨  | **Front-End Development**     | HTML, CSS, JavaScript, React                                 |
| ⚙️  | **Back-End Development**      | Node.js, Express, SQL, PHP & Laravel, WordPress              |
| 🚀  | **Full-Stack Development**    | Connecting front and back, logins, deploying, a capstone     |
| 🐍  | **Python: Basic to Advanced** | From `print()` to Flask, APIs and data                       |
| 📱  | **Mobile Apps**               | React Native, Swift & iOS, publishing to app stores          |
| 💼  | **Careers & Side Hustles**    | Portfolios, Fiverr/Upwork, remote jobs, working with clients |

Every lesson: 📖 read → 🎬🔊 watch & listen (woman's or man's voice) → 🧪 practice in a
live playground → ✅ answer 3–5 quiz questions → 🏅 streaks, daily goals and a named
certificate per course. Full plan: [`docs/NextNTech-Curriculum-Outline.md`](docs/NextNTech-Curriculum-Outline.md).

#### Project status

Built in six phases ([`docs/BUILD-PHASES.md`](docs/BUILD-PHASES.md)):

| Phase | What                                                                       | Status  |
| ----- | -------------------------------------------------------------------------- | ------- |
| 1     | Foundation: design system, 3 languages + RTL, database, course pages       | ✅ Done |
| 2     | Lessons: playgrounds, video, audio, server-graded quizzes, streaks         | 🔜 Next |
| 3     | Accounts: social + email login, under-13 parental consent                  | ⏳      |
| 4     | Dashboard, PDF certificates with public verification, invite sharing       | ⏳      |
| 5     | Admin area: edit courses, lessons, quizzes and translations in the browser | ⏳      |
| 6     | Accessibility, SEO, legal pages, deployment polish                         | ⏳      |

Today: 6 courses, 24 modules, **14 fully written lessons** (at least two per course); the
other modules show "Coming soon".

## Table of contents

1. [Workflow: staging → production](#1-workflow-staging--production)
2. [Tech stack](#2-tech-stack)
3. [Run it locally](#3-run-it-locally)
4. [Configuration and secrets](#4-configuration-and-secrets)
5. [Deploying (hosting)](#5-deploying-hosting)
6. [Preview in GitHub Codespaces](#6-preview-in-github-codespaces)
7. [How the application works](#7-how-the-application-works)
8. [Pages, sections and design](#8-pages-sections-and-design)
9. [Project structure](#9-project-structure)
10. [Making changes manually](#10-making-changes-manually)
11. [Making changes with AI](#11-making-changes-with-ai)
12. [Database](#12-database)
13. [Testing checklist](#13-testing-checklist)
14. [Production notes](#14-production-notes)
15. [Troubleshooting](#15-troubleshooting)
16. [Feature log](#16-feature-log)

## 1. Workflow: staging → production

```text
 AI chat (Claude Code), a contributor's      GitHub Codespaces (quick preview /
 pull request, or a manual edit              review only)
            │                                      │
            ▼                                      ▼
   ┌───────────────── GitHub branch: staging ─────────────────┐
   └───────────────────────────┬────────────────────────────┘
                               │ deploy (pull + build)
                               ▼
        STAGING site: https://stage.nextntech.org
        staging database · test keys
                               │  owner reviews and approves
                               ▼
          GitHub Pull Request: staging → main  (CI must be green)
                               │ merge
                               ▼
   ┌───────────────── GitHub branch: main ──────────────────┐
   └───────────────────────────┬────────────────────────────┘
                               │ deploy (pull + build)
                               ▼
        PRODUCTION site: https://nextntech.org
        production database · live keys
```

Notes for this repo:

- The working branch is **`staging`** — the default branch; every change lands there
  first. The staging _website_ is `stage.nextntech.org` (workflow naming rule).
- **`main`** only changes by merging a reviewed pull request from `staging`, with green CI.
  After each release, `staging` is fast-forwarded to `main`.
- **Community contributors** fork the repo and open pull requests into `staging` — see
  [CONTRIBUTING.md](CONTRIBUTING.md).
- Staging and production each have their **own database and credentials**. Staging never
  uses production data.
- The full workflow rules are in [`docs/AI-WORKFLOW-PROMPT.md`](docs/AI-WORKFLOW-PROMPT.md).

## 2. Tech stack

| Layer     | Choice                                                                               | Version                   |
| --------- | ------------------------------------------------------------------------------------ | ------------------------- |
| Framework | [Next.js](https://nextjs.org) App Router, React Server Components                    | 15.5                      |
| Frontend  | React · TypeScript (strict) · [Tailwind CSS](https://tailwindcss.com)                | 19 · 5 · 4                |
| i18n      | [next-intl](https://next-intl.dev) — `en`, `fa` (Dari), `ps` (Pashto); RTL for fa/ps | 4                         |
| Backend   | Next.js server (Node.js) — server components now; server actions from Phase 2        | Node 20+ (22 recommended) |
| Data      | PostgreSQL + [Prisma](https://www.prisma.io) ORM · Zod validation                    | 16 · 6 · 4                |
| Auth      | Not used yet — Auth.js v5 in Phase 3                                                 | –                         |
| Tests     | Vitest (unit) · Playwright (browser, from Phase 2)                                   | 3                         |
| Quality   | ESLint · Prettier (with Tailwind class sorting)                                      | 9 · 3                     |
| CI        | GitHub Actions — [`.github/workflows/ci.yml`](.github/workflows/ci.yml)              | –                         |
| Coming    | CodeMirror 6, Pyodide, sql.js, pdf-lib, Resend                                       | –                         |

It's **one deployable app** — no separate CMS server. Lessons live in PostgreSQL and will
be edited through a built-in admin area (Phase 5).

### Architecture: frontend and backend

```mermaid
flowchart LR
  B["Browser<br/>(learner, any device)"] -- "HTTPS: pages in en / fa / ps" --> M["Middleware<br/>next-intl locale routing"]
  M --> S["Next.js server<br/>React Server Components"]
  S -- "Prisma queries (never quiz answers)" --> DB[("PostgreSQL")]
  S -- "HTML + small client JS" --> B
  B -. "share links (opens new tab)" .-> SN["X · LinkedIn · Facebook"]
```

- **Frontend:** server-rendered pages; only interactive parts (nav, language switcher,
  share dialog, course highlight) run in the browser.
- **Backend:** the same Next.js process reads courses and lessons from PostgreSQL through
  Prisma. Quiz answers (`answerIdx`) are never sent to the browser.
- **External services:** none today. Later phases add login providers, email (Resend)
  and file storage — each documented here when added.

### Data structure (hierarchy and keys)

```text
Course (slug★, key★ frontend|backend|fullstack|python|mobile|career, title, summary, emoji, color, order)
└── Module (slug — unique per course, title, order)
    └── Lesson (slug★, title, order, published,
    │           body: LessonBlock[], playground: {type,title,hint,starter?,phone?}?,
    │           videoUrl?, audioWomanUrl?, audioManUrl?)
        ├── LessonTranslation (locale★ per lesson: fa|ps, title, body, videoUrl?)
        └── QuizQuestion (order, prompt, options: string[], answerIdx 🔒 server-only, explain)
            └── QuizQuestionTranslation (locale★ per question, prompt, options, explain)

User (email★, name?, role LEARNER|ADMIN, birthYear?, preferredLocale, preferredVoice,
│     parentEmail?, parentConsentAt?)
├── Account / Session            (Auth.js tables — used from Phase 3)
├── QuizAnswer (question, selectedIdx, isCorrect, answeredAt)
├── Progress (lesson★ per user, status STARTED|COMPLETED, score?, completedOn = learner's local date)
├── Streak (current, longest, dailyGoal 1–5, lastActiveOn)
└── Certificate (course★ per user, verifyCode★, pdfUrl?, issuedAt)

★ = unique key
LessonBlock = { type: "paragraph" | "heading", text }
            | { type: "code", language, code }
            | { type: "callout", tone: "info" | "tip" | "warning", text }
            | { type: "visual", name: WebTrio | TagAnatomy | BoxModel | ClientServer | TableVisual, props? }
```

Source of truth: [`prisma/schema.prisma`](prisma/schema.prisma) and
[`lib/lesson-blocks.ts`](lib/lesson-blocks.ts). No public API routes yet (Phase 2 adds the
quiz-answer server action).

### Folder overview

| Folder           | What's in it                                                                     |
| ---------------- | -------------------------------------------------------------------------------- |
| `app/`           | Pages and layouts (`app/[locale]/…`), global CSS and design tokens               |
| `components/`    | UI building blocks, layout (nav, footer, share), lesson visuals                  |
| `content/`       | Course and lesson content that the seed loads into the database                  |
| `i18n/`          | Language routing and message loading                                             |
| `lib/`           | Server code: database client, content queries, lesson format                     |
| `messages/`      | Interface text in English, Dari and Pashto                                       |
| `prisma/`        | Database schema, migrations and seed script                                      |
| `tests/`         | Unit tests                                                                       |
| `docs/`          | Product spec, curriculum, build phases, deployment, screenshots, approved design |
| `.devcontainer/` | GitHub Codespaces setup                                                          |
| `.github/`       | CI workflow, issue and pull request templates                                    |

Full tree: [§9](#9-project-structure).

## 3. Run it locally

**Prerequisites:** Node.js 20+ (22 recommended), Git, and Docker Desktop (or your own
PostgreSQL 16).

```bash
git clone https://github.com/PDostiyar/NextNtech.git
cd NextNtech
git checkout staging                 # all work starts from staging

npm install                        # installs packages and generates the Prisma client
cp .env.example .env               # then set the two values below
docker compose up -d               # starts PostgreSQL on localhost:5432
npx prisma migrate dev             # creates the tables
npx prisma db seed                 # loads the courses and lessons
npm run dev                        # http://localhost:3000
```

In `.env`, for the local Docker database:

```bash
DATABASE_URL=postgresql://nextntech:nextntech@localhost:5432/nextntech?schema=public
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

(These are throwaway local-only credentials from `docker-compose.yml`.) Open
http://localhost:3000 — it redirects to `/en`. Try `/fa` and `/ps`.

| Command                           | What it does                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------ |
| `npm run dev`                     | Development server with hot reload                                             |
| `npm run lint`                    | ESLint                                                                         |
| `npm run typecheck`               | TypeScript check                                                               |
| `npm test`                        | Unit tests (Vitest)                                                            |
| `npm run format` / `format:check` | Format with Prettier / check formatting                                        |
| `npm run build`                   | Production build                                                               |
| `npm start`                       | Serve the production build (`next start`)                                      |
| `npm run start:server`            | Serve the production build via `server.js` (the cPanel/Passenger startup file) |
| `npm run db:migrate`              | Create/apply a migration in development (`prisma migrate dev`)                 |
| `npm run db:seed`                 | Load or refresh course content from `content/` (safe to re-run)                |
| `npm run db:studio`               | Browse the database in your browser                                            |

## 4. Configuration and secrets

**This repository is public.** Never commit `.env`, passwords, keys, tokens, server paths
or account names. [`.env.example`](.env.example) lists every variable with **empty**
values; `.gitignore` excludes every other `.env*` file.

| Variable               | Purpose                                                                     | Secret? | Where it's set                                                                             |
| ---------------------- | --------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------ |
| `DATABASE_URL`         | PostgreSQL connection string                                                | **Yes** | cPanel app env vars (per environment) · local `.env` · Codespaces/CI set a throwaway value |
| `NEXT_PUBLIC_SITE_URL` | Public address of this copy (share links, metadata). Baked in at build time | No      | cPanel app env vars · local `.env`                                                         |

Planned for later phases (listed empty in `.env.example`, not used yet): `AUTH_SECRET`,
`AUTH_GOOGLE_ID`/`_SECRET`, `AUTH_FACEBOOK_ID`/`_SECRET`, `AUTH_LINKEDIN_ID`/`_SECRET`,
`AUTH_MICROSOFT_ENTRA_ID_ID`/`_SECRET`/`_ISSUER`, `RESEND_API_KEY` (Phase 3),
`BLOB_READ_WRITE_TOKEN` (Phase 4).

| Environment | `NEXT_PUBLIC_SITE_URL`        | Database                     |
| ----------- | ----------------------------- | ---------------------------- |
| Local       | `http://localhost:3000`       | Docker (throwaway)           |
| Staging     | `https://stage.nextntech.org` | its own cPanel PostgreSQL DB |
| Production  | `https://nextntech.org`       | its own cPanel PostgreSQL DB |

## 5. Deploying (hosting)

NextNTech is a **Node.js app with a PostgreSQL database**. On cPanel use **AI App Hosting
(Deploy Node.js apps from Git)** — not WordPress, Sitejet or "Custom Code". Step-by-step
detail, screenshots of the choices and alternatives (classic Passenger, Vercel + Neon) are
in **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**.

**One-time setup (do staging first, then production):**

1. **Subdomain:** cPanel → **Domains → Create A New Domain** → `stage.nextntech.org`.
   Production uses `nextntech.org`.
2. **HTTPS:** cPanel → **SSL/TLS Status → Run AutoSSL** for both.
3. **Databases:** cPanel → **PostgreSQL Database Wizard** — one database and one user
   (strong generated password, **ALL PRIVILEGES**) per environment, e.g. `…_nnt_staging`
   and `…_nnt_prod`. Choose PostgreSQL, not MariaDB.
4. **App:** cPanel → **AI App Hosting** → pick the domain → connect GitHub repo
   `PDostiyar/NextNtech` → branch **`staging`** (staging) or **`main`** (production):
   - Node.js: **22** (or 20)
   - Install: `npm ci`
   - Build: `npx prisma migrate deploy && npm run build`
   - Start: `npm start` — or startup file **`server.js`** if it asks for a file
   - Env vars: `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL` (see §4)
5. **Load the courses once:** in the app's terminal, `npx prisma db seed`.

The repo is public, so cPanel can clone it over HTTPS without a deploy key. (If the repo
ever becomes private, add a read-only deploy key — see the workflow doc §4.1.)

**Updating after a merge:** press **Redeploy** in AI App Hosting (or Git Version Control →
**Update from Remote**, then `npm ci && npx prisma migrate deploy && npm run build` in the
app's environment, then **Restart**). Deploy `staging` first, check
`stage.nextntech.org`, then merge `staging` → `main` and deploy production.

**Before a production deploy that changes the database:** back up first —
`pg_dump "$DATABASE_URL" > backup-$(date +%F).sql` in the cPanel terminal, or cPanel →
**Backup** → download the PostgreSQL database.

**Rollback:**

1. **Code:** on GitHub, open the release pull request → **Revert** → merge the revert into
   `main` (and `staging`), then redeploy. Or in AI App Hosting redeploy the previous commit
   if your host offers it.
2. **Database:** Prisma migrations only move forward. If a migration broke data, restore
   the backup: `psql "$DATABASE_URL" < backup-YYYY-MM-DD.sql` (ask before doing this on
   production — it replaces data).

## 6. Preview in GitHub Codespaces

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/PDostiyar/NextNtech?ref=staging)

A second, temporary way to see the site — no install, no hosting:

1. Click the button (or **Code → Codespaces → Create codespace on staging**).
2. Wait 3–5 minutes. The `.devcontainer/` setup installs packages, starts PostgreSQL,
   creates the tables, loads the courses and runs `npm run dev`. A browser tab opens on
   port **3000**.
3. To show someone: **Ports** tab → right-click 3000 → **Port Visibility → Public**, and
   share the `https://…-3000.app.github.dev` link.

**Lifecycle and cost:** a Codespace **stops after ~30 minutes idle** (reopen it from
**Code → Codespaces**) and is **deleted after the retention period** (30 days by default).
Personal accounts get a free monthly allowance of hours; delete old ones at
[github.com/codespaces](https://github.com/codespaces). No secrets are needed — it uses a
throwaway database. Use the staging site, not Codespaces, as the real preview.

## 7. How the application works

**Site map** (every page exists at `/en/…`, `/fa/…` and `/ps/…`; `/` redirects to `/en`):

```text
/                          Home — hero, course grid, how every lesson works
/courses                   All courses (last-opened course is highlighted ✓)
/courses/[course]          Course page — its modules; ready ones have a Start button
/courses/[course]/[lesson] Lesson — text, diagrams, code (playground/quiz: Phase 2)
/about                     Mission and invite button
/dashboard                 "My progress" — placeholder until Phase 4
/login, /register          Sign in — placeholder until Phase 3 (share links point to /register)
anything else              Friendly 404 page
```

**Main user flows:**

- **Learn:** Home → pick any course → pick any module → read the lesson. No locked order.
- **Switch language:** EN / دری / پښتو buttons keep you on the same page and flip the
  layout to right-to-left for Dari and Pashto. Lesson text stays English for now, with a
  note saying translations are coming.
- **Invite:** "Invite a friend" opens a dialog with a message per network; X, LinkedIn and
  Facebook open their share pages, Instagram copies the caption.

**Data flow:** `content/*.ts` → `npx prisma db seed` → PostgreSQL → `lib/courses.ts`
(server-only queries) → server-rendered pages. UI text comes from `messages/*.json`;
missing Dari/Pashto keys fall back to English.

## 8. Pages, sections and design

The approved design is [`docs/nextntech-demo-v3-1.jsx`](docs/nextntech-demo-v3-1.jsx).
Tokens live in [`app/globals.css`](app/globals.css) (`@theme`).

**Color palette** (there is no dark mode yet, so dark = "–"):

| Token (Tailwind)   | Light hex | Dark hex | Used for                                           |
| ------------------ | --------- | -------- | -------------------------------------------------- |
| `ink`              | `#0E2258` | –        | Nav, footer, headings, code blocks                 |
| `lapis`            | `#16337F` | –        | Dark buttons, hero gradient, links, table headers  |
| `lapis-soft`       | `#2A4BAE` | –        | Hover on dark buttons                              |
| `saffron`          | `#F5A524` | –        | Primary buttons, star logo, active nav, highlights |
| `turquoise`        | `#2EC4B6` | –        | ".org" in the logo, accents                        |
| `paper`            | `#F4F6FB` | –        | Page background                                    |
| `line`             | `#DDE3F0` | –        | Borders, dividers, "coming soon" stars             |
| `body`             | `#3A4666` | –        | Body text                                          |
| `green`            | `#2E933C` | –        | Success, green buttons                             |
| `red`              | `#D64545` | –        | Errors, warning callouts                           |
| `muted`            | `#98A3C4` | –        | "Coming soon" labels                               |
| `code`             | `#9FD6FF` | –        | Code text on ink                                   |
| `cream`            | `#FFF8E8` | –        | Notes, tip callouts, About share card              |
| `course-frontend`  | `#2EC4B6` | –        | Front-End course color                             |
| `course-backend`   | `#2A4BAE` | –        | Back-End course color                              |
| `course-fullstack` | `#F5A524` | –        | Full-Stack course color                            |
| `course-python`    | `#7C5CD6` | –        | Python course color                                |
| `course-mobile`    | `#E4572E` | –        | Mobile course color                                |
| `course-career`    | `#2E933C` | –        | Careers course color                               |

Each course's color flows through a `--course` CSS variable into its cards, borders,
buttons and stars (`bg-course`, `text-course`, `border-course`, `bg-course-tint` = 8%,
`bg-course-tint-strong` = 13%).

**Fonts:**

| Role                          | Font                          | Where set                                               |
| ----------------------------- | ----------------------------- | ------------------------------------------------------- |
| English (Latin) text          | Nunito Sans                   | `app/[locale]/layout.tsx` (next/font) → `--font-sans`   |
| Dari & Pashto (Arabic script) | Vazirmatn                     | `app/[locale]/layout.tsx` → `--font-rtl` on `[dir=rtl]` |
| Code                          | ui-monospace, Menlo, Consolas | `app/globals.css` → `--font-mono`                       |

**Layout rules:** mobile-first (works at 375px, no sideways scroll); rounded corners
12–16px; logical CSS properties only (`ms-`/`me-`, `ps-`/`pe-`, `start-`/`end-`,
`border-s-`, `text-start`) so RTL mirrors automatically; code always LTR; English
database text uses `<En as="p">` (a left-to-right block, right-aligned on RTL pages) or
inline `<En>` (`<bdi dir="ltr">`) for short phrases.

| Page         | Sections                                                                                                                                                                      |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| All pages    | Sticky nav (logo, Courses, My Progress, About, EN/دری/پښتو, Sign in) · footer tagline                                                                                         |
| Home         | Hero (badge, title, subtitle, "start anywhere", Start + Invite buttons) · "Pick your starting point" course grid · "How every lesson works" (Read, Practice, Answer, Achieve) |
| Courses      | Title + note · one card per course (emoji, title, module list, Start); last-opened shows ✓                                                                                    |
| Course       | Back link · course header in its color · numbered module cards (Start or Coming soon)                                                                                         |
| Lesson       | Back link · module eyebrow · title · translation note (fa/ps) · lesson body card · next-phase note                                                                            |
| About        | Mission text · "Know a curious kid?" share card                                                                                                                               |
| Share dialog | One button + message per network (X, LinkedIn, Facebook; Instagram copies the caption)                                                                                        |
| Placeholders | Dashboard, Sign in/Register, 404 — friendly card with a "Courses" button                                                                                                      |

## 9. Project structure

```text
.
├── app/
│   ├── [locale]/                  every page, per language
│   │   ├── layout.tsx             <html lang/dir>, fonts, nav, footer, translations provider
│   │   ├── page.tsx               Home
│   │   ├── courses/page.tsx       All courses
│   │   ├── courses/[courseSlug]/page.tsx               Course page
│   │   ├── courses/[courseSlug]/[lessonSlug]/page.tsx  Lesson page
│   │   ├── about/ dashboard/ login/ register/          other pages / placeholders
│   │   ├── [...rest]/page.tsx     unknown paths → 404
│   │   └── not-found.tsx          friendly 404
│   ├── globals.css                design tokens, course-color utilities, base styles
│   ├── layout.tsx / not-found.tsx root pass-through and fallback 404
├── components/
│   ├── ui/                        Star8, Logo, Button, Card, PathCard, CodeBox, En
│   ├── layout/                    Nav + language switcher, Footer, ShareButton, ComingSoon
│   ├── lesson/                    LessonBody (block renderer), InlineText
│   └── visuals/                   WebTrio, TagAnatomy, BoxModel, ClientServer, TableVisual
├── content/                       curriculum.ts (courses/modules), lessons.ts (14 lessons), types.ts
├── i18n/                          routing.ts (locales, RTL), navigation.ts, request.ts
├── lib/                           db.ts, courses.ts (queries), lesson-blocks.ts (schema), inline.ts
├── messages/                      en.json, fa.json, ps.json
├── prisma/                        schema.prisma, migrations/, seed.ts
├── tests/                         Vitest unit tests
├── docs/                          spec, curriculum, BUILD-PHASES, DEPLOYMENT, AI-WORKFLOW-PROMPT, screenshots/
├── .devcontainer/                 Codespaces: devcontainer.json, docker-compose.yml, setup.sh
├── .github/                       workflows/ci.yml, issue + PR templates
├── middleware.ts                  language detection and /en, /fa, /ps routing
├── server.js                      production startup file for cPanel Passenger
├── docker-compose.yml             local PostgreSQL 16
└── .env.example                   every env var name, empty values
```

## 10. Making changes manually

Step-by-step guides with examples are in **[CONTRIBUTING.md](CONTRIBUTING.md)**. Quick
recipes:

| I want to…            | Do this                                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Add or edit a lesson  | Edit `content/lessons.ts`, add it to its module in `content/curriculum.ts`, run `npm test` and `npm run db:seed` |
| Change interface text | Edit the same key in `messages/en.json`, `fa.json` and `ps.json` (keep `{placeholders}`)                         |
| Change a color        | Edit the token in `app/globals.css` and update the palette table in §8                                           |
| Add a lesson diagram  | New file in `components/visuals/`, register it in `index.tsx` and `VISUAL_NAMES` in `lib/lesson-blocks.ts`       |
| Add a page            | `app/[locale]/<name>/page.tsx`, text in all three `messages/*.json`, link with `@/i18n/navigation`               |
| Change the database   | Edit `prisma/schema.prisma`, run `npx prisma migrate dev --name <what>`, commit the migration                    |

Then run `npm run format && npm run lint && npm run typecheck && npm test`, check the page
in English, Dari and Pashto at phone width, update this README (section + Feature log),
and open a pull request into `staging`.

**How you can help (contributors welcome):** ✍️ write lessons · 🌍 review Dari/Pashto ·
🎨 design visuals · 🐞 report bugs (especially on phones and in RTL) · 💻 pick a
`good first issue`. Please read the [Code of Conduct](CODE_OF_CONDUCT.md); report security
or child-safety problems privately via [SECURITY.md](SECURITY.md).

## 11. Making changes with AI

This repo is set up for **Claude Code**. [`CLAUDE.md`](CLAUDE.md) holds the project facts
and rules and imports the shared workflow,
[`docs/AI-WORKFLOW-PROMPT.md`](docs/AI-WORKFLOW-PROMPT.md), so every session follows the
same process automatically.

1. **Ask** in plain language, e.g. _"Add the next Python lesson from the curriculum
   outline, with a playground and 5 quiz questions."_ Build work follows the phase prompts
   in [`docs/BUILD-PHASES.md`](docs/BUILD-PHASES.md) — say _"Phase 2"_ to start the next one.
2. **Review:** the AI works on `staging` (or a branch with a pull request into `staging`), runs
   the checks, updates this README, and tells you what changed and what to check on
   `stage.nextntech.org`.
3. **Approve:** when staging looks right, tell the AI to open (or merge) the
   `staging` → `main` pull request. It never touches `main` without your OK.

## 12. Database

| Item               | Details                                                                                                                                                                                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Engine             | PostgreSQL 16 (cPanel in staging/production; Docker locally; a throwaway one in CI and Codespaces)                                                                                                                                                               |
| ORM                | Prisma 6 — schema in [`prisma/schema.prisma`](prisma/schema.prisma)                                                                                                                                                                                              |
| Tables             | `Course`, `Module`, `Lesson`, `LessonTranslation`, `QuizQuestion`, `QuizQuestionTranslation`, `User`, `Account`, `Session`, `VerificationToken`, `QuizAnswer`, `Progress`, `Streak`, `Certificate` (see [§2 Data structure](#data-structure-hierarchy-and-keys)) |
| Migrations         | `prisma/migrations/` (committed). Dev: `npx prisma migrate dev --name <what>`. Hosting: `npx prisma migrate deploy` (part of the build command) — staging first, then production                                                                                 |
| Seed               | `npx prisma db seed` loads `content/` — idempotent, never deletes learner data                                                                                                                                                                                   |
| Browse             | `npm run db:studio` locally; cPanel → **phpPgAdmin** on hosting                                                                                                                                                                                                  |
| Backups            | Before every production migration: `pg_dump "$DATABASE_URL" > backup-$(date +%F).sql`, plus scheduled cPanel backups                                                                                                                                             |
| Learner data today | None collected yet — accounts arrive in Phase 3                                                                                                                                                                                                                  |

## 13. Testing checklist

Before merging `staging` → `main`:

- [ ] CI is green on the pull request (format, lint, typecheck, unit tests, migrations +
      seed, build, smoke test)
- [ ] `stage.nextntech.org` deployed from the latest `staging` commit
- [ ] Home, Courses, a course page, a lesson and About open without errors
- [ ] Same pages in **Dari** (`/fa`) and **Pashto** (`/ps`): layout is right-to-left,
      English course names read correctly
- [ ] Phone width (375px): nothing cut off, no sideways scrolling
- [ ] Language switcher keeps you on the same page; "Invite a friend" dialog opens
- [ ] Any changed page's screenshot retaken in `docs/screenshots/`
- [ ] README updated (the relevant section and the Feature log)
- [ ] Database changes: backup taken, migration ran cleanly on staging

## 14. Production notes

**Go-live checklist:**

- [ ] `nextntech.org` and `stage.nextntech.org` point at the hosting account, AutoSSL on
- [ ] Separate staging and production databases, strong passwords, env vars set in cPanel
- [ ] `NEXT_PUBLIC_SITE_URL` set per environment before building
- [ ] Courses seeded; scheduled database backups on
- [ ] Privacy policy, terms and parents page reviewed (planned in Phase 6)
- [ ] Parental consent flow finished and tested (Phase 3) before accounts open to learners

**Known limitations (today):**

- Lesson pages show text and diagrams only; playgrounds, video, audio and quizzes arrive
  in Phase 2.
- No accounts yet: "My progress" and "Sign in" are placeholders.
- Lesson content is English only; Dari/Pashto interface strings beyond the original demo
  are drafts awaiting a native-speaker review.
- No dark mode.
- Pages are rendered on each request (they read from the database), so the database must
  be reachable for the site to work.

## 15. Troubleshooting

| Problem                                           | Fix                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `Can't reach database server at localhost:5432`   | Start the database: `docker compose up -d` (local) or check `DATABASE_URL` (hosting)  |
| `Environment variable not found: DATABASE_URL`    | Create `.env` from `.env.example` and fill it in (§3)                                 |
| Home page shows no courses                        | Run `npx prisma db seed`                                                              |
| `P1010: User was denied access` (cPanel)          | Add the database user to the database with **ALL PRIVILEGES**                         |
| Build "Killed" / out of memory on hosting         | Hosting memory limit — ask the host, or set `NODE_OPTIONS=--max-old-space-size=1024`  |
| `Could not find a production build` (server.js)   | Run `npm run build` before starting                                                   |
| 503 after deploy                                  | Check the Node.js version (20+) and the app's `stderr.log`; confirm the start command |
| Share links show the wrong address                | Set `NEXT_PUBLIC_SITE_URL` and **rebuild** (it's baked in at build time)              |
| Codespace preview won't open                      | **Ports** tab → globe icon on port 3000; or run `npm run dev` in its terminal         |
| Dari/Pashto text shows `course.module` or similar | A key is missing from `messages/fa.json` or `ps.json` — `npm test` lists it           |

More hosting fixes: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md#troubleshooting).

## 16. Feature log

Newest first.

| Date       | Change                                                                                                                                                                                                                                                                                                                                                                                       | PR                                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 2026-09-29 | Adopted the shared AI workflow: `CLAUDE.md` project facts + `docs/AI-WORKFLOW-PROMPT.md`, GitHub Actions CI, `server.js` for cPanel Passenger, `.env.example` with empty values, README in the standard structure with screenshots, and a fix so English course names and summaries read correctly on Dari/Pashto pages; working branch renamed `stage` → `staging` (now the default branch) | (this change)                                                                                            |
| 2026-09-28 | Hosting guide for cPanel AI App Hosting + PostgreSQL, and a GitHub Codespaces preview setup                                                                                                                                                                                                                                                                                                  | [#3](https://github.com/PDostiyar/NextNtech/pull/3), [#4](https://github.com/PDostiyar/NextNtech/pull/4) |
| 2026-09-28 | `stage` → `main` branching (branch renamed to `staging` on 2026-09-29), README, CONTRIBUTING, Code of Conduct, Security policy, issue/PR templates                                                                                                                                                                                                                                           | [#1](https://github.com/PDostiyar/NextNtech/pull/1), [#2](https://github.com/PDostiyar/NextNtech/pull/2) |
| 2026-09-28 | Phase 1: Next.js app, design system, English/Dari/Pashto with RTL, database schema, 6 courses / 24 modules / 14 lessons, Home, Courses, Course, Lesson and About pages                                                                                                                                                                                                                       | [#1](https://github.com/PDostiyar/NextNtech/pull/1)                                                      |

---

Code is released under the [MIT License](LICENSE) © 2026 Pervaiz Dostiyar. Roadmap after
the six build phases: complete Front-End and Python first and launch; add a video and
narration to every lesson; translate lessons into Dari and Pashto; add the remaining
courses with volunteer authors — see
[`docs/NextNTech-Complete-Project-Package.md`](docs/NextNTech-Complete-Project-Package.md).
