/**
 * SoftWeb Telegram Bot Polling Runner
 * Runs the customer chatbot engine locally in development
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...rest] = trimmed.split('=');
      const val = rest.join('=').replace(/^["']|["']$/g, '');
      if (key && !process.env[key]) {
        process.env[key] = val;
      }
    }
  });
}

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const OWNER_ID = process.env.TELEGRAM_OWNER_ID || process.env.TELEGRAM_CHAT_ID || '7991572015';

if (!BOT_TOKEN) {
  console.error("❌ TELEGRAM_BOT_TOKEN is not defined in .env.local!");
  process.exit(1);
}

console.log("=========================================");
console.log("🤖 SOFTWEB TELEGRAM CUSTOMER BOT ENGINE");
console.log(`🔑 Bot Token: ${BOT_TOKEN.slice(0, 10)}...`);
console.log(`👤 Owner Chat ID: ${OWNER_ID}`);
console.log("🌐 Forwarding updates to local webhook / engine...");
console.log("=========================================");

let offset = 0;
let isRunning = true;

async function deleteWebhook() {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/deleteWebhook?drop_pending_updates=false`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("📡 Webhook cleanup status:", data.ok ? "Clean / Ready for polling" : data.description);
  } catch (err) {
    console.warn("⚠️ Could not clean webhook:", err.message);
  }
}

async function processUpdateViaWebhook(update) {
  try {
    const res = await fetch("http://localhost:3000/api/telegram/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    });
    if (!res.ok) {
      console.error(`⚠️ Webhook route returned HTTP ${res.status}`);
    }
  } catch (err) {
    console.error("❌ Error sending update to /api/telegram/webhook:", err.message);
  }
}

async function poll() {
  while (isRunning) {
    try {
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${offset}&timeout=20&limit=50`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.ok && Array.isArray(data.result)) {
        for (const update of data.result) {
          offset = update.update_id + 1;
          const fromUser = update.message?.from || update.callback_query?.from;
          const text = update.message?.text || update.callback_query?.data || "[Action]";
          console.log(`📩 [Update #${update.update_id}] From: ${fromUser?.first_name || "User"} (${fromUser?.id}) -> "${text}"`);
          
          await processUpdateViaWebhook(update);
        }
      } else if (!data.ok) {
        console.error("⚠️ Telegram getUpdates error:", data.description);
        await new Promise((r) => setTimeout(r, 3000));
      }
    } catch (err) {
      console.error("⚠️ Network polling error:", err.message);
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

async function start() {
  await deleteWebhook();
  console.log("🚀 Polling worker listening for Telegram updates. Press Ctrl+C to stop.\n");
  poll();
}

process.on("SIGINT", () => {
  console.log("\n🛑 Stopping Telegram bot polling...");
  isRunning = false;
  process.exit(0);
});

process.on("SIGTERM", () => {
  isRunning = false;
  process.exit(0);
});

start();
