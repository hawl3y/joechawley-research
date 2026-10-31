#!/usr/bin/env node
// Fails the build if any em dash (U+2014) or en dash (U+2013) appears in repo text.
// Runs as `prebuild`. See "Hard Rules > Content" in CLAUDE.md.
//
// Scans every research/project-*/ folder except those in READ_ONLY_RESEARCH,
// so new projects are covered automatically. research/ lives in the private
// joechawley-research-sources repo, so it is skipped when not present.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()

const DIRS = ['app', 'components', 'content', 'lib', 'docs', 'scripts']
const FILES = ['STATUS.md', 'CLAUDE.md', 'README.md']
const EXCLUDE_DIRS = new Set(['node_modules', '.next', '.contentlayer', '.git'])
const TEXT_EXT = /\.(md|mdx|ts|tsx|js|jsx|mjs|cjs|json|css|txt|yml|yaml)$/i

const DASHES = /[\u2013\u2014]/

// Read-only research source folders. Not scanned because their files must not be edited.
const READ_ONLY_RESEARCH = new Set(['project-001-biso'])

if (existsSync(join(ROOT, 'research'))) {
  for (const name of readdirSync(join(ROOT, 'research'))) {
    if (name.startsWith('project-') && !READ_ONLY_RESEARCH.has(name)) DIRS.push(join('research', name))
  }
}

function walk(dir, out) {
  for (const name of readdirSync(dir)) {
    if (EXCLUDE_DIRS.has(name)) continue
    const path = join(dir, name)
    const stat = statSync(path)
    if (stat.isDirectory()) walk(path, out)
    else if (TEXT_EXT.test(name)) out.push(path)
  }
  return out
}

const files = [
  ...DIRS.flatMap((d) => walk(join(ROOT, d), [])),
  ...FILES.map((f) => join(ROOT, f)),
]

const hits = []
for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n')
  lines.forEach((line, i) => {
    if (DASHES.test(line)) {
      const kind = line.includes('\u2014') ? 'em dash' : 'en dash'
      hits.push(`${relative(ROOT, file)}:${i + 1}: ${kind}: ${line.trim().slice(0, 120)}`)
    }
  })
}

if (hits.length) {
  console.error(`\ncheck-dashes: found ${hits.length} line(s) with em or en dashes. Use commas, colons, periods, parentheses, or a hyphen for ranges.\n`)
  for (const h of hits) console.error(`  ${h}`)
  console.error('')
  process.exit(1)
}

console.log(`check-dashes: ${files.length} files clean`)
