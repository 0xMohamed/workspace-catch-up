import React, { useState } from 'react'
import type { CatchUpResponse, HighlightPriority } from '../lib/schemas'
import {
  Check,
  Copy,
  Sparkles,
  ListTodo,
  AlertCircle,
  FileText,
} from 'lucide-react'

interface ResponseCardProps {
  data: CatchUpResponse
  meta?: {
    selectedCount: number
    integrations: string[]
    timestamp: string
  }
}

const PRIORITY_BADGE_MAP: Record<
  HighlightPriority,
  { label: string; bg: string; text: string; border: string }
> = {
  high: {
    label: 'High',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
  },
  medium: {
    label: 'Medium',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  low: {
    label: 'Low',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
}

export const ResponseCard: React.FC<ResponseCardProps> = ({ data, meta }) => {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({})
  const [copied, setCopied] = useState(false)

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const handleCopySummary = async () => {
    const textToCopy = `Workspace Catch-up Summary:
${data.summary}

Key Highlights:
${data.highlights
  .map(
    (h) =>
      `• [${h.priority.toUpperCase()}] [${h.source}] ${h.title}: ${h.description}`
  )
  .join('\n')}

Next Steps:
${data.nextSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`

    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (_err) {
      // Fallback
    }
  }

  const formattedTime = meta?.timestamp
    ? new Date(meta.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null

  return (
    <article
      aria-label="Workspace synthesis artifact"
      className="space-y-6 rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs animate-fade-in sm:p-8"
    >
      {/* Top Header & Copy Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-2xs">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-zinc-900">
              Workspace Catch-up
            </h2>
            {meta && (
              <p className="text-[11px] text-zinc-400">
                Synthesized across {meta.integrations.join(', ')}
                {formattedTime && ` • ${formattedTime}`}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopySummary}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 shadow-2xs hover:bg-zinc-50 active:scale-98 transition cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-emerald-700">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-zinc-400" />
              <span>Copy report</span>
            </>
          )}
        </button>
      </div>

      {/* Executive Summary */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-zinc-400" />
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Executive Summary
          </h3>
        </div>
        <div className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-4 text-sm leading-relaxed text-zinc-800 sm:text-base">
          {data.summary}
        </div>
      </div>

      {/* Important Updates / Highlights Grid */}
      {data.highlights && data.highlights.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Important Updates ({data.highlights.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {data.highlights.map((item, index) => {
              const badge =
                PRIORITY_BADGE_MAP[item.priority] || PRIORITY_BADGE_MAP.medium

              return (
                <div
                  key={index}
                  className="flex flex-col justify-between rounded-xl border border-zinc-200/80 bg-white p-4 shadow-2xs transition-all hover:border-zinc-300"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700">
                        {item.source}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${badge.bg} ${badge.text} ${badge.border}`}
                      >
                        {badge.label}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-zinc-900">
                      {item.title}
                    </h4>

                    <p className="text-xs leading-relaxed text-zinc-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Suggested Next Steps Checklist */}
      {data.nextSteps && data.nextSteps.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-1.5">
            <ListTodo className="h-3.5 w-3.5 text-zinc-400" />
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Suggested Next Steps ({data.nextSteps.length})
            </h3>
          </div>

          <div className="divide-y divide-zinc-100 rounded-xl border border-zinc-200/80 bg-white shadow-2xs">
            {data.nextSteps.map((step, index) => {
              const isChecked = !!completedSteps[index]
              return (
                <label
                  key={index}
                  className="flex cursor-pointer items-start gap-3 p-3.5 text-xs sm:text-sm text-zinc-800 transition hover:bg-zinc-50/70"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleStep(index)}
                    className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 cursor-pointer"
                  />
                  <span
                    className={`flex-1 leading-snug ${
                      isChecked
                        ? 'line-through text-zinc-400'
                        : 'text-zinc-800'
                    }`}
                  >
                    {step}
                  </span>
                </label>
              )
            })}
          </div>
        </div>
      )}
    </article>
  )
}
