import { Link } from '@tanstack/react-router'
import { Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-zinc-200/80 bg-white/70 px-4 py-3 backdrop-blur-md sticky top-0 z-40">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-zinc-900 no-underline hover:opacity-90 transition-opacity"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-2xs">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-bold tracking-tight">Workspace Catch-up</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-medium text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>5 context sources</span>
          </span>
        </div>
      </div>
    </header>
  )
}
