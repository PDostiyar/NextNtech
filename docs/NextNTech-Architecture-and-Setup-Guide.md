# NextNTech.org — Technical Architecture & Setup Guide

**Prepared for:** Pervaiz Dostiyar | NextNTech
**Version:** 1.0 — July 2026

---

## 1. What we're building

A free, non-profit learning platform with two faces:

- **Public front end** — marketing pages, course catalog, lessons, quizzes, and account pages. Visitors see high-level information; registered users see their own progress, streaks, saved answers, and certificates.
- **Admin back end** — where you (and future content editors) manage courses, modules, lessons, and quiz questions through a CMS, and where admins can view every registered user's progress and account information.

## 2. Recommended stack (React + Node.js)

| Layer | Choice | Why |
|---|---|---|
| Front end | **Next.js 15 (React)** | Server-side rendering = fast pages + good SEO for a content site; free hosting on Vercel |
| Styling | Tailwind CSS | Fast to build, consistent, mobile-first |
| API / back end | **Node.js + Express** (or Next.js API routes to start) | Matches your curriculum, huge ecosystem |
| Database | **PostgreSQL** | Free, reliable, handles relational data (users → progress → answers) perfectly |
| ORM | **Prisma** | Type-safe schema, easy migrations, readable code |
| CMS | **Strapi (self-hosted, free)** | Non-developers can add lessons/quizzes without touching code; has roles & a REST/GraphQL API |
| Auth | **Auth.js (NextAuth)** | Built-in providers for Google, Facebook, LinkedIn, Microsoft (Outlook/Hotmail) + email/password |
| Certificates | `pdf-lib` or Puppeteer on the server | Generates a PDF with the learner's name from their account |
| Hosting | Vercel (front end, free) + Railway/Render (API + Postgres + Strapi, ~$5–15/mo) | Lowest cost for a non-profit; can consolidate on one VPS later |

**Simpler alternative:** a single Next.js app (API routes instead of separate Express) + Supabase (Postgres + auth + storage in one free tier). Fewer moving parts; recommended if you want to launch fastest. Everything below still applies — Supabase replaces the Express + Auth.js + Postgres rows.

## 3. System architecture

```
 Visitors / Learners                       Admins & Editors
        │                                        │
        ▼                                        ▼
 ┌─────────────────┐                   ┌───────────────────┐
 │  Next.js site    │                  │  Strapi CMS admin  │
 │  (Vercel)        │                  │  (content editing) │
 └───────┬─────────┘                   └────────┬──────────┘
         │ REST/JSON                            │
         ▼                                      ▼
 ┌──────────────────────────────────────────────────────┐
 │            Node.js / Express API  (Railway)          │
 │  auth · progress · quiz grading · certificates       │
 └───────────────────────┬──────────────────────────────┘
                         ▼
              ┌────────────────────┐
              │   PostgreSQL DB     │
              └────────────────────┘

 Auth.js  ⇄  Google · Facebook · LinkedIn · Microsoft (OAuth)
```

Content flows one way: editors write lessons in Strapi → the site fetches and renders them. Learner data (accounts, answers, progress) lives in your own Postgres tables, owned by the API — never inside the CMS.

## 4. Database schema

```prisma
model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  passwordHash  String?              // null when using social login
  role          Role      @default(LEARNER)   // LEARNER | ADMIN
  createdAt     DateTime  @default(now())
  accounts      OAuthAccount[]
  progress      Progress[]
  answers       QuizAnswer[]
  certificates  Certificate[]
  streak        Streak?
}

model OAuthAccount {                 // Google, Facebook, LinkedIn, Microsoft
  id                String @id @default(cuid())
  provider          String           // "google" | "facebook" | "linkedin" | "microsoft"
  providerAccountId String
  userId            String
  user              User   @relation(fields: [userId], references: [id])
  @@unique([provider, providerAccountId])
}

model Course {
  id       String   @id @default(cuid())
  slug     String   @unique          // "front-end-development"
  title    String
  summary  String
  order    Int
  modules  Module[]
}

model Module {
  id       String   @id @default(cuid())
  courseId String
  title    String
  order    Int
  course   Course   @relation(fields: [courseId], references: [id])
  lessons  Lesson[]
}

model Lesson {
  id        String   @id @default(cuid())
  moduleId  String
  title     String
  order     Int
  cmsId     String?          // reference to the Strapi entry holding the rich content
  module    Module   @relation(fields: [moduleId], references: [id])
  questions QuizQuestion[]
  progress  Progress[]
}

model QuizQuestion {          // 3–5 per lesson/module
  id        String   @id @default(cuid())
  lessonId  String
  prompt    String
  options   Json              // ["A", "B", "C"]
  answerIdx Int
  explain   String            // shown after answering
  lesson    Lesson   @relation(fields: [lessonId], references: [id])
  answers   QuizAnswer[]
}

model QuizAnswer {            // every answer saved to the profile
  id          String   @id @default(cuid())
  userId      String
  questionId  String
  selectedIdx Int
  isCorrect   Boolean
  answeredAt  DateTime @default(now())
  user        User         @relation(fields: [userId], references: [id])
  question    QuizQuestion @relation(fields: [questionId], references: [id])
}

model Progress {
  id          String    @id @default(cuid())
  userId      String
  lessonId    String
  status      String    // "started" | "completed"
  score       Int?      // correct answers on this lesson's quiz
  completedAt DateTime?
  user        User    @relation(fields: [userId], references: [id])
  lesson      Lesson  @relation(fields: [lessonId], references: [id])
  @@unique([userId, lessonId])
}

model Streak {
  id           String   @id @default(cuid())
  userId       String   @unique
  current      Int      @default(0)
  longest      Int      @default(0)
  dailyGoal    Int      @default(1)      // modules per day
  lastActiveOn DateTime?
  user         User     @relation(fields: [userId], references: [id])
}

model Certificate {
  id        String   @id @default(cuid())
  userId    String
  courseId  String
  issuedAt  DateTime @default(now())
  pdfUrl    String
  verifyId  String   @unique   // public code printed on the certificate
  user      User     @relation(fields: [userId], references: [id])
}

enum Role { LEARNER ADMIN }
```

