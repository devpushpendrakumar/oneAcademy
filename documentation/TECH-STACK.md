# Tech Stack

Complete list of every technology used in OneAcademy with the reason it was chosen.

## One-Line Summary

> Next.js + Fastify + PostgreSQL + Supabase + Prisma + Cloudflare + Razorpay
> Full TypeScript. One language across the entire stack.

## Frontend — apps/web

| Package | Version | Purpose | Why |
|---|---|---|---|
| next | 16 | React framework | SSR for SEO, App Router for nested layouts |
| react | 19 | UI library | Industry standard |
| tailwindcss | 4 | Styling | Utility-first, fast iteration |
| shadcn/ui | latest | Component library | Accessible, customizable, you own the code |
| zustand | latest | Global state | Lightweight, no boilerplate vs Redux |
| @tanstack/react-query | latest | Server state | Caching, background refetch, loading states |
| framer-motion | latest | Animations | Spring physics, layout animations for gamification |
| recharts | latest | Charts | React-native charting for dashboards |
| next-auth | beta | Authentication | Native Next.js auth, OAuth + JWT |
| react-hook-form | latest | Forms | Performance, easy validation |
| zod | latest | Validation | Shared with backend, TypeScript-first |
| lucide-react | latest | Icons | Consistent icon set |
| sonner | latest | Toast notifications | Lightweight, beautiful toasts |
| date-fns | latest | Date utilities | Streak calculations, cohort dates |
| react-player | latest | Video player | Custom controls for course sections |

## Backend — apps/api

| Package | Version | Purpose | Why |
|---|---|---|---|
| fastify | 4 | HTTP framework | 2x faster than Express, TypeScript-native |
| @fastify/jwt | latest | JWT auth | Official Fastify JWT plugin |
| @fastify/cors | latest | CORS | Official Fastify CORS plugin |
| @fastify/multipart | latest | File uploads | Assignment file submission handling |
| @fastify/rate-limit | latest | Rate limiting | Protect login and quiz endpoints |
| @prisma/client | 5 | Database client | Type-safe queries, auto-generated types |
| bullmq | 5 | Job queues | Background processing (certificates, emails) |
| ioredis | 5 | Redis client | BullMQ backend, session cache |
| zod | 3 | Validation | Shared schemas with frontend |
| bcryptjs | 2 | Password hashing | Secure password storage |
| nodemailer | 6 | Email sending | Transactional emails via Resend SMTP |
| pdfkit | latest | PDF generation | Certificates and experience letters |
| razorpay | latest | Payments SDK | Official Razorpay Node.js SDK |

## Shared Packages

| Package | Purpose |
|---|---|
| @oneacademy/types | Shared TypeScript interfaces (User, Course, etc.) |
| @oneacademy/validators | Shared Zod schemas (used in both frontend forms and backend validation) |

## Infrastructure

| Service | Purpose | Why |
|---|---|---|
| Vercel | Frontend hosting | Zero-config Next.js deployment, preview URLs |
| Railway | Backend hosting | Persistent servers needed for BullMQ workers |
| Supabase | Managed PostgreSQL + Realtime + Storage | All-in-one, no DevOps, free tier covers beta |
| Cloudflare R2 | Video file storage | Zero egress fees — critical for Indian traffic |
| Cloudflare Stream | Video processing + delivery | Auto-transcoding, HLS streaming, signed URLs |
| Upstash | Serverless Redis | BullMQ backend, no server to manage |
| GitHub Actions | CI/CD | Auto lint + build on every PR |
| Turborepo | Monorepo build system | Parallel builds, caching, shared configs |

## External Services

| Service | Purpose | Cost |
|---|---|---|
| Razorpay | Payments (UPI, EMI, Cards) | 2% per transaction |
| Resend | Transactional email | Free up to 3,000/month |
| Sentry | Error monitoring | Free up to 5,000 errors/month |
| Mixpanel | Product analytics | Free up to 20M events/month |
| Hotjar | Session recordings + heatmaps | Free up to 35 sessions/day |

## What We Deliberately Avoided

| Avoided | Reason |
|---|---|
| NestJS | Over-engineered for 3-person team, steep learning curve |
| MongoDB | Our data is relational — Postgres is the right tool |
| Redux | Zustand does the same with 80% less boilerplate |
| Firebase | Vendor lock-in, expensive at scale, weak relational queries |
| GraphQL | REST is simpler and faster to build for our use case |
| Docker (for now) | Railway handles deployment without containers |
| Microservices | Monolith first, split only when there's a real reason |
| AWS (for now) | Cloudflare R2 is cheaper for India, migrate later if needed |