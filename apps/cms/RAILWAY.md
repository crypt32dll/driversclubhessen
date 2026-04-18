# Strapi on Railway (or Render) — production-style hosting

**If you use [Strapi Cloud](https://cloud.strapi.io) instead**, you do not need Railway or this guide — see [STRAPI_VERCEL_SETUP.md](../web/STRAPI_VERCEL_SETUP.md).

Vercel is for the Next.js app only. Run Strapi on a **long-lived Node** host with **PostgreSQL** and **Cloudinary** for uploads (no reliance on local disk).

## 1. Create resources

1. **Railway** (or Render): new project from this Git repo (or deploy from GitHub).
2. Add **PostgreSQL** plugin (or use Neon free tier — set `DATABASE_URL` manually).
3. Add **Cloudinary** (free): [cloudinary.com](https://cloudinary.com) → Dashboard → API keys (`cloud_name`, `api_key`, `api_secret`).

## 2. Strapi service settings

| Setting | Value |
|--------|--------|
| **Root directory** | Monorepo root, or set **Dockerfile** / **Start** to run `apps/cms` (see below). |
| **Build command** | From repo root: `npm ci && npm run build -w cms` |
| **Start command** | `npm run start -w cms` |
| **Port** | Railway sets `PORT`; Strapi reads it via [`config/server.ts`](config/server.ts) (`env.int("PORT", 1337)`). |

If Railway only runs a subdirectory, use **Install**: `npm ci` at root, then build/start as above so workspace `@driversclub/logger` resolves.

## 3. Environment variables (Railway → Variables)

**Required (secrets)** — generate strong random values for production:

| Variable | Notes |
|----------|--------|
| `APP_KEYS` | Comma-separated list (e.g. 4 keys). |
| `API_TOKEN_SALT` | Random string. |
| `ADMIN_JWT_SECRET` | Random string. |
| `TRANSFER_TOKEN_SALT` | Random string. |
| `JWT_SECRET` | Random string. |
| `ENCRYPTION_KEY` | Random string. |

**Database**

| Variable | Example |
|----------|---------|
| `DATABASE_CLIENT` | `postgres` |
| `DATABASE_URL` | From Railway Postgres (or Neon), usually `postgresql://...` |

**Uploads (production, self-hosted)**

| Variable | Notes |
|----------|--------|
| `CLOUDINARY_UPLOAD` | Set to `true` to enable the Cloudinary provider (required opt-in). |
| `CLOUDINARY_NAME` | Cloudinary cloud name |
| `CLOUDINARY_KEY` | API key |
| `CLOUDINARY_SECRET` | API secret |

Without `CLOUDINARY_UPLOAD=true` and the three Cloudinary vars, Strapi keeps the **default local** upload provider (not suitable for ephemeral disks — enable Cloudinary on Railway).

**Server / CORS**

| Variable | Notes |
|----------|--------|
| `HOST` | `0.0.0.0` (default in [`config/server.ts`](config/server.ts)) |
| `PORT` | Injected by Railway — do not hardcode. |
| `ALLOWED_ORIGINS` | Optional. Comma-separated origins for your Next app, e.g. `http://localhost:3000,https://your-app.vercel.app`. If **unset**, Strapi’s default CORS applies (recommended baseline). |

**Optional**

| Variable | Notes |
|----------|--------|
| `NODE_ENV` | `production` |
| `STRAPI_ADMIN_BACKEND_URL` | Public Strapi URL if admin is behind a proxy |

## 4. Vercel (Next.js)

Set **`NEXT_PUBLIC_STRAPI_URL`** to your Railway public URL, e.g. `https://your-service.up.railway.app` (no trailing path).

See [apps/web/STRAPI_VERCEL_SETUP.md](../web/STRAPI_VERCEL_SETUP.md).

## 5. Verify

```bash
curl -sS "https://YOUR_RAILWAY_URL/api/homepage?status=published"
```

Expect `200` with JSON once content exists and **Public** permissions are set in Strapi Admin.

## 6. Troubleshooting

- **Build fails on native modules:** run install from **monorepo root** (`npm ci`); `better-sqlite3` is listed at repo root for workspace hoisting.
- **Uploads disappear after deploy:** enable **Cloudinary** env vars on Railway.
- **CORS in browser:** set `ALLOWED_ORIGINS` to your exact Vercel URL(s).
