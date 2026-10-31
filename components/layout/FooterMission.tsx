'use client'

import { usePathname } from 'next/navigation'
import { SITE } from '@/lib/site'

// Pages that open with the mission statement; the footer does not repeat it there
const OPENS_WITH_MISSION = ['/', '/about']

export default function FooterMission() {
  const pathname = usePathname()
  if (OPENS_WITH_MISSION.includes(pathname)) return null
  return (
    <p className="mt-2 text-sm text-muted leading-relaxed">
      {SITE.mission.full}
    </p>
  )
}
