import { z } from 'zod'

export const integrationIdSchema = z.enum([
  'gmail',
  'slack',
  'stripe',
  'shopify',
  'google-sheets',
])

export type IntegrationId = z.infer<typeof integrationIdSchema>

export const highlightPrioritySchema = z.enum(['high', 'medium', 'low'])
export type HighlightPriority = z.infer<typeof highlightPrioritySchema>

export const highlightItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  source: z.string().min(1),
  priority: highlightPrioritySchema,
})

export type HighlightItem = z.infer<typeof highlightItemSchema>

export const catchUpResponseSchema = z.object({
  summary: z.string().min(1),
  highlights: z.array(highlightItemSchema),
  nextSteps: z.array(z.string().min(1)),
})

export type CatchUpResponse = z.infer<typeof catchUpResponseSchema>

export const catchUpRequestSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, 'Please enter what you want to understand or accomplish')
    .max(1000, 'Prompt cannot exceed 1000 characters'),
  selectedIntegrations: z
    .array(integrationIdSchema)
    .min(1, 'Please select at least one workspace integration for context'),
})

export type CatchUpRequest = z.infer<typeof catchUpRequestSchema>
