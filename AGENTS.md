# LearnLoop Intelligence — Agent Instructions

## Project Overview

LearnLoop Intelligence is a low-bandwidth adaptive learning platform for rural schools. It combines misconception detection, offline-first learning, transparent mastery tracking, and teacher copilot features.

## Key Design Principles

1. **Never fake offline claims** — All offline functionality must be real and tested
2. **Never present mock AI as real** — Mock AI service is clearly labeled
3. **Transparent calculations** — Every mastery indicator has a clear explanation
4. **Cautious misconception language** — Use "possible misconception", not definitive claims
5. **Teacher approval required** — AI-generated recommendations need teacher approval
6. **Fictional demo data only** — No real student PII

## Commands

```bash
npm run dev -- --webpack    # Development server (Webpack due to platform constraints)
npm run build -- --webpack  # Production build
npm start                   # Start production server
npm test                    # Run unit tests (vitest)
npm run lint                # ESLint
```

## Architecture

- **Frontend:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4
- **Offline:** Dexie.js (IndexedDB), service worker, PWA manifest
- **AI:** NVIDIA Nemotron Lightning with mock fallback (src/lib/ai-service.ts)
- **Misconception Engine:** Deterministic rules (src/lib/learning-engine.ts)
- **i18n:** Centralized translations (src/lib/i18n.ts) — EN, KN
- **QR:** qrcode library for generation

## Testing

- Unit tests: `lib/learning-engine.test.ts`
- Run: `npm test`
- Tests cover: misconception detection, confidence levels, mastery calculation, question selection

## Role-Based Access

- **Student:** Dashboard, subjects, lessons, quizzes, Learning DNA, offline mode
- **Teacher:** Dashboard, classes, assignments, copilot, sync status
- **Administrator:** Users, content, system status

## Demo Accounts

| Role | Email | Locale |
|------|-------|--------|
| Student (Ananya) | ananya@example.in | kn |
| Teacher (Ramesh) | ramesh@example.in | en |
| Admin | admin@example.in | en |

## Important Files

- `src/lib/learning-engine.ts` — Misconception detection + mastery calculation
- `src/lib/ai-service.ts` — Nemotron AI service with mock fallback
- `src/lib/dexie.ts` — IndexedDB offline storage
- `src/lib/qr-utils.ts` — QR code generation and parsing
- `src/lib/i18n.ts` — Translation system (EN/KN)
- `src/contexts/AuthContext.tsx` — Authentication context
- `database/schema.sql` — PostgreSQL schema (for Supabase migration)

## Platform Constraints

- Turbopack unavailable on Windows x64 — uses Webpack build
- No real Supabase backend — in-memory store with documented migration path
- No real Nemotron API key — mock service clearly labeled
- Classroom hub is simulated — not a production distributed system

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
