# NextNTech.org

**What's next in technology — for you and your kids.**

NextNTech.org is a free, non-profit, ad-free coding education platform for kids and young
people. No payment, subscription, or paywall ever stands between a learner and a lesson.

- Project context and decisions: [`CLAUDE.md`](CLAUDE.md)
- Build plan (six phases): [`docs/BUILD-PHASES.md`](docs/BUILD-PHASES.md)
- Approved design prototype: [`docs/nextntech-demo-v3-1.jsx`](docs/nextntech-demo-v3-1.jsx)

## Status

Phase 1 (foundation) is done: design system, three languages (English, Dari, Pashto with
RTL), database schema, seeded curriculum, and the public pages (Home, Courses, Course
detail, About). Lesson pages currently show the lesson text and visuals; playgrounds, video,
audio and quizzes arrive in Phase 2.

## Tech stack

Next.js 15 (App Router, TypeScript strict) · Tailwind CSS v4 · PostgreSQL + Prisma 6 ·
next-intl (en / fa / ps) · Zod · Vitest · Prettier + ESLint.

## Local setup

Prerequisites: Node.js 20+, Docker Desktop (for Postgres), Git.

```bash
# 1. Install dependencies (also generates the Prisma client)
npm install

# 2. Environment variables
cp .env.example .env

# 3. Start PostgreSQL 16
docker compose up -d

# 4. Create the tables and load the courses
npx prisma migrate dev
npx prisma db seed

# 5. Run the site
npm run dev
```

Open http://localhost:3000 — it redirects to `/en`. Switch languages with the EN / دری / پښتو
buttons, or go directly to `/fa` or `/ps`.

> Already have Postgres installed? Skip Docker and point `DATABASE_URL` in `.env` at your
> own database.

## Scripts

| Command                           | What it does                              |
| --------------------------------- | ----------------------------------------- |
| `npm run dev`                     | Development server on :3000               |
| `npm run build` / `npm start`     | Production build / serve it               |
| `npm run lint`                    | ESLint                                    |
| `npm run typecheck`               | TypeScript, no emit                       |
| `npm test`                        | Vitest unit tests                         |
| `npm run format` / `format:check` | Prettier                                  |
| `npm run db:migrate`              | `prisma migrate dev`                      |
| `npm run db:seed`                 | Load/refresh courses, modules and lessons |
| `npm run db:studio`               | Browse the database in Prisma Studio      |

The seed is safe to re-run: it updates content in place by slug and never deletes learner
data.

## Project structure

```
app/[locale]/        pages (Home, courses, course detail, lesson, about, …)
components/ui/       design system: Star8, Logo, Button, Card, PathCard, CodeBox
components/layout/   Nav (with language switcher), Footer, ShareButton (invite dialog)
components/visuals/  lesson visuals: WebTrio, TagAnatomy, BoxModel, ClientServer, TableVisual
components/lesson/   lesson block renderer
content/             seed curriculum (all 6 courses, 24 modules, 14 written lessons)
i18n/                next-intl routing and request config
lib/                 server logic: database client, content queries, lesson block schema
messages/            UI strings: en.json, fa.json (Dari), ps.json (Pashto)
prisma/              schema, migrations, seed
tests/               Vitest unit tests
```

### Lesson content format

A lesson body is an ordered array of typed blocks, validated by Zod
(`lib/lesson-blocks.ts`):

```json
[
  { "type": "paragraph", "text": "HTML is the **skeleton** of the web. Try `<h1>`." },
  { "type": "visual", "name": "TagAnatomy" },
  { "type": "code", "language": "html", "code": "<h1>Hello!</h1>" },
  { "type": "callout", "tone": "tip", "text": "Tags come in pairs." },
  { "type": "heading", "text": "Next up" }
]
```

Text supports `**bold**`, `*italic*` and `` `code` `` only — raw HTML is never rendered.
Visuals are referenced by name from `components/visuals/`.

### Design system

Colors from the demo live in `app/globals.css` as Tailwind tokens (`bg-ink`, `text-saffron`,
`border-line`, …). Each course's color flows through a `--course` CSS variable, with
`bg-course`, `text-course`, `border-course`, `bg-course-tint` (8%) and
`bg-course-tint-strong` (13%) utilities. Layouts use logical properties (`ms-`, `pe-`,
`start-`, `border-s-`) so Dari and Pashto mirror automatically; code always stays LTR.

## Translations

UI strings live in `messages/*.json`. The Dari and Pashto files start from the demo's `STR`
object; strings added since then are drafts and **need review by a native speaker**. Any
missing Dari/Pashto key falls back to English automatically. Lesson content is English for
now (the `LessonTranslation` table is ready for translated lessons).
