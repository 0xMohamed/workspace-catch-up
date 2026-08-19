import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { IntegrationId } from '../lib/schemas'
import { CompactComposer } from '../components/CompactComposer'
import { WorkspaceSidebar } from '../components/WorkspaceSidebar'
import { ResponseCard } from '../components/ResponseCard'
import { generateCatchUpFn, type ServerFnSuccessResult } from '../server/generate-response'
import { Sparkles, Loader2, AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/')({ component: CatchUpApp })

type ViewState = 'compose' | 'generating' | 'workspace'

const DEFAULT_PROMPT =
  'I was away for the last 2 days. Catch me up on anything important I missed.'

const DEFAULT_INTEGRATIONS: IntegrationId[] = [
  'gmail',
  'slack',
  'stripe',
  'shopify',
  'google-sheets',
]

function CatchUpApp() {
  const [viewState, setViewState] = useState<ViewState>('compose')
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT)
  const [selectedIntegrations, setSelectedIntegrations] =
    useState<IntegrationId[]>(DEFAULT_INTEGRATIONS)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)
  const [responseResult, setResponseResult] = useState<ServerFnSuccessResult | null>(null)

  const handleGenerate = async () => {
    setValidationError(null)
    setServerError(null)

    const trimmed = prompt.trim()
    if (!trimmed) {
      setValidationError('Please enter what you would like to know or accomplish.')
      return
    }

    if (selectedIntegrations.length === 0) {
      setValidationError('Please select at least one workspace integration for context.')
      return
    }

    setViewState('generating')
    try {
      const result = await generateCatchUpFn({
        data: {
          prompt: trimmed,
          selectedIntegrations,
        },
      })

      if (result.success) {
        setResponseResult(result)
        setViewState('workspace')
      } else {
        setServerError(result.error)
        setViewState('workspace')
      }
    } catch (err: any) {
      setServerError(
        err?.message ||
          'Failed to connect to the catch-up server function. Please verify your GEMINI_API_KEY and network connection.'
      )
      setViewState('workspace')
    }
  }

  const handleNewRequest = () => {
    setViewState('compose')
    setResponseResult(null)
    setServerError(null)
    setValidationError(null)
  }

  const handleEditRequest = () => {
    setViewState('compose')
    setServerError(null)
    setValidationError(null)
  }

  return (
    <main className="flex-1 flex flex-col justify-center px-4 py-8 sm:py-12">
      {/* State A: Compose State */}
      {viewState === 'compose' && (
        <section
          aria-label="Prompt Composer"
          className="mx-auto w-full max-w-2xl text-center space-y-6 animate-scale-in"
        >
          {/* Header Identity */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Workspace Catch-up
            </h1>
            <p className="text-xs text-zinc-500 sm:text-sm max-w-md mx-auto">
              Bring together the context you choose and get a clear answer in seconds.
            </p>
          </div>

          {/* Compact Composer */}
          <CompactComposer
            prompt={prompt}
            onChangePrompt={(val) => {
              setPrompt(val)
              if (validationError) setValidationError(null)
            }}
            selectedIntegrations={selectedIntegrations}
            onChangeIntegrations={(ids) => {
              setSelectedIntegrations(ids)
              if (validationError) setValidationError(null)
            }}
            onGenerate={handleGenerate}
            isLoading={false}
            error={validationError}
          />
        </section>
      )}

      {/* State B & Generating: Two-Pane Workspace Layout */}
      {(viewState === 'generating' || viewState === 'workspace') && (
        <section
          aria-label="Workspace Session"
          className="mx-auto w-full max-w-5xl animate-fade-in"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Request & Context Sidebar (4 cols on lg) */}
            <div className="lg:col-span-4 lg:sticky lg:top-18">
              <WorkspaceSidebar
                prompt={prompt}
                selectedIntegrations={selectedIntegrations}
                onNewRequest={handleNewRequest}
                onEditRequest={handleEditRequest}
                isLoading={viewState === 'generating'}
              />
            </div>

            {/* Right Column: AI Output / Artifact Area (8 cols on lg) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Generating Loading State */}
              {viewState === 'generating' && (
                <div
                  aria-label="Synthesizing response"
                  className="space-y-6 rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs sm:p-8"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-white">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">
                        Synthesizing Workspace Context...
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        Analyzing {selectedIntegrations.length} data sources with Gemini
                      </p>
                    </div>
                  </div>

                  {/* Pulsing Skeleton Placeholders */}
                  <div className="space-y-3 pt-2 animate-pulse">
                    <div className="h-4 w-1/4 rounded bg-zinc-100" />
                    <div className="h-20 w-full rounded-xl bg-zinc-100/80" />
                  </div>

                  <div className="space-y-3 pt-2 animate-pulse">
                    <div className="h-4 w-1/3 rounded bg-zinc-100" />
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="h-24 rounded-xl bg-zinc-100/70" />
                      <div className="h-24 rounded-xl bg-zinc-100/70" />
                    </div>
                  </div>
                </div>
              )}

              {/* Server Error Alert */}
              {serverError && viewState === 'workspace' && (
                <div
                  role="alert"
                  className="space-y-3 rounded-2xl border border-rose-200 bg-rose-50/80 p-5 text-xs text-rose-900 animate-fade-in shadow-xs"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-4 w-4 text-rose-600 mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <p className="font-semibold text-rose-900">
                        Generation Failed
                      </p>
                      <p className="leading-relaxed text-rose-700">
                        {serverError}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleGenerate}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 font-medium text-white shadow-2xs hover:bg-rose-700 active:scale-98 transition cursor-pointer"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Retry</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleEditRequest}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3 py-1.5 font-medium text-rose-800 hover:bg-rose-50 cursor-pointer"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Edit Prompt</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Output Result Card */}
              {responseResult && viewState === 'workspace' && (
                <ResponseCard
                  data={responseResult.data}
                  meta={responseResult.meta}
                />
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
