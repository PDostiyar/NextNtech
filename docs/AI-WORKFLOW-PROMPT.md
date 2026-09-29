# AI Project Workflow Prompt (master copy)

> **How to use this file**
>
> - **In a repo that already has it:** `CLAUDE.md` imports this file, so Claude
>   Code follows it automatically. Nothing to paste.
> - **For a new or other project:** open a Claude Code chat on that repo.
>   Paste this whole file, then add underneath:
>   `Adopt this workflow in this repo (section 6). Main domain: <example.com>. Database: <none/PostgreSQL>.`
>   The AI follows section 6. It saves this file unchanged as
>   `docs/AI-WORKFLOW-PROMPT.md`, writes the project's facts into `CLAUDE.md`,
>   and sets up the README, CI, screenshots, etc.
> - Keep this master copy up to date. When the workflow changes, update it here
>   first, then copy it to the other repos.

---

You are working on one of my website/app projects. Follow this workflow and
these rules in every session, for every change, whatever the technology.

## Project facts (per project; kept in that repo's `CLAUDE.md`)

```text
Project name:        <e.g. Tasty Kabob Plus>
GitHub repo:         <owner/repo>  (private)
Project type:        <Static HTML | Next.js/Node.js | Node.js API | PHP | other>
Tech stack:          <e.g. HTML/CSS/JS | Next.js 16 + React + Tailwind | Express + PostgreSQL>
Database:            <none | PostgreSQL (cPanel) | MySQL (cPanel)>
Production URL:      <https://example.com>          ← deploys branch `main`   (e.g. https://curerelief.org)
Staging URL:         <https://stage.example.com>    ← deploys branch `staging` (e.g. https://stage.curerelief.org)
Hosting:             cPanel (Git Version Control, Node.js apps, PostgreSQL, Terminal, SSH)
Secrets needed:      <list env var NAMES only, never values>
```

Read these facts from `CLAUDE.md`. If they're missing, look in the README;
if they aren't there either, ask me. Never guess domains or credentials.

## 1. The workflow (same for every project)

```text
 AI chat (Claude Code, main option)       GitHub Codespaces (second option,
 or a manual edit                         quick preview / review only)
            │                                      │
            ▼                                      ▼
   ┌──────────────── GitHub branch: staging ────────────────┐
   └───────────────────────────┬────────────────────────────┘
                               │ deploy (pull + build)
                               ▼
        Hosting STAGING subdomain: stage.<main domain>  (e.g. stage.curerelief.org)
        real-world preview · staging database · test/sandbox keys
                               │  owner reviews and approves
                               ▼
          GitHub Pull Request: staging → main  (CI must be green)
                               │ merge
                               ▼
   ┌───────────────── GitHub branch: main ──────────────────┐
   └───────────────────────────┬────────────────────────────┘
                               │ deploy (pull + build)
                               ▼
        Hosting PRODUCTION site: <main domain>  (e.g. curerelief.org)
        production database · live keys
```

- **`staging`** is the default branch and the working branch. Every change
  lands here first.
- **`main`** is production. It only changes by merging a PR from `staging`.
- **Naming rule:** the staging site is always **`stage.<main domain>`**
  (`curerelief.org` → `stage.curerelief.org`). Don't use `test.`, `staging.` or
  `dev.`.
- Each branch has its **own hosting environment**, with its own subdomain,
  database and credentials. Staging never uses production data or live
  payment keys.
- **GitHub Codespaces** is a secondary preview tool. It stops when idle and is
  deleted after its retention period, so the staging subdomain is the real
  preview.

## 2. Rules for the AI

1. **Branch.** Work on `staging`. Commit and push to `staging` directly; this
   is pre-approved. If the session assigns a different working branch, push
   it and open a PR into `staging` (you may merge that PR once checks pass).
   **Never push to or merge into `main` without my explicit OK in this chat.**
   After a staging → main merge, fast-forward `staging` to `main` so both
   branches point at the same commit.
2. **Test before pushing.** Run the project's checks (lint, typecheck, build,
   tests; for static sites, check links and open the pages), and click through
   the changed pages in a real browser if you can. Report honestly what you
   tested and what you couldn't test.
3. **Secrets.** Never commit `.env`, `.env.local`, keys, tokens or passwords.
   Commit only an `.env.example` with empty values. Hosting env vars are set
   in cPanel; Codespaces keys go in Codespaces secrets.
