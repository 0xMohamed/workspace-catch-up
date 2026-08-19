import type { IntegrationId } from '../lib/schemas'
import type { Integration } from './types'
import { gmailIntegration } from './gmail'
import { slackIntegration } from './slack'
import { stripeIntegration } from './stripe'
import { shopifyIntegration } from './shopify'
import { googleSheetsIntegration } from './google-sheets'

export const INTEGRATIONS_MAP: Record<IntegrationId, Integration> = {
  gmail: gmailIntegration,
  slack: slackIntegration,
  stripe: stripeIntegration,
  shopify: shopifyIntegration,
  'google-sheets': googleSheetsIntegration,
}

export const ALL_INTEGRATIONS: Integration[] = [
  gmailIntegration,
  slackIntegration,
  stripeIntegration,
  shopifyIntegration,
  googleSheetsIntegration,
]

export function getIntegration(id: IntegrationId): Integration | undefined {
  return INTEGRATIONS_MAP[id]
}

export function getAllIntegrations(): Integration[] {
  return ALL_INTEGRATIONS
}

export async function getCombinedIntegrationContext(
  selectedIds: IntegrationId[]
): Promise<Array<{ id: IntegrationId; name: string; context: string }>> {
  const results = await Promise.all(
    selectedIds.map(async (id) => {
      const integration = INTEGRATIONS_MAP[id]
      if (!integration) {
        throw new Error(`Unrecognized integration id: ${id}`)
      }
      const context = await integration.getContext()
      return {
        id,
        name: integration.name,
        context,
      }
    })
  )

  return results
}
