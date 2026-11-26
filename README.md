# LearnLoop Intelligence

**Learning that understands every student. Education that works everywhere.**

A low-bandwidth adaptive learning platform for rural schools, built for the hackathon track on low-connectivity education.

## Overview

LearnLoop Intelligence is an integrated learning system that identifies where students struggle, provides targeted remediation, tracks progress transparently, and gives teachers actionable insights — even without reliable internet.

### Core Differentiators

| Feature | Description |
|---------|-------------|
| **Misconception Intelligence Engine** | Detects likely reasons behind incorrect answers (e.g., "adding numerators and denominators independently" for 1/2+1/3=2/5) with confidence levels |
| **Offline Classroom Hub** | Local API simulation for classroom distribution + cloud sync when online |
| **Learning DNA** | Transparent mastery calculations (0.7 × recent accuracy + 0.3 × retention) with full audit trail |
| **Teacher Copilot** | Deterministic intervention recommendations; AI-drafted suggestions require teacher approval |
| **Ultra-Low-Data Mode** | Saver/Balanced/Rich content modes with estimated download sizes |
| **QR-to-Learning Bridge** | QR contains lesson ID + version only — never content payload |
| **Learning Continuity Engine** | Idempotent sync with unique event IDs, versioned content, no duplicates |

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** lucide-react
- **Charts:** recharts
- **Offline Storage:** Dexie.js (IndexedDB)
- **PWA:** Custom service worker + web app manifest
- **QR:** qrcode (generation)
- **Validation:** zod
- **Testing:** Vitest
- **i18n:** Centralized translation (English, Kannada)
- **AI:** NVIDIA Nemotron Lightning (server-side) with mock fallback

## Folder Structure

```
LearnLoop/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (student)/         # Student role routes
│   │   ├── (teacher)/         # Teacher role routes
│   │   ├── (admin)/           # Administrator role routes
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── ui/                # Base UI components
│   │   ├── layout/            # Layout components
│   │   ├── shared/            # Shared components
│   │   └── (student|teacher|admin)/
│   ├── contexts/              # React context (Auth)
│   ├── lib/                   # Core libraries
│   │   ├── i18n.ts            # Translation system
│   │   ├── learning-engine.ts # Misconception detection, mastery
│   │   ├── ai-service.ts      # Nemotron AI service
│   │   ├── dexie.ts           # IndexedDB setup
│   │   └── qr-utils.ts        # QR utilities
│   └── types/                 # TypeScript type definitions
├── public/
│   ├── manifest.json          # PWA manifest
│   └── sw.js                  # Service worker
├── lib/learning-engine.test.ts # Unit tests
├── PROJECT_PLAN.md            # Project plan
├── next.config.ts             # Next.js config
├── package.json               # Dependencies
└── README.md                  # This file
```

## Database Schema

The application uses a relational schema with these core tables:

- `users` — Authentication and role information
- `student_profiles` — Per-student Learning DNA data
- `teachers` — Teacher information and assigned classes
- `classes` — Class/grade groupings
- `class_members` — Student-class membership
- `subjects` — Mathematics, Science, etc.
- `topics` — Subject-specific topics (fractions, decimals, etc.)
- `lessons` — Lesson content with versioning
- `lesson_versions` — Content version history
- `questions` — Quiz questions with misconception mapping
- `question_options` — Multiple choice options
- `attempts` — Student quiz attempts (with misconception detection)
- `misconception_rules` — Deterministic misconception patterns
- `misconception_events` — Detected misconception instances
- `mastery_records` — Per-topic mastery scores
- `assignments` — Teacher-assigned lessons
- `downloads` — Offline content download records
- `sync_events` — Synchronization event log
- `teacher_interventions` — Copilot recommendations
- `ai_interactions` — AI service usage log

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or navigate to the project directory
cd LearnLoop

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev -- --webpack

# Build for production
npm run build -- --webpack

# Run tests
npm test
```

### Environment Variables

Create `.env.local` with:

```env
# NVIDIA Nemotron AI (optional — mock used if absent)
NEMOTRON_API_KEY=your_api_key_here
NEMOTRON_BASE_URL=https://integrate.api.nvidia.com/v1

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Configuring Nemotron

1. Obtain an API key from NVIDIA (build.nvidia.com)
2. Set `NEMOTRON_API_KEY` in `.env.local`
3. Set `NEMOTRON_BASE_URL` to the Nemotron endpoint
4. The application will automatically use the real AI service when credentials are present
5. Without credentials, a clearly-labeled mock service is used

## Demo Credentials

