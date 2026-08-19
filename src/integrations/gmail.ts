import type { Integration } from './types'

export const gmailIntegration: Integration = {
  id: 'gmail',
  name: 'Gmail',
  description: 'Unread emails, executive correspondence, and supplier communications',
  icon: 'Mail',
  getContext: () => `
=== GMAIL CONTEXT (Past 48 Hours) ===
1. [URGENT] From: Elena Rostova (Legal Counsel) <elena@rostovalaw.com>
   Subject: Acme Corp Enterprise Agreement - Redlined Terms of Service
   Date: Yesterday at 4:45 PM
   Summary: "Attached is the redlined enterprise SLA for Acme Corp ($120k ARR contract). They requested standard 99.95% uptime guarantees and mutual indemnity clauses. I need your executive sign-off on section 4.2 (Liability Caps) before 2 PM today so they can execute before quarter-end."

2. From: Marcus Vance (VP Customer Success, Nordic Retail) <marcus.vance@nordicretail.eu>
   Subject: Demo request: Multi-currency checkout before Friday Board Review
   Date: Yesterday at 11:15 AM
   Summary: "Our leadership team wants to review the new multicurrency checkout flow this Thursday. Can you confirm if staging environment has the EUR/GBP settlement toggle enabled? We have a 45-minute slot with our CIO on Friday."

3. From: Sarah Chen (Head of People & Talent) <sarah.chen@workspace.internal>
   Subject: Senior Staff Full-Stack Engineer - Final Interview Debrief & Offer Approval
   Date: 2 days ago at 6:30 PM
   Summary: "The hiring loop for David K. (Staff Full-Stack candidate) scored 4.8/5 across architecture, system design, and culture fit. Candidate has a competing offer expiring Wednesday. Submitted offer package ($195k base + equity) in Greenhouse awaiting your approval."

4. [NOTIFICATION] From: Google Cloud Platform Alerts <no-reply@cloud.google.com>
   Subject: Scheduled Maintenance Notice: Cloud SQL Postgres Cluster (us-east1)
   Date: 2 days ago at 8:00 AM
   Summary: "Routine engine upgrade scheduled for Sunday, 02:00 AM UTC. Expected downtime is under 90 seconds. Replica failover will occur automatically."
`.trim(),
}
