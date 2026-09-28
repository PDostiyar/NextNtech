# Contributing to NextNTech.org

Thank you for helping! 💛 NextNTech.org is a free, non-profit coding school for kids and
young people. Every lesson, translation, fix and idea helps a curious kid somewhere learn
to build the future.

This guide covers:

1. [Ground rules](#1-ground-rules)
2. [Ways to contribute](#2-ways-to-contribute) (you don't need to code for most of them)
3. [Set up your computer](#3-set-up-your-computer)
4. [The contribution workflow](#4-the-contribution-workflow)
5. [How to… (common changes, step by step)](#5-how-to-common-changes-step-by-step)
6. [Code style and conventions](#6-code-style-and-conventions)
7. [Child safety & privacy rules](#7-child-safety--privacy-rules)
8. [Getting help](#8-getting-help)

---

## 1. Ground rules

- Be kind. Read and follow the [Code of Conduct](CODE_OF_CONDUCT.md).
- **Learners may be children.** Content must be accurate, age-appropriate, and friendly.
  Changes must follow the [child safety rules](#7-child-safety--privacy-rules). This is not
  negotiable.
- **Free forever.** Please don't propose ads, paywalls, paid tiers or tracking.
- **Talk first about big changes.** For anything larger than a small fix (a new feature, a
  new library, a database change), open an issue first so we can agree on the approach.
- Security or child-safety problems: **don't open a public issue** — see [SECURITY.md](SECURITY.md).

## 2. Ways to contribute

| You like…          | You can…                                                                          | Where                                    |
| ------------------ | --------------------------------------------------------------------------------- | ---------------------------------------- |
| Teaching / writing | Write a lesson for a "Coming soon" module                                         | `content/`                               |
| Languages          | Review or improve Dari (دری) and Pashto (پښتو)                                    | `messages/fa.json`, `messages/ps.json`   |
| Drawing / design   | Create a visual that explains one idea                                            | `components/visuals/`                    |
| Testing            | Try the site on your phone, in RTL, with a keyboard or screen reader; report bugs | GitHub Issues                            |
| Coding             | Fix bugs, build features from the roadmap                                         | anywhere — start with `good first issue` |
| Ideas              | Suggest a lesson or improvement                                                   | GitHub Issues                            |

Not a programmer? You can still write a lesson or translation in an issue, and a
maintainer will turn it into code.

## 3. Set up your computer

You need **Node.js 20+**, **Git**, and **Docker Desktop** (or your own PostgreSQL 16).

```bash
# Fork the repo on GitHub first, then:
git clone https://github.com/<your-username>/NextNtech.git
cd NextNtech
git checkout stage     # all work starts from the stage branch

npm install
cp .env.example .env
docker compose up -d
npx prisma migrate dev
npx prisma db seed
npm run dev              # open http://localhost:3000
```

If something fails, check that Docker is running (`docker compose ps`) and that nothing
else is using port 5432 or 3000.

## 4. The contribution workflow

We use two long-lived branches:

| Branch  | Purpose                                           | Who merges into it                                   |
| ------- | ------------------------------------------------- | ---------------------------------------------------- |
| `stage` | Where all new work lands and gets tested together | Maintainers, after review                            |
| `main`  | The live website — only tested, approved releases | Maintainers, via a release pull request from `stage` |

**Always branch from `stage` and open your pull request against `stage`** — never against
`main`.

```
your-branch ──PR──▶ stage ──(tested, approved release PR)──▶ main ──▶ nextntech.org
```

1. **Find or open an issue** describing what you'll do. Comment "I'd like to work on this"
   so others know.
2. **Create a branch** from `stage` with a short, descriptive name:
   `lesson/python-loops`, `fix/nav-overflow-mobile`, `i18n/pashto-review`.
3. **Make your change.** Keep each pull request focused on one thing.
4. **Run the checks** — the same ones CI runs:
   ```bash
   npm run lint
   npm run typecheck
   npm test
   npm run format        # auto-fixes formatting
   ```
5. **Check it in the browser**: English, Dari (`/fa`) and Pashto (`/ps`), at phone width
   (375px) and desktop.
6. **Commit** with a clear message saying what changed and why, e.g.
   `Add Python lesson: loops with for and while`.
7. **Open a pull request** against `stage` and fill in the template. Include screenshots for
   anything visual.
8. A maintainer will review. Small follow-up changes are normal — they're part of making
   lessons great for kids.

## 5. How to… (common changes, step by step)

### ✍️ Add or edit a lesson

Lesson content lives in code under `content/` and is loaded into the database by the seed
script. (A browser-based admin editor comes in Phase 5.)

1. Open [`docs/NextNTech-Curriculum-Outline.md`](docs/NextNTech-Curriculum-Outline.md) and
   pick a module marked "Coming soon" on the site.
2. In `content/lessons.ts`, add a new lesson. Copy an existing one as a template:

   ```ts
   export const pythonLoops: SeedLesson = {
     slug: "loops-doing-things-many-times", // unique, lowercase, dashes
     title: "Loops: Doing Things Many Times",
     body: [
       { type: "paragraph", text: "A **loop** repeats code so you never copy-paste." },
       { type: "code", language: "python", code: 'for i in range(3):\n    print("Hi!")' },
       { type: "callout", tone: "tip", text: "`range(3)` counts 0, 1, 2." },
     ],
     playground: {
       type: "python",
       title: "Make it repeat",
       hint: "Change 3 to 10. What happens?",
       starter: 'for i in range(3):\n    print("Hi!")',
     },
     quiz: [
       // 3 to 5 questions. answerIdx is the position of the correct option, starting at 0.
       {
         prompt: "How many times does range(3) repeat?",
         options: ["2", "3", "4"],
         answerIdx: 1,
         explain: "range(3) gives 0, 1 and 2 — three numbers.",
       },
       // …
     ],
   };
   ```

3. In `content/curriculum.ts`, add it to the right module's `lessons: [...]` list.
4. Run `npm test` (it checks that every lesson is valid), then `npm run db:seed` and open
   the course page to see it.

**Lesson content blocks** (validated in `lib/lesson-blocks.ts`):

| Block       | Fields                                      | Use it for                                        |
| ----------- | ------------------------------------------- | ------------------------------------------------- |
| `paragraph` | `text`                                      | Normal text                                       |
| `heading`   | `text`                                      | A small section title                             |
| `code`      | `language`, `code`                          | A code sample (always shown left-to-right)        |
| `callout`   | `tone` (`info` / `tip` / `warning`), `text` | A highlighted note                                |
| `visual`    | `name`, optional `props`                    | One of the illustrations in `components/visuals/` |

In `text` you can use `**bold**`, `*italic*` and `` `code` ``. Raw HTML is never rendered —
that's on purpose, for safety.

**Playground types:** `html` (live preview; add `phone: true` for a phone frame), `python`,
`sql` (a `students` table is preloaded), `php` (practice mode), `api` (JSON server
simulator), `hash` (password hashing demo). Use `playground: null` if a lesson doesn't need
one.

**Writing tips for kids:**

- Short sentences. One idea per paragraph. Explain every new word the first time.
- Use friendly, everyday comparisons (the demo's "HTML is the skeleton, CSS the clothes").
- Use a variety of names and places in examples (Zahra, Omar, Lina, Sam — Kabul, Berlin…).
- Every quiz question gets an explanation that _teaches_, not just "Correct!".
- Double-check facts. If in doubt, link a source in your pull request.

### 🌍 Improve Dari or Pashto translations

Interface text lives in `messages/en.json` (English), `messages/fa.json` (Dari) and
`messages/ps.json` (Pashto). The keys are the same in all three files.

1. Edit the value, not the key: `"start": "شروع"`.
2. Keep placeholders exactly as they are: `{count}`, `{n}`, `{network}`, `{url}`.
3. Plural rules like `{count, plural, one {…} other {…}}` must keep their structure.
4. Run `npm test` — it fails if a Dari or Pashto key is missing.
5. In your pull request, say which language you checked and whether you're a native
   speaker.

Adding new text to the app? Add the key to **all three** files. If you can't translate it,
copy the English and mention it in the pull request — missing keys fall back to English.

Translated _lessons_ (not just the interface) will be supported through the admin area in
Phase 5. Until then, you can post a translation in an issue.

### 🎨 Add a new visual

1. Create `components/visuals/MyVisual.tsx`. Prefer an inline SVG with a `viewBox`,
   `role="img"`, and an `aria-label` that describes the picture in words.
2. Use the brand colors (see [Design system](#design-system) below).
3. Register it in `components/visuals/index.tsx` and add the name to `VISUAL_NAMES` in
   `lib/lesson-blocks.ts`.
4. Use it in a lesson: `{ type: "visual", name: "MyVisual" }`.

### 🧭 Add a page

1. Create `app/[locale]/my-page/page.tsx` (see `app/[locale]/about/page.tsx`).
2. Call `setRequestLocale(locale)` and read text with `getTranslations("myPage")`.
3. Add the text to all three `messages/*.json` files.
4. Link to it with `Link` from `@/i18n/navigation` (not `next/link`) so the language is kept.

### 🗄 Change the database

1. Edit `prisma/schema.prisma`.
2. Run `npx prisma migrate dev --name short-description` — this creates a file in
   `prisma/migrations/`. Commit it.
3. Never edit or delete an existing migration. Explain the change in your pull request —
   database changes always need a maintainer's review.

### ➕ Add a library (npm package)

Open an issue first. We keep the stack small so volunteers can understand it and hosting
stays free. The decided stack is listed in [`CLAUDE.md`](CLAUDE.md).

## 6. Code style and conventions

- **TypeScript strict.** No `any` unless you explain why.
- **Formatting** is automatic: `npm run format` (Prettier, with Tailwind class sorting).
- **Server first.** Pages are React Server Components; add `"use client"` only for
  interactive parts.
- **Validate input with Zod** on the server. Never trust data from the browser.
- **Quiz answers never go to the browser** before the learner answers — grading happens on
  the server.
- **Tests** go in `tests/` (Vitest). Add or update tests for logic you change.

<a id="design-system"></a>

### Design system

The approved design is [`docs/nextntech-demo-v3-1.jsx`](docs/nextntech-demo-v3-1.jsx) —
match its look and feel.

- **Colors** are Tailwind tokens from `app/globals.css`: `ink`, `lapis`, `lapis-soft`,
  `saffron`, `turquoise`, `paper`, `line`, `body`, `green`, `red`. Use `bg-ink`,
  `text-saffron`, etc. — don't hard-code hex values in pages.
- **Course colors** flow through a `--course` CSS variable. Inside an element with
  `style={{ "--course": course.color }}`, use `bg-course`, `text-course`, `border-course`,
  `bg-course-tint` (8%) and `bg-course-tint-strong` (13%).
- **Right-to-left:** always use logical classes — `ms-`/`me-`, `ps-`/`pe-`,
  `start-`/`end-`, `border-s-`, `text-start` — **never** `ml-`, `mr-`, `left-`, `right-`
  or `text-left`. Wrap English text from the database in `<En>` so punctuation stays
  correct on Dari/Pashto pages.
- **Mobile first:** everything must work at 375px width with no sideways scrolling.
- Rounded corners 12–16px, generous padding, friendly tone.

## 7. Child safety & privacy rules

These rules apply to every contribution:

- Collect **only**: name, email, birth year, preferred language/voice, and learning
  progress. Nothing else.
- **No** third-party trackers, analytics cookies, ads, or social-media pixels.
- **No** user-to-user messaging, comments or public profiles.
- Code playground iframes use `sandbox="allow-scripts"` **only** — never add
  `allow-same-origin`.
- Under-13 learners need parental consent before their progress is saved.
- Lesson content: no links to unmoderated communities, no requests for personal
  information, no scary or violent examples.
- Never commit secrets. Configuration goes in environment variables, documented in
  `.env.example`.

## 8. Getting help

- Stuck on setup or unsure where something goes? Open an issue with the **question**
  label — no question is too small.
- Want to take on something bigger? Comment on the issue first so we can plan it together.

By contributing, you agree that your contributions are licensed under the project's
[MIT License](LICENSE).
