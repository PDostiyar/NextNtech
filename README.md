<div align="center">

# ✴️ NextNTech.org

**What's next in technology — for you and your kids.**

A free, non-profit, ad-free coding school for kids and young people —
in **English, Dari (دری) and Pashto (پښتو)**.

[Why we're building this](#-why-were-building-this) ·
[What it does](#-what-learners-get) ·
[Run it locally](#-run-it-locally) ·
[Preview & hosting](#-hosting) ·
[Contribute](#-how-you-can-help) ·
[Roadmap](#-roadmap)

</div>

---

## 💡 Why we're building this

> **Every kid deserves to become a technology geek.** No payment, no subscription, and no
> paywall should ever stand between a curious young mind and learning to build the future.

Most good coding courses sit behind a paywall, are only in English, or are full of ads and
trackers. That shuts out many of the kids who would benefit most — including families in
Afghanistan and the Afghan diaspora who read Dari or Pashto first.

NextNTech.org is the education arm of the **#NextNTech** channels (YouTube, Facebook,
TikTok). The goal is simple:

- **Free forever.** Every course, quiz and certificate. No ads, no upsells.
- **Made for kids.** Short lessons, friendly visuals, hands-on practice, instant feedback.
- **In their language.** Full right-to-left support for Dari and Pashto, not an afterthought.
- **Safe by design.** Minimal data, parental consent for under-13s, no trackers, no
  messaging between users.
- **Start anywhere.** Curious about servers? Jump straight into Back-End. No locked order.

## 🎓 What learners get

Six learning paths, each with its own color:

|     | Course                        | What you learn                                               |
| --- | ----------------------------- | ------------------------------------------------------------ |
| 🎨  | **Front-End Development**     | HTML, CSS, JavaScript, React                                 |
| ⚙️  | **Back-End Development**      | Node.js, Express, SQL, PHP & Laravel, WordPress              |
| 🚀  | **Full-Stack Development**    | Connecting front and back, logins, deploying, a capstone     |
| 🐍  | **Python: Basic to Advanced** | From `print()` to Flask, APIs and data                       |
| 📱  | **Mobile Apps**               | React Native, Swift & iOS, publishing to app stores          |
| 💼  | **Careers & Side Hustles**    | Portfolios, Fiverr/Upwork, remote jobs, working with clients |

Every lesson has the same shape:

1. 📖 **Read** — short text with visuals that stick
2. 🎬🔊 **Watch & listen** — a short video, and narration in a woman's or man's voice
3. 🧪 **Practice** — a live playground (HTML preview, real Python, a SQL database, and more)
4. ✅ **Answer** — 3–5 quiz questions with explanations, saved to your profile
5. 🏅 **Achieve** — streaks, daily goals, and a named certificate for each course

The full course plan is in [`docs/NextNTech-Curriculum-Outline.md`](docs/NextNTech-Curriculum-Outline.md).

## 🚦 Project status

We're building in six phases ([`docs/BUILD-PHASES.md`](docs/BUILD-PHASES.md)):

| Phase | What                                                                       | Status  |
| ----- | -------------------------------------------------------------------------- | ------- |
| 1     | Foundation: design system, 3 languages + RTL, database, course pages       | ✅ Done |
| 2     | Lessons: playgrounds, video, audio, server-graded quizzes, streaks         | 🔜 Next |
| 3     | Accounts: social + email login, under-13 parental consent                  | ⏳      |
| 4     | Dashboard, PDF certificates with public verification, invite sharing       | ⏳      |
| 5     | Admin area: edit courses, lessons, quizzes and translations in the browser | ⏳      |
| 6     | Accessibility, SEO, legal pages, CI, deployment                            | ⏳      |

Today: 6 courses, 24 modules, and **14 fully written lessons** (at least two per course).
The rest of the modules show as "Coming soon".

## 🛠 Tech stack

| Area               | Choice                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------- |
| App                | [Next.js 15](https://nextjs.org) (App Router, React Server Components), TypeScript strict |
| Styling            | [Tailwind CSS v4](https://tailwindcss.com) with the NextNTech design tokens               |
| Database           | PostgreSQL 16 + [Prisma](https://www.prisma.io)                                           |
| Languages          | [next-intl](https://next-intl.dev) — `en`, `fa` (Dari), `ps` (Pashto), RTL for fa/ps      |
| Validation / tests | Zod · Vitest · (Playwright from Phase 2)                                                  |
| Coming next        | Auth.js v5, CodeMirror 6, Pyodide, sql.js, pdf-lib, Resend                                |

It's **one deployable app** — no separate CMS server. Lessons live in Postgres and will be
edited through a built-in admin area.

## 🚀 Run it locally

You need **Node.js 20+**, **Git**, and **Docker Desktop** (or your own PostgreSQL 16).

```bash
git clone https://github.com/PDostiyar/NextNtech.git
cd NextNtech

npm install                 # installs packages and generates the Prisma client
cp .env.example .env        # default values work with docker compose
docker compose up -d        # starts PostgreSQL on localhost:5432
npx prisma migrate dev      # creates the tables
npx prisma db seed          # loads the courses and lessons
npm run dev                 # http://localhost:3000
```

Open http://localhost:3000 — it redirects to `/en`. Try `/fa` and `/ps` for Dari and Pashto.

> Using your own Postgres instead of Docker? Just point `DATABASE_URL` in `.env` at it.

### Everyday commands

| Command                                           | What it does                                                             |
| ------------------------------------------------- | ------------------------------------------------------------------------ |
| `npm run dev`                                     | Development server with hot reload                                       |
| `npm run lint` · `npm run typecheck` · `npm test` | The checks every pull request must pass                                  |
| `npm run format`                                  | Auto-format with Prettier                                                |
| `npm run db:seed`                                 | Reload course content after editing files in `content/` (safe to re-run) |
| `npm run db:studio`                               | Browse the database in your browser                                      |
| `npm run build` · `npm start`                     | Production build and server                                              |

## 👀 Preview it in your browser (no install)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/PDostiyar/NextNtech?ref=stage)

Click the button (or **Code → Codespaces → Create codespace on stage**). In 3–5 minutes
the site is running in the cloud with its own database and all the courses loaded. To show
someone, make port **3000** public in the **Ports** tab and share the link. It's a
temporary preview — it sleeps when you stop using it.

## 🌍 Hosting

NextNTech is a **Node.js app with a PostgreSQL database**. On cPanel, choose
**AI App Hosting (Node.js from Git)** — not WordPress, Sitejet or "Custom Code".

**[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** walks through it step by step: creating the
database, connecting the GitHub repo, build and start commands, environment variables, a
`stage.nextntech.org` copy for testing, troubleshooting, and the Vercel + Neon
alternative.

## 🗂 Where things live

```
app/[locale]/        pages: home, courses, course detail, lesson, about, …
components/ui/       design system: Star8 logo, Button, Card, PathCard, CodeBox
components/layout/   Nav + language switcher, Footer, share/invite dialog
components/visuals/  lesson illustrations: WebTrio, TagAnatomy, BoxModel, ClientServer, TableVisual
components/lesson/   renders a lesson's content blocks
content/             course and lesson content (seeded into the database)
messages/            interface text: en.json, fa.json (Dari), ps.json (Pashto)
lib/                 server code: database client, content queries, lesson format
prisma/              database schema, migrations, seed script
tests/               unit tests
docs/                product spec, architecture, curriculum, build phases, approved design
```

## 🤝 How you can help

NextNTech is built to welcome contributors — **you don't have to be a programmer**:

- ✍️ **Write lessons** — pick a "Coming soon" module from the curriculum
- 🌍 **Translate** — review or improve Dari and Pashto, or translate lessons
- 🎨 **Design visuals** — friendly diagrams that explain one idea well
- 🐞 **Report bugs** — especially on phones and in right-to-left languages
- 💻 **Write code** — pick an issue labelled `good first issue`

All contributions go to the **`stage`** branch; tested releases are merged into `main`.
Start with **[CONTRIBUTING.md](CONTRIBUTING.md)** — it explains step by step what to
change and where. Please also read our [Code of Conduct](CODE_OF_CONDUCT.md). Found a
security or child-safety problem? See [SECURITY.md](SECURITY.md) and report it privately.

## 🗺 Roadmap

After the six build phases: complete the Front-End and Python courses first, then launch;
record a short video for every lesson; generate narration audio in both voices; translate
lessons into Dari and Pashto, one at a time; add the remaining courses with volunteer
authors. See [`docs/NextNTech-Complete-Project-Package.md`](docs/NextNTech-Complete-Project-Package.md)
for the full product plan.

## 📄 License

Code is released under the [MIT License](LICENSE) © 2026 Pervaiz Dostiyar.
