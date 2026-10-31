import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import { SITE, OG_DEFAULTS } from '@/lib/site'
import { getActiveProjects } from '@/lib/content'

const HEADLINE = 'Cybersecurity Director | Researcher in cybersecurity governance, risk, and value'

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
  description: `${SITE.author}: ${HEADLINE}.`,
  openGraph: {
    ...OG_DEFAULTS,
    title: 'About',
    description: `${SITE.author}: ${HEADLINE}.`,
  },
}

const bodyText = 'font-serif text-lg text-muted leading-relaxed'
const sectionClass = 'mb-12 pb-12 border-b border-gray-100'
const sectionHeading = 'font-serif font-medium text-xl text-ink mb-4'
const linkClass = 'text-navy hover:underline'

export default function AboutPage() {
  const current = getActiveProjects()[0] ?? null

  return (
    <PageLayout>
      {/* Header */}
      <header className={sectionClass}>
        <h1 className="font-serif font-medium text-3xl md:text-4xl text-ink leading-[1.25] mb-3">
          {SITE.author}
        </h1>
        <p className="text-base text-muted leading-relaxed">{HEADLINE}</p>
      </header>

      {/* Bio */}
      <section className={sectionClass} aria-label="Bio">
        <p className="font-serif font-medium text-2xl text-ink leading-snug mb-5">
          I help organizations make clear, risk-informed security decisions.
        </p>
        <p className={`${bodyText} mb-5`}>
          Director-level security leader in the medical technology industry,
          with 20+ years in the field. I started in software and web
          development and now work on enterprise security strategy.
        </p>
        <p className={bodyText}>Based in New York.</p>
      </section>

      {/* Research focus */}
      <section className={sectionClass}>
        <h2 className={sectionHeading}>Research Focus</h2>
        <p className={`${bodyText} mb-5`}>
          Independent research on how security organizations measure, prove,
          and communicate the value they deliver.
        </p>
        <ul className="space-y-2 text-base">
          {current && (
            <li>
              <Link href={`/research/${current.slug}`} className={linkClass}>
                Project {current.projectNumber}: {current.title}
              </Link>
            </li>
          )}
          <li>
            <Link href="/research" className={linkClass}>
              All research
            </Link>
          </li>
        </ul>
      </section>

      {/* Credentials */}
      <section className={sectionClass}>
        <h2 className={sectionHeading}>Credentials</h2>
        <ul className={`${bodyText} list-disc pl-6 space-y-2`}>
          {CREDENTIALS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Speaking and writing */}
      <section className={sectionClass}>
        <h2 className={sectionHeading}>Speaking and Writing</h2>
        <ul className={`${bodyText} list-disc pl-6 space-y-2`}>
          {SPEAKING_AND_WRITING.map((item) => (
            <li key={item.text}>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {item.text}
                </a>
              ) : (
                item.text
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Connect */}
      <section>
        <h2 className={sectionHeading}>Connect</h2>
        <ul className="space-y-3">
          <li>
            <a href={SITE.links.linkedin} target="_blank" rel="noopener noreferrer" className={`text-base ${linkClass}`}>
              LinkedIn
            </a>
            <span className="text-sm text-muted ml-2">(preferred contact)</span>
          </li>
          <li>
            <a href={SITE.links.github} target="_blank" rel="noopener noreferrer" className={`text-base ${linkClass}`}>
              GitHub
            </a>
          </li>
        </ul>
      </section>
    </PageLayout>
  )
}
