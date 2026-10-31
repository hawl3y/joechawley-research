import type { Metadata } from 'next'
import { Geist, Geist_Mono, Lora } from 'next/font/google'
import { Header } from '@/components/layout'
import { Footer } from '@/components/layout'
import PlausibleScript from '@/components/analytics/PlausibleScript'
import { SITE } from '@/lib/site'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})


export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.mission.full,
  metadataBase: new URL(SITE.url),
  authors: [{ name: SITE.author, url: SITE.links.personal }],
  creator: SITE.author,
  openGraph: {
    siteName: SITE.name,
    description: SITE.mission.full,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    description: SITE.mission.full,
  },
  robots: {
    index: true,
    follow: true,
  },
  // Icons come from app/favicon.ico, app/icon1.svg, app/icon2.png, app/apple-icon.png (Next.js file conventions)
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${lora.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-background text-ink font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-navy focus:text-white focus:text-sm focus:font-medium focus:rounded focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col outline-none">
          {children}
        </main>
        <Footer />
        <PlausibleScript />
      </body>
    </html>
  )
}
