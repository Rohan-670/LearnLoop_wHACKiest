# LearnLoop Intelligence — Project Plan

## Product identity
- **Name:** LearnLoop Intelligence
- **Tagline:** Learning that understands every student. Education that works everywhere.
- **Track:** Low-bandwidth adaptive learning for rural schools
- **Target:** Class 6–8 students, teachers, administrators (India-focused; English/Kannada)

## Core differentiators (implemented)
A. Misconception Intelligence Engine — deterministic misconception rules with confidence levels, visual remediation, follow-up questions
B. Offline Classroom Hub — local API simulation for classroom distribution + cloud sync when online
C. Learning DNA — transparent mastery calculations (recent accuracy + retention), visual profile
D. Teacher Copilot — deterministic intervention recommendations + AI-drafted suggestions (teacher approval required)
E. Ultra-Low-Data Mode — Saver/Balanced/Rich content modes with estimated download sizes
F. QR-to-Learning Bridge — QR contains lesson id + version; cached/open/download/unavailable states
G. Learning Continuity Engine — unique event IDs, idempotent sync, versioned content, retry, conflict resolution, local persistence

## Technical stack (chosen for environment)
- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS
- **UI icons:** lucide-react
- **Charts:** recharts
- **Offline storage:** Dexie.js (IndexedDB abstraction)
- **PWA:** Custom service worker + workbox-free app-shell caching
- **QR:** qrcode (generation) + html5-qrcode (scanning, graceful fallback)
- **Validation:** zod
- **Backend:** Next.js API routes with in-memory seeded store (Supabase-ready; schema SQL provided). No hardcoded keys.
- **AI:** NVIDIA Nemotron Lightning server-side service with clearly-labeled mock fallback when API key is absent
- **Testing:** Vitest + React Testing Library + Playwright (or manual E2E if unavailable)
- **i18n:** Centralized translation system (en, kn) — no hardcoded UI text

## Data model (relational, normalized)
users, student_profiles, teachers, classes, class_members, subjects, topics, lessons, lesson_versions, questions, question_options, attempts, misconception_rules, misconception_events, mastery_records, assignments, downloads, sync_events, teacher_interventions, ai_interactions

## Demo scenario (5 min)
Ananya, Class 8, Kannada: fractions lesson → misconception (1/2+1/3=2/5) → remediation → adaptive follow-up → mastery update → offline download & quiz → restart persistence → sync → teacher dashboard + Copilot intervention → Learning DNA impact.

## Constraints & honesty
- No real Supabase instance provisioned; local API store used with documented migration path to Supabase/PostgreSQL
- No Nemotron API key expected; mock AI service clearly labeled, real integration documented
- No claim of superiority over Khan Academy/DIKSHA/Kolibri without comparative testing
- All student data is fictional

## Environment unknowns to verify
- npm registry access
- Next.js create-app support on Node 26
