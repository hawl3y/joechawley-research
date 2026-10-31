# joechawley-research: CLAUDE.md

**Naming:** The project was formerly Tradecraft Labs; that name is retired. The internal name is now `joechawley-research` (GitHub repo, local folder, Vercel project). The public site is **Joe C. Hawley · Research** at https://research.joechawley.com. Never use "Tradecraft Labs" in user-facing text. Historical records keep the old name as written (dated journal entries, `docs/releases/`, `docs/build/`, `docs/reviews/`, `research/`).

**Branding:** The favicon uses the shared H mark from joehawley.com (`public/brand/hawley-logo.svg`, artwork unaltered), with navy #1E3A5F in the H cutout. Icon files: `app/favicon.ico` (16, 32, 48), `app/icon1.svg`, `app/icon2.png` (512; numeric suffixes so Next.js links both), `app/apple-icon.png` (180, white corners for iOS). No other logo art.

## Output

Bare minimum. Blunt, direct. No preamble, no recaps, no explanations unless asked. Report only what changed and anything needing my decision.

---

## Reporting

- Report in 5 lines or fewer, bottom line first.
- Line 1: done or blocked. Then hashes and pushed or not.
- Only list decisions you need from me, as numbered questions.
- Mention extra fixes in one line each, only if they changed published content.
- No tables, no restating the request, no per-file detail, no explanations unless asked.
- Never skip verification. Report it in one line ("Verified: <pages>").

---

## Operating Model

The operational workflow for conducting research, maintaining content, updating the platform, and managing deployments is defined in:

docs/Research-Operations.md

Always follow that workflow when processing new research or making platform updates.

Current focus, project statuses, and next steps are tracked in:

STATUS.md

---

## Purpose