## 5. Key API endpoints

```
POST /api/auth/*                     handled by Auth.js (social + email)
GET  /api/courses                    catalog (public)
GET  /api/lessons/:id                lesson content (pulled from CMS)
POST /api/lessons/:id/answers        submit quiz answer → graded, saved
GET  /api/me/progress                learner dashboard data
GET  /api/me/history                 learning history & saved answers
POST /api/certificates/:courseId     issued when 100% of course complete
GET  /api/verify/:verifyId           public certificate verification
GET  /api/admin/users                ADMIN only: all users + progress
GET  /api/admin/users/:id            ADMIN only: one user's full detail
```

Certificate rule: when a user's completed-lesson count for a course equals the course's total lessons, the API generates a PDF (learner name + course + date + verify code) and stores the URL on the Certificate row.

## 6. Social login setup (one-time, ~15 min each)

1. **Google:** console.cloud.google.com → create OAuth 2.0 credentials → redirect URI `https://nextntech.org/api/auth/callback/google`.
2. **Facebook:** developers.facebook.com → new app → Facebook Login product → same redirect pattern with `/facebook`.
3. **LinkedIn:** developer.linkedin.com → app → "Sign In with LinkedIn using OpenID Connect".
4. **Microsoft (Outlook/Hotmail):** portal.azure.com → Entra ID → App registration → account type "Personal Microsoft accounts" (or "All accounts") → redirect `/api/auth/callback/microsoft-entra-id`. *(This one will feel familiar from your day job.)*

Store each client ID/secret in environment variables; Auth.js wires the buttons automatically.

## 7. Social sharing ("Invite" button)

No API keys needed — use share URLs with pre-filled, per-network text:

```
X:         https://twitter.com/intent/tweet?text={encoded message + link}
Facebook:  https://www.facebook.com/sharer/sharer.php?u={link}&quote={message}
LinkedIn:  https://www.linkedin.com/sharing/share-offsite/?url={link}
Instagram: no web share URL — show "Copy caption" + copy the text to clipboard
```

Point the link at `https://nextntech.org/register?ref=share-x` etc., so you can measure which network brings learners.

## 8. Local development setup

```bash
# Prerequisites: Node.js 20+, PostgreSQL 16 (or Docker), Git

# 1. Create the app
npx create-next-app@latest nextntech --typescript --tailwind --app
cd nextntech

# 2. Install core packages
npm install prisma @prisma/client next-auth @auth/prisma-adapter pdf-lib

# 3. Database
npx prisma init                    # creates prisma/schema.prisma
# paste the schema from section 4, set DATABASE_URL in .env
npx prisma migrate dev --name init

# 4. Strapi CMS (separate folder)
npx create-strapi-app@latest nextntech-cms --quickstart
# In Strapi admin: create "Lesson Content" collection (title, richText body,
# images). Give the site's API token read-only access.

# 5. Environment variables (.env.local)
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...                # openssl rand -base64 32
GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET
FACEBOOK_CLIENT_ID / ...
LINKEDIN_CLIENT_ID / ...
AZURE_AD_CLIENT_ID / ...
STRAPI_URL / STRAPI_TOKEN

# 6. Run
npm run dev                        # site on :3000, Strapi on :1337
```

## 9. Deployment

1. Push the repo to GitHub.
2. **Vercel:** import the Next.js repo → add env vars → deploy. Point the `nextntech.org` domain at Vercel.
3. **Railway (or Render):** one project with three services — Postgres, the Express API (if separated), and Strapi. Railway gives each a URL; set those in Vercel's env vars.
4. Run `npx prisma migrate deploy` against the production database.
5. Add the production redirect URIs to each OAuth provider.

Estimated running cost: **$0–15/month** at launch (Vercel free, Railway hobby tier), scaling gracefully as learners grow.

## 10. Safety & compliance notes (important — this is for kids)

Because minors will register, plan for: a privacy policy and terms written in plain language; parental-consent flow for under-13 users where required (COPPA in the US, GDPR-K in the EU — social logins also have their own minimum-age rules, typically 13); collecting the minimum data (name, email, progress — nothing else); no ads and no selling of data (states your non-profit mission and simplifies compliance); and moderated or disabled user-to-user communication at launch. Worth a short review with a lawyer before public launch.

## 11. Suggested build phases

1. **Phase 1 (MVP, ~4–6 weeks):** Next.js site, email + Google login, Front-End course only, quizzes, basic progress.
2. **Phase 2:** remaining social logins, streaks/daily goals, dashboard, Strapi CMS handover, admin user view.
3. **Phase 3:** certificates (PDF + public verification page), invite/share buttons, Back-End + Full-Stack + Python courses.
4. **Phase 4:** mobile/careers courses, code playground (embed via Sandpack or StackBlitz SDK), Dari/Pashto localization if desired.
