# NextNTech.org

A free, non-profit, ad-free coding school for kids and young people, in English, Dari (دری)
and Pashto (پښتو). Learners pick any of six courses (front-end, back-end, full-stack,
Python, mobile, careers) and learn through short visual lessons, practice and quizzes. The
repo is public and open to community contributors.

| Environment | URL                                                                      | Git branch | Hosting                               |
| ----------- | ------------------------------------------------------------------------ | ---------- | ------------------------------------- |
| Production  | https://nextntech.org                                                    | `main`     | cPanel → Node.js app (AI App Hosting) |
| Staging     | https://stage.nextntech.org                                              | `staging`  | cPanel → Node.js app (AI App Hosting) |
| Repo        | [github.com/PDostiyar/NextNtech](https://github.com/PDostiyar/NextNtech) | –          | public · MIT                          |

### Overview

![NextNTech.org home page](docs/screenshots/home.jpg)

The website of NextNTech.org (nextntech.org), built with Next.js 15, React 19, TypeScript,
Tailwind CSS v4, next-intl, Prisma and PostgreSQL. Hosted sites aren't live yet. Build
progress: Phase 1 of 6 done ([`docs/BUILD-PHASES.md`](docs/BUILD-PHASES.md)).

## 1. Workflow: staging → production

```text
 AI chat (Claude Code), contributor PR,       GitHub Codespaces
 or a manual edit                             (quick preview only)
            │                                      │
            ▼                                      ▼
   ┌──────────────── GitHub branch: staging ────────────────┐
   └───────────────────────────┬────────────────────────────┘
                               │ deploy (pull + build)
                               ▼
        STAGING: https://stage.nextntech.org · staging database
                               │  owner reviews and approves
                               ▼
          Pull Request: staging → main  (CI must be green)
                               │ merge
                               ▼
   ┌───────────────── GitHub branch: main ──────────────────┐
   └───────────────────────────┬────────────────────────────┘
                               │ deploy (pull + build)
                               ▼
        PRODUCTION: https://nextntech.org · production database
```

- `staging` is the default and working branch; `main` only changes via a reviewed PR from
  `staging`. After each release, `staging` is fast-forwarded to `main`.
- Contributors fork and open PRs into `staging` — see [CONTRIBUTING.md](CONTRIBUTING.md).
- Full rules: [`docs/AI-WORKFLOW-PROMPT.md`](docs/AI-WORKFLOW-PROMPT.md).

## 2. Tech stack

| Layer     | Choice                                                                  | Version    |
| --------- | ----------------------------------------------------------------------- | ---------- |
| Framework | Next.js App Router, React Server Components                             | 15.5       |
| Frontend  | React · TypeScript (strict) · Tailwind CSS                              | 19 · 5 · 4 |
| i18n      | next-intl — `en`, `fa` (Dari), `ps` (Pashto); RTL for fa/ps             | 4          |
| Backend   | Next.js server on Node.js                                               | Node 20+   |
| Data      | PostgreSQL + Prisma ORM · Zod validation                                | 16 · 6 · 4 |
| Auth      | Not used yet (Auth.js v5 in Phase 3)                                    | –          |
| Tests     | Vitest                                                                  | 3          |
| CI        | GitHub Actions — [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | –          |

### Architecture: frontend and backend

```text
Browser ──HTTPS──▶ middleware.ts (picks /en, /fa, /ps)
                        │
                        ▼
              Next.js server (React Server Components)
                        │ lib/courses.ts (Prisma, server-only; never sends quiz answers)
                        ▼
                   PostgreSQL
```

Only small interactive parts run in the browser (nav, language switcher, share dialog,
course highlight). No external services yet; later phases add login providers, email and
file storage.

### Data structure (hierarchy and keys)

```text
Course (slug★, key★, title, summary, emoji, color, order)
└── Module (slug per course, title, order)
    └── Lesson (slug★, title, body: Block[], playground?, videoUrl?, audio*Url?, published)
        ├── LessonTranslation (locale★ per lesson)
        └── QuizQuestion (prompt, options[], answerIdx 🔒 server-only, explain)
            └── QuizQuestionTranslation (locale★ per question)
User (email★, role, birthYear?, preferredLocale, parentEmail?, parentConsentAt?)
├── Account, Session (Auth.js) · QuizAnswer · Progress (lesson★ per user) · Streak · Certificate
Block = paragraph | heading | code | callout | visual(name)          ★ = unique
```

Source of truth: [`prisma/schema.prisma`](prisma/schema.prisma),
[`lib/lesson-blocks.ts`](lib/lesson-blocks.ts). No API routes yet.

### Folder overview

`app/` pages · `components/` UI, layout, lesson visuals · `content/` seed courses/lessons ·
`i18n/` language routing · `lib/` server code · `messages/` UI text (en/fa/ps) · `prisma/`
schema, migrations, seed · `tests/` unit tests · `docs/` spec, phases, deployment, design ·
`.devcontainer/` Codespaces · `.github/` CI and templates. Full tree in §9.

## 3. Run it locally

Needs Node.js 20+ (22 recommended), Git, Docker (or your own PostgreSQL 16).

```bash
git clone https://github.com/PDostiyar/NextNtech.git && cd NextNtech
npm install
cp .env.example .env    # set DATABASE_URL=postgresql://nextntech:nextntech@localhost:5432/nextntech?schema=public
                        #     NEXT_PUBLIC_SITE_URL=http://localhost:3000  (throwaway local values)
docker compose up -d
npx prisma migrate dev && npx prisma db seed
npm run dev             # http://localhost:3000 → /en, /fa, /ps
```

| Script                                   | Does                                          |
| ---------------------------------------- | --------------------------------------------- |
| `dev` · `build` · `start`                | Dev server · production build · serve it      |
| `start:server`                           | Serve via `server.js` (cPanel Passenger)      |
| `lint` · `typecheck` · `test` · `format` | Checks (CI runs all of them)                  |
| `db:migrate` · `db:seed` · `db:studio`   | Prisma migrate dev · load `content/` · browse |

## 4. Configuration and secrets

Public repo: never commit `.env`, passwords or keys. [`.env.example`](.env.example) lists
every variable with empty values.

| Variable               | Purpose                                | Secret | Where set                                           |
| ---------------------- | -------------------------------------- | ------ | --------------------------------------------------- |
| `DATABASE_URL`         | PostgreSQL connection                  | Yes    | cPanel app env vars (per environment), local `.env` |
| `NEXT_PUBLIC_SITE_URL` | Public URL; baked in at **build** time | No     | cPanel app env vars, local `.env`                   |

Later phases (empty for now): `AUTH_*` providers and `RESEND_API_KEY` (Phase 3),
`BLOB_READ_WRITE_TOKEN` (Phase 4). CI and Codespaces use throwaway database values.

## 5. Deploying (hosting)

Do staging first, then production. Details: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

- **One-time:** create the `stage.nextntech.org` subdomain → AutoSSL for both domains → one
  PostgreSQL database + user (ALL PRIVILEGES) per environment.
- **App:** cPanel → **AI App Hosting** → domain → repo `PDostiyar/NextNtech`, branch
  `staging` or `main`, Node 22. Install `npm ci` · Build `npx prisma migrate deploy && npm run build`
  · Start `npm start` (or startup file `server.js`) · env vars from §4. Then run
  `npx prisma db seed` once.
- **Update after a merge:** Redeploy (or Git Version Control → Update from Remote, rebuild,
  Restart). Back up first if the release has a migration:
  `pg_dump "$DATABASE_URL" > backup-$(date +%F).sql`.
- **Rollback:** revert the release PR on GitHub and redeploy; restore the backup with
  `psql` only if a migration damaged data.

## 6. Preview in GitHub Codespaces

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/PDostiyar/NextNtech?ref=staging)
— sets up its own database, loads the courses and opens port 3000 in about 3–5 minutes.
It stops after ~30 min idle and is deleted after 30 days; use staging as the real preview.

## 7. How the application works

| Page        | URL (also `/fa/…`, `/ps/…`)                  | What it does                                      |
| ----------- | -------------------------------------------- | ------------------------------------------------- |
| Home        | `/en`                                        | Hero, course grid, how lessons work               |
| Courses     | `/en/courses`                                | All six courses; last-opened one marked ✓         |
| Course      | `/en/courses/[course]`                       | Its modules; ready ones link to the lesson        |
| Lesson      | `/en/courses/[course]/[lesson]`              | Text, diagrams, code (playground/quiz in Phase 2) |
| About       | `/en/about`                                  | Mission + invite button                           |
| Placeholder | `/en/dashboard`, `/en/login`, `/en/register` | Until Phases 3–4                                  |

- **Main flows:** pick any course in any order → read a lesson; switch language (keeps the
  page, flips to RTL); invite a friend (share dialog per network).
- **Data flow:** `content/*.ts` → `prisma db seed` → PostgreSQL → `lib/courses.ts` →
  server-rendered pages. UI text from `messages/*.json`; missing fa/ps keys fall back to English.

## 8. Pages, sections and design

- **Colors:** ink `#0E2258` · lapis `#16337F` · saffron `#F5A524` · turquoise `#2EC4B6` ·
  paper `#F4F6FB` · line `#DDE3F0` · body `#3A4666`; course colors frontend `#2EC4B6`,
  backend `#2A4BAE`, fullstack `#F5A524`, python `#7C5CD6`, mobile `#E4572E`, career `#2E933C`.
- **Fonts:** Nunito Sans (English), Vazirmatn (Dari/Pashto), system monospace (code).
- **Layout:** mobile-first (works at 375px); rounded 12–16px corners; logical CSS only
  (`ms-`/`ps-`/`start-`/`border-s-`) so RTL mirrors; code stays LTR; English DB text uses
  `<En as="p">` (or inline `<En>`) on RTL pages.
- **On every page:** sticky nav (logo, Courses, My Progress, About, EN/دری/پښتو, Sign in)
  and footer.
- **Design sources:** tokens in [`app/globals.css`](app/globals.css); approved design
  [`docs/nextntech-demo-v3-1.jsx`](docs/nextntech-demo-v3-1.jsx).

## 9. Project structure

```text
app/[locale]/        pages (layout, home, courses, course, lesson, about, placeholders, 404)
app/globals.css      design tokens + course-color utilities
components/ui/       Star8, Logo, Button, Card, PathCard, CodeBox, En
components/layout/   Nav + language switcher, Footer, ShareButton, ComingSoon
components/lesson/   lesson block renderer
components/visuals/  WebTrio, TagAnatomy, BoxModel, ClientServer, TableVisual
content/             curriculum.ts (courses/modules), lessons.ts (14 lessons)
i18n/                locales, RTL, navigation, message loading
lib/                 db.ts, courses.ts (queries), lesson-blocks.ts (schema), inline.ts
messages/            en.json, fa.json, ps.json
prisma/              schema.prisma, migrations/, seed.ts
tests/               Vitest unit tests
docs/                spec, curriculum, BUILD-PHASES, DEPLOYMENT, AI-WORKFLOW-PROMPT, screenshots/
.devcontainer/       Codespaces setup
.github/             ci.yml, issue + PR templates
middleware.ts        language routing · server.js  cPanel startup · docker-compose.yml  local DB
```

## 10. Making changes manually

| To…                 | Edit                                                                                         |
| ------------------- | -------------------------------------------------------------------------------------------- |
| Add/edit a lesson   | `content/lessons.ts` + its module in `content/curriculum.ts` → `npm test`, `npm run db:seed` |
| Change UI text      | same key in all three `messages/*.json`                                                      |
| Change a color      | `app/globals.css` (+ the color line in §8)                                                   |
| Add a diagram       | `components/visuals/` + register in `index.tsx` and `VISUAL_NAMES`                           |
| Add a page          | `app/[locale]/<name>/page.tsx`, text in `messages/*`, links via `@/i18n/navigation`          |
| Change the database | `prisma/schema.prisma` → `npx prisma migrate dev --name <what>`, commit the migration        |

Then run the checks, look at it in en/fa/ps at phone width, and open a PR into `staging`.
Step-by-step guides: [CONTRIBUTING.md](CONTRIBUTING.md). Conduct and security:
[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), [SECURITY.md](SECURITY.md).

## 11. Making changes with AI

[`CLAUDE.md`](CLAUDE.md) holds the project facts and imports
[`docs/AI-WORKFLOW-PROMPT.md`](docs/AI-WORKFLOW-PROMPT.md), so Claude Code follows the
workflow automatically. Ask in plain language (or say "Phase 2" for the next build phase);
the AI works on `staging`, runs the checks, updates this README and tells you what to check
on stage.nextntech.org. It only merges into `main` after your OK.

## 12. Database

PostgreSQL 16 via Prisma 6. Tables: `Course`, `Module`, `Lesson`, `LessonTranslation`,
`QuizQuestion`, `QuizQuestionTranslation`, `User`, `Account`, `Session`,
`VerificationToken`, `QuizAnswer`, `Progress`, `Streak`, `Certificate`. Migrations are in
`prisma/migrations/` (hosting runs `prisma migrate deploy` in the build, staging first).
The seed is idempotent and never deletes learner data. Back up before production
migrations; browse with `npm run db:studio` or cPanel phpPgAdmin. No learner data is
collected yet.

## 13. Testing checklist

Before merging `staging` → `main`:

- [ ] CI green on the PR
- [ ] stage.nextntech.org deployed from the latest `staging` commit
- [ ] Home, Courses, a course, a lesson and About work in en, fa and ps (RTL correct)
- [ ] Phone width (375px): nothing cut off, no sideways scrolling
- [ ] Language switcher and "Invite a friend" work
- [ ] README updated; `home.jpg` retaken if the homepage changed
- [ ] Migrations: backup taken, ran cleanly on staging

## 14. Production notes

- **Go-live:** both domains pointed and on HTTPS · separate staging/production databases
  and env vars · `NEXT_PUBLIC_SITE_URL` set before building · courses seeded · backups
  scheduled · legal pages reviewed (Phase 6) · parental consent finished (Phase 3) before
  accounts open.
- **Known limitations:** lessons have no playground, video, audio or quiz yet (Phase 2); no
  accounts yet; lesson content is English only; Dari/Pashto UI strings beyond the original
  demo need a native-speaker review; no dark mode; pages read from the database on every
  request.
- **License:** code under [MIT](LICENSE) © 2026 Pervaiz Dostiyar.
