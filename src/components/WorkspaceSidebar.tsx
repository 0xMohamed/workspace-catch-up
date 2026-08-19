import React from 'react'
import type { IntegrationId } from '../lib/schemas'
import { getIntegration } from '../integrations/registry'
import {
  Plus,
  Layers,
  MessageSquareQuote,
  Mail,
  MessageSquare,
  CreditCard,
  ShoppingBag,
  Table,
  RotateCcw,
} from 'lucide-react'

interface WorkspaceSidebarProps {
  prompt: string
  selectedIntegrations: IntegrationId[]
  onNewRequest: () => void
  onEditRequest: () => void
  isLoading?: boolean
}

const ICON_MAP: Record<IntegrationId, React.ComponentType<{ className?: string }>> = {
  gmail: Mail,
  slack: MessageSquare,
  stripe: CreditCard,
  shopify: ShoppingBag,
  'google-sheets': Table,
}

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  prompt,
  selectedIntegrations,
  onNewRequest,
  onEditRequest,
  isLoading = false,
}) => {
  return (
    <aside
      aria-label="Workspace Session Info"
      className="flex flex-col justify-between gap-6 rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs"
    >
      <div className="space-y-5">
        {/* New Request Button */}
        <div>
          <button
            type="button"
            onClick={onNewRequest}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-3.5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 active:scale-98 transition cursor-pointer disabled:opacity-50"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Request</span>
          </button>
        </div>

        {/* User Prompt / Request Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <MessageSquareQuote className="h-3.5 w-3.5" />
              <span>Prompt Request</span>
            </span>
            <button
              type="button"
              onClick={onEditRequest}
              disabled={isLoading}
              className="text-[11px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Edit
            </button>
          </div>

          <div className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-3 text-xs leading-relaxed text-zinc-800">
            &ldquo;{prompt}&rdquo;
          </div>
        </div>

        {/* Selected Context Sources */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              <span>Active Context</span>
            </span>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600">
              {selectedIntegrations.length} sources
            </span>
          </div>

          <div className="space-y-1.5">
            {selectedIntegrations.map((id) => {
              const integration = getIntegration(id)
              const Icon = ICON_MAP[id] || Layers
              if (!integration) return null

              return (
                <div
                  key={id}
                  className="flex items-center gap-2.5 rounded-lg border border-zinc-100/90 bg-white px-2.5 py-2 text-xs text-zinc-700 shadow-2xs"
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-zinc-100 text-zinc-600">
                    <Icon className="h-3 w-3" />
                  </div>
                  <span className="font-medium text-zinc-800 truncate flex-1">
                    {integration.name}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-zinc-100 pt-3 text-[11px] text-zinc-400 flex items-center justify-between">
        <span>Session active</span>
        <button
          type="button"
          onClick={onEditRequest}
          className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-800 cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Modify</span>
        </button>
      </div>
    </aside>
  )
}
