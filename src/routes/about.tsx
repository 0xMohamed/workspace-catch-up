import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Shield, Cpu, Layers } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <section className="space-y-6 rounded-2xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-xs">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-zinc-600 no-underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Catch-up</span>
        </Link>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            About Workspace Catch-up
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            A compact, production-minded AI assistant demonstrating clean integration abstraction,
            TanStack Start Server Functions, and untrusted context isolation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4">
            <Layers className="h-5 w-5 text-zinc-800 mb-2" />
            <h2 className="text-sm font-semibold text-zinc-900">
              Integration Registry
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              Decoupled mock context providers for Gmail, Slack, Stripe, Shopify, and Google Sheets.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4">
            <Shield className="h-5 w-5 text-zinc-800 mb-2" />
            <h2 className="text-sm font-semibold text-zinc-900">
              Untrusted Context Boundary
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              External data is injected into system tags with prompt security guarding against injection.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4">
            <Cpu className="h-5 w-5 text-zinc-800 mb-2" />
            <h2 className="text-sm font-semibold text-zinc-900">
              OpenAI SDK + Gemini
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              Structured JSON extraction using Google’s OpenAI-compatible v1beta API endpoint.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
