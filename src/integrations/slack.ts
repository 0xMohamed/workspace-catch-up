import type { Integration } from './types'

export const slackIntegration: Integration = {
  id: 'slack',
  name: 'Slack',
  description: 'Team channels, incident post-mortems, direct mentions, and product decisions',
  icon: 'MessageSquare',
  getContext: () => `
=== SLACK CONTEXT (Past 48 Hours) ===
1. Channel: #incident-room (Yesterday, 3:20 PM)
   - Lead SRE (@dani): "Incident INC-842 marked RESOLVED. Root cause: CDN edge cache invalidation storm caused temporary 400ms latency spike in Western Europe for ~12 minutes. Zero data loss. Auto-scaling stabilized traffic."
   - Eng Manager (@sam): "Action items: Post-mortem doc created in Notion. CDN rate limiting PR ready for review."

2. Channel: #product-eng (Yesterday, 5:10 PM)
   - Staff Engineer (@alex): "PR #482 (Vibe Checkout v2 with instant Apple Pay) is merged to main and running in staging. Automated E2E test suite passed 100%. Ready for canary deployment once product gives the green light."
   - PM (@rachel): "Looking great! Waiting for @founder confirmation on whether we launch Tuesday morning."

3. Direct Mentions / DMs:
   - Maya (Design Lead) (Yesterday, 2:15 PM): "@founder Hey! I uploaded the finalized Vibe Catch-up drawer and responsive card prototypes to Figma. Left 3 open questions regarding tablet breakpoint spacing when you're back."
   - Liam (Sales Engineer) (2 days ago, 4:00 PM): "@founder Quick heads up: closed the renewal call with Vertex Systems ($35k ARR). Contract signed in DocuSign, just need finance to generate Stripe invoice."

4. Channel: #general (2 days ago, 10:00 AM)
   - CEO Announcement (@olivia): "Team reached a major milestone today: 10,000 active connected workspaces! All-Hands moved to Thursday 3:00 PM EST to celebrate and review Q3 roadmap."
`.trim(),
}
