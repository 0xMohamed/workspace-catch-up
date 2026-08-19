import { createServerFn } from '@tanstack/react-start'
import { catchUpRequestSchema, type CatchUpResponse } from '../lib/schemas'
import { getCombinedIntegrationContext } from '../integrations/registry'
import { buildSystemPrompt } from './prompt'
import { callGeminiCatchUp } from './ai'

export interface ServerFnSuccessResult {
  success: true
  data: CatchUpResponse
  meta: {
    selectedCount: number
    integrations: string[]
    timestamp: string
  }
}

export interface ServerFnErrorResult {
  success: false
  error: string
}

export type GenerateCatchUpResult = ServerFnSuccessResult | ServerFnErrorResult

export const generateCatchUpFn = createServerFn({ method: 'POST' })
  .validator((data: unknown) => {
    return catchUpRequestSchema.parse(data)
  })
  .handler(async ({ data }): Promise<GenerateCatchUpResult> => {
    try {
      // 1. Resolve selected integration contexts
      const contexts = await getCombinedIntegrationContext(data.selectedIntegrations)

      // 2. Build system prompt enforcing untrusted external context
      const systemPrompt = buildSystemPrompt(contexts)

      // 3. Call Gemini with OpenAI SDK
      const response: CatchUpResponse = await callGeminiCatchUp(systemPrompt, data.prompt)

      return {
        success: true,
        data: response,
        meta: {
          selectedCount: data.selectedIntegrations.length,
          integrations: contexts.map((c) => c.name),
          timestamp: new Date().toISOString(),
        },
      }
    } catch (err: any) {
      console.error('[generateCatchUpFn error]:', err)
      const message =
        err?.message ||
        'An unexpected error occurred while communicating with the AI service. Please try again.'

      return {
        success: false,
        error: message,
      }
    }
  })
