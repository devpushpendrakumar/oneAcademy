# System Architecture

## Overview

OneAcademy is a monorepo containing a Next.js frontend and a Fastify backend,
sharing TypeScript types and Zod validators via internal packages.

## Architecture Diagram
```
Browser (Learner / Admin)
         │
         │ HTTPS
         ▼
┌─────────────────────────┐
│   Next.js 14 (Vercel)   │  ← Frontend
│   App Router + React    │
│   Zustand + TanStack Q  │
└────────────┬────────────┘
             │ REST API calls
             │
┌────────────▼────────────┐
│   Fastify (Railway)     │  ← Backend API
│   TypeScript + Prisma   │
│   BullMQ job queues     │
└──────┬──────────────────┘
       │
┌──────▼──────────────────┐
│  PostgreSQL (Supabase)  │  ← Database
│  Realtime subscriptions │
│  Storage (files/images) │
└─────────────────────────┘
       │
┌──────▼──────────────────┐
│  Cloudflare R2 + Stream │  ← Video storage & delivery
└─────────────────────────┘
```

## Key Design Decisions

### Why Monorepo?
Single repository for frontend + backend means shared TypeScript types.
If an API response shape changes, TypeScript catches the frontend mismatch instantly.

### Why Supabase + Prisma Together?
- **Prisma** → all backend data queries (type-safe, complex joins, direct TCP)
- **Supabase client** → frontend only (Realtime subscriptions, Auth, Storage)
- They serve different purposes — not competing tools

### Why Fastify over Express?
- 2x faster throughput
- Native TypeScript support
- Plugin system keeps routes organized
- Built-in JSON schema validation

### Why Turborepo?
- Runs `pnpm dev` in both apps simultaneously with one command
- Caches builds — only rebuilds what changed
- Shared config across all packages

## Request Flow Example — Learner submits assignment
```
1. Learner clicks Submit in browser (Next.js)
2. react-hook-form validates input via Zod schema (@oneacademy/validators)
3. TanStack Query sends POST /assignments/submit to Fastify API
4. Fastify middleware verifies JWT token
5. Zod validates request body (same schema as frontend)
6. Prisma writes submission to PostgreSQL
7. BullMQ queues a job: notify mentor
8. Supabase Realtime pushes update to mentor's browser instantly
9. API returns success response
10. TanStack Query invalidates cache → UI updates
```

## Environments

### Development
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Database: Supabase (shared dev project)

### Production
- Frontend: Vercel (auto-deploy on push to main)
- Backend: Railway (auto-deploy on push to main)
- Database: Supabase (production project)