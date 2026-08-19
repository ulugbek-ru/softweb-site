import { ProjectOrderPayload, QuickContactPayload } from "@/types/order";
import { escapeHtml, getBotToken, getOwnerChatId, sendTelegramMessage } from "./telegram/api";
import { createCustomerRequest } from "@/lib/db/store";
import { formatUSD, formatUZS, getExchangeRate } from "@/config/currency";

export async function sendTelegramOrderNotification(payload: ProjectOrderPayload): Promise<{
  success: boolean;
  messageId?: number;
  error?: string;
  requestId?: string;
}> {
  try {
    const ownerId = getOwnerChatId();

    const featuresFormatted =
      payload.selectedServices.length > 0
        ? payload.selectedServices.map((s) => `• ${escapeHtml(s)}`).join("\n")
        : "Standart funksiyalar";

    // Extract or parse budget
    const budgetStr = payload.estimatedBudget || "$800 – $1,500";

    // Save in unified customer requests store
    const requestRecord = createCustomerRequest({
      source: "website",
      status: "NEW",
      fullName: payload.fullName,
      telegram: payload.telegram,
      phone: payload.phone,
      email: payload.email,
      company: payload.company,
      projectType: payload.projectType,
      selectedServices: payload.selectedServices,
      budgetUSD: budgetStr,
      budgetUZS: budgetStr, // or computed UZS
      deadline: payload.deadline,
      description: payload.description,
      calculatorSpecs: payload.calculatorSpecs,
    });

    const messageText = [
      `🚀 <b>SOFTWEB — YANGI VEB-SAYT BUYURTMASI</b>`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `📋 <b>Ariza raqami:</b> <code>${requestRecord.requestNumber}</code>`,
      `👤 <b>Mijoz:</b> ${escapeHtml(payload.fullName)}`,
      `📱 <b>Telegram:</b> ${escapeHtml(payload.telegram)}`,
      `📞 <b>Telefon:</b> ${escapeHtml(payload.phone || "Kiritilmagan")}`,
      `📧 <b>Email:</b> ${escapeHtml(payload.email)}`,
      `🏢 <b>Kompaniya:</b> ${escapeHtml(payload.company || "Mustaqil / Shaxsiy")}`,
      ``,
      `💻 <b>Loyiha turi:</b> ${escapeHtml(payload.projectType)}`,
      payload.calculatorSpecs?.design ? `🎨 <b>Dizayn talabi:</b> ${escapeHtml(payload.calculatorSpecs.design)}` : null,
      payload.calculatorSpecs?.pages ? `📄 <b>Sahifalar soni:</b> ${escapeHtml(payload.calculatorSpecs.pages)}` : null,
      ``,
      `⚙️ <b>Tanlangan imkoniyatlar:</b>\n${featuresFormatted}`,
      ``,
      `💰 <b>Taxminiy byudjet:</b> <code>${escapeHtml(budgetStr)}</code>`,
      `⏱ <b>Kerakli muddat:</b> ${escapeHtml(payload.deadline)}`,
      ``,
      `📝 <b>Loyiha tavsifi:</b>`,
      `<blockquote>${escapeHtml(payload.description)}</blockquote>`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━`,
      `🌐 <b>Manba:</b> SoftWeb Rasmiy Veb-Sayti`,
      `⏰ <b>Vaqt:</b> ${new Date().toLocaleString("en-US", { timeZone: "Asia/Tashkent" })} (Toshkent vaqti)`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const res = await sendTelegramMessage(ownerId, messageText, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "✅ Qabul qilish", callback_data: `req_accept_${requestRecord.id}` },
            { text: "❌ Rad etish", callback_data: `req_reject_${requestRecord.id}` },
          ],
        ],
      },
    });

    if (!res.success) {
      console.error("sendTelegramOrderNotification failed:", res.error);
      return { success: false, error: res.error, requestId: requestRecord.id };
    }

    return { success: true, messageId: res.messageId, requestId: requestRecord.id };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: errorMsg };
  }
}

export async function sendTelegramContactNotification(payload: QuickContactPayload): Promise<{
  success: boolean;
  messageId?: number;
  error?: string;
  requestId?: string;
}> {
  try {
    const ownerId = getOwnerChatId();

    const requestRecord = createCustomerRequest({
      source: "website",
      status: "NEW",
      fullName: payload.fullName,
      telegram: payload.telegramOrEmail,
      phone: payload.phone,
      email: payload.telegramOrEmail.includes("@") ? payload.telegramOrEmail : undefined,
      projectType: "Tezkor murojaat / Konsultatsiya",
      selectedServices: [],
      budgetUSD: "Kelishuv asosida",
      budgetUZS: "Kelishuv asosida",
      deadline: "Tezkor",
      description: payload.message,
    });

    const messageText = [
      `⚡️ <b>SOFTWEB — TEZKOR VEB MUROJAAT</b>`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `📋 <b>Ariza raqami:</b> <code>${requestRecord.requestNumber}</code>`,
      `👤 <b>Ism:</b> ${escapeHtml(payload.fullName)}`,
      `💬 <b>Aloqa:</b> ${escapeHtml(payload.telegramOrEmail)}`,
      payload.phone ? `📞 <b>Telefon:</b> ${escapeHtml(payload.phone)}` : null,
      ``,
      `✉️ <b>Xabar:</b>`,
      `<blockquote>${escapeHtml(payload.message)}</blockquote>`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━`,
      `🌐 <b>Manba:</b> SoftWeb Aloqa Formasi`,
      `⏰ <b>Vaqt:</b> ${new Date().toLocaleString("en-US", { timeZone: "Asia/Tashkent" })} (Toshkent vaqti)`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const res = await sendTelegramMessage(ownerId, messageText, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "✅ Qabul qilish", callback_data: `req_accept_${requestRecord.id}` },
            { text: "❌ Rad etish", callback_data: `req_reject_${requestRecord.id}` },
          ],
        ],
      },
    });

    if (!res.success) {
      return { success: false, error: res.error, requestId: requestRecord.id };
    }

    return { success: true, messageId: res.messageId, requestId: requestRecord.id };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: errorMsg };
  }
}
