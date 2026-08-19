# Engineering Decisions

## What I would improve before production

1. **Add server-side rate limiting**
   The AI request is the main cost of the application, so I would add a simple server-side, IP-based rate limit for anonymous users to prevent excessive usage and unexpected AI costs.

2. **Improve AI reliability and validation**
   I would use a more structured system prompt and structured model output, then validate the response before displaying it. I would also add retries for transient AI/API failures.

3. **Improve error handling**
   I would make the application handle AI/API failures, invalid requests, and rate-limit responses gracefully instead of leaving the user with a broken or unclear state.

## What I intentionally left out

- **Authentication and persistent user accounts** — not required for the current anonymous experience and would add significant backend and database complexity.
- **Real third-party integrations and OAuth** — the task only requires dummy integrations to be used as AI context. Real integrations would require authentication, permissions, and additional infrastructure.
- **Billing, subscriptions, analytics, caching, and a larger backend architecture** — these are reasonable requirements for a mature production product, but they are outside the scope of this task and the 60-minute production-hardening window.

## Biggest production risk

The biggest production risk is **AI reliability**: the model may produce an incorrect or misleading output, especially if the integration context is incomplete, incorrect, or interpreted incorrectly.

## Why

Unlike a normal API failure, an AI request can succeed technically while still producing an incorrect result. This makes correctness harder to guarantee and can directly affect the value and trustworthiness of the product.

The improvements above therefore focus on limiting uncontrolled usage, validating inputs and outputs, making the AI flow more reliable, and failing gracefully when external AI services are unavailable.
