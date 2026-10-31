import { cn } from '@/lib/utils'

interface ResearchQuestionProps {
  question: string
  // When present, rendered as a numbered list (RQ1, RQ2, ...) in place of `question`
  questions?: string[]
  className?: string
}

export default function ResearchQuestion({ question, questions, className }: ResearchQuestionProps) {
  if (questions?.length) {
    return (
      <div className={cn(className)}>
        <p className="text-xs font-medium uppercase tracking-widest text-muted mb-4">
          Research Questions
        </p>
        <ol className="border-l-4 border-navy pl-6 space-y-4">
          {questions.map((q, i) => (
            <li key={i} className="font-serif text-lg md:text-xl text-ink leading-relaxed">
              <span className="not-italic font-sans text-sm font-semibold text-navy mr-2">
                RQ{i + 1}
              </span>
              <span className="italic">{q}</span>
            </li>
          ))}
        </ol>
      </div>
    )
  }

  return (
    <div className={cn(className)}>
      <p className="text-xs font-medium uppercase tracking-widest text-muted mb-4">
        Research Question
      </p>
      <blockquote className="font-serif text-xl md:text-2xl text-ink italic leading-relaxed border-l-4 border-navy pl-6">
        "{question}"
      </blockquote>
    </div>
  )
}
