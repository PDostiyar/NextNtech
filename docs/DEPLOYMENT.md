# Hosting & previews

This guide explains how to put NextNTech.org on the internet — and how to get a quick,
temporary preview without any hosting at all.

| I want to… | Use | Time |
| --- | --- | --- |
| Show the site to someone **right now**, temporarily | [GitHub Codespaces](#1-quick-temporary-preview-github-codespaces) | ~5 min |
| Host the **real site** on my cPanel hosting | [cPanel → AI App Hosting (Node.js)](#3-host-on-cpanel-ai-app-hosting-nodejs) | ~30 min |
| Host on a free cloud platform | [Vercel + Neon](#4-alternative-vercel--neon-free-tier) | ~20 min |

---

## 1. Quick temporary preview: GitHub Codespaces

A Codespace is a computer in the cloud that runs the project for you, in your browser.
The repository includes a ready-made setup (`.devcontainer/`) that installs everything,
creates a database, loads the courses, and starts the site.

1. On GitHub, open the repository and switch to the branch you want to preview
   (`stage` to test new work, `main` for what's live).
2. Click the green **Code** button → **Codespaces** tab → **Create codespace on stage**.
3. Wait 3–5 minutes the first time. When the terminal says **"Ready"**, the site starts
   automatically and a browser tab opens. (If not: open the **Ports** tab and click the
   globe icon next to port **3000**.)
4. **To share it with someone:** in the **Ports** tab, right-click port 3000 →
   **Port Visibility → Public**, then copy the address (it looks like
   `https://<name>-3000.app.github.dev`) and send it.

Good to know:

- The preview only works **while the Codespace is running**. It stops after ~30 minutes
  without activity; reopen it from **Code → Codespaces** to start it again.
- GitHub gives personal accounts a free monthly allowance of Codespaces hours. Delete old
  Codespaces you no longer need (**github.com/codespaces**).
- This is for previews and development only — **never** for the real site, and don't put
  real learner data in it.
- The preview runs in development mode, so the first click on each page is a little slow.

## 2. What the app needs from any host

NextNTech.org is a **Node.js application** (Next.js), not a set of static files. Any host
needs to provide:

| Requirement | Value |
| --- | --- |
| Node.js | version **20 or newer** (22 recommended) |
| Database | **PostgreSQL 16** (or 14+) |
| Memory for building | about **2 GB** RAM during `npm run build` |
| Install command | `npm ci` |
| Build command | `npx prisma migrate deploy && npm run build` |
| Start command | `npm start` (listens on the `PORT` the host provides) |
| First-time content | `npx prisma db seed` (run once; safe to re-run) |

Environment variables (see [`.env.example`](../.env.example) for the full, documented
list):

| Variable | Example | Notes |
| --- | --- | --- |
| `DATABASE_URL` | `postgresql://user:password@host:5432/nextntech?schema=public` | From your database provider. Keep it secret. |
| `NEXT_PUBLIC_SITE_URL` | `https://nextntech.org` | The public address of this copy of the site |
| `NODE_ENV` | `production` | Most hosts set this automatically |

More variables (login providers, email) are added in later build phases — each one will be
listed in `.env.example`.

## 3. Host on cPanel: AI App Hosting (Node.js)

Modern cPanel offers several ways to build a site. In the **"How do you want to build?"**
screen, choose:

| Option | Use it for NextNTech? |
| --- | --- |
| WordPress | ❌ No — that's a different kind of website |
| Sitejet Builder | ❌ No — drag-and-drop pages, can't run our app |
| **AI App Hosting** — "Deploy Node.js apps from Git" | ✅ **Yes — choose this** |
| Custom Code — "Upload your own files" | ❌ No — for static files; our app needs a running Node.js server |

> The exact labels and screens depend on your hosting company and can change. If a field
> below has a slightly different name, look for the closest match — or ask your host's
> support for "deploying a Next.js app from Git".

### Step 1 — Create the database

Our app uses **PostgreSQL**. In cPanel, look for **PostgreSQL Databases** (or
**Databases → PostgreSQL**):

1. Create a database, e.g. `nextntech`.
2. Create a user with a strong password and **add it to the database with all
   privileges**.
3. Build your connection string:
   `postgresql://USER:PASSWORD@localhost:5432/DATABASE?schema=public`
   (cPanel usually prefixes names with your account name, e.g. `myacct_nextntech`.)

**No PostgreSQL in your cPanel?** (Many hosts only offer MySQL.) Create a free database at
[neon.tech](https://neon.tech) instead and use the connection string it gives you — it
works from anywhere. Don't switch the app to MySQL without asking the maintainer first.

### Step 2 — Create the app from Git

1. Choose **AI App Hosting** → **Continue**.
2. Connect **GitHub** and pick the repository **PDostiyar/NextNtech**.
3. Branch: **`main`** (the live site).
4. Node.js version: **22** (or 20).
5. Commands:
   - Install: `npm ci`
   - Build: `npx prisma migrate deploy && npm run build`
   - Start: `npm start`
6. Environment variables: add `DATABASE_URL` and `NEXT_PUBLIC_SITE_URL` (from section 2).
7. Domain: choose `nextntech.org` (or a subdomain while testing).
8. Deploy. The first build takes a few minutes.

### Step 3 — Load the courses (first time only)

After the first successful deploy, run the seed once. Use the app's **Terminal / Run
command** option (or cPanel **Terminal**, inside the app folder):

```bash
npx prisma db seed
```

Open your domain — you should see the home page with all six courses. 🎉

### Step 4 — A staging copy for testing (recommended)

Repeat Step 2 to create a **second app**:

- Branch: **`stage`**
- Domain: a subdomain such as `stage.nextntech.org`
- Its **own separate database** (never share the live database with staging)
- `NEXT_PUBLIC_SITE_URL=https://stage.nextntech.org`

Now the flow matches our branches: new work lands on `stage` → test it on
`stage.nextntech.org` → release to `main` → live on `nextntech.org`.

### Updating the site

If your host redeploys automatically on every push, merging into `main` updates the live
site. Otherwise press **Redeploy / Pull & build** in the app's page. Database changes are
applied automatically by `prisma migrate deploy` in the build command.

### Troubleshooting

| Problem | Fix |
| --- | --- |
| Build fails with "out of memory" / "killed" | Your plan has too little RAM for `next build`. Ask your host for more memory for the build, or use Vercel (section 4). |
| `Can't reach database server` | Check `DATABASE_URL` (user, password, database name, host). With cPanel PostgreSQL the host is usually `localhost`. |
| `P1010: User was denied access` | The database user wasn't added to the database with all privileges. |
| Home page shows no courses | Run `npx prisma db seed` once (Step 3). |
| Site shows the wrong address in share links | Set `NEXT_PUBLIC_SITE_URL` to your real domain and redeploy (it's used at build time). |
| 502 / 503 error after deploy | Check the app logs; make sure the start command is `npm start` and the build finished. |

<details>
<summary><strong>Older cPanel: "Setup Node.js App" (Phusion Passenger)</strong></summary>

If your cPanel only has the classic **Setup Node.js App** tool:

1. Upload or `git clone` the code into a folder, e.g. `~/nextntech`.
2. In **Setup Node.js App** → **Create application**: Node.js 20+, application root
   `nextntech`, application URL your domain, startup file `server.js`, and add the
   environment variables.
3. Create `server.js` in the app folder:

   ```js
   // Starts the built Next.js app under Passenger (classic cPanel).
   const { createServer } = require("http");
   const next = require("next");

   const app = next({ dev: false });
   const handle = app.getRequestHandler();

   app.prepare().then(() => {
     createServer((req, res) => handle(req, res)).listen(process.env.PORT || 3000);
   });
   ```

4. In the app's terminal (the tool shows the command to enter the virtual environment):
   `npm ci && npx prisma migrate deploy && npm run build && npx prisma db seed`
5. Press **Restart**.

</details>

## 4. Alternative: Vercel + Neon (free tier)

Vercel is made by the Next.js team and gives automatic **preview links for every pull
request**.

1. Create a free PostgreSQL database at [neon.tech](https://neon.tech) and copy the
   connection string.
2. At [vercel.com](https://vercel.com), sign in with GitHub → **Add New → Project** →
   import `PDostiyar/NextNtech`.
3. Add the environment variables from section 2.
4. Set the build command to `npx prisma migrate deploy && npm run build`.
5. Deploy, then run `npx prisma db seed` once from your computer with `DATABASE_URL`
   pointing at the Neon database.
6. Settings → Domains → add `nextntech.org`. Set the **Production Branch** to `main`;
   pushes to `stage` get their own preview address.

A full, step-by-step deployment guide (login providers, email, backups) is part of build
Phase 6.

## 5. Safety checklist before going live

- [ ] Use a **separate database** for staging and for production.
- [ ] Database password is strong and only stored in the host's environment variables —
      never in the code.
- [ ] HTTPS is on (cPanel: **SSL/TLS Status → Run AutoSSL**).
- [ ] Database backups are scheduled.
- [ ] Legal pages (privacy, terms, parents) are reviewed — planned in Phase 6.
