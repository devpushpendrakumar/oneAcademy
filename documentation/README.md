# OneAcademy — Documentation Hub

Welcome to the OneAcademy developer documentation. This folder contains everything a new contributor needs to understand, set up, and contribute to the project.

## 📚 Documents

| Document | What it covers |
|---|---|
| [SETUP.md](./SETUP.md) | How to set up the project locally from scratch |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | How the system is structured and why |
| [TECH-STACK.md](./TECH-STACK.md) | Every technology used with rationale |
| [DATABASE.md](./DATABASE.md) | Database schema, tables, and relationships |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Git workflow, branch strategy, PR process |

## 🚀 Quick Start

If you just want to get running fast:
```bash
git clone git@github.com:yourusername/oneacademy.git
cd oneacademy
pnpm install
cp .env.example .env
# Fill in .env values — ask the team lead for credentials
pnpm dev
```

## 📁 Project Structure
```
oneacademy/
├── apps/
│   ├── web/          → Next.js 14 frontend (learner + admin portal)
│   └── api/          → Fastify backend (REST API)
├── packages/
│   ├── types/        → Shared TypeScript interfaces
│   ├── validators/   → Shared Zod validation schemas
│   ├── ui/           → Shared component library (coming soon)
│   └── config/       → Shared ESLint, TS, Tailwind configs
├── prisma/
│   ├── schema.prisma → Single source of truth for database
│   └── migrations/   → Auto-generated migration history
├── docs/             → You are here
└── .github/
    └── workflows/    → CI/CD pipelines
```

## 👥 Team

| Role | Responsibility |
|---|---|
| PM / Lead Dev | Product decisions, architecture, backend |
| Dev 1 | Frontend — learner portal |
| Dev 2 | Frontend — admin portal + backend support |

## 🌐 Environments

| Environment | Frontend | Backend |
|---|---|---|
| Local | http://localhost:3000 | http://localhost:4000 |
| Production | coming soon | coming soon |