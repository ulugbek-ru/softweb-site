import {
  answerCallbackQuery,
  editTelegramMessageText,
  escapeHtml,
  getOwnerChatId,
  InlineKeyboardMarkup,
  sendTelegramMessage,
} from "./api";
import {
  clearOwnerActiveReply,
  createCustomerRequest,
  createQuotation,
  getConversationHistory,
  getDatabaseStats,
  getOwnerActiveReply,
  getRecentRequests,
  getTelegramUser,
  logMessage,
  setOwnerActiveReply,
  setTelegramUserMode,
  setTelegramUserState,
  updateCustomerRequestStatus,
  upsertTelegramUser,
} from "@/lib/db/store";
import {
  calculateProjectPrice,
  DEADLINE_OPTIONS,
  DESIGN_LEVELS,
  FEATURES_LIST,
  PAGE_RANGES,
  PROJECT_TYPES,
} from "@/lib/pricing";
import { formatUSD, formatUZS } from "@/config/currency";
import {
  CalculatorState,
  DeadlineSpeed,
  DesignLevel,
  FeatureKey,
  PageRange,
  ProjectType,
} from "@/types/calculator";
import { siteConfig } from "@/config/site";

// Default initial state for calculator
const defaultCalcState: CalculatorState = {
  projectType: "business",
  pageRange: "4-7",
  designLevel: "uiux_needed",
  features: ["telegram_bot", "animation", "seo_performance"],
  deadline: "standard_2_4w",
};

// ----------------- KEYBOARD BUILDERS -----------------

export function getMainMenuKeyboard(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: "🌐 Web sayt", callback_data: "srv_landing" },
        { text: "📱 Web App / Platforma", callback_data: "srv_webapp" },
      ],
      [
        { text: "🛒 Online do‘kon", callback_data: "srv_ecommerce" },
        { text: "🎨 UI/UX Design", callback_data: "srv_uiux" },
      ],
      [
        { text: "⚙️ Custom dastur", callback_data: "srv_custom" },
        { text: "📱 Telegram Bot", callback_data: "srv_tgbot" },
      ],
      [
        { text: "🧮 Narxni hisoblash (Kalkulyator)", callback_data: "calc_start" },
      ],
      [
        { text: "💬 Konsultatsiya", callback_data: "consult_start" },
        { text: "📞 Bog‘lanish", callback_data: "contact_info" },
      ],
    ],
  };
}

export function getStep1Keyboard(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: "⚡️ Landing Page", callback_data: "c1_landing" },
        { text: "🏢 Korporativ sayt", callback_data: "c1_business" },
      ],
      [
        { text: "🛒 Online do'kon", callback_data: "c1_ecommerce" },
        { text: "📱 Web App", callback_data: "c1_webapp" },
      ],
      [
        { text: "☁️ SaaS Platforma", callback_data: "c1_saas" },
        { text: "⚙️ Custom loyiha", callback_data: "c1_custom" },
      ],
      [{ text: "❌ Bekor qilish", callback_data: "menu_main" }],
    ],
  };
}

export function getStep2Keyboard(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: "1 – 3 ta sahifa", callback_data: "c2_1-3" },
        { text: "4 – 7 ta sahifa", callback_data: "c2_4-7" },
      ],
      [
        { text: "8 – 15 ta sahifa", callback_data: "c2_8-15" },
        { text: "15+ ta sahifa", callback_data: "c2_15+" },
      ],
      [
        { text: "⬅️ Orqaga", callback_data: "calc_start" },
        { text: "❌ Bekor qilish", callback_data: "menu_main" },
      ],
    ],
  };
}

export function getStep3Keyboard(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [{ text: "🎨 Mavjud Figma dizayn bor", callback_data: "c3_existing" }],
      [{ text: "✨ SoftWeb UI/UX dizayn (Noldan)", callback_data: "c3_uiux_needed" }],
      [{ text: "💎 Premium Custom & 3D/Motion", callback_data: "c3_premium_custom" }],
      [
        { text: "⬅️ Orqaga", callback_data: "c1_back" },
        { text: "❌ Bekor qilish", callback_data: "menu_main" },
      ],
    ],
  };
}

export function getStep4Keyboard(currentFeatures: FeatureKey[]): InlineKeyboardMarkup {
  const rows = FEATURES_LIST.map((feat) => {
    const isSelected = currentFeatures.includes(feat.id);
    const icon = isSelected ? "✅ " : "◻️ ";
    return [
      {
        text: `${icon}${feat.uzbekTitle}`,
        callback_data: `c4_toggle_${feat.id}`,
      },
    ];
  });

  // Action buttons
  rows.push([
    { text: "➡️ Davom etish (Keyingi)", callback_data: "c4_done" },
  ]);
  rows.push([
    { text: "⬅️ Orqaga", callback_data: "c2_back" },
    { text: "❌ Bekor qilish", callback_data: "menu_main" },
  ]);

  return { inline_keyboard: rows };
}