| Role | Email | Password | Locale |
|------|-------|----------|--------|
| Student (Ananya, Class 8) | ananya@example.in | (any) | Kannada |
| Teacher (Ramesh) | ramesh@example.in | (any) | English |
| Administrator | admin@example.in | (any) | English |

## How to Run

```bash
# Development (uses Webpack due to platform constraints)
npm run dev -- --webpack

# Production build
npm run build -- --webpack

# Start production server
npm start

# Run tests
npm test

# Lint
npm run lint
```

## Demo Credentials for Hackathon

**Student: Ananya (Class 8, Kannada)**
- Email: ananya@example.in
- Role: Student

**Teacher: Ramesh**
- Email: ramesh@example.in
- Role: Teacher

**Admin: School Administrator**
- Email: admin@example.in
- Role: Administrator

## Five-Minute Hackathon Demo Script

### Scene 1 — The Problem (30 seconds)
1. Open LearnLoop on a mobile device
2. Select Kannada language
3. Sign in as Ananya (Class 8 Student)
4. Navigate to Mathematics → Addition of Fractions

### Scene 2 — Intelligence (60 seconds)
1. Start the quiz
2. Answer: 1/2 + 1/3 = 2/5
3. System detects possible misconception: "adding numerators and denominators independently"
4. Show explanation with visual remediation (fraction bars)
5. Confidence level displayed (low → medium → high with repeated evidence)

### Scene 3 — Personalization (45 seconds)
1. System presents follow-up question based on detected weakness
2. Student answers correctly
3. Topic mastery updates in real-time (transparent calculation)
4. Learning DNA reflects improvement

### Scene 4 — Offline Learning (60 seconds)
1. Download the lesson (45 KB estimated)
2. Disconnect internet (toggle offline in dev tools)
3. Reload application — lesson still accessible
4. Complete quiz offline
5. Close and reopen browser — attempt persists
6. Reconnect — sync indicator appears
7. Sync completes — attempt uploaded exactly once (no duplicates)

### Scene 5 — Teacher Intelligence (45 seconds)
1. Sign in as teacher (Ramesh)
2. Dashboard shows "12 students struggling with equivalent fractions"
3. View misconception groups with common mistakes
4. Teacher Copilot suggests intervention (requires approval)
5. Teacher approves intervention → becomes assignment

### Scene 6 — Impact (30 seconds)
1. Return as Ananya
2. View updated Learning DNA
3. Show mastery improvement after intervention
4. Teacher can track whether intervention helped

## Offline Testing

Tested sequence:
1. Open application online ✅
2. Download lesson ✅
3. Disconnect internet ✅
4. Reload application ✅
5. Open downloaded lesson ✅
6. Complete quiz offline ✅
7. Close browser ✅
8. Reopen offline — attempt persists ✅
9. Restore internet ✅
10. Sync attempt — uploaded exactly once ✅

## Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Cached app launch | < 3 seconds | ✅ Designed for |
| Cached quiz network dependency | Zero | ✅ |
| Sync payload | < 100 KB | ✅ |
| Offline attempt recovery | 100% | ✅ |
| Duplicate sync prevention | Zero duplicates | ✅ |
| Languages supported | 2 (EN/KN) | ✅ |

## Known Limitations

1. **No real Supabase backend** — Uses in-memory seeded store with documented migration path to Supabase/PostgreSQL
2. **No real Nemotron API key** — Mock AI service is clearly labeled; real integration documented
3. **Classroom hub is simulated** — Local API server simulation; real distributed classroom server not implemented
4. **No comparative testing** — No claims of superiority over Khan Academy/DIKSHA/Kolibri without actual testing
5. **Turbopack unavailable** — Uses Webpack build on this platform (Windows x64)
6. **Kannada translations** — Some UI elements may show English fallback

## Future Development Roadmap

1. Integrate real Supabase/PostgreSQL backend with Row Level Security
2. Obtain NVIDIA Nemotron API key for real AI features
3. Implement real classroom local server (not simulated)
4. Add more subjects (Science, Social Studies)
5. Expand content library beyond Class 6-8
6. Add audio lessons in regional languages
7. Implement student-to-student peer learning
8. Add gamification (badges, streaks)
9. Comparative benchmarking against reference platforms
10. A/B testing for misconception detection accuracy

## License

MIT — Built for hackathon demonstration purposes.

## Contributing

This is a hackathon MVP. Contributions welcome for:
- Backend integration (Supabase)
- Real AI integration (Nemotron)
- Content expansion
- Translation completion
- Performance optimization