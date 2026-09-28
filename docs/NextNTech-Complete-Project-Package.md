# NextNTech.org — Complete Project Package

**Prepared by Pervaiz Dostiyar | July 2026 | Version 3.0**
Companion files: `nextntech-demo-v3-1.jsx` (clickable demo) · `NextNTech-Architecture-and-Setup-Guide.md` · `NextNTech-Curriculum-Outline.md`

---

## 1. Vision & brand

**Name:** NextNTech.org
**Tagline:** *What's next in technology — for you and your kids.*
**Mission statement (for About page and promos):** Every kid deserves to become a technology geek. No payment, no subscription, and no paywall should ever stand between a curious young mind and learning to build the future. NextNTech.org is a non-profit: every course, quiz, and certificate is free, forever, with no ads.

**Brand system (as implemented in the demo):**

| Element | Value | Where it's used |
|---|---|---|
| Ink navy | `#0E2258` | Nav, footer, code blocks, headings |
| Lapis blue | `#16337F` | Primary dark buttons, gradients |
| Saffron | `#F5A524` | Primary CTA buttons, star mark, highlights |
| Turquoise | `#2EC4B6` | Front-End course, accents |
| Course colors | purple `#7C5CD6` (Python), orange `#E4572E` (Mobile), green `#2E933C` (Careers), soft lapis `#2A4BAE` (Back-End), saffron (Full-Stack) | Each course carries its color into its module page, lesson borders, buttons, playground frame, and video player |
| Logo mark | Eight-pointed star (SVG in demo) | Logo, progress markers, certificate seal |
| Type | Nunito Sans / system UI (EN); Tahoma/Noto Naskh Arabic (RTL) | Site-wide |

Interaction rule from v3: course cards tint and lift in their own color on hover; the selected course shows a filled tint + ✓ badge.