export function getStep5Keyboard(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: "🚀 1 – 2 hafta (Tezkor)", callback_data: "c5_fast_1_2w" },
        { text: "⏱ 2 – 4 hafta (Standart)", callback_data: "c5_standard_2_4w" },
      ],
      [
        { text: "📅 1 – 2 oy (Katta loyiha)", callback_data: "c5_deep_1_2m" },
        { text: "🤝 Moslashuvchan", callback_data: "c5_flexible" },
      ],
      [
        { text: "⬅️ Orqaga", callback_data: "c4_done" },
        { text: "❌ Bekor qilish", callback_data: "menu_main" },
      ],
    ],
  };
}

export function getQuotationResultKeyboard(quotationId: string): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: "✅ Buyurtma berish", callback_data: `order_confirm_${quotationId}` },
      ],
      [
        { text: "🔄 Qayta hisoblash", callback_data: "calc_start" },
        { text: "💬 Operator bilan bog‘lanish", callback_data: "connect_human" },
      ],
      [
        { text: "🏠 Asosiy menyu", callback_data: "menu_main" },
      ],
    ],
  };
}

// ----------------- CORE BOT HANDLERS -----------------

export async function handleTelegramUpdate(update: any): Promise<void> {
  try {
    if (update.message) {
      await handleMessageUpdate(update.message);
    } else if (update.callback_query) {
      await handleCallbackQueryUpdate(update.callback_query);
    }
  } catch (err) {
    console.error("Unhandled error in handleTelegramUpdate:", err);
  }
}

