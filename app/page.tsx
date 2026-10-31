import type { Metadata } from 'next'
import Link from 'next/link'
import {
  getActiveProjects,
  getEarlierProjects,
  getArtifactsByProject,
  getLatestJournalEntries,
  type Project,
} from '@/lib/content'
import { SITE } from '@/lib/site'
import { type ResearchStage, getProjectStages } from '@/lib/research-stages'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import StatusBadge from '@/components/research/StatusBadge'
import ResearchProgressTimeline from '@/components/research/ResearchProgressTimeline'
import WhyThisMatters from '@/components/research/WhyThisMatters'
import JournalEntry from '@/components/journal/JournalEntry'

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.mission.full,
}

export default function Home() {
  const currentProjects = getActiveProjects()
  const earlierProjects = getEarlierProjects()
  // Timeline and Why This Matters follow the lead active project
  const project = currentProjects[0] ?? null
  const latestEntries = getLatestJournalEntries(3)

  // Lead with the thesis once one exists; until then, the research question
  const summaryOf = (p: Project) =>
    p.thesisVersion > 0 ? p.workingThesis.split('. ')[0] + '.' : p.researchQuestion
  const proposalOf = (p: Project) =>
    getArtifactsByProject(p.slug).find((a) => a.artifactType === 'research-proposal')

  return (
    <div>
      {/* ── Section 1: Hero ─────────────────────────────────── */}
      <section aria-labelledby="hero-heading" className="border-b border-gray-100">
        <div className="max-w-content mx-auto px-6 py-12 md:py-16">
          <h1
            id="hero-heading"
            className="font-serif font-medium text-4xl md:text-5xl text-ink leading-[1.2] max-w-3xl"
          >
            {SITE.mission.full}
          </h1>
        </div>
      </section>

      {/* ── Section 2: Current Research ─────────────────────── */}
      {currentProjects.length > 0 && (
        <section
          aria-labelledby="current-research-label"
          className="border-b border-gray-100"
        >
          <div className="max-w-content mx-auto px-6 py-16">
            <p
              id="current-research-label"
              className="text-xs font-medium uppercase tracking-widest text-muted mb-6"
            >
              Current Research
            </p>
            <div className="space-y-14">
              {currentProjects.map((p) => {
                const proposal = proposalOf(p)
                return (
                  <article key={p.slug}>
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      <Badge label={p.shortTitle ?? `Project ${p.projectNumber}`} variant="info" />
                      <StatusBadge status={p.status} />
                    </div>
                    <h2 className="font-serif font-medium text-2xl md:text-3xl text-ink leading-snug max-w-3xl mb-5">
                      {p.title}
                    </h2>
                    <p className="text-base text-ink/80 leading-relaxed max-w-2xl mb-8">
                      {summaryOf(p)}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button href={p.url} variant="primary">
                        View Research
                      </Button>
                      {proposal && (
                        <Button href={proposal.url} variant="secondary">
                          Read Proposal
                        </Button>
                      )}
                      <Button href="/journal" variant="ghost">
                        Follow in Journal
                      </Button>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Section 3: Research Progress Timeline ───────────── */}
      {project && (
        <section
          aria-label="Research progress timeline"
          className="bg-surface border-b border-gray-100"
        >
          <div className="max-w-content mx-auto px-6 py-12">
            <p className="text-xs font-medium uppercase tracking-widest text-muted mb-8">
              Research Progress
            </p>
            <ResearchProgressTimeline
              stages={getProjectStages(project)}
          currentStage={project.stage as ResearchStage}
              variant="full"
            />
          </div>
        </section>
      )}

      {/* ── Section 4: Why This Matters ─────────────────────── */}
      {project && (
        <section
          aria-labelledby="why-this-matters"
          className="border-b border-gray-100"
        >
          <div className="max-w-content mx-auto px-6 py-16">
            <WhyThisMatters text={project.researchGap} />
          </div>
        </section>
      )}

      {/* ── Section 5: Earlier Research ─────────────────────── */}
      {earlierProjects.length > 0 && (
        <section
          aria-labelledby="earlier-research-heading"
          className="border-b border-gray-100"
        >
          <div className="max-w-content mx-auto px-6 py-16">
            <h2
              id="earlier-research-heading"
              className="font-serif font-medium text-2xl text-ink mb-8"
            >
              Earlier research
            </h2>
            <div className="space-y-8 max-w-3xl">
              {earlierProjects.map((p) => (
                <article key={p.slug}>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge label={p.shortTitle ?? `Project ${p.projectNumber}`} variant="info" />
                    <StatusBadge status={p.status} />
                  </div>
                  <h3 className="font-serif font-medium text-xl text-ink leading-snug mb-3">
                    <Link
                      href={p.url}
                      className="hover:text-navy transition-colors duration-150"
                    >
                      {p.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {p.researchQuestion}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Section 6: From the Journal ─────────────────────── */}
      <section aria-labelledby="journal-preview-heading" className="bg-surface">
        <div className="max-w-content mx-auto px-6 py-16">
          <div className="flex items-baseline justify-between mb-8">
            <h2
              id="journal-preview-heading"
              className="font-serif font-medium text-2xl text-ink"
            >
              From the Research Journal
            </h2>
            <Link
              href="/journal"
              className="text-sm text-navy hover:text-navy/70 transition-colors duration-150 shrink-0 ml-4"
            >
              View all entries →
            </Link>
          </div>
          {latestEntries.length > 0 ? (
            <div className="max-w-2xl">
              {latestEntries.map((entry) => (
                <JournalEntry key={entry.slug} entry={entry} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">
              Journal entries will appear here as research progresses.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
