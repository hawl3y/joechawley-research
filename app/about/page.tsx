import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import { SITE, OG_DEFAULTS } from '@/lib/site'
import { getActiveProjects } from '@/lib/content'
import ResearchQuestion from '@/components/research/ResearchQuestion'

const CREDENTIALS = [
  'CISSP',
  'M.S. Cybersecurity student, Georgia Institute of Technology',
  'Mentor and coach, ISC2 NJ Chapter',
]

const SPEAKING_AND_WRITING: { text: string; href?: string }[] = [
  { text: 'ISC2 Think Tank panelist, neurodiversity in the cyber workforce (2025)' },
  {
    text: 'Guest editorial, THINK Digital Partners, how embracing autism strengthened a cybersecurity career (2025)',
  },
  {
    text: '"Burnout Is Part of the Risk Model" (LinkedIn post)',
    href: 'https://www.linkedin.com/posts/joechawley_%F0%9D%97%95%F0%9D%98%82%F0%9D%97%BF%F0%9D%97%BB%F0%9D%97%BC%F0%9D%98%82%F0%9D%98%81-%F0%9D%97%9C%F0%9D%98%80-%F0%9D%97%A3%F0%9D%97%AE%F0%9D%97%BF%F0%9D%98%81-%F0%9D%97%BC%F0%9D%97%B3-%F0%9D%98%81%F0%9D%97%B5%F0%9D%97%B2-share-7444413103762505728-O6dd/',
  },
]

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
          Research is the product. I publish work in progress, not only
          final results. Working theories, raw observations, literature
          notes, and the reasons behind my decisions go up as they develop.
        </p>
      </section>

      {/* Research focus */}
      <section className="mb-12 pb-12 border-b border-gray-100">
        <h2 className="font-serif font-medium text-xl text-ink mb-4">Research Focus</h2>
        {current && (
          <>
            <p className="font-serif text-lg text-muted leading-relaxed mb-5">
              My current research, Project {current.projectNumber}, asks:{' '}
              {current.researchQuestion} It does not assume or test any
              specific security role.
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
          My earlier project, on how security and business leaders make risk
          decisions together, is paused.
        </p>
      </section>

      {/* Founder */}
      <section className="mb-12 pb-12 border-b border-gray-100">
        <h2 className="font-serif font-medium text-xl text-ink mb-4">About the Researcher</h2>
        <p className="font-serif text-lg text-muted leading-relaxed mb-5">
          I lead cybersecurity strategy in the medical technology industry,
          with 20+ years in technology. I help business leaders make clear,
          risk-informed security decisions. I started in software and web
          development. Based in New York.
        </p>
        <p className="font-serif text-lg text-muted leading-relaxed">
          I am completing a Master of Science in Cybersecurity at Georgia
          Tech. For my graduate research, I am building and testing a
          framework that helps security teams measure and report the
          business value of their work. The method is Design Science
          Research.
        </p>
      </section>

      {/* Why I do this work */}
      <section className="mb-12 pb-12 border-b border-gray-100">
        <h2 className="font-serif font-medium text-xl text-ink mb-4">Why I do this work</h2>
        <p className="font-serif text-lg text-muted leading-relaxed">
          Although I began working with technology at an early age, most of
          my career has been at the intersection of business needs and
          technical capacity. Often, there is no clear return on investment
          or easy way to tie the work&apos;s value to the company&apos;s
          strategy and revenue. People working on these projects want their
          efforts to matter, and leaders need them to matter too. Aligning
          technical priorities with business goals is easier said than done.
          Now, as a cybersecurity leader focused on strategy, I face the same
          challenge. I hope this research helps practitioners and leaders
          measure and report the value their teams bring to the business in
          clear, simple terms.
        </p>
      </section>

      {/* Credentials */}
      <section className="mb-12 pb-12 border-b border-gray-100">
        <h2 className="font-serif font-medium text-xl text-ink mb-4">Credentials</h2>
        <ul className="font-serif text-lg text-muted leading-relaxed list-disc pl-6 space-y-2">
          {CREDENTIALS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Speaking and writing */}
      <section className="mb-12 pb-12 border-b border-gray-100">
        <h2 className="font-serif font-medium text-xl text-ink mb-4">Speaking and Writing</h2>
        <ul className="font-serif text-lg text-muted leading-relaxed list-disc pl-6 space-y-2">
          {SPEAKING_AND_WRITING.map((item) => (
            <li key={item.text}>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy hover:underline"
                >
                  {item.text}
                </a>
              ) : (
                item.text
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* External links */}
      <section>
        <h2 className="font-serif font-medium text-xl text-ink mb-4">Elsewhere</h2>
        <ul className="space-y-3">
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
          <li>
            <a
              href={SITE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-navy hover:underline"
            >
              GitHub
            </a>
          </li>
        </ul>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-muted leading-relaxed">
            For research questions or collaboration,
            contact me on{' '}
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
