import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import { SITE, OG_DEFAULTS } from '@/lib/site'
import { getActiveProjects } from '@/lib/content'
import ResearchQuestion from '@/components/research/ResearchQuestion'

export const metadata: Metadata = {
  title: 'About',
  description: SITE.mission.full,
  openGraph: {
    ...OG_DEFAULTS,
    title: 'About',
    description: SITE.mission.full,
  },
}

export default function AboutPage() {
  const current = getActiveProjects()[0] ?? null

  return (
    <PageLayout>
      {/* Mission */}
      <h1 className="sr-only">About</h1>
      <section className="mb-12 pb-12 border-b border-gray-100">
        <p className="font-serif font-medium text-3xl md:text-4xl text-ink leading-[1.25] mb-6">
          {SITE.mission.full}
        </p>
        <p className="font-serif text-lg text-muted leading-relaxed">
          Research is the product. This platform documents research in
          progress, not just final outputs. Working theories, raw
          observations, literature frameworks, and the reasoning behind
          decisions are published as they develop.
        </p>
      </section>

      {/* Research focus */}
      <section className="mb-12 pb-12 border-b border-gray-100">
        <h2 className="font-serif font-medium text-xl text-ink mb-4">Research Focus</h2>
        {current && (
          <>
            <p className="font-serif text-lg text-muted leading-relaxed mb-5">
              The current research, Project {current.projectNumber}, asks:{' '}
              {current.researchQuestion} The study is role-neutral: it does
              not assume or test any specific security role.
            </p>
            {current.researchQuestions && current.researchQuestions.length > 0 && (
              <ResearchQuestion
                question={current.researchQuestion}
                questions={current.researchQuestions}
                className="mb-5"
              />
            )}
          </>
        )}
        <p className="font-serif text-lg text-muted leading-relaxed">
          Earlier research examined the BISO as a governance intermediary
          (paused).
        </p>
      </section>

      {/* Founder */}
      <section className="mb-12 pb-12 border-b border-gray-100">
        <h2 className="font-serif font-medium text-xl text-ink mb-4">About the Researcher</h2>
        <p className="font-serif text-lg text-muted leading-relaxed mb-5">
          Joe C. Hawley is a cybersecurity director and Business Information
          Security Partner with experience spanning security governance, risk
          management, and security-business integration across enterprise
          environments.
        </p>
        <p className="font-serif text-lg text-muted leading-relaxed mb-5">
          He is completing a Master of Science in Cybersecurity at Georgia
          Tech. His graduate research develops and evaluates a framework for
          measuring and communicating the realized business value of
          cybersecurity, using Design Science Research.
        </p>
        <p className="font-serif text-lg text-muted leading-relaxed">
          This site is where that research lives publicly. It documents
          the work as it happens, not just when it is done.
        </p>
      </section>

      {/* External links */}
      <section>
        <h2 className="font-serif font-medium text-xl text-ink mb-4">Elsewhere</h2>
        <ul className="space-y-3">
          <li>
            <a
              href={SITE.links.personal}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-navy hover:underline"
            >
              JoeCHawley.com
            </a>
            <span className="text-sm text-muted ml-2">(professional site)</span>
          </li>
          <li>
            <a
              href={SITE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-navy hover:underline"
            >
              LinkedIn
            </a>
            <span className="text-sm text-muted ml-2">(professional profile)</span>
          </li>
        </ul>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-muted leading-relaxed">
            For research inquiries or collaboration,
            reach out via{' '}
            <a
              href={SITE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy hover:underline"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </section>
    </PageLayout>
  )
}
