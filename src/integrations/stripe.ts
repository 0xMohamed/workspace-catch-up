import type { Integration } from './types'

export const stripeIntegration: Integration = {
  id: 'stripe',
  name: 'Stripe',
  description: 'Payment volume, MRR expansion, failed invoices, and dispute resolutions',
  icon: 'CreditCard',
  getContext: () => `
=== STRIPE CONTEXT (Past 48 Hours) ===
1. Revenue & Payment Activity:
   - Gross Volume (48h): $72,250 processed across 210 successful charges (+24% compared to previous 48h).
   - Net MRR Movement: +$3,450 new MRR added from 14 Pro Plan tier upgrades and 2 Enterprise expansions.
   - Largest Transaction: Vertex Systems annual renewal ($35,000.00 USD) settled successfully via ACH transfer.

2. Failed Payments & Dunning:
   - 3 recurring subscription renewal charges failed ($320.00 total) due to card expiration (bank decline code: 'do_not_honor' & 'expired_card').
   - Customers: Atlas Studio ($120/mo), Luminary Digital ($120/mo), Kestrel Design ($80/mo).
   - Dunning status: Stripe Smart Retries cycle 1 initiated; automated card update emails dispatched to account billing owners.

3. Disputes & Chargebacks:
   - 1 dispute (#dp_9941a) was won and closed in your merchant favor ($150.00 dispute reversal fee refunded).
   - Active dispute rate remains healthy at 0.02% (well below the 0.75% Visa/Mastercard monitoring threshold).

4. Payouts:
   - Automatic scheduled payout of $41,200.00 initiated to primary Silicon Valley Bank operating account (estimated arrival tomorrow).
`.trim(),
}
