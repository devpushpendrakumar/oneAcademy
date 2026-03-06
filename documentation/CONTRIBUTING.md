# Contributing Guide

How to contribute to OneAcademy as a developer.

## Git Workflow

We use a simple feature branch workflow:
```
main          → production-ready code only
dev           → integration branch
feature/*     → new features
fix/*         → bug fixes
chore/*       → non-feature work (config, docs, deps)
```

### Step by Step
```bash
# 1. Always start from dev
git checkout dev
git pull origin dev

# 2. Create your feature branch
git checkout -b feature/assignment-review-ui

# 3. Write code, commit often
git add .
git commit -m "feat: add rubric scoring component"

# 4. Push your branch
git push origin feature/assignment-review-ui

# 5. Open PR → dev (never directly to main)
```

## Commit Message Format

Follow this format for every commit:
```
type: short description

Types:
feat     → new feature
fix      → bug fix
chore    → config, deps, tooling
docs     → documentation
refactor → code change without feature/fix
style    → formatting only
test     → adding tests
```

Examples:
```bash
feat: add assignment submission endpoint
fix: quiz score calculation off by one
chore: upgrade prisma to 5.22
docs: add database schema overview
refactor: extract payment service from route handler
```

## Pull Request Rules

- PRs must target `dev` branch — never `main`
- At least 1 review required before merge
- CI must pass (TypeScript + lint + build)
- Keep PRs small — one feature per PR
- Add a description explaining what changed and why

## Code Style

- TypeScript everywhere — no `.js` files in `apps/`
- No `any` types — use proper types or `unknown`
- No unused variables — fix all TS warnings before committing
- Prettier formats automatically — run `pnpm format` before committing
- Use async/await — no `.then()` chains

## Folder Conventions

### Backend (apps/api/src)
```
routes/          → HTTP route handlers only (thin layer)
services/        → Business logic (thick layer)
middleware/      → Auth, role check, rate limit
jobs/            → BullMQ background workers
plugins/         → Fastify plugin registrations
```

Route handlers should be thin — call a service, return the result:
```typescript
// ✅ Good — thin route, logic in service
fastify.post('/assignments/submit', async (req, reply) => {
  const result = await AssignmentService.submit(req.user.id, req.body)
  return reply.send({ success: true, data: result })
})

// ❌ Bad — business logic inside route handler
fastify.post('/assignments/submit', async (req, reply) => {
  const assignment = await prisma.assignment.findUnique(...)
  const existing = await prisma.assignmentSubmission.findFirst(...)
  if (existing && existing.attemptNo >= assignment.maxAttempts) { ... }
  // 50 more lines...
})
```

### Frontend (apps/web/src)
```
app/             → Next.js App Router pages and layouts
components/      → React components
  ui/            → shadcn/ui base components
  learner/       → learner portal feature components
  admin/         → admin portal feature components
  shared/        → used in both portals
lib/             → utilities, API client, helpers
store/           → Zustand stores
hooks/           → custom React hooks
```

## Environment Variables

- Never commit `.env`
- Always update `.env.example` when adding new variables
- Prefix with `NEXT_PUBLIC_` only if the variable is safe to expose to the browser
- Never put secret keys in `NEXT_PUBLIC_` variables

## Need Help?

- Check `docs/SETUP.md` for setup issues
- Check `docs/ARCHITECTURE.md` for system design questions
- Check `docs/DATABASE.md` for schema questions
- Ask in the team Slack channel