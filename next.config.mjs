import { withContentlayer } from 'next-contentlayer2'

// Canonical host comes from NEXT_PUBLIC_SITE_URL. Old and alternate hosts get a
// permanent (308) redirect to the same path on it. Only active when the
// variable is set explicitly, so a build without it never redirects to a host
// that is not ready.
const canonical = process.env.NEXT_PUBLIC_SITE_URL
const canonicalHost = canonical ? new URL(canonical).host : null
const ALTERNATE_HOSTS = ['research.joechawley.com', 'www.joechawley.com']

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  async redirects() {
    if (!canonicalHost) return []
    return ALTERNATE_HOSTS.filter((host) => host !== canonicalHost).map((host) => ({
      source: '/:path*',
      has: [{ type: 'host', value: host }],
      destination: `${canonical.replace(/\/$/, '')}/:path*`,
      permanent: true,
    }))
  },
}

export default withContentlayer(nextConfig)
