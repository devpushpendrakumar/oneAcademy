# Local Setup Guide

Complete guide to setting up OneAcademy on your local machine.

## Prerequisites

Before starting, make sure you have these installed:

| Tool | Version | Check | Install |
|---|---|---|---|
| Node.js | v20+ | `node --version` | [nodejs.org](https://nodejs.org) |
| pnpm | v10+ | `pnpm --version` | `npm install -g pnpm` |
| Git | Any | `git --version` | [git-scm.com](https://git-scm.com) |

## Step 1 — Clone the Repository
```bash
git clone git@github.com:yourusername/oneacademy.git
cd oneacademy
```

## Step 2 — Install Dependencies
```bash
pnpm install
```

This installs all dependencies across all workspace packages simultaneously.
pnpm uses a single global store — no duplication, very fast.

## Step 3 — Environment Setup
```bash
cp .env.example .env
```

Open `.env` and fill in the required values.
Ask the team lead for actual credentials. Never commit the `.env` file.

### Required Services

You need accounts on these services to run the project:

| Service | Purpose | Free Tier |
|---|---|---|
| Supabase | PostgreSQL database + Realtime | Yes |
| Cloudflare R2 | Video storage | Yes |
| Cloudflare Stream | Video processing | Yes |
| Razorpay | Payments (use test keys) | Yes |
| Resend | Transactional email | Yes |
| Upstash | Redis for job queues | Yes |

### Getting Supabase Credentials

1. Go to supabase.com → your project
2. Settings → API → copy `anon` and `service_role` keys
3. Settings → Database → Connection string → URI tab → copy and replace `[YOUR-PASSWORD]`

### Generating Auth Secrets
```bash
# Run twice — once for NEXTAUTH_SECRET, once for JWT_SECRET
openssl rand -base64 32
```

## Step 4 — Database Setup

Generate the Prisma client:
```bash
pnpm db:generate
```

Run migrations to create all tables:
```bash
pnpm db:migrate
```

When asked for migration name, type a descriptive name like `init`.

Verify tables were created in Supabase → Table Editor.

## Step 5 — Run the Project
```bash
pnpm dev
```

This starts both apps simultaneously via Turborepo:

| App | URL |
|---|---|
| Frontend (Next.js) | http://localhost:3000 |
| Backend (Fastify) | http://localhost:4000 |

Test the API is running:
```bash
curl http://localhost:4000/health
# Expected: {"status":"ok","timestamp":"..."}
```

## Step 6 — Verify Setup

Open http://localhost:3000 — you should see the Next.js default page.
Open http://localhost:4000/health — you should see the health check JSON.

## Common Errors

### DATABASE_URL error
```
Error: the URL must start with the protocol postgresql://
```
Fix: Check your `.env` file — `DATABASE_URL` must start with `postgresql://` and have the actual password filled in.

### Port already in use
```
Error: listen EADDRINUSE :::3000
```
Fix: Another process is using that port.
```bash
lsof -ti:3000 | xargs kill  # kills whatever is on port 3000
lsof -ti:4000 | xargs kill  # kills whatever is on port 4000
```

### pnpm install fails
```bash
rm -rf node_modules apps/web/node_modules apps/api/node_modules
pnpm install
```

### Prisma client not found
```bash
pnpm db:generate
```

## Useful Commands
```bash
# Development
pnpm dev              # run all apps
pnpm build            # build all apps
pnpm lint             # lint all apps

# Database
pnpm db:generate      # regenerate Prisma client after schema changes
pnpm db:migrate       # run new migrations
pnpm db:push          # push schema without migration (dev only)
pnpm db:studio        # open Prisma Studio — visual DB browser

# Formatting
pnpm format           # format all files with Prettier
```