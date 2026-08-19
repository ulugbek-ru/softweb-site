# SOFTWEB — Unified Website & Telegram Bot Customer System

A complete digital agency platform connecting **SoftWeb Website ↔ Backend API ↔ Telegram Bot ↔ Owner/Admin** with a shared pricing engine, dual currency support (`UZS` + `USD`), and two-way operator routing.

---

## 🌟 Key Capabilities

1. **Shared Pricing Engine**:
   - Both Website Calculator and Telegram Bot call the exact same `calculateProjectPrice()` engine in `src/lib/pricing/index.ts`.
   - Prices always match across all channels.
   - Primary currency: **Uzbek so'm (UZS)** with proper spacing (e.g. `15 000 000 so'm`).
   - Secondary currency: **USD** (e.g. `≈ $1,200 USD`).
   - Centralized exchange rate: `USD_TO_UZS="12800"`.

2. **Telegram Customer Chatbot Engine**:
   - `/start`: Natural professional Uzbek greeting with interactive inline services.
   - **5-Step Interactive Calculator**: Step-by-step questionnaire with dynamic price quotation.
   - **Order Confirmation**: Saves permanent quotation and dispatches structured cards to Owner.
   - **Human Operator Mode**: Owner can click `[💬 Javob berish]` to talk directly to customers.
   - **Smart FAQ**: Instant answers to common questions ("SoftWeb nima?", "Sayt qancha turadi?").

3. **Unified Database & Quotation Store**:
   - Lightweight file-backed store in `data/softweb-db.json`.
   - Stores users, requests, quotations (with frozen exchange rates), and conversation logs.

4. **Website Experience**:
   - Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion.
   - Deep obsidian dark theme, custom spring cursor, glassmorphism navbar, and responsive layout.

---

## 🚀 Running the Project

### 1. Configure `.env.local`
```env
TELEGRAM_BOT_TOKEN="8791072466:AAH1gT6vgDSTGr-iIZt0zVoovH3QlufxMuU"
TELEGRAM_CHAT_ID="7991572015"
TELEGRAM_OWNER_ID="7991572015"
USD_TO_UZS="12800"
NEXT_PUBLIC_USD_TO_UZS="12800"
NEXT_PUBLIC_SITE_URL="https://softweb.uz"
```

### 2. Run Website Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 3. Run Telegram Bot (Local Polling)
In a separate terminal:
```bash
npm run bot
```

### 4. Production Build
```bash
npm run build
npm start
```
Webhook endpoint is available at `/api/telegram/webhook`.
