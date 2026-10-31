import type { Metadata } from 'next'

export const SITE = {
  name: 'Joe C. Hawley · Research',
  // Shown under the wordmark and on the OG image
  descriptor: 'Cybersecurity governance, risk, and value',
  author: 'Joe C. Hawley',
  // Canonical URL. NEXT_PUBLIC_SITE_URL (set in Vercel) takes precedence.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://research.joechawley.com',
  mission: {
    // Used in header subtitle and meta description
    short: 'Independent research on cybersecurity governance',
    // Used in hero, footer, about page, and OG meta
    full: 'Research on how security organizations measure, prove, and communicate the value they deliver.',
  },
  links: {
    personal: 'https://joechawley.com',
    linkedin: 'https://www.linkedin.com/in/joechawley/',
  },
  year: new Date().getFullYear().toString(),
} as const

// Page-level `openGraph` / `twitter` metadata replaces the root layout's object
// entirely, so pages that set their own must spread these to keep the site
// name, type, and default OG image.
export const OG_DEFAULTS: NonNullable<Metadata['openGraph']> = {
  siteName: SITE.name,
  type: 'website',
  locale: 'en_US',
  images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: SITE.name }],
}

export const TWITTER_DEFAULTS: NonNullable<Metadata['twitter']> = {
  card: 'summary_large_image',
  images: ['/opengraph-image'],
}
