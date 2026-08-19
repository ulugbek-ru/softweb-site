import { NextRequest, NextResponse } from "next/server";
import { handleTelegramUpdate } from "@/lib/telegram/bot-engine";

export async function POST(req: NextRequest) {
  try {
    const update = await req.json();
    // Process update asynchronously or synchronously
    await handleTelegramUpdate(update);
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error("Error in Telegram webhook:", error);
    // Always return 200 to Telegram so it doesn't repeatedly retry failing requests
    return NextResponse.json({ ok: true, error: "Internal processing caught" });
  }
}
  
export async function GET() {
  return NextResponse.json({
    status: "active",
    name: "SoftWeb Telegram Customer Engine Webhook",
    timestamp: new Date().toISOString(),
  });
}
