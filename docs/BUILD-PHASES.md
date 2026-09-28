# NextNTech.org — Build Phases

Prepared by Pervaiz Dostiyar | September 2026

Build one phase at a time. Each phase ends in a working, committed, previewable app.
Review and test before starting the next phase.

Tip: at the start of any session, say *"Read CLAUDE.md and docs/, then check the current
state of the repo before continuing."*

## Status

| Phase | Status |
|---|---|
| 1 — Foundation, design system, and GitHub | ✅ Done |
| 2 — Lessons, playgrounds, video and audio | Not started |
| 3 — Accounts, social login, and child safety | Not started |
| 4 — Dashboard, certificates, and sharing | Not started |
| 5 — Admin area (built-in CMS) | Not started |
| 6 — Polish, deployment readiness, and CI | Not started |

---

## Phase 1 — Foundation, design system, and GitHub

```text
Read CLAUDE.md and every file in docs/ carefully, especially docs/nextntech-demo-v3-1.jsx,
which is the approved design. Then do Phase 1:

1. Scaffold a Next.js 15 App Router project with TypeScript strict, Tailwind v4, ESLint,
   and Prettier in the current folder (keep docs/ and CLAUDE.md).
2. Add docker-compose.yml with PostgreSQL 16 for local development, and Prisma with the
   full schema: User (with role, birthYear, preferredLocale, preferredVoice,
   parentEmail, parentConsentAt), Auth.js tables (Account, Session, VerificationToken),
   Course, Module, Lesson, LessonTranslation, QuizQuestion, QuizAnswer, Progress, Streak,
   Certificate. Extend the schema in the Architecture guide with the fields from the
   Complete Project Package section 3.2. Lesson needs: slug, order, title, body
   (structured JSON blocks — see step 5), videoUrl, audioWomanUrl, audioManUrl,
   playground (JSON: type + starter code + hint), published flag.
3. Build the design system from the demo as reusable components: Star8 logo, Button
   (primary/dark/ghost/green), Card, PathCard (hover tint + selected state), CodeBox,
   Nav (with language switcher placeholder), Footer. Put the color tokens in the
   Tailwind theme.
4. Set up next-intl with en/fa/ps and app/[locale]/ routing. Set <html dir="rtl"> for fa
   and ps, load Vazirmatn for them. Move all UI strings into messages/en.json,
   fa.json, ps.json — seed fa and ps from the STR object in the demo.
5. Define lesson body as an ordered array of typed blocks, e.g. { type: "paragraph" },
   { type: "code" }, { type: "visual", name: "TagAnatomy" }, { type: "callout" }.
   Port every visual from the demo (WebTrio, TagAnatomy, BoxModel, ClientServer,
   TableVisual) as React components referenced by name.
6. Build the public pages matching the demo: Home (hero, course grid, how-it-works,
   footer), Courses list, Course detail, About (with the mission text). Data comes
   from the database.
7. Write a Prisma seed that creates all six courses and every module from
   docs/NextNTech-Curriculum-Outline.md, and fully populates the 14 lessons that
   exist in the demo (text, visuals, code samples, playground config, quiz questions
   with explanations). Other modules exist but are marked "coming soon" (no
   published lessons).
8. README.md with local setup steps. .env.example.
9. Initialize git, create a private GitHub repo named "nextntech" using gh, commit, and push.
   (Already done: the repo is PDostiyar/NextNtech — just commit and push.)

Stop when `docker compose up -d && npx prisma migrate dev && npx prisma db seed &&
npm run dev` shows the home, courses, and course pages working in all three
languages. Report what you built and anything I need to check.
```

## Phase 2 — Lessons, playgrounds, video and audio

