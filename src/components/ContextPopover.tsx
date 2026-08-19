import React, { useState, useRef, useEffect } from 'react'
import type { IntegrationId } from '../lib/schemas'
import { getAllIntegrations } from '../integrations/registry'
import {
  Mail,
  MessageSquare,
  CreditCard,
  ShoppingBag,
  Table,
  Layers,
  Check,
  ChevronDown,
} from 'lucide-react'

interface ContextPopoverProps {
  selectedIds: IntegrationId[]
  onChange: (ids: IntegrationId[]) => void
  disabled?: boolean
}

const ICON_MAP: Record<IntegrationId, React.ComponentType<{ className?: string }>> = {
  gmail: Mail,
  slack: MessageSquare,
  stripe: CreditCard,
  shopify: ShoppingBag,
  'google-sheets': Table,
}

export const ContextPopover: React.FC<ContextPopoverProps> = ({
  selectedIds,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const integrations = getAllIntegrations()

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const toggleIntegration = (id: IntegrationId) => {
    if (disabled) return
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((item) => item !== id))
    } else {
      onChange([...selectedIds, id])
    }
  }

  const selectAll = () => {
    onChange(integrations.map((i) => i.id))
  }

  const clearAll = () => {
    onChange([])
  }

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Context Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all ${
          isOpen
            ? 'border-zinc-400 bg-zinc-100 text-zinc-900 shadow-xs'
            : selectedIds.length > 0
            ? 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100/80 text-zinc-800'
            : 'border-dashed border-zinc-300 bg-white text-zinc-500 hover:border-zinc-400 hover:text-zinc-800'
        } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        <Layers className="h-3.5 w-3.5 text-zinc-500" />
        <span>Context</span>

        {selectedIds.length > 0 ? (
          <span className="flex items-center gap-1 font-semibold text-zinc-900">
            <span className="rounded bg-zinc-200 px-1.5 py-0.5 text-[10px]">
              {selectedIds.length}
            </span>
          </span>
        ) : (
          <span className="text-[11px] text-amber-600 font-normal">None selected</span>
        )}

        <ChevronDown
          className={`h-3.5 w-3.5 text-zinc-400 transition-transform duration-150 ${
            isOpen ? 'rotate-180 text-zinc-700' : ''
          }`}
        />
      </button>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Workspace Context Sources"
          className="animate-popover absolute bottom-full left-0 z-50 mb-2 w-72 origin-bottom-left rounded-xl border border-zinc-200/90 bg-white p-2 shadow-lg ring-1 ring-black/5 sm:w-80"
        >
          <div className="flex items-center justify-between border-b border-zinc-100 px-2 py-1.5 pb-2">
            <div>
              <p className="text-xs font-semibold text-zinc-900">Workspace Context</p>
              <p className="text-[11px] text-zinc-500">Select sources for AI context</p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={selectAll}
                className="text-[11px] font-medium text-zinc-600 hover:text-zinc-900 hover:underline cursor-pointer"
              >
                All
              </button>
              <span className="text-zinc-300">•</span>
              <button
                type="button"
                onClick={clearAll}
                className="text-[11px] font-medium text-zinc-500 hover:text-rose-600 hover:underline cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          {/* List of Integrations */}
          <div className="space-y-1 py-1.5 max-h-64 overflow-y-auto">
            {integrations.map((integration) => {
              const isSelected = selectedIds.includes(integration.id)
              const Icon = ICON_MAP[integration.id] || Layers

              return (
                <button
                  key={integration.id}
                  type="button"
                  onClick={() => toggleIntegration(integration.id)}
                  className={`group flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-100/90 text-zinc-900 font-medium'
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}
                >
                  <div
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                      isSelected
                        ? 'border-zinc-900 bg-zinc-900 text-white'
                        : 'border-zinc-300 bg-white group-hover:border-zinc-400'
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>

                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-600">
                    <Icon className="h-3.5 w-3.5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate">{integration.name}</span>
                    </div>
                    <p className="truncate text-[10px] text-zinc-400">
                      {integration.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Footer Info */}
          <div className="border-t border-zinc-100 px-2 pt-2 text-[11px] text-zinc-500 flex items-center justify-between">
            <span>
              {selectedIds.length === 0 ? (
                <span className="text-rose-600 font-medium">Select at least 1</span>
              ) : (
                `${selectedIds.length} of ${integrations.length} active`
              )}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700 hover:bg-zinc-200 cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
