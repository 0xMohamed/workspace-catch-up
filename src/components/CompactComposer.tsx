import React, { useRef, useEffect } from 'react'
import type { IntegrationId } from '../lib/schemas'
import { ContextPopover } from './ContextPopover'
import { ArrowUp, Sparkles, X, CornerDownLeft } from 'lucide-react'

interface CompactComposerProps {
  prompt: string
  onChangePrompt: (val: string) => void
  selectedIntegrations: IntegrationId[]
  onChangeIntegrations: (ids: IntegrationId[]) => void
  onGenerate: () => void
  isLoading: boolean
  error?: string | null
}

const EXAMPLE_PROMPTS = [
  {
    label: '48h Catch-up',
    text: 'I was away for the last 2 days. Catch me up on anything important I missed.',
  },
  {
    label: 'Finance & Stock Alerts',
    text: 'What financial alerts, failed payments, or low inventory need attention?',
  },
  {
    label: 'Team & Roadmap Sync',
    text: 'Summarize engineering decisions, incident updates, and KPI metric changes.',
  },
]

export const CompactComposer: React.FC<CompactComposerProps> = ({
  prompt,
  onChangePrompt,
  selectedIntegrations,
  onChangeIntegrations,
  onGenerate,
  isLoading,
  error,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(
        Math.max(textareaRef.current.scrollHeight, 80),
        220
      )}px`
    }
  }, [prompt])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      if (!isLoading && prompt.trim() && selectedIntegrations.length > 0) {
        onGenerate()
      }
    }
  }

  const canGenerate = prompt.trim().length > 0 && selectedIntegrations.length > 0 && !isLoading

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      {/* Composer Card Container */}
      <div className="relative rounded-2xl border border-zinc-200/90 bg-white shadow-sm ring-1 ring-black/[0.03] transition-all focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-900/5">
        <div className="p-3.5 sm:p-4">
          <label htmlFor="composer-textarea" className="sr-only">
            Workspace catch-up prompt
          </label>
          <textarea
            id="composer-textarea"
            ref={textareaRef}
            value={prompt}
            onChange={(e) => onChangePrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What would you like to know or accomplish? Ask anything across your workspace..."
            disabled={isLoading}
            maxLength={1000}
            rows={3}
            className="w-full resize-none bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none sm:text-base leading-relaxed"
          />

          {prompt.length > 0 && !isLoading && (
            <button
              type="button"
              onClick={() => onChangePrompt('')}
              className="absolute right-3.5 top-3.5 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors cursor-pointer"
              title="Clear input"
              aria-label="Clear input"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Bottom Context Toolbar & Generate Button */}
        <div className="flex items-center justify-between border-t border-zinc-100/90 bg-zinc-50/50 px-3 py-2 rounded-b-2xl">
          <div className="flex items-center gap-2">
            <ContextPopover
              selectedIds={selectedIntegrations}
              onChange={onChangeIntegrations}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-zinc-400">
              <kbd className="rounded border border-zinc-200 bg-white px-1 py-0.5 font-mono text-[10px] text-zinc-600">
                ⌘↵
              </kbd>
            </span>

            <button
              type="button"
              onClick={onGenerate}
              disabled={!canGenerate}
              aria-label="Generate workspace catch-up"
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                canGenerate
                  ? 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-xs cursor-pointer active:scale-98'
                  : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
              }`}
            >
              <span>{isLoading ? 'Synthesizing...' : 'Generate'}</span>
              <ArrowUp className="h-3.5 w-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Error notification if validation or server error occurs */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50/80 px-3.5 py-2.5 text-xs text-rose-800 animate-fade-in"
        >
          {error}
        </div>
      )}

      {/* Quick Suggestions */}
      <div className="pt-1 flex flex-wrap items-center justify-center gap-1.5">
        <span className="text-[11px] font-medium text-zinc-400 mr-1">Suggestions:</span>
        {EXAMPLE_PROMPTS.map((ex, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onChangePrompt(ex.text)}
            disabled={isLoading}
            className="inline-flex items-center gap-1 rounded-full border border-zinc-200/80 bg-white/90 px-2.5 py-1 text-[11px] font-medium text-zinc-600 shadow-xs transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 cursor-pointer disabled:opacity-50"
          >
            <span>{ex.label}</span>
            <CornerDownLeft className="h-2.5 w-2.5 text-zinc-400" />
          </button>
        ))}
      </div>
    </div>
  )
}
