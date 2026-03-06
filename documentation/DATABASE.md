# Database

## Overview

OneAcademy uses PostgreSQL hosted on Supabase.
The schema is managed entirely through Prisma ORM.

**Single source of truth: `prisma/schema.prisma`**

Never edit tables directly in Supabase dashboard.
Always change `schema.prisma` and run `pnpm db:migrate`.

## How to Make Schema Changes
```bash
# 1. Edit prisma/schema.prisma
# 2. Run migration
pnpm db:migrate
# 3. Enter a descriptive name e.g. "add_streak_to_users"
# 4. Prisma generates SQL and applies it to the database
# 5. Commit both schema.prisma and the new migration file
```

## Tables Overview

### Core Tables

| Table | Purpose |
|---|---|
| users | All platform users (learners, mentors, admins) |
| enrollments | Which learner is enrolled in which roadmap |
| cohorts | Batches of learners starting together |

### Content Tables

| Table | Purpose |
|---|---|
| roadmaps | Top-level learning paths (e.g. Web Dev) |
| milestones | Chapters within a roadmap |
| courses | Individual courses within a milestone |
| modules | Groups of sections within a course |
| sections | Individual learning units (video/notes/quiz/assignment) |
| videos | Video metadata + Cloudflare Stream ID |
| notes | Rich text content for note sections |

### Evaluation Tables

| Table | Purpose |
|---|---|
| quizzes | Quiz configuration per section |
| questions | Individual questions within a quiz |
| quiz_attempts | Learner quiz submission records |
| assignments | Assignment configuration per section |
| rubric_criteria | Scoring criteria for assignments |
| assignment_submissions | Learner assignment submission records |
| rubric_scores | Individual rubric criterion scores per submission |

### Progress Tables

| Table | Purpose |
|---|---|
| section_progress | Tracks completion of each section per learner |

### Financial Tables

| Table | Purpose |
|---|---|
| payments | Payment records linked to Razorpay |

### Certificate & Internship Tables

| Table | Purpose |
|---|---|
| certificates | Issued certificates with unique verification codes |
| internships | Internship records per learner |
| internship_checkins | Monthly check-in records |

### Community Tables

| Table | Purpose |
|---|---|
| discussion_posts | Section-level discussion threads (supports replies) |
| mentor_sessions | Scheduled 1:1 sessions between mentor and learner |
| mentor_notes | Private notes written by mentors/admins about learners |

## Key Relationships
```
User
 ├── Enrollment → Roadmap
 │    └── Cohort
 ├── SectionProgress → Section
 ├── QuizAttempt → Quiz
 ├── AssignmentSubmission → Assignment
 ├── Certificate
 ├── Internship → InternshipCheckIn
 ├── Payment → Enrollment
 └── DiscussionPost → Section

Roadmap
 └── Milestone
      └── Course
           └── Module
                └── Section
                     ├── Video
                     ├── Notes
                     ├── Quiz → Question
                     └── Assignment → RubricCriteria
```

## Useful Database Commands
```bash
# Open visual database browser
pnpm db:studio

# Regenerate Prisma client after schema change
pnpm db:generate

# Create and apply new migration
pnpm db:migrate

# Push schema changes without creating migration file (dev only)
pnpm db:push

# Reset database completely (DANGEROUS — dev only)
pnpm prisma migrate reset
```

## Important Rules

1. **Never edit tables directly in Supabase** — always use Prisma migrations
2. **Always commit migration files** — they are the history of your schema
3. **Never run `migrate reset` in production** — it deletes all data
4. **Run `db:generate` after every schema change** — keeps TypeScript types in sync