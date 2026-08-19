import type { Integration } from './types'

export const shopifyIntegration: Integration = {
  id: 'shopify',
  name: 'Shopify',
  description: 'Store orders, merchandise volume, low stock alerts, and fulfillment queues',
  icon: 'ShoppingBag',
  getContext: () => `
=== SHOPIFY CONTEXT (Past 48 Hours) ===
1. Sales & Store Performance:
   - Total Orders: 418 orders completed across online storefront (+19.4% vs previous period).
   - Total Gross Sales: $46,850.00 USD (Average Order Value: $112.08).
   - Conversion Rate: 3.82% (up from 3.10% following the one-page checkout launch).

2. Inventory & Stock Alerts:
   - [LOW STOCK WARNING] SKU #DESK-LAMB-BLK ("Nomad Wireless LED Lamp"): 12 units remaining (Reorder point: 25 units). Daily velocity is 8 units/day. Expected stockout within 36 hours if supplier order is not confirmed.
   - [OUT OF STOCK] SKU #CABLE-ORG-OAK ("Minimalist Oak Cable Organizer"): Sold out yesterday at 7:40 PM. 46 customer waitlist email signups waiting for restock.

3. Fulfillment & Shipping:
   - 386 orders fulfilled and tracking numbers sent to customers.
   - 32 orders pending fulfillment; 6 orders currently flagged for address confirmation verification due to postal code mismatches in EU orders.

4. Customer Reviews:
   - 18 new verified buyer reviews submitted (Average Rating: 4.9 / 5.0 stars). Top praised feature is next-day fulfillment speed.
`.trim(),
}
