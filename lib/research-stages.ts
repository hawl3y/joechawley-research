// Every stage a project may use. Also the source for the Project `stage` and
// `stages` enums in contentlayer.config.ts.
export const ALL_STAGES = [
  'concept',
  'literature-review',
  'proposal',
  'interviews',
  'evaluation',
  'analysis',
  'draft',
  'publication',
] as const

export type ResearchStage = typeof ALL_STAGES[number]

// Stage list used when a project does not define its own `stages`.
export const DEFAULT_STAGES: readonly ResearchStage[] = [
  'concept',
  'literature-review',
  'proposal',
  'interviews',
  'analysis',
  'draft',
  'publication',
]

export const STAGE_LABELS: Record<ResearchStage, string> = {
  'concept':           'Concept',
  'literature-review': 'Lit. Review',
  'proposal':          'Proposal',
  'interviews':        'Interviews',
  'evaluation':        'Evaluation',
  'analysis':          'Analysis',
  'draft':             'Draft',
  'publication':       'Publication',
}

interface StagedProject {
  slug: string
  stage: string
  stages?: string[]
}

// Returns the project's stage list. Throws (failing the static build) if the
// current stage is not in that list.
export function getProjectStages(project: StagedProject): readonly ResearchStage[] {
  const stages = (project.stages?.length ? project.stages : DEFAULT_STAGES) as readonly ResearchStage[]
  if (!stages.includes(project.stage as ResearchStage)) {
    throw new Error(
      `Project "${project.slug}": current stage "${project.stage}" is not in its stage list [${stages.join(', ')}].`
    )
  }
  return stages
}

export function getStageLabel(stage: string): string {
  return STAGE_LABELS[stage as ResearchStage] ?? stage
}
