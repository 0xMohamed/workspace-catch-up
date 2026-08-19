# Workspace Catch-up

A small, production-minded AI workspace assistant built with **TanStack Start**, **React**, **TypeScript**, **Tailwind CSS**, and **Google Gemini** (via the OpenAI SDK).

Users can describe what they want to understand or accomplish, select which workspace integrations should provide context, and receive a structured, prioritized AI response.

---

## ⚡️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (Full-stack SSR with Server Functions)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **UI & Styling**: React 19, Tailwind CSS v4, Lucide React
- **Validation**: [Zod](https://zod.dev)
- **AI Integration**: [OpenAI JavaScript/TypeScript SDK](https://github.com/openai/openai-node) configured against Google's Gemini OpenAI-compatible endpoint (`https://generativelanguage.googleapis.com/v1beta/openai/`)
- **Model**: `gemini-2.5-flash` (with automated fallback to `gemini-2.0-flash`)

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
cd /Users/seoudy/Work/workspace-catchup
pnpm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Add your Google Gemini API key to `.env`:

```env
GEMINI_API_KEY=your_actual_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

> **Note**: If `GEMINI_API_KEY` is not set, the application cleanly catches the missing key on the server and displays a user-friendly error with a retry button.

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port indicated in your console) in your browser.

### 4. Run Test Suite

```bash
pnpm test
```

---

## 🏗 Architecture

The application implements a clean server-first unidirectional flow:

```text
User enters prompt & selects integrations (Gmail, Slack, Stripe, Shopify, Google Sheets)
        ↓
Frontend calls TanStack Start Server Function (`generateCatchUpFn`)
        ↓
Server validates input with Zod (prompt length, integration ID whitelist)
        ↓
Integration Registry resolves mock context for selected integrations
        ↓
Prompt Builder injects context as untrusted external data into SYSTEM prompt
        ↓
Server sends system + user prompt to Gemini via OpenAI SDK
        ↓
Gemini generates structured JSON response (`summary`, `highlights`, `nextSteps`)
        ↓
Frontend renders executive summary, prioritized highlight cards, and actionable checklist
```

---

## 🛡 Prompt Security & Context Boundary

A core engineering requirement is isolating external workspace data:

- **Untrusted Context**: Integration context is tagged in dedicated XML-style blocks (e.g. `<GMAIL_CONTEXT>`, `<STRIPE_CONTEXT>`) inside the **SYSTEM** prompt.
- **Instruction Guard**: The system prompt explicitly instructs Gemini to treat integration data as passive external context and ignore any override commands or prompt injections embedded within the workspace data.
- **Provider Independence**: The integration registry is completely decoupled from the AI provider layer, making it trivial to swap mock context providers with real API webhooks without touching the LLM orchestration.

---

## 📁 Project Structure

```text
src/
├── routes/
│   ├── __root.tsx            # HTML shell, metadata, and devtools
│   ├── index.tsx             # Single-page Workspace Catch-up app
│   └── about.tsx             # Architecture and security overview
│
├── components/
│   ├── PromptInput.tsx       # Textarea, character counter, quick suggestions
│   ├── IntegrationSelector.tsx # Multi-select source cards with badges
│   ├── ResponseCard.tsx      # Executive summary, highlights, and action checklist
│   ├── Header.tsx            # Sticky navigation with theme toggle & status
│   ├── Footer.tsx            # Branding & credits
│   └── ThemeToggle.tsx       # Dark/light mode switcher
│
├── integrations/
│   ├── types.ts              # Minimal integration interface
│   ├── registry.ts           # Registry & context aggregation
│   ├── gmail.ts              # Mock emails (SLA sign-offs, demo requests, offers)
│   ├── slack.ts              # Mock Slack messages (incidents, PRs, DMs)
│   ├── stripe.ts             # Mock billing (ARR expansion, failed dunning, payouts)
│   ├── shopify.ts            # Mock commerce (orders, low stock alerts, fulfillment)
│   └── google-sheets.ts      # Mock spreadsheets (financial models, growth KPIs)
│
├── server/
│   ├── generate-response.ts  # TanStack Start Server Function
│   ├── prompt.ts             # Secure system prompt builder
│   ├── ai.ts                 # OpenAI client configured for Gemini endpoint
│   └── __tests__/
│       └── verify-flow.ts    # Comprehensive test suite
│
└── lib/
    └── schemas.ts            # Zod schemas for requests and structured AI output
```

---

## ⚖️ Design Decisions & Tradeoffs

See [DECISIONS.md](DECISIONS.md) for detailed rationale on why integrations are mocked, how security boundaries are maintained, and what is intentionally deferred for production.
