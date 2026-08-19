import OpenAI from 'openai'
import { catchUpResponseSchema, type CatchUpResponse } from '../lib/schemas'

const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash'

export function getAiClient(): OpenAI {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY is not set. Please add GEMINI_API_KEY to your environment or .env file.'
    )
  }

  return new OpenAI({
    apiKey,
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
  })
}

export async function callGeminiCatchUp(
  systemPrompt: string,
  userPrompt: string
): Promise<CatchUpResponse> {
  const client = getAiClient()

  let rawContent = ''
  try {
    const response = await client.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    })

    rawContent = response.choices[0]?.message?.content || ''
  } catch (apiError: any) {
    // If the primary model fails or model name needs fallback
    if (
      apiError?.status === 404 ||
      apiError?.message?.includes('not found') ||
      apiError?.message?.includes('model')
    ) {
      const fallbackModel = 'gemini-2.0-flash'
      const fallbackResponse = await client.chat.completions.create({
        model: fallbackModel,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.2,
      })
      rawContent = fallbackResponse.choices[0]?.message?.content || ''
    } else {
      throw apiError
    }
  }

  if (!rawContent.trim()) {
    throw new Error('Received an empty response from Gemini.')
  }

  // Clean markdown code blocks if the model wrapped output in ```json ... ```
  let cleaned = rawContent.trim()
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()
  }

  try {
    const parsed = JSON.parse(cleaned)
    const validation = catchUpResponseSchema.safeParse(parsed)
    if (validation.success) {
      return validation.data
    }

    // Fallback normalization if properties have slightly different shapes
    return {
      summary: typeof parsed.summary === 'string' ? parsed.summary : cleaned,
      highlights: Array.isArray(parsed.highlights)
        ? parsed.highlights.map((h: any) => ({
            title: String(h?.title || 'Key Update'),
            description: String(h?.description || ''),
            source: String(h?.source || 'Workspace'),
            priority:
              h?.priority === 'high' || h?.priority === 'medium' || h?.priority === 'low'
                ? h.priority
                : 'medium',
          }))
        : [],
      nextSteps: Array.isArray(parsed.nextSteps)
        ? parsed.nextSteps.map((s: any) => String(s))
        : [],
    }
  } catch (_jsonErr) {
    // Graceful fallback for non-JSON text output
    return {
      summary: cleaned,
      highlights: [],
      nextSteps: [
        'Review the summary above against your active workspace goals.',
        'Select specific integrations for more targeted context if needed.',
      ],
    }
  }
}