async function handleMessageUpdate(msg: any): Promise<void> {
  const chatId = msg.chat?.id;
  const userId = msg.from?.id;
  const text = (msg.text || "").trim();
  const ownerId = getOwnerChatId();
  const isOwner = String(userId) === String(ownerId);

  if (!chatId || !userId) return;

  // Register or update Telegram user
  const user = upsertTelegramUser({
    id: userId,
    username: msg.from?.username ? `@${msg.from.username}` : undefined,
    firstName: msg.from?.first_name,
    lastName: msg.from?.last_name,
  });

  // Log incoming message
  logMessage(userId, isOwner ? "OWNER" : "CUSTOMER", text || "[Media/Attachment]");

  // 1. OWNER SPECIAL COMMANDS & REPLY ROUTING
  if (isOwner) {
    // Check if Owner is currently replying to a customer
    const activeReplyTarget = getOwnerActiveReply(ownerId);

    if (text.startsWith("/reply ")) {
      const parts = text.split(" ");
      const targetUserId = parts[1];
      const replyMsg = parts.slice(2).join(" ").trim();

      if (!targetUserId) {
        await sendTelegramMessage(ownerId, "⚠️ Foydalanish: <code>/reply &lt;USER_ID&gt; &lt;XABAR&gt;</code>");
        return;
      }

      if (replyMsg) {
        // Send direct reply
        await sendTelegramMessage(
          targetUserId,
          `👨💻 <b>SoftWeb Mutaxassisi:</b>\n\n${escapeHtml(replyMsg)}`,
          {
            reply_markup: {
              inline_keyboard: [[{ text: "💬 Javob yozish", callback_data: "connect_human" }]],
            },
          }
        );
        logMessage(targetUserId, "OWNER", replyMsg);
        await sendTelegramMessage(ownerId, `✅ Xabar foydalanuvchi <code>${targetUserId}</code> ga yetkazildi!`);
        return;
      } else {
        // Set reply mode
        setOwnerActiveReply(ownerId, targetUserId);
        await sendTelegramMessage(
          ownerId,
          `✍️ Foydalanuvchi <code>${targetUserId}</code> ga javob yozish rejimi faollashdi.\nKeyingi yuboradigan xabaringiz to'g'ridan-to'g'ri unga boradi.\nBekor qilish uchun: /cancel`
        );
        return;
      }
    }

    if (text === "/cancel") {
      clearOwnerActiveReply(ownerId);
      await sendTelegramMessage(ownerId, "✅ Javob berish rejimi bekor qilindi.");
      return;
    }

    if (text === "/admin" || text === "/stats") {
      const stats = getDatabaseStats();
      const statusText = Object.entries(stats.requestsByStatus)
        .map(([st, count]) => `• ${st}: ${count}`)
        .join("\n") || "Mavjud emas";

      const adminMsg = [
        `📊 <b>SOFTWEB TIZIM STATISTIKASI</b>`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `👥 Jami foydalanuvchilar: <b>${stats.totalUsers}</b>`,
        `📝 Jami arizalar: <b>${stats.totalRequests}</b>`,
        `🧮 Hisoblangan quotationlar: <b>${stats.totalQuotations}</b>`,
        `💬 Jami xabarlar: <b>${stats.totalMessages}</b>`,
        ``,
        `📌 <b>Arizalar holati:</b>\n${statusText}`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `Buyruqlar:`,
        `/requests — Oxirgi 10 ta buyurtma`,
        `/reply &lt;USER_ID&gt; — Mijozga javob yozish`,
      ].join("\n");

      await sendTelegramMessage(ownerId, adminMsg);
      return;
    }

    if (text === "/requests") {
      const recents = getRecentRequests(10);
      if (recents.length === 0) {
        await sendTelegramMessage(ownerId, "📭 Hozircha hech qanday ariza kelib tushmagan.");
        return;
      }

      const list = recents
        .map((r, i) => {
          return `${i + 1}. <b>${escapeHtml(r.fullName)}</b> (${escapeHtml(r.telegram)})\n   📌 ${escapeHtml(r.projectType)} | 💰 ${escapeHtml(r.budgetUZS)}\n   Status: <code>${r.status}</code> | ID: <code>${r.telegramUserId || r.id}</code>`;
        })
        .join("\n\n");

      await sendTelegramMessage(
        ownerId,
        `📋 <b>OXIRGI ARIZALAR (10 TA):</b>\n━━━━━━━━━━━━━━━━━━━━\n\n${list}\n\nJavob berish uchun: <code>/reply &lt;ID&gt; &lt;xabar&gt;</code>`
      );
      return;
    }

    // If owner is in active reply mode and typed normal text
    if (activeReplyTarget) {
      const success = await sendTelegramMessage(
        activeReplyTarget,
        `👨💻 <b>SoftWeb Mutaxassisi:</b>\n\n${escapeHtml(text)}`,
        {
          reply_markup: {
            inline_keyboard: [[{ text: "💬 Javob yozish", callback_data: "connect_human" }]],
          },
        }
      );

      if (success.success) {
        logMessage(activeReplyTarget, "OWNER", text);
        await sendTelegramMessage(
          ownerId,
          `✅ Xabar <code>${activeReplyTarget}</code> ga yuborildi!\n(Yana yozishda davom etishingiz mumkin yoki /cancel bosing)`
        );
      } else {
        await sendTelegramMessage(
          ownerId,
          `⚠️ Xabarni yuborishda xatolik yuz berdi: ${success.error || "Noma'lum xatolik"}`
        );
      }
      return;
    }
  }

  // 2. CUSTOMER COMMANDS
  if (text === "/start") {
    setTelegramUserState(userId, "IDLE", defaultCalcState);
    setTelegramUserMode(userId, "bot");

    const welcomeMsg = [
      `Assalomu alaykum, <b>${escapeHtml(msg.from?.first_name || "qadrli mijoz")}</b>! 👋`,
      ``,
      `<b>SoftWeb</b> raqamli agentligiga xush kelibsiz!`,
      `Biz biznesingiz uchun zamonaviy, tezkor va yuqori daromad keltiruvchi web-saytlar, platformalar va Telegram botlar yaratamiz.`,
      ``,
      `Quyidagi xizmatlardan birini tanlang yoki loyihangiz narxini hisoblang:`,
    ].join("\n");

    await sendTelegramMessage(chatId, welcomeMsg, {
      reply_markup: getMainMenuKeyboard(),
    });
    return;
  }

  if (text === "/cancel") {
    setTelegramUserState(userId, "IDLE", defaultCalcState);
    await sendTelegramMessage(
      chatId,
      "✅ Joriy hisob-kitob bekor qilindi.\nAsosiy menyudan xizmatni tanlashingiz mumkin:",
      { reply_markup: getMainMenuKeyboard() }
    );
    return;
  }

  if (text === "/calculator" || text === "/hisoblash") {
    setTelegramUserState(userId, "CALC_STEP_1", defaultCalcState);
    await sendTelegramMessage(
      chatId,
      "🧮 <b>Loyiha narxini hisoblash (Kalkulyator)</b>\n\n1-qadam: Saytingiz qanday turdagi bo‘ladi?",
      { reply_markup: getStep1Keyboard() }
    );
    return;
  }

  if (text === "/services" || text === "/xizmatlar") {
    const servicesMsg = [
      `💼 <b>SoftWeb Xizmatlari:</b>`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `1️⃣ <b>Web Development:</b> Next.js, React va TypeScript asosida ultra tezkor web-saytlar.`,
      `2️⃣ <b>UI/UX Design:</b> Figma orqali konversiyaga yo'naltirilgan zamonaviy dizayn.`,
      `3️⃣ <b>Full-Stack Dasturlash:</b> Frontend + Backend + Ma'lumotlar bazasi.`,
      `4️⃣ <b>E-Commerce:</b> Online do'kon, Click/Payme to'lovlari, buyurtmalar tizimi.`,
      `5️⃣ <b>Telegram Botlar:</b> CRM va biznesni avtomatlashtirish botlari.`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `Narxni bilish uchun kalkulyatordan foydalaning:`,
    ].join("\n");

    await sendTelegramMessage(chatId, servicesMsg, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🧮 Narxni hisoblash", callback_data: "calc_start" }],
          [{ text: "💬 Mutaxassis bilan bog'lanish", callback_data: "consult_start" }],
        ],
      },
    });
    return;
  }

  if (text === "/contact" || text === "/aloqa") {
    await sendTelegramMessage(
      chatId,
      `📞 <b>SoftWeb Aloqa Ma'lumotlari:</b>\n━━━━━━━━━━━━━━━━━━━━\n👤 Rahbar / Muhandis: Ulug'bek Raxmatillayev\n📱 Telegram: ${siteConfig.telegramUsername}\n📧 Email: ${siteConfig.contact.email}\n🌐 Veb-sayt: ${siteConfig.url}\n📍 Joylashuv: ${siteConfig.contact.location}\n\nSavolingiz bormi? Quyidagi tugma orqali yozishingiz mumkin:`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "💬 Mutaxassisga yozish", callback_data: "consult_start" }],
            [{ text: "🌐 Veb-saytga o'tish", url: siteConfig.url }],
          ],
        },
      }
    );
    return;
  }

  if (text === "/help" || text === "/yordam") {
    await sendTelegramMessage(
      chatId,
      `🤖 <b>SoftWeb Bot Buyruqlari:</b>\n\n/start — Asosiy menyuni ochish\n/calculator — Narxni hisoblash\n/services — Xizmatlar ro'yxati\n/contact — Aloqa ma'lumotlari\n/cancel — Amallarni bekor qilish`,
      { reply_markup: getMainMenuKeyboard() }
    );
    return;
  }

  // 3. CONSULTATION / OPERATOR WAITING STATE
  if (user?.currentStep === "WAITING_CONSULTATION" || user?.mode === "human") {
    // Notify Owner with forward and reply button
    const ownerNotification = [
      `━━━━━━━━━━━━━━━━━━━━`,
      `💬 <b>MIJOZDAN YANGI XABAR</b>`,
      `👤 <b>Ism:</b> ${escapeHtml(msg.from?.first_name || "")} ${escapeHtml(msg.from?.last_name || "")}`,
      `📱 <b>Username:</b> ${msg.from?.username ? `@${escapeHtml(msg.from.username)}` : "Mavjud emas"}`,
      `🆔 <b>Telegram ID:</b> <code>${userId}</code>`,
      ``,
      `✉️ <b>Xabar:</b>`,
      `<blockquote>${escapeHtml(text)}</blockquote>`,
      `━━━━━━━━━━━━━━━━━━━━`,
    ].join("\n");

    await sendTelegramMessage(ownerId, ownerNotification, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "💬 Javob berish", callback_data: `reply_${userId}` },
            { text: "🤖 Bot rejimiga qaytarish", callback_data: `botmode_${userId}` },
          ],
        ],
      },
    });

    await sendTelegramMessage(
      chatId,
      `✅ Xabaringiz SoftWeb mutaxassisiga yuborildi! Tez orada sizga shu yerda javob beramiz.`
    );
    return;
  }

  // 4. SMART FAQ AUTO-RESPONDER
  const lower = text.toLowerCase();

  if (lower.includes("softweb nima") || lower.includes("kompaniya haqida") || lower.includes("kim sizlar")) {
    await sendTelegramMessage(
      chatId,
      "🏢 <b>SoftWeb</b> — bizneslar uchun zamonaviy web-saytlar, web platformalar, Telegram botlar va maxsus dasturiy yechimlar yaratadigan professional digital agency jamoasi.",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "🧮 Narxni hisoblash", callback_data: "calc_start" }],
            [{ text: "💼 Xizmatlar", callback_data: "menu_services" }],
          ],
        },
      }
    );
    return;
  }

  if (lower.includes("qancha turadi") || lower.includes("narxi qancha") || lower.includes("narxlar")) {
    await sendTelegramMessage(
      chatId,
      "💰 Sayt va dasturlar narxi loyiha murakkabligi va tanlangan funksiyalarga qarab hisoblanadi.\n\n🧮 Kalkulyator orqali 1 daqiqada taxminiy narxni aniqlashingiz mumkin:",
      {
        reply_markup: {
          inline_keyboard: [[{ text: "🧮 Narxni hisoblash", callback_data: "calc_start" }]],
        },
      }
    );
    return;
  }

  if (lower.includes("qancha vaqt") || lower.includes("muddat")) {
    await sendTelegramMessage(
      chatId,
      "⏱ Loyiha turiga qarab odatda <b>7 kundan 30 kungacha</b> davom etadi. Aniq muddat kalkulyator natijasida ko'rsatiladi.",
      {
        reply_markup: {
          inline_keyboard: [[{ text: "🧮 Muddatni hisoblash", callback_data: "calc_start" }]],
        },
      }
    );
    return;
  }

  // 5. UNHANDLED TEXT MESSAGE (Forward to Owner + Offer Operator)
  const forwardedToOwner = [
    `━━━━━━━━━━━━━━━━━━━━`,
    `💬 <b>MIJOZDAN XABAR (BOT REJIMI)</b>`,
    `👤 <b>Ism:</b> ${escapeHtml(msg.from?.first_name || "")}`,
    `📱 <b>Username:</b> ${msg.from?.username ? `@${escapeHtml(msg.from.username)}` : "Mavjud emas"}`,
    `🆔 <b>Telegram ID:</b> <code>${userId}</code>`,
    ``,
    `💬 <b>Xabar:</b>`,
    `<blockquote>${escapeHtml(text)}</blockquote>`,
    `━━━━━━━━━━━━━━━━━━━━`,
  ].join("\n");

  await sendTelegramMessage(ownerId, forwardedToOwner, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "💬 Javob berish", callback_data: `reply_${userId}` },
          { text: "🤖 Bot rejimini yoqish", callback_data: `botmode_${userId}` },
        ],
      ],
    },
  });

  await sendTelegramMessage(
    chatId,
    `Savolingiz qabul qilindi. Sizga qanday yordam bera olamiz?`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🧮 Narxni hisoblash", callback_data: "calc_start" }],
          [{ text: "💬 Operator bilan gaplashish", callback_data: "connect_human" }],
          [{ text: "🏠 Asosiy menyu", callback_data: "menu_main" }],
        ],
      },
    }
  );
}