```text
Phase 2: build the lesson experience, matching the demo's LessonScreen.

1. Lesson page at /[locale]/courses/[courseSlug]/[lessonSlug]: header with course color,
   media bar, block-rendered body, playground, quiz, completion card with
   "See my progress" and "Next module" buttons.
2. Media bar:
   - Video button that expands an embedded youtube-nocookie.com player from videoUrl;
     if no videoUrl, show the demo's styled placeholder.
   - Audio: if audioWomanUrl/audioManUrl exist, play those MP3s with a small custom
     player. Otherwise fall back to the Web Speech API reading the lesson text, with
     the Woman/Man voice selection logic from the demo's ListenBar. Remember the
     chosen voice (user profile if logged in, localStorage for guests). Stop audio on
     navigation.
3. Playgrounds (one component per type, all using CodeMirror 6):
   - html: live preview in a sandboxed iframe, debounced; "phone" variant with the
     phone frame from the demo
   - python: real Python via Pyodide, lazy-loaded only when a Python lesson opens,
     with a loading state, stdout capture, and a 5-second execution timeout
   - sql: sql.js with the students table from the demo pre-loaded; results render
     in the TableVisual style; support any valid SQLite query
   - php: keep the demo's simulated echo/variables runner, clearly labelled
     "practice mode" (real PHP runtime is a later enhancement)
   - api: the demo's JSON server simulator (200 OK / 500 error)
   - hash: the demo's hashing demo, but use real SHA-256 via Web Crypto
   Every playground has a "Reset code" button.
4. Quiz: questions load WITHOUT correct answers. Submitting an option calls a server
   action that grades it, saves a QuizAnswer (if logged in), and returns
   correct/incorrect + explanation. Guests see a prompt: "Create a free account to
   save your progress" but can still answer.
5. When all questions in a lesson are answered by a logged-in user, upsert Progress as
   completed with the score, and update the Streak (daily goal, current, longest) —
   put streak logic in lib/streak.ts with unit tests covering day boundaries and
   time zones (use the user's local date sent from the client, validated).
6. Tests: unit tests for grading and streaks; one Playwright test that opens the
   HTML lesson, edits code, sees the preview change, and answers the quiz.
7. Lint, typecheck, test, update README, commit, push.
```

## Phase 3 — Accounts, social login, and child safety

```text
Phase 3: authentication and accounts, matching the demo's Login page design.

1. Auth.js v5 with Prisma adapter and providers: Google, Facebook, LinkedIn (OpenID
   Connect), Microsoft Entra ID (tenant "common" so personal Outlook/Hotmail and work
   accounts both work), and email + password (bcrypt, email verification via Resend).
2. Sign-up flow: first ask birth year.
   - 13 or older: all options available.
   - Under 13: hide social buttons; require the learner's first name, a password, and a
     parent/guardian email. Send the parent a consent email (Resend) with a signed,
     expiring link. Until consent, the account can learn but cannot save progress
     and the dashboard shows "Waiting for a parent to approve your account."
     Parent can also decline, which deletes the account.
3. Account settings page: name (used on certificates), preferred language, preferred
   voice, daily goal (1–5 modules), delete my account (deletes all data).
4. Nav shows avatar/name when signed in, with sign out.
5. Rate-limit sign-in, sign-up, and consent endpoints.
6. Update .env.example with every provider's variables, and add a
   docs/OAUTH-SETUP.md explaining step by step how I create credentials for Google
   Cloud, Meta for Developers, LinkedIn Developers, and Azure / Entra ID app
   registration, including the exact local and production redirect URIs.
7. Tests for the under-13 flow and consent token expiry. Lint, typecheck, commit, push.
```

## Phase 4 — Dashboard, certificates, and sharing

```text
Phase 4: progress, certificates, and invites — matching the demo's Dashboard and ShareModal.

1. Dashboard at /[locale]/dashboard (signed-in only): day streak, daily goal status,
   modules done, questions correct, certificates; learning history list
   (date, lesson, score) with pagination; a per-course progress bar in each course's
   color; a "saved answers" view where the learner can review past questions,
   their answer, and the explanation.
2. Certificates: when every published lesson in a course is completed, issue a
   Certificate automatically. Generate a PDF with pdf-lib in the demo's certificate
   style (star seal, course name, learner name, date, verification code and URL).
   Store it (use Vercel Blob or Supabase Storage via an interface so the storage
   backend can change). Dashboard shows download + "Share on LinkedIn" (LinkedIn
   add-to-profile URL for certifications).
3. Public verification page /verify/[code] showing course, first name, and date only.
4. Share / invite modal with the four customized messages from the demo (rename to
   NextNTech), using real intent URLs: X tweet intent, Facebook sharer, LinkedIn
   share-offsite; for Instagram, a "Copy caption" button. Links point to
   /register?ref=share-x (or -fb, -li, -ig); store ref on the user at signup.
5. Tests for certificate eligibility. Lint, typecheck, commit, push.
```

## Phase 5 — Admin area (built-in CMS)

```text
Phase 5: admin area at /admin, ADMIN role only (server-side checks on every page and action).

1. Content management:
   - Courses: create/edit/reorder, color, emoji, description
   - Modules: create/edit/reorder within a course
   - Lessons: a block editor for the body (add/reorder/delete paragraph, code,
     callout, visual blocks with a live preview beside it), video URL, audio URLs,
     playground type + starter code + hint, publish/unpublish
   - Quiz questions: 3–5 per lesson, options, correct answer, explanation;
     validation prevents publishing a lesson with fewer than 3 questions
   - Translations: for each lesson, add/edit fa and ps versions side by side with
     English, with RTL editing. Lessons without a translation fall back to English
     plus the "translated version coming soon" note from the demo.
2. Users: searchable list with role, signup date, locale, consent status, streak,
   modules completed; user detail page with full progress, answers, certificates.
   Admin can promote to ADMIN and can delete users.
3. Overview dashboard: total learners, active this week, lessons completed this week,
   most popular courses, signup ref sources (share-x, share-fb, etc.).
4. A script `npm run make-admin -- email@example.com` so I can make myself the first admin.
5. Tests for role protection. Lint, typecheck, commit, push.
```

## Phase 6 — Polish, deployment readiness, and CI

```text
Phase 6: production readiness.

1. Accessibility pass: keyboard navigation everywhere, focus states, alt text, aria
   labels on icon buttons, color contrast meeting WCAG AA, reduced-motion support.
2. RTL pass: check every page in fa and ps at 375px and desktop; fix any layout that
   doesn't mirror correctly. Code blocks and editors stay LTR inside RTL pages.
3. SEO: metadata per page, Open Graph images (generated with next/og using the star
   logo and course colors), sitemap.xml, robots.txt, hreflang for the three locales.
4. Legal pages (plain, friendly language): Privacy Policy, Terms, Parents page
   explaining what we collect and the consent process. Mark them clearly as drafts
   for legal review.
5. Performance: Lighthouse 90+ on home and a lesson page on mobile; lazy-load Pyodide,
   sql.js, and CodeMirror.
6. Error pages (404, 500) in the brand style; loading skeletons.
7. GitHub Actions CI: on every push and pull request run lint, typecheck, unit tests,
   and Playwright against a Postgres service container.
8. docs/DEPLOYMENT.md: step by step for (a) Vercel + Neon Postgres (recommended, free
   tier), and (b) Vercel + Supabase Postgres — including env vars, running
   `prisma migrate deploy`, seeding, OAuth production redirect URIs, custom domain
   nextntech.org, and Resend domain verification.
9. Final README with screenshots section, feature list, and architecture diagram (Mermaid).
10. Commit, push, and give me a summary of everything built, any known gaps, and the
    exact next steps to go live.
```

---

## After Phase 6 — Preview and hosting

1. Go to vercel.com → sign in with GitHub → **Add New Project** → import the repo.
2. Create a free Neon Postgres database (neon.tech) and paste its connection string as
   `DATABASE_URL` in Vercel's environment variables, along with everything in `.env.example`.
3. Deploy. Every push to GitHub now creates a **preview URL**, and pushes to `main`
   update production.
4. Run the migration and seed once against the production database (steps in
   `docs/DEPLOYMENT.md`), then `npm run make-admin -- your@email`.
5. Add your production redirect URIs to each OAuth provider, then connect the
   `nextntech.org` domain in Vercel.

## Useful follow-up prompts

- *"Add the next module from the curriculum outline: write the full lesson with visuals,
  playground, and 5 quiz questions, in the same style as the seeded lessons."*
- *"Write a script that generates woman and man MP3 narration for every published lesson
  using Azure AI Speech and uploads them, filling audioWomanUrl and audioManUrl."*
- *"Review the whole codebase for security issues, especially auth, admin routes, and
  playground sandboxing."*
- *"Something is broken on [page]: [describe it]. Find the cause and fix it with a test."*
