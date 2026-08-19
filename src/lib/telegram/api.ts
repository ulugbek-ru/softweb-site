/**
 * SoftWeb Telegram Bot API Wrapper
 */

export interface InlineKeyboardButton {
  text: string;
  callback_data?: string;
  url?: string;
}

export interface InlineKeyboardMarkup {
  inline_keyboard: InlineKeyboardButton[][];
}

export interface KeyboardButton {
  text: string;
  request_contact?: boolean;
  request_location?: boolean;
}

export interface ReplyKeyboardMarkup {
  keyboard: KeyboardButton[][];
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
}

export interface ReplyKeyboardRemove {
  remove_keyboard: true;
}

export type TelegramMarkup = InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove;

export function getBotToken(): string {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is not defined in environment variables");
  }
  return token;
}

export function getOwnerChatId(): string {
  return process.env.TELEGRAM_OWNER_ID || process.env.TELEGRAM_CHAT_ID || "7991572015";
}

/**
 * Escapes characters for Telegram HTML mode
 */
export function escapeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendTelegramMessage(
  chatId: string | number,
  text: string,
  options?: {
    parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
    reply_markup?: TelegramMarkup;
    disable_web_page_preview?: boolean;
  }
): Promise<{ success: boolean; messageId?: number; error?: string }> {
  try {
    const token = getBotToken();
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const body: Record<string, unknown> = {
      chat_id: chatId,
      text,
      parse_mode: options?.parse_mode || "HTML",
      disable_web_page_preview: options?.disable_web_page_preview ?? true,
    };

    if (options?.reply_markup) {
      body.reply_markup = options.reply_markup;
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      console.error("Telegram sendMessage error:", data);
      return { success: false, error: data.description || "Telegram API Error" };
    }

    return { success: true, messageId: data.result?.message_id };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown fetch error";
    console.error("sendTelegramMessage exception:", errorMsg);
    return { success: false, error: errorMsg };
  }
}

export async function editTelegramMessageText(
  chatId: string | number,
  messageId: number,
  text: string,
  options?: {
    parse_mode?: "HTML" | "Markdown";
    reply_markup?: InlineKeyboardMarkup;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = getBotToken();
    const url = `https://api.telegram.org/bot${token}/editMessageText`;

    const body: Record<string, unknown> = {
      chat_id: chatId,
      message_id: messageId,
      text,
      parse_mode: options?.parse_mode || "HTML",
      disable_web_page_preview: true,
    };

    if (options?.reply_markup) {
      body.reply_markup = options.reply_markup;
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      // If message is not modified, ignore
      if (data.description && data.description.includes("message is not modified")) {
        return { success: true };
      }
      return { success: false, error: data.description };
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown edit error";
    return { success: false, error: errorMsg };
  }
}

export async function answerCallbackQuery(
  callbackQueryId: string,
  text?: string,
  showAlert: boolean = false
): Promise<boolean> {
  try {
    const token = getBotToken();
    const url = `https://api.telegram.org/bot${token}/answerCallbackQuery`;

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        callback_query_id: callbackQueryId,
        text,
        show_alert: showAlert,
      }),
    });

    return true;
  } catch {
    return false;
  }
}

export async function getTelegramUpdates(
  offset = 0,
  limit = 50,
  timeout = 10
): Promise<any[]> {
  try {
    const token = getBotToken();
    const url = `https://api.telegram.org/bot${token}/getUpdates?offset=${offset}&limit=${limit}&timeout=${timeout}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.ok) {
      return data.result || [];
    }
    return [];
  } catch {
    return [];
  }
}