// ----------------- CALLBACK QUERY HANDLER -----------------

async function handleCallbackQueryUpdate(cb: any): Promise<void> {
  const cbId = cb.id;
  const data = cb.data as string;
  const msg = cb.message;
  const chatId = msg?.chat?.id;
  const messageId = msg?.message_id;
  const userId = cb.from?.id;
  const ownerId = getOwnerChatId();
  const isOwner = String(userId) === String(ownerId);

  if (!chatId || !userId) return;

  await answerCallbackQuery(cbId);

  const user = getTelegramUser(userId) || upsertTelegramUser({
    id: userId,
    username: cb.from?.username ? `@${cb.from.username}` : undefined,
    firstName: cb.from?.first_name,
    lastName: cb.from?.last_name,
  });

  const state: CalculatorState = user.calcState || defaultCalcState;

  // 1. OWNER ACTIONS
  if (isOwner) {
    if (data.startsWith("reply_")) {
      const targetUserId = data.replace("reply_", "");
      setOwnerActiveReply(ownerId, targetUserId);
      setTelegramUserMode(targetUserId, "human");

      await sendTelegramMessage(
        ownerId,
        `✍️ Foydalanuvchi <code>${targetUserId}</code> ga javob yozish faollashdi.\nKeyingi yuboradigan matningiz mijozga yetkaziladi.\nBekor qilish: /cancel`
      );
      return;
    }

    if (data.startsWith("botmode_")) {
      const targetUserId = data.replace("botmode_", "");
      setTelegramUserMode(targetUserId, "bot");
      await sendTelegramMessage(ownerId, `🤖 Foydalanuvchi <code>${targetUserId}</code> uchun avtomatik bot rejimi qayta yoqildi.`);
      await sendTelegramMessage(targetUserId, `🤖 Avtomatik bot rejimi yoqildi. Menyu orqali davom etishingiz mumkin:`, {
        reply_markup: getMainMenuKeyboard(),
      });
      return;
    }

    if (data.startsWith("req_accept_")) {
      const reqId = data.replace("req_accept_", "");
      updateCustomerRequestStatus(reqId, "ACCEPTED");
      await sendTelegramMessage(ownerId, `✅ Ariza <code>${reqId}</code> qabul qilindi statusiga o'tkazildi.`);
      return;
    }

    if (data.startsWith("req_reject_")) {
      const reqId = data.replace("req_reject_", "");
      updateCustomerRequestStatus(reqId, "REJECTED");
      await sendTelegramMessage(ownerId, `❌ Ariza <code>${reqId}</code> rad etildi statusiga o'tkazildi.`);
      return;
    }
  }

  // 2. MAIN MENU & STATIC ROUTES
  if (data === "menu_main") {
    setTelegramUserState(userId, "IDLE", defaultCalcState);
    await editTelegramMessageText(
      chatId,
      messageId,
      "<b>SoftWeb</b> asosiy menyusi. Quyidagi xizmatlardan birini tanlang:",
      { reply_markup: getMainMenuKeyboard() }
    );
    return;
  }

  if (data === "menu_services") {
    await editTelegramMessageText(
      chatId,
      messageId,
      "Qaysi xizmat bo'yicha ma'lumot yoki hisob-kitob olmoqchisiz?",
      { reply_markup: getMainMenuKeyboard() }
    );
    return;
  }

  if (data === "contact_info") {
    await editTelegramMessageText(
      chatId,
      messageId,
      `📞 <b>SoftWeb Aloqa:</b>\n━━━━━━━━━━━━━━━━━━━━\n👤 Muhandis: Ulug'bek Raxmatillayev\n📱 Telegram: ${siteConfig.telegramUsername}\n📧 Email: ${siteConfig.contact.email}\n🌐 Sayt: ${siteConfig.url}\n📍 Tashkent, Uzbekistan`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "💬 Mutaxassisga yozish", callback_data: "consult_start" }],
            [{ text: "🧮 Narxni hisoblash", callback_data: "calc_start" }],
            [{ text: "🏠 Asosiy menyu", callback_data: "menu_main" }],
          ],
        },
      }
    );
    return;
  }

  if (data === "consult_start" || data === "connect_human") {
    setTelegramUserState(userId, "WAITING_CONSULTATION", state);
    setTelegramUserMode(userId, "human");

    await editTelegramMessageText(
      chatId,
      messageId,
      `💬 <b>SoftWeb Mutaxassisi bilan bog'lanish</b>\n\nSavolingiz yoki loyihangiz haqida qisqacha yozib yuboring. Xabaringiz to'g'ridan-to'g'ri jamoamizga yetkaziladi.`,
      {
        reply_markup: {
          inline_keyboard: [[{ text: "❌ Bekor qilish", callback_data: "menu_main" }]],
        },
      }
    );
    return;
  }

  // 3. SERVICE SHORTCUTS (Quick service preset into calculator)
  if (data.startsWith("srv_")) {
    const srvKey = data.replace("srv_", "");
    let pType: ProjectType = "business";

    if (srvKey === "landing") pType = "landing";
    else if (srvKey === "webapp") pType = "webapp";
    else if (srvKey === "ecommerce") pType = "ecommerce";
    else if (srvKey === "uiux") pType = "business";
    else if (srvKey === "custom") pType = "custom";
    else if (srvKey === "tgbot") pType = "business";

    const newState: CalculatorState = {
      ...state,
      projectType: pType,
      ...(srvKey === "tgbot" ? { features: ["telegram_bot", "admin", "animation"] } : {}),
      ...(srvKey === "uiux" ? { designLevel: "premium_custom" } : {}),
    };

    setTelegramUserState(userId, "CALC_STEP_2", newState);

    await editTelegramMessageText(
      chatId,
      messageId,
      `🧮 <b>${PROJECT_TYPES.find((p) => p.id === pType)?.uzbekTitle} hisob-kitobi</b>\n\n2-qadam: Saytingiz nechta sahifa / ekrandan iborat bo‘ladi?`,
      { reply_markup: getStep2Keyboard() }
    );
    return;
  }

  // 4. CALCULATOR STATE MACHINE STEPS

  // STEP 1 START
  if (data === "calc_start" || data === "c1_back") {
    setTelegramUserState(userId, "CALC_STEP_1", state);
    await editTelegramMessageText(
      chatId,
      messageId,
      `🧮 <b>Loyiha narxini hisoblash</b>\n\n1-qadam: Saytingiz qanday turdagi bo‘ladi?`,
      { reply_markup: getStep1Keyboard() }
    );
    return;
  }

  // STEP 1 CHOSEN -> GO TO STEP 2
  if (data.startsWith("c1_")) {
    const selectedType = data.replace("c1_", "") as ProjectType;
    const newState: CalculatorState = { ...state, projectType: selectedType };
    setTelegramUserState(userId, "CALC_STEP_2", newState);

    await editTelegramMessageText(
      chatId,
      messageId,
      `2-qadam: Saytingiz nechta sahifa / ekrandan iborat bo‘ladi?`,
      { reply_markup: getStep2Keyboard() }
    );
    return;
  }

  // STEP 2 CHOSEN -> GO TO STEP 3
  if (data.startsWith("c2_")) {
    if (data === "c2_back") {
      setTelegramUserState(userId, "CALC_STEP_2", state);
      await editTelegramMessageText(
        chatId,
        messageId,
        `2-qadam: Saytingiz nechta sahifa / ekrandan iborat bo‘ladi?`,
        { reply_markup: getStep2Keyboard() }
      );
      return;
    }

    const selectedRange = data.replace("c2_", "") as PageRange;
    const newState: CalculatorState = { ...state, pageRange: selectedRange };
    setTelegramUserState(userId, "CALC_STEP_3", newState);

    await editTelegramMessageText(
      chatId,
      messageId,
      `3-qadam: UI/UX dizayn bo'yicha talabingiz qanday?`,
      { reply_markup: getStep3Keyboard() }
    );
    return;
  }

  // STEP 3 CHOSEN -> GO TO STEP 4 (Features multi-toggle)
  if (data.startsWith("c3_")) {
    const selectedDesign = data.replace("c3_", "") as DesignLevel;
    const newState: CalculatorState = { ...state, designLevel: selectedDesign };
    setTelegramUserState(userId, "CALC_STEP_4", newState);

    await editTelegramMessageText(
      chatId,
      messageId,
      `4-qadam: Qanday funksiya va imkoniyatlar kerak?\n(Keraklilarni bosing va <b>"➡️ Davom etish"</b>ni tanlang):`,
      { reply_markup: getStep4Keyboard(newState.features) }
    );
    return;
  }

  // STEP 4 TOGGLES
  if (data.startsWith("c4_toggle_")) {
    const featId = data.replace("c4_toggle_", "") as FeatureKey;
    const currentFeatures = state.features || [];
    const exists = currentFeatures.includes(featId);

    const updatedFeatures = exists
      ? currentFeatures.filter((f) => f !== featId)
      : [...currentFeatures, featId];

    const newState: CalculatorState = { ...state, features: updatedFeatures };
    setTelegramUserState(userId, "CALC_STEP_4", newState);

    await editTelegramMessageText(
      chatId,
      messageId,
      `4-qadam: Qanday funksiya va imkoniyatlar kerak?\n(Keraklilarni bosing va <b>"➡️ Davom etish"</b>ni tanlang):`,
      { reply_markup: getStep4Keyboard(updatedFeatures) }
    );
    return;
  }

  // STEP 4 DONE -> GO TO STEP 5 (Deadline)
  if (data === "c4_done") {
    setTelegramUserState(userId, "CALC_STEP_5", state);
    await editTelegramMessageText(
      chatId,
      messageId,
      `5-qadam: Qaysi muddatda tayyor bo'lishi maqsadga muvofiq?`,
      { reply_markup: getStep5Keyboard() }
    );
    return;
  }

  // STEP 5 CHOSEN -> PRODUCE QUOTATION RESULT
  if (data.startsWith("c5_")) {
    const selectedDeadline = data.replace("c5_", "") as DeadlineSpeed;
    const finalState: CalculatorState = { ...state, deadline: selectedDeadline };

    // Run unified shared pricing engine!
    const estimate = calculateProjectPrice(finalState);

    // Create persistent quotation
    const quotation = createQuotation({
      customerId: String(userId),
      service: estimate.summaryTitle,
      answers: finalState as unknown as Record<string, unknown>,
      basePriceUZS: estimate.basePriceUZS,
      basePriceUSD: estimate.basePriceUSD,
      additionalCostsUZS: estimate.featuresTotalUZS,
      additionalCostsUSD: estimate.featuresTotalUSD,
      totalPriceUZS: estimate.minPriceUZS,
      totalPriceUSD: estimate.minPriceUSD,
      currencyRate: estimate.exchangeRate,
      estimatedDuration: estimate.summaryDurationText,
    });

    // Save quotation ID to user state
    upsertTelegramUser({
      id: userId,
      currentStep: "CALCULATION_COMPLETE",
      calcState: finalState,
      quotationId: quotation.id,
    });

    const featuresListText =
      estimate.summaryFeatures.length > 0
        ? estimate.summaryFeatures.map((f) => `• ${escapeHtml(f)}`).join("\n")
        : "• Standart funksiyalar";

    const resultMessage = [
      `🎉 <b>Loyihangiz uchun taxminiy hisob-kitob tayyor!</b>`,
      ``,
      `🌐 <b>Xizmat:</b> ${escapeHtml(estimate.summaryTitle)}`,
      ``,
      `💰 <b>Taxminiy narx:</b>`,
      `<b>${formatUZS(estimate.minPriceUZS)} – ${formatUZS(estimate.maxPriceUZS)}</b>`,
      `💵 <b>USD:</b> <code>${formatUSD(estimate.minPriceUSD, true)} – ${formatUSD(estimate.maxPriceUSD)}</code>`,
      ``,
      `📋 <b>Tanlangan parametrlar:</b>`,
      `• ${escapeHtml(PAGE_RANGES.find((p) => p.id === finalState.pageRange)?.uzbekTitle || "")}`,
      `• ${escapeHtml(DESIGN_LEVELS.find((d) => d.id === finalState.designLevel)?.uzbekTitle || "")}`,
      featuresListText,
      ``,
      `⏱ <b>Taxminiy muddat:</b> ${escapeHtml(estimate.summaryDurationText)}`,
      ``,
      `<i>Buyurtmani SoftWeb jamoasiga yuboraymi?</i>`,
    ].join("\n");

    await editTelegramMessageText(chatId, messageId, resultMessage, {
      reply_markup: getQuotationResultKeyboard(quotation.id),
    });
    return;
  }

  // 5. ORDER CONFIRMATION
  if (data.startsWith("order_confirm_")) {
    const quotationId = data.replace("order_confirm_", "");
    const calc = user.calcState || defaultCalcState;
    const estimate = calculateProjectPrice(calc);

    const clientHandle = user.username || `@user_${userId}`;
    const clientName = `${user.firstName || "Mijoz"} ${user.lastName || ""}`.trim();

    // Prevent duplicate submissions
    const existingReq = getRecentRequests(5).find(
      (r) => r.telegramUserId === String(userId) && r.quotationId === quotationId
    );

    if (existingReq) {
      await answerCallbackQuery(cbId, "Buyurtmangiz allaqachon qabul qilingan!", true);
      return;
    }

    // Create customer request in unified DB
    const request = createCustomerRequest({
      source: "telegram",
      status: "NEW",
      fullName: clientName,
      telegram: clientHandle,
      projectType: estimate.summaryTitle,
      selectedServices: estimate.summaryFeatures,
      budgetUZS: `${formatUZS(estimate.minPriceUZS)} – ${formatUZS(estimate.maxPriceUZS)}`,
      budgetUSD: `${formatUSD(estimate.minPriceUSD)} – ${formatUSD(estimate.maxPriceUSD)}`,
      deadline: estimate.summaryDurationText,
      description: `Telegram bot orqali avtomatik hisoblangan buyurtma. Quotation: ${quotationId}`,
      quotationId,
      telegramUserId: String(userId),
      calculatorSpecs: {
        pages: PAGE_RANGES.find((p) => p.id === calc.pageRange)?.uzbekTitle,
        design: DESIGN_LEVELS.find((d) => d.id === calc.designLevel)?.uzbekTitle,
        features: estimate.summaryFeatures,
      },
    });

    // Notify Customer
    await editTelegramMessageText(
      chatId,
      messageId,
      `✅ <b>Buyurtmangiz muvaffaqiyatli qabul qilindi!</b>\n\nAriza raqami: <code>${request.requestNumber}</code>\n\nSoftWeb rahbari <b>Ulug'bek Raxmatillayev</b> tez orada siz bilan ushbu bot yoki Telegram profilingiz orqali bog'lanadi.\n\nE'tiboringiz uchun rahmat!`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "💬 Mutaxassisga xabar yozish", callback_data: "connect_human" }],
            [{ text: "🏠 Asosiy menyu", callback_data: "menu_main" }],
          ],
        },
      }
    );

    // Notify Owner with interactive actions
    const ownerOrderCard = [
      `🚀 <b>YANGI TELEGRAM BUYURTMA — SOFTWEB</b>`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `📋 <b>Ariza:</b> <code>${request.requestNumber}</code>`,
      `👤 <b>Mijoz:</b> ${escapeHtml(clientName)}`,
      `📱 <b>Telegram:</b> ${escapeHtml(clientHandle)}`,
      `🆔 <b>Telegram ID:</b> <code>${userId}</code>`,
      ``,
      `💻 <b>Loyiha:</b> ${escapeHtml(estimate.summaryTitle)}`,
      `📄 <b>Sahifalar:</b> ${escapeHtml(PAGE_RANGES.find((p) => p.id === calc.pageRange)?.uzbekTitle || "")}`,
      `🎨 <b>Dizayn:</b> ${escapeHtml(DESIGN_LEVELS.find((d) => d.id === calc.designLevel)?.uzbekTitle || "")}`,
      ``,
      `⚙️ <b>Tanlangan funksiyalar:</b>\n${estimate.summaryFeatures.map((f) => `• ${escapeHtml(f)}`).join("\n")}`,
      ``,
      `💰 <b>Hisoblangan narx:</b>`,
      `<b>${formatUZS(estimate.minPriceUZS)} – ${formatUZS(estimate.maxPriceUZS)}</b>`,
      `<code>${formatUSD(estimate.minPriceUSD, true)} – ${formatUSD(estimate.maxPriceUSD)}</code>`,
      `⏱ <b>Muddat:</b> ${escapeHtml(estimate.summaryDurationText)}`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `🌐 <b>Manba:</b> Telegram Bot Quotation Engine`,
    ].join("\n");

    await sendTelegramMessage(ownerId, ownerOrderCard, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "💬 Javob berish", callback_data: `reply_${userId}` },
            { text: "✅ Qabul qilish", callback_data: `req_accept_${request.id}` },
          ],
          [
            { text: "🤖 Bot rejimini yoqish", callback_data: `botmode_${userId}` },
            { text: "❌ Rad etish", callback_data: `req_reject_${request.id}` },
          ],
        ],
      },
    });
  }
}