4. **README is mandatory.** Every new feature, page, function, API route,
   env var, database table/migration, dependency or deploy step must be
   documented in `README.md` **in the same commit or PR**. Add a line to the
   README's **Feature log** each time. A change without its README update
   isn't done. If a change affects the look of a page, retake that page's
   screenshot in `docs/screenshots/`. If it changes colors or fonts, update
   the color palette table.
5. **Standard README format.** Keep `README.md` in the standard structure in
   section 3 below. If the README doesn't follow it yet, restructure it,
   keeping all existing content.
6. **Save this prompt.** If `docs/AI-WORKFLOW-PROMPT.md` doesn't exist in the
   repo, save this prompt there unchanged (it's the shared master copy).
   Make sure `CLAUDE.md` contains the line `@docs/AI-WORKFLOW-PROMPT.md`
   and a filled-in **Project facts** block for this repo.
7. **Small, reviewable changes.** Make one topic per commit or PR, with clear
   commit messages. Keep generated files and lockfiles consistent by using the
   project's own tools. Never hand-edit them.
8. **CI.** Keep a GitHub Actions check (`.github/workflows/ci.yml`) that runs
   on pushes and PRs to `main` and `staging` (lint + build for apps, an
   HTML/link check for static sites). A PR into `main` needs green CI.
9. **Ask before anything hard to undo:** deleting data, dropping tables,
   changing DNS or domains, rotating keys, force-pushing, or deploying to
   production.
10. **Explain simply.** I review changes as the site owner. After each change,
    summarize in plain language what changed, where to see it on the staging
    URL, and what I should check.

## 3. Standard README structure (all private projects)

Use these sections in this order. Keep the headings even when a section is
short. Write "Not used" rather than deleting a section (e.g. Database: Not used).

```text
# <Project name>
<one-paragraph description: what it is, who it's for>

| Environment | URL | Git branch | Hosting |
|---|---|---|---|
| Production | https://example.com | main | cPanel → <app/doc root> |
| Staging | https://stage.example.com | staging | cPanel → <app/doc root> |
| Repo | github.com/<owner>/<repo> | – | private |

### Overview                            (what visitors can do, in plain words)
<main screenshot>                        docs/screenshots/home.jpg
<table of screenshots of the key pages, including mobile and dark mode if there is one>

## Table of contents
## 1. Workflow: staging → production     (the diagram above + repo-specific notes)
## 2. Tech stack                          (table: framework, frontend, backend, data, auth, CI + versions)
   ### Architecture: frontend and backend (diagram: browser ↔ server ↔ database/external services;
                                          "Frontend only" for static HTML sites)
   ### Data structure (hierarchy and keys)  (tree of the data: content files, DB tables/fields,
                                          API request/response shapes)
   ### Folder overview                    (top-level folders in one line each; full tree in §9)
## 3. Run it locally                      (prerequisites, install, run, scripts table)
## 4. Configuration and secrets           (every env var: name, purpose, where set; never values)
## 5. Deploying (hosting)                 (staging + production: cPanel steps for THIS project type,
                                          how to update after a merge, rollback)
## 6. Preview in GitHub Codespaces        (second option; lifecycle: stop/delete, cost)
## 7. How the application works           (site map, main user flows, data flow)
## 8. Pages, sections and design          (design system: COLOR PALETTE table
                                          [token | light hex | dark hex | used for], fonts table
                                          [role | font | where set], layout rules; then a
                                          page-by-page table of sections)
## 9. Project structure                   (folder tree with one-line explanations)
## 10. Making changes manually            (recipes for the common edits)
## 11. Making changes with AI             (how to prompt, review, approve; link to this prompt)
## 12. Database                           (engine, tables, migrations, backups; or "Not used")
## 13. Testing checklist                  (before merging staging → main)
## 14. Production notes                   (go-live checklist, known limitations)
## 15. Troubleshooting                    (problem → fix table)
## 16. Feature log                        (newest first: date · change · PR link)
```

## 4. Hosting playbook (cPanel)

Use the part that matches the project type. Labels can differ slightly
between hosting providers and cPanel versions.

### 4.1 One-time setup for every project

1. **Subdomains.** Go to cPanel → **Domains** → **Create A New Domain**,
   create `stage.<domain>` (e.g. `stage.curerelief.org`), and note its
   document root. Production uses the main domain.
2. **HTTPS.** Go to cPanel → **SSL/TLS Status** → **Run AutoSSL** for both
   domains.
3. **SSH deploy key (private repos).** Open cPanel → **Terminal** and run
   `ssh-keygen -t ed25519 -C "cpanel-<repo>" -f ~/.ssh/id_ed25519 -N ""`
   (skip this if the key already exists), then `cat ~/.ssh/id_ed25519.pub`.
   On GitHub, go to the repo → **Settings → Deploy keys → Add**, paste the
   key and leave write access **off**. Back in Terminal, run
   `ssh -T git@github.com` once and answer `yes`. One key per repo: GitHub
   won't accept the same deploy key on two repos. For more repos, create
   `~/.ssh/id_<repo>` keys and add `Host github-<repo>` entries to
   `~/.ssh/config`.
4. **Clone twice**, once per environment. Go to cPanel →
   **Git™ Version Control → Create**, set the clone URL to
   `git@github.com:<owner>/<repo>.git`, and use a separate repository path
   for each environment (e.g. `~/repos/<repo>-staging` checked out on
   `staging`, `~/repos/<repo>-prod` on `main`).

### 4.2 Static HTML sites

- Add `.cpanel.yml` to the repo so **Deploy HEAD Commit** copies files to the
  document root. The staging and production clones each deploy to their own
  domain folder. Example:

  ```yaml
  ---
  deployment:
    tasks:
      - export DEPLOYPATH=/home/<cpanel-user>/<doc-root-folder>/
      - /bin/cp -R *.html css js images $DEPLOYPATH
  ```

  The two environments need different `DEPLOYPATH`s. Either keep the file
  on each branch with its own path, or have the script choose the path by
  branch: `git rev-parse --abbrev-ref HEAD`.
- **To update:** Git Version Control → **Manage → Pull or Deploy** →
  **Update from Remote**, then **Deploy HEAD Commit**.

### 4.3 Node.js / Next.js / React apps

- **Requirements:** use the Node.js version the framework needs (Next.js 16
  needs ≥ 20.9; prefer 22).
- **New cPanel: AI App Hosting / "Deploy Node.js apps from Git".** Pick the
  domain (the `stage.` subdomain first), then pick the repo and branch.
  - Install: `npm ci`
  - Build: `npm run build`
  - Start: `npm run start`, or startup file `server.js` if it asks for a file.
  - Add env vars in the app settings.
- **Classic cPanel: Setup Node.js App.**
  1. **Create Application** with: Node version, mode *Production*,
     application root = the clone path, URL = the domain, startup file
     `server.js`, and the env vars.
  2. Click **Run NPM Install**.
  3. Paste the "Enter to the virtual environment" command into Terminal, then
     run `npm run build`.
  4. Click **Restart**.
- **Next.js on Passenger** needs a startup file. Use a small `server.js`
  (Next.js custom server: `next({ dev: false })` + `http.createServer`,
  listening on `process.env.PORT`).
- **Build-time env vars:** for Next.js, `NEXT_PUBLIC_*` values are baked in
  at **build** time. Rebuild after changing them.
- **To update after a merge:** pull (Git Version Control → Update from
  Remote, or redeploy in AI App Hosting), then run `npm ci && npm run build`
  in the app's virtual environment, then **Restart**.
- **Common failures:**
  - build "Killed" / out of memory → hosting memory limit; ask the host, or
    set `NODE_OPTIONS=--max-old-space-size=1024`
  - images failing → set `images.unoptimized`
  - 503 → check the Node version and `stderr.log`

### 4.4 PostgreSQL (cPanel)

1. **Create the database.** Go to cPanel → **Databases → PostgreSQL Database
   Wizard** (or **PostgreSQL Databases**) and create **one database per
   environment**, e.g. `<cpuser>_<app>_staging` and `<cpuser>_<app>_prod`.
   cPanel adds your account prefix.
2. **Create a user per environment** with a strong generated password, then
   **Add user to database** → **ALL PRIVILEGES**.
3. **Connection string**, stored as an env var in the app's hosting settings
   and never in the repo:
   `DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<database>`.
   Apps on the same server use `localhost`.
4. **Schema changes go through migrations**, using the project's ORM or tool
   (e.g. Prisma `npx prisma migrate deploy`, Drizzle, or plain SQL files in
   `db/migrations/`), committed to the repo. Run them on **staging first**,
   then production as part of the deploy.
5. **Browse data** with cPanel → **phpPgAdmin** (if provided).
6. **Back up before any production migration:**
   `pg_dump "$DATABASE_URL" > backup-$(date +%F).sql` in Terminal, or use
   cPanel → **Backup** → download the PostgreSQL database.
7. **Local development:** use a local PostgreSQL (or Docker) with its own
   `DATABASE_URL` in `.env.local`. Hosting databases usually don't accept
   remote connections.

### 4.5 Optional: auto-deploy on push

For automatic deploys, add a GitHub Actions workflow that runs on push to
`staging` (and, later, `main`). It connects over SSH to the hosting account
(with a separate SSH key stored as GitHub Actions secrets) and runs the pull +
build + restart commands above. Set this up only when I ask. Until then,
deploys are a button click in cPanel.

## 5. Definition of done (every change)

- [ ] Change is on `staging` and pushed
- [ ] Checks pass (lint/build/tests or HTML check); CI is green
- [ ] Tested in a browser (or clearly stated what couldn't be tested)
- [ ] `README.md` updated (the relevant section **and** the Feature log; screenshots / color palette if the look changed)
- [ ] No secrets committed
- [ ] Told me in plain language what changed and what to check on the staging URL
- [ ] `main` untouched until I approve the staging → main merge

## 6. Adopting this in a repo (first session only)

When I paste this prompt into a repo that doesn't follow it yet, do the
following in order. Report progress as you go, and skip any step that's
already done.

1. **Look first.** Read the code, `package.json` or other build files, the
   existing README and any hosting files. Work out the project type, stack,
   pages and data. Ask me only for facts you can't find: domains, database,
   secret *names*.
2. **Branches.** If `staging` doesn't exist, create it from `main` and push it.
   Tell me to set **`staging` as the default branch** (GitHub → Settings →
   General → Default branch). I have to do that step myself.
3. **Save the workflow.** Save this prompt unchanged as `docs/AI-WORKFLOW-PROMPT.md`.
   Create or extend `CLAUDE.md` so it has `@docs/AI-WORKFLOW-PROMPT.md` and
   a filled-in **Project facts** block. Keep anything already in `CLAUDE.md`.
4. **Secrets hygiene.** Make sure `.gitignore` covers `.env*` (but not the
   example file). Add `.env.example` (or `.env.local.example`) listing every
   env var name with empty values. If a secret is already committed, **stop
   and tell me**; don't try to rewrite history yourself.
5. **CI.** Add `.github/workflows/ci.yml` that runs on pushes and PRs to
   `main` and `staging`:
   - apps: install, lint, build (and tests, if any);
   - static sites: an HTML check and a broken-link check.
   Fix whatever makes it fail.
6. **Hosting files for this project type** (section 4):
   - static HTML: `.cpanel.yml`;
   - Next.js on Passenger: `server.js`;
   - database: a migrations folder or ORM setup.
   Never put real paths with passwords or keys in them.
7. **Codespaces (second option).** Add `.devcontainer/devcontainer.json`
   with the right runtime, the install command, a forwarded dev port that
   opens in a browser tab (`onAutoForward: openBrowser`), and any secret
   names. For Next.js, allow `*.app.github.dev` in `allowedDevOrigins`.
8. **README.** Rewrite `README.md` in the standard structure (section 3),
   keeping all existing useful content. It must include:
   - the environments table (`stage.<domain>` / `<domain>`);
   - an overview, with **screenshots** taken from a real running build and
     saved in `docs/screenshots/` (home, key pages, mobile, dark mode if any);
   - frontend/backend architecture, the data structure and a folder overview;
   - the **color palette** and fonts, read from the actual CSS/theme files;
   - cPanel deploy steps for staging and production, including rollback;
   - a Feature log that starts with this adoption.
9. **Test.** Run the checks and open the site in a browser. Then push
   everything to `staging` and open a PR `staging` → `main`. **Don't merge**
   until I say so.
10. **Hand-off.** Tell me, in plain language:
    - what you set up;
    - what I must do myself (default branch; the cPanel subdomain `stage.<domain>`,
      SSL, deploy key and app or Git deploy; hosting env vars; database);
    - what you couldn't verify.
