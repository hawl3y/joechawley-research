import Link from 'next/link'
import Nav from './Nav'
import { SITE } from '@/lib/site'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-gray-300">
      <div className="relative max-w-content mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Wordmark */}
        <Link
          href="/"
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 rounded-sm"
        >
          <span className="block font-serif font-medium text-xl sm:text-2xl text-navy leading-tight">
            {SITE.name}
          </span>
          <span className="block font-sans text-xs sm:text-sm text-muted mt-0.5">
            {SITE.descriptor}
          </span>
        </Link>

        {/* Nav: client component handles active state + mobile toggle */}
        <Nav />
      </div>
    </header>
  )
}