Joe C. Hawley · Research (https://research.joechawley.com) is Joe C. Hawley's independent research platform for cybersecurity governance, risk, and value. Site name, descriptor, author, and canonical URL are defined once in `lib/site.ts`.

This is not a blog, portfolio, consulting site, or marketing website. It exists to:

- Publish research artifacts
- Track research progress
- Document the evolution of ideas
- Host draft and final research publications
- Support multiple future research projects

**Current project (active):** Project 002: Measuring and Communicating the Realized Business Value of Cybersecurity (`project-002-cyber-value`). Source materials and the current framework version are in `research/project-002-cyber-value/`.

**Paused:** Project 001: The Business Information Security Officer as a Governance Intermediary: Improving Cybersecurity Decision Quality Through Trust, Influence, and Risk-Based Decision Making (`project-001-biso`). Foundation project. The slug and all Project 001 rules below still apply.

**Project 002 collects no data from people.** No interview, transcript, or participant workflow applies to it unless the researcher says otherwise. Evaluation uses synthetic cases, public material, and comparative analysis (see `research/project-002-cyber-value/framework/`). Record AI assistance for Project 002 artifacts in `research/project-002-cyber-value/ai-use-log.md`.

---

## Core Principles

1. Build a research platform, not a website.
2. Research is the product.
3. Research artifacts are first-class content.
4. Show the evolution of research, not only final outcomes.
5. Prioritize clarity, readability, and credibility.
6. Avoid cybersecurity clichés and hacker aesthetics.
7. Design for researchers, practitioners, executives, conference organizers, and students.
8. Future projects should require little or no architectural change.

---

## Technology Stack

- **Framework:** Next.js 15 App Router, TypeScript strict mode
- **Styling:** Tailwind CSS v3.4 with custom design tokens
- **Content:** Contentlayer2 + MDX
- **Hosting:** Vercel
- **Analytics:** Plausible (env-controlled)
- **Source control:** GitHub: https://github.com/hawl3y/joechawley-research (site only; see Repositories)
- **Hosting project:** Vercel project `joechawley-research`
- **Deployment:** https://research.joechawley.com (custom domain; the legacy Vercel subdomain https://tradecraft-labs.vercel.app still resolves)

### Repositories

All three are private.

- `hawl3y/joechawley-research`: the site. This repo. History starts at v0.2.7 (2026-10-31) with no `research/` folder.
- `hawl3y/joechawley-research-sources`: research source materials (`research/`), with their history. Paths in this file that start with `research/` are relative to the root of that repo. Only the latest commit is anonymized; earlier commits hold the originals.
- `hawl3y/joechawley-research-archive`: full pre-split history, kept as is. Commit hashes cited in `docs/releases/`, `docs/build/`, `docs/reviews/`, and journal entries before v0.2.7 refer to this repo.

Never commit `research/` to the site repo (it is in `.gitignore`). Never push the archive history or a pre-split clone to the site repo.

### Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | Controls `metadataBase`, sitemap URLs, and OG image domain display. Without it, canonical URLs fall back to `https://research.joechawley.com` (`SITE.url` in `lib/site.ts`). |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional | Plausible analytics domain. If unset, no analytics script is injected. Platform functions normally without it. |

---

## Repository Structure

```
app/                    Next.js routes (do not add routes without understanding existing patterns)
components/             React component library
content/                Published MDX content: source of truth for what appears on the platform
  projects/
  artifacts/
  journal/
  publications/
docs/                   Platform documentation, release notes, review documents, build history
lib/                    Utility modules and shared logic
public/                 Static assets (OG image, downloads)
scripts/                Build scripts (check-dashes.mjs runs as prebuild)
research/               Not in this repo: lives in joechawley-research-sources. READ ONLY (see Research Ethics below)
  project-001-biso/
    insights/
    interviews/
    literature/
    paper/
    proposal/
  project-002-cyber-value/
    framework/
    literature/
    paper/
    proposal/
STATUS.md               Current focus, project statuses, next steps
```

---

## Content Model

**Project**: A research initiative. Slug is permanent and used in all URLs.
Projects: `project-001-biso` (paused), `project-002-cyber-value` (current)

- `stages` (optional): ordered list of stage values for the progress tracker. If omitted, the tracker uses `DEFAULT_STAGES` in `lib/research-stages.ts`. The build fails if a project's current `stage` is not in its stage list. All stage values and labels live in `lib/research-stages.ts`; `contentlayer.config.ts` imports them. Project 002 uses `evaluation` in place of `interviews`.
- `researchQuestion` (required) and `researchQuestions` (optional list): when `researchQuestions` is present, the project page renders it as a numbered list (RQ1, RQ2, ...). `researchQuestion` is still required and serves as the one-line summary on cards and in meta descriptions. Project 001 uses `researchQuestion` only.

**Artifact**: A research document. Can be `active` (full MDX content) or `stub` (placeholder: content pending conversion).

**JournalEntry**: A dated research update. Timestamped, categorized, linked to a project.

**Publication**: A submitted or published paper. Architecture is ready; no publications exist yet.

---

## Hard Rules

### Dates
- Never fabricate dates. If a date is unknown, use `"TBD"` in frontmatter.
- All date strings must be parsed with a `T00:00:00` suffix to prevent UTC midnight off-by-one errors in US timezones. Example: `new Date(dateString + 'T00:00:00')`.

### Source materials
- `/research/` files are read-only source artifacts. Do not modify them unless explicitly instructed.
- Do not convert `.docx` files to MDX unless explicitly asked to do so (Phase 7 work).
- Do not delete original source documents after conversion.

### URLs
- The `project-001-biso` slug is permanent. Do not rename it.
- Artifact slugs are permanent once published.

### Content
- Do not publish participant names, contact information, or identifiers.
- `Interview_Pool_v1.docx` is excluded from git by `.gitignore` and must remain excluded.
- The `biso-interview-pool.mdx` artifact stub is publishable: it contains no participant data.
- Always anonymize practitioner examples in research data artifacts.
- No em dashes (or en dashes) in any repo text: content, metadata and page titles, aria and screen-reader labels, alt text, code comments, and docs. Use commas, colons, periods, or parentheses; use a hyphen for ranges. `scripts/check-dashes.mjs` enforces this at prebuild. It scans `app/`, `components/`, `content/`, `lib/`, `docs/`, `scripts/`, every `research/project-*/` folder, `STATUS.md`, `CLAUDE.md`, and `README.md`. Read-only research folders are excluded through the `READ_ONLY_RESEARCH` list in that script (currently `project-001-biso`).
- Page title format: `<Page title> | Joe C. Hawley · Research`, site name exactly once. Page metadata sets only the page title; the root layout template adds the site name. Use `:` inside a page title if a separator is needed.
- Never commit employer-specific data, names, or confidential material.
- Project 002 outputs frame the work as an industry problem. Never name an employer, an executive, or an internal request as the origin of the research.
- Hypotheses are not a thesis. Do not promote hypotheses into `workingThesis` or increment `thesisVersion` unless told to.

### Git
- `npm run build` must pass with 0 errors before any commit.
- Never commit `.env`, `.env.local`, or `.claude/`.

### External services
- Never sign in to or authenticate any external service (Vercel, GitHub, npm, analytics, etc.) without asking first and stating why.
- Verify deploys by checking the live site, not the Vercel CLI, unless approved otherwise.

---

## Technical Constraints

These are non-obvious issues discovered during the build. Do not re-introduce them.

**OG image fonts:** Satori (used by `next/og` ImageResponse) requires TTF or OTF font files. Google Fonts CDN serves WOFF/WOFF2, which Satori rejects with `[Error: Unsupported OpenType signature]`. The current OG image uses system Georgia. If adding a custom font to the OG image, load it via `readFileSync` from a local TTF file in `public/`.

**Journal filter and `useSearchParams`:** The `/journal` page uses a server-props pattern: the server page reads `searchParams` and passes `currentCategory`/`currentProject` as props to the client filter component. Do not refactor this to use `useSearchParams` directly without adding a Suspense boundary.

**Async params (Next.js 15):** Dynamic route params are typed as `Promise<{...}>` and must be awaited before use: `const { project } = await params`. This applies to all `[project]`, `[artifact]`, and `[entry]` route segments.

---

## Workflows

### New Interview Completed

Applies to Project 001 only. Project 002 collects no data from people.

1. Store transcript in `research/project-001-biso/interviews/transcripts/` (create directory if needed)
2. Create analysis document in `research/project-001-biso/interviews/analysis/`
3. Extract: themes, notable quotes, evidence supporting or challenging the working thesis, new research directions
4. Update `content/artifacts/biso-research-insights.mdx` only if findings materially affect existing working theories
5. Create a new journal entry (see below)

Do not include any participant-identifying information in any published content.

### New Journal Entry

Create: `content/journal/YYYY-MM-DD-slug.mdx`

Required frontmatter fields:
- `title`
- `date` (accurate, never fabricated)
- `category`
- `summary`
- `project`: a project slug, or `"platform"` for entries about the site itself (not shown as a research project)

Optional: `sequence` (integer, higher = later that day). Entries sort by date, newest first, then by `sequence`. A new entry on a date that already has entries must set `sequence` one higher than the latest entry that day.

Journal entries must reflect real events. They document what was learned, emerging themes, and research progress.

Every project stage change gets a journal record. If a same-day entry covers the work behind the change, append a dated line to it ("Update (YYYY-MM-DD): ...") without editing existing text. Otherwise create a short entry.

Write journal entries in the researcher's first-person voice ("I," not "the researcher" or passive framing). No em dashes (see Hard Rules > Content).

### Fix As You Go

- Fix small defects found during a task in the same session (typos, dashes, broken labels, metadata, consistency with the current framework version) and list each fix in the report.
- Ask first before changing schema, routes, slugs, `research/` source files, research claims, or anything published under a participant's name.

### Converting a Stub Artifact (Phase 7)

1. Identify source document in `research/project-001-biso/`
2. Convert content to MDX, preserving structure and meaning
3. Update the existing MDX file in `content/artifacts/`
4. Change `status: "stub"` to `status: "active"`
5. Increment version if content is materially different from the stub description
6. Do not delete the source document

**Exception:** `biso-interview-pool.mdx` should not be converted to active if it would require publishing participant names. If converting, publish only aggregate structure (e.g., number of participants, functional perspectives) without identifying information.

---

## Git Workflow

### Commit types

```
content:    New or updated MDX content
feat:       New platform feature or component
fix:        Bug or visual correction
docs:       Documentation changes
config:     Configuration changes
chore:      Maintenance, dependency updates, .gitignore changes
```

### Before every commit

```bash
npm run build     # must pass with 0 errors
```

### Release process

1. Update `docs/releases/vX.Y.Z.md`
2. Run `npm run build`
3. Commit and push to `main`
4. Run `docs/reviews/Production-Validation-Checklist.md` and verify the release live
5. Tag the release: `git tag -a vX.Y.Z -m "Description"`
6. Push tag: `git push origin vX.Y.Z`

Tag only after the last commit of the release is pushed and verified live. Never move a pushed tag; ship a follow-up fix as a new patch version.

### Versioning

```
v0.1.0    Initial platform release (as Tradecraft Labs)
v0.2.0    Rebrand to Joe C. Hawley · Research at research.joechawley.com
v0.2.1    Keep site name and OG image on pages with custom openGraph
v0.2.2    Favicon redesign (JH)
v0.2.3    Favicon: shared H mark from joehawley.com
v0.2.4    Icon link fix: SVG and PNG icons both linked
v0.2.5    Homepage leads with current research
v0.2.6    Mission line, About copy, header and footer separation
v0.2.7    Repo split: site repo without research sources
v0.2.8    Repo split follow-up: build fix, commit author (current)
v0.3.0    Phase 7 complete: all artifacts converted
v0.4.0    First paper submitted
v1.0.0    First paper published
```

---

## Deployment

Vercel auto-deploys on push to `main`. No manual deployment step required.

### Before pushing

- Build passes locally
- No placeholder text visible on any page
- No sensitive data in any committed file
- `NEXT_PUBLIC_SITE_URL` is set correctly in Vercel environment variables

### After deploying

Verify these routes on https://research.joechawley.com show the current site name and domain:

- `/`: Homepage
- `/research`: Research listing
- `/research/project-001-biso`: Project overview
- `/journal`: Journal
- `/about`: About
- `/robots.txt`: Must contain production domain, not localhost
- `/sitemap.xml`: Must contain production domain, not localhost
- `/opengraph-image`: Must return a 1200×630 PNG with the current site name and domain
- `/favicon.ico`, `/icon1.svg`, `/icon2.png`, `/apple-icon.png`: H mark favicon loads

For every changed page, check the rendered `<title>`, the visible text, and the stage tracker. Checking that the page loads is not enough.

Full checklist: `docs/reviews/Production-Validation-Checklist.md`

---

## Research Ethics

Never publish:

- Participant names, roles, or organizational affiliations
- Participant contact information
- Internal company details from interviews
- Confidential organizational data
- Any content that could identify an interview participant

`Interview_Pool_v1.docx` must remain excluded from source control. It is in the sources repo `.gitignore` as `research/**/Interview_Pool*.docx`.

When documenting practitioner observations, use only anonymized, generalized descriptions. The three case studies in `biso-research-data.mdx` are the established model: no names, no organizations, no identifying details.

---

## Accessibility

Maintain:

- Semantic HTML: `<main>`, `<header>`, `<footer>`, `<nav>` landmarks in place
- Skip-to-content link targeting `<main id="main-content" tabIndex={-1}>`
- Correct heading hierarchy on every page (each page must have exactly one `<h1>`)
- Muted text color `#5E6779`: minimum 5.41:1 contrast on `#FAFAF8` background
- WCAG AA compliance at minimum

Do not remove accessibility features.

---

## Design Tokens

```
background:  #FAFAF8   (cream, page background)
surface:     #F3F2EF   (off-white, card/section backgrounds)
ink:         #1A1A1A   (near-black, primary text)
muted:       #5E6779   (medium gray, secondary text, 5.41:1 contrast)
navy:        #1E3A5F   (deep navy, headings, links, accents)
navy-light:  #E8EEF5   (tint, navy-tinted backgrounds)

font-serif:  Lora      (headings, display, theses, callouts)
font-sans:   Geist     (body, UI, labels)
font-mono:   Geist Mono (code, citations)
```

---

## Future Projects

Add new projects by following the same structure:

```
research/project-002-*/     Source materials
content/projects/           New project MDX
content/artifacts/          New artifact MDX files
content/journal/            Journal entries referencing new project
```

All platform components, routes, and content types support multiple projects automatically. No architectural changes are required.
