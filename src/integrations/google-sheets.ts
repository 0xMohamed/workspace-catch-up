import type { Integration } from './types'

export const googleSheetsIntegration: Integration = {
  id: 'google-sheets',
  name: 'Google Sheets',
  description: 'Financial forecasting models, company growth scorecards, and roadmap prioritization',
  icon: 'Table',
  getContext: () => `
=== GOOGLE SHEETS CONTEXT (Past 48 Hours) ===
1. Sheet: "Q3 2026 Financial Model & Cash Runway" (Edited by CFO Arthur Pendelton yesterday at 6:10 PM)
   - Monthly Burn Rate: Updated to $142,000/mo (down $18k from budget plan due to cloud infrastructure optimizations).
   - Cash Balance: $3,480,000 in liquid reserves.
   - Runway: Extended from 19 months to 24.5 months at current growth trajectory.
   - Note on Cell G24: "Recommend approving Staff Engineer hire David K.; head-count budget accommodates $200k base without altering runway targets."

2. Sheet: "Weekly Product & Growth Scorecard" (Updated automatically yesterday at 11:59 PM)
   - Weekly Active Workspaces (WAW): 5,120 (Target: 4,800 - 106.6% to goal).
   - 7-Day Net Retention Rate: 98.4% (Industry top-quartile benchmark: 95%).
   - Free-to-Paid Conversion Velocity: 6.2 days average (improved from 8.5 days).

3. Sheet: "2026 Core Engineering Roadmap Prioritization" (Edited by VP Product yesterday at 1:45 PM)
   - Sprint 16 Kickoff: Scope locked. Priority 1: Multi-workspace Context Switcher; Priority 2: Realtime Webhooks Engine; Priority 3: SOC2 Type II Audit Artifact Export.
   - Backlog items moved: AI Catch-up Summarization marked "In Staging / Final QA".
`.trim(),
}
