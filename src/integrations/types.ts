import type { IntegrationId } from '../lib/schemas'

export interface Integration {
  id: IntegrationId
  name: string
  description: string
  icon: string
  getContext: () => string | Promise<string>
}