Since NextNTech is also your existing content brand (YouTube, Facebook group, TikTok, #NextNTech), the platform becomes its education arm — every lesson video doubles as channel content, and every channel post funnels learners to the site. That loop is the growth engine (section 8).

## 2. Product specification (what the full site must do)

**Learner-facing:** course catalog with six paths, open in any order (no forced sequence); lessons made of short text + visuals + code samples; per-lesson **video** (3–5 min embed) and **audio narration** with man/woman voice choice; a **practice playground** in every lesson (live HTML/CSS/JS preview, phone-frame preview for mobile lessons, mini SQL console, Python/PHP runner, API simulator); 3–5 quiz questions per module with instant feedback and explanations, correct answers saved to the profile; progress dashboard with day streak, daily goal, modules done, question history; **named PDF certificate** per completed course with a public verification code; account creation via email or social login (Google, Facebook, LinkedIn, Outlook/Hotmail); invite/share buttons with per-network customized text (X, LinkedIn, Facebook, Instagram) linking to the registration page; language switcher **English / دری / پښتو with full RTL layout**.

**Admin-facing:** CMS (Strapi) where editors add courses/modules/lessons/quizzes and attach video URLs and translations without code; admin dashboard listing all users with their progress, streaks, answers, and certificates; role-based access (LEARNER / ADMIN).

## 3. Technology summary

Full detail lives in the Architecture guide; the one-paragraph version: **Next.js (React) front end on Vercel + Node/Express API + PostgreSQL with Prisma + Strapi CMS on Railway + Auth.js for all four social providers.** Simpler launch alternative: single Next.js app + Supabase. Estimated running cost **$0–15/month** at launch.

### 3.1 Additions for the v3 features

**Video.** Host lesson videos as *unlisted YouTube videos* on your NextNTech channel — free hosting, free CDN, and each video can also be published publicly to grow the channel. The CMS lesson entry gets a `videoUrl` field; the site embeds it in the course-colored player. (Alternative for a no-YouTube experience later: Cloudflare Stream, ~$5/1000 min viewed.)

**Audio narration.** Two tiers. Tier 1 (free, what the demo does): the browser's Web Speech API reads the lesson text with a male/female voice picked from the user's device — zero cost, zero storage, works offline-ish, but voice quality varies by device. Tier 2 (recommended for the full launch): pre-generate one MP3 per lesson per voice with **Azure AI Speech** neural voices (e.g., en-US-JennyNeural / en-US-GuyNeural — and Azure also offers Persian voices for Dari-adjacent narration). Roughly $16 per 1M characters, so the entire curriculum narrated in two voices costs a few dollars, one time. Store MP3s in object storage; the lesson player offers Woman/Man buttons that swap the audio file. Given your Azure background, this is a one-afternoon pipeline script.

**Languages & RTL.** Use `next-intl` (or Next.js built-in i18n routing) with locales `en`, `fa` (Dari), `ps` (Pashto); set `dir="rtl"` at the layout level for fa/ps, use CSS logical properties (`margin-inline-start`, etc. — the demo already does), and load an Arabic-script font (Vazirmatn or Noto Naskh Arabic). UI strings live in three JSON files (the demo's `STR` object is the seed — please review my Dari/Pashto translations). Lesson content translation is a data question, solved next.

### 3.2 Database schema additions (extends the Architecture guide schema)

```prisma
model Lesson {
  // ...existing fields...
  videoUrl     String?            // YouTube embed URL
  audioWomanUrl String?           // pre-generated MP3 (Tier 2)
  audioManUrl   String?
  translations LessonTranslation[]
}

model LessonTranslation {
  id        String @id @default(cuid())
  lessonId  String
  locale    String                // "fa" | "ps"
  title     String
  cmsId     String                // Strapi entry holding translated body
  videoUrl  String?               // optional dubbed/subtitled video
  lesson    Lesson @relation(fields: [lessonId], references: [id])
  @@unique([lessonId, locale])
}

model User {
  // ...existing fields...
  preferredLocale String @default("en")
  preferredVoice  String @default("woman")
}
```

Rule: if a translation exists for the user's locale, serve it; otherwise serve English with the "translated version coming" note (as in the demo). This lets you launch with English content and add Dari/Pashto lesson-by-lesson — which also feeds your planned Pashto/Dari content lane.

## 4. Content production workflow (per lesson)

1. Write the lesson in Strapi: intro, visual, code sample, playground starter, 3–5 quiz questions (the 14 demo lessons are your templates — extract their text as the first entries).
2. Record a 3–5 min video (screen + voice; your existing YouTube workflow) → upload unlisted → paste URL into the lesson.
3. Run the TTS script → two MP3s attached automatically.
4. Translate (yourself or a volunteer) → add a LessonTranslation entry when ready.
5. Publish. The site picks it up with no deployment.

Throughput estimate: one polished lesson ≈ 2–3 hours all-in. The full six-course curriculum (~180 lessons per the outline) is a year of evenings solo — so recruit 2–3 volunteer contributors early (Strapi's editor roles exist exactly for this), and launch when Front-End + Python are complete rather than waiting for everything.

## 5. Build roadmap (realistic, part-time)

| Phase | Weeks | Deliverable |
|---|---|---|
| 1 — Foundation | 1–4 | Next.js site with demo's design system, email+Google auth, Postgres schema, Strapi wired |
| 2 — Learning loop | 5–8 | Lessons, playgrounds, quizzes, progress, streaks; Front-End course fully loaded |
| 3 — Polish | 9–12 | Remaining social logins, video embeds, TTS MP3 pipeline, certificates + verification page, share buttons |
| 4 — Languages | 13–16 | fa/ps UI, RTL, first translated lessons; Python course loaded |
| 5 — Launch | 17 | Domain live, legal pages, announcement across your NextNTech + LinkedIn channels |
| 6 — Grow | ongoing | Remaining courses, admin analytics, volunteer editors, community feedback |

## 6. Pre-launch checklist

Domain and SSL (nextntech.org — verify availability and register the .com too if free); privacy policy + terms in plain language; **parental-consent flow for under-13s (COPPA/GDPR-K)** — the single most important legal item since this targets kids, and note social providers themselves require age 13+, so offer email signup with parental consent as the under-13 path; cookie-less analytics (Plausible/Umami) to stay privacy-friendly; OAuth redirect URIs updated to production; database backups scheduled; accessibility pass (keyboard, contrast, screen readers — the audio feature helps here); load the first two complete courses; test RTL on real devices; and a feedback button on every lesson.

## 7. Non-profit setup (worth deciding early)

You can launch simply as a free project, but formal non-profit status (e.g., US 501(c)(3)) unlocks: free/discounted software (Microsoft, Google for Nonprofits — free Workspace, ad grants), donation eligibility to cover hosting, and credibility for school partnerships. It also cleanly separates this from your consulting LLC and FHI 360 role. A fiscal sponsor (like Open Collective) is a lightweight middle path — donations without incorporating yet.

## 8. Growth plan (leveraging what you already have)

Every lesson video is a YouTube/TikTok short or full video on your channels with "full free lesson at NextNTech.org" — the site and channel feed each other. LinkedIn: your Microsoft-tech audience includes exactly the parents this serves; a launch post + monthly progress posts fit your existing cadence. The Pashto/Dari lane: translated lessons become content for the rebranded Facebook page, reaching diaspora families — likely the most underserved and grateful audience. The invite buttons with referral tags (`?ref=share-x`) tell you which channel converts. Upwardly Global mentees and community groups make ideal beta testers before public launch. Certificates are shareable to LinkedIn by design — each learner's certificate post is free marketing.

## 9. Decision list (open items for you)

Confirm the name/domain (NextNTech.org availability, and whether the education platform shares the brand or becomes "NextNTech Academy"); Supabase-simple vs. full Express+Strapi stack; Web-Speech-only audio at launch vs. Azure MP3 pipeline; launch scope (Front-End + Python first is my recommendation); non-profit formalization timing; and who translates — you, volunteers, or launch English-first.

---

*This package + the demo is everything needed to brief a developer, a volunteer, or a funder — or to start building Phase 1 yourself.*
