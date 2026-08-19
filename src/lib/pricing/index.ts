import {
  CalculatorState,
  DeadlineSpeed,
  DesignLevel,
  EstimatedPriceResult,
  FeatureKey,
  PageRange,
  ProjectType,
} from "@/types/calculator";
import { getExchangeRate, convertUSDToUZS } from "@/config/currency";

export interface PricingOptionItem<T> {
  id: T;
  title: string;
  desc: string;
  uzbekTitle: string;
  uzbekDesc: string;
  badge?: string;
}

export const PROJECT_TYPES: PricingOptionItem<ProjectType>[] = [
  {
    id: "landing",
    title: "Landing Page",
    desc: "Single-page high-converting showcase for products, services, or events.",
    uzbekTitle: "Landing Page",
    uzbekDesc: "Mahsulot yoki xizmat uchun 1 sahifali zamonaviy sotuvchi sahifa.",
    badge: "Tezkor",
  },
  {
    id: "business",
    title: "Business Website",
    desc: "Corporate digital presence with multiple pages, services & team showcases.",
    uzbekTitle: "Korporativ sayt",
    uzbekDesc: "Kompaniya va brendlar uchun to'liq ko'p sahifali rasmiy web-sayt.",
    badge: "Ommabop",
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    desc: "Online store with catalog, shopping cart, checkout & payment processing.",
    uzbekTitle: "Online do'kon",
    uzbekDesc: "Katalog, savat, to'lov tizimlari (Click/Payme) va buyurtmalar tizimi.",
    badge: "Savdo",
  },
  {
    id: "webapp",
    title: "Web Application",
    desc: "Dynamic web app with user authentication, database & custom dashboard.",
    uzbekTitle: "Web App / Platforma",
    uzbekDesc: "Foydalanuvchilar kabineti, baza va interaktiv dashboardli platforma.",
    badge: "Interaktiv",
  },
  {
    id: "saas",
    title: "SaaS Platform",
    desc: "Subscription-based software system with multi-tenant workflows.",
    uzbekTitle: "SaaS / Portal",
    uzbekDesc: "Obuna asosida ishlovchi keng qamrovli dasturiy ekotizim.",
    badge: "Murakkab",
  },
  {
    id: "custom",
    title: "Custom Platform",
    desc: "Bespoke digital architecture tailored to unique enterprise operations.",
    uzbekTitle: "Custom loyiha",
    uzbekDesc: "Biznesingiz talablariga mos maxsus arxitekturadagi loyiha.",
    badge: "Maxsus",
  },
];

export const PAGE_RANGES: PricingOptionItem<PageRange>[] = [
  {
    id: "1-3",
    title: "1 – 3 Pages",
    desc: "Ideal for focused landing pages or compact agency portfolios.",
    uzbekTitle: "1 – 3 ta sahifa",
    uzbekDesc: "Landing page yoki ixcham vizitka sayt.",
  },
  {
    id: "4-7",
    title: "4 – 7 Pages",
    desc: "Standard corporate size (Home, About, Services, Case Studies, Contact).",
    uzbekTitle: "4 – 7 ta sahifa",
    uzbekDesc: "Standart korporativ sayt (Asosiy, Xizmatlar, Biz haqimizda, Aloqa).",
  },
  {
    id: "8-15",
    title: "8 – 15 Pages",
    desc: "Comprehensive platform with in-depth service lines, blog & portal.",
    uzbekTitle: "8 – 15 ta sahifa",
    uzbekDesc: "Katta katalog yoki batafsil bo'limlarga ega platforma.",
  },
  {
    id: "15+",
    title: "15+ Pages",
    desc: "Large enterprise or multi-category platform with extensive hierarchy.",
    uzbekTitle: "15+ ta sahifa",
    uzbekDesc: "Katta miqyosli korporativ yoki ko'p tarmoqli portal.",
  },
];

export const DESIGN_LEVELS: PricingOptionItem<DesignLevel>[] = [
  {
    id: "existing",
    title: "Existing Design Ready",
    desc: "You already have complete Figma or UI design assets ready for development.",
    uzbekTitle: "Tayyor Figma dizayn bor",
    uzbekDesc: "Sizda to'liq tayyor dizayn mavjud, faqat dasturlash kerak.",
  },
  {
    id: "uiux_needed",
    title: "UI/UX Design Needed",
    desc: "We design modern, responsive interfaces and wireframes from scratch.",
    uzbekTitle: "SoftWeb UI/UX dizayn",
    uzbekDesc: "Zamonaviy, intuitiv va moslashuvchan dizaynni noldan yaratamiz.",
  },
  {
    id: "premium_custom",
    title: "Premium Custom & 3D/Motion",
    desc: "Awwwards-level bespoke art direction, custom micro-animations & identity.",
    uzbekTitle: "Premium Custom & Motion",
    uzbekDesc: "Awwwards darajasidagi individual art-direction va animatsiyalar.",
  },
];

export interface FeaturePricingItem {
  id: FeatureKey;
  title: string;
  desc: string;
  uzbekTitle: string;
  uzbekDesc: string;
  tag: string;
  costUSDMin: number;
  costUSDMax: number;
}

export const FEATURES_LIST: FeaturePricingItem[] = [
  {
    id: "auth",
    title: "User Authentication",
    desc: "Secure login, registration, email confirmation & role-based access.",
    uzbekTitle: "Autentifikatsiya (Login/Parol)",
    uzbekDesc: "Foydalanuvchilar ro'yxatdan o'tishi va shaxsiy kabinet.",
    tag: "Xavfsizlik",
    costUSDMin: 80,
    costUSDMax: 150,
  },
  {
    id: "admin",
    title: "Admin Panel / CMS",
    desc: "Intuitive dashboard to manage content, leads, users & settings.",
    uzbekTitle: "Admin Panel / Boshqaruv",
    uzbekDesc: "Sayt ma'lumotlari, arizalar va kontentni boshqarish paneli.",
    tag: "Boshqaruv",
    costUSDMin: 140,
    costUSDMax: 280,
  },
  {
    id: "payment",
    title: "Payment Gateway",
    desc: "Integration with Click, Payme, Stripe, Uzum or international checkout.",
    uzbekTitle: "To'lov tizimlari (Click/Payme)",
    uzbekDesc: "Click, Payme, Uzum yoki xalqaro karta orqali to'lov.",
    tag: "To'lov",
    costUSDMin: 120,
    costUSDMax: 220,
  },
  {
    id: "telegram_bot",
    title: "Telegram Bot Integration",
    desc: "Automated real-time lead alerts, customer inquiry dispatch & notifications.",
    uzbekTitle: "Telegram Bot integratsiyasi",
    uzbekDesc: "Saytdagi buyurtma va arizalarni botga yuborish va avtomatlashtirish.",
    tag: "Bot",
    costUSDMin: 70,
    costUSDMax: 140,
  },
  {
    id: "api_integration",
    title: "REST / Third-Party API",
    desc: "Connecting external CRMs, ERPs, inventory or custom webhooks.",
    uzbekTitle: "CRM / API Integratsiya",
    uzbekDesc: "Tashqi tizimlar, 1C, CRM yoki ombor tizimlari bilan bog'lanish.",
    tag: "Sinxron",
    costUSDMin: 90,
    costUSDMax: 180,
  },
  {
    id: "database",
    title: "Database Architecture",
    desc: "PostgreSQL, Supabase or MongoDB high-performance schema design.",
    uzbekTitle: "Ma'lumotlar bazasi",
    uzbekDesc: "PostgreSQL / Supabase yuqori tezlikdagi ma'lumotlar bazasi.",
    tag: "Baza",
    costUSDMin: 90,
    costUSDMax: 160,
  },
  {
    id: "multilingual",
    title: "Multilingual Support",
    desc: "Complete i18n localization (Uzbek, Russian, English, etc.).",
    uzbekTitle: "Ko'p tillilik (UZ / RU / EN)",
    uzbekDesc: "Saytni bir nechta tillarda qulay ishlatish imkoniyati.",
    tag: "Global",
    costUSDMin: 60,
    costUSDMax: 120,
  },
  {
    id: "animation",
    title: "Advanced Animations",
    desc: "Smooth Framer Motion physics, parallax, split text & custom interactions.",
    uzbekTitle: "Maxsus animatsiyalar",
    uzbekDesc: "Framer Motion, silliq scroll va interaktiv effektlar.",
    tag: "Vizual",
    costUSDMin: 80,
    costUSDMax: 160,
  },
  {
    id: "dashboard",
    title: "Interactive Dashboard",
    desc: "Real-time analytical graphs, charts, counters and metrics visualization.",
    uzbekTitle: "Statistika & Dashboard",
    uzbekDesc: "Grafiklar, hisobotlar va tahliliy ko'rsatkichlar paneli.",
    tag: "Analitika",
    costUSDMin: 130,
    costUSDMax: 260,
  },
  {
    id: "seo_performance",
    title: "Ultra SEO & Speed Tuning",
    desc: "Metadata structuring, OpenGraph cards, schema markup & 95+ Core Web Vitals.",
    uzbekTitle: "SEO & Maksimal Tezlik",
    uzbekDesc: "Google/Yandex qidiruv tizimlariga optimallashtirish va 95+ tezlik.",
    tag: "SEO",
    costUSDMin: 50,
    costUSDMax: 100,
  },
];

export const DEADLINE_OPTIONS: PricingOptionItem<DeadlineSpeed>[] = [
  {
    id: "fast_1_2w",
    title: "1 – 2 Weeks",
    desc: "Accelerated priority sprint for urgent launch timelines.",
    uzbekTitle: "1 – 2 hafta (Tezkor sprint)",
    uzbekDesc: "Shoshilinch ishga tushirish uchun qisqa muddat.",
    badge: "Tezkor",
  },
  {
    id: "standard_2_4w",
    title: "2 – 4 Weeks",
    desc: "Standard balanced delivery cycle with comprehensive testing.",
    uzbekTitle: "2 – 4 hafta (Standart)",
    uzbekDesc: "To'liq testlash bilan optimal qulay muddat.",
    badge: "Tavsiya",
  },
  {
    id: "deep_1_2m",
    title: "1 – 2 Months",
    desc: "In-depth engineering for large-scale SaaS or complex commerce platforms.",
    uzbekTitle: "1 – 2 oy (Katta loyiha)",
    uzbekDesc: "Keng ko'lamli platforma yoki murakkab xizmatlar uchun.",
    badge: "Katta",
  },
  {
    id: "flexible",
    title: "Flexible / Phased",
    desc: "Iterative milestone-based delivery matching your business phases.",
    uzbekTitle: "Moslashuvchan / Bosqichma-bosqich",
    uzbekDesc: "Loyiha talablariga qarab bo'lib-bo'lib topshirish.",
    badge: "Bosqichli",
  },
];

/**
 * Single Unified Calculation Function for both Website & Telegram Bot
 */
export function calculateProjectPrice(
  state: CalculatorState,
  customExchangeRate?: number
): EstimatedPriceResult {
  const exchangeRate = customExchangeRate || getExchangeRate();

  // Base cost matrix (in USD)
  const baseMap: Record<ProjectType, { min: number; max: number; minW: number; maxW: number }> = {
    landing: { min: 250, max: 450, minW: 1, maxW: 2 },
    business: { min: 450, max: 850, minW: 2, maxW: 3 },
    ecommerce: { min: 800, max: 1500, minW: 3, maxW: 5 },
    webapp: { min: 900, max: 1800, minW: 3, maxW: 6 },
    saas: { min: 1400, max: 2800, minW: 4, maxW: 8 },
    custom: { min: 1200, max: 2600, minW: 4, maxW: 8 },
  };

  const pageMultMap: Record<PageRange, { min: number; max: number }> = {
    "1-3": { min: 0.9, max: 0.95 },
    "4-7": { min: 1.0, max: 1.05 },
    "8-15": { min: 1.35, max: 1.45 },
    "15+": { min: 1.75, max: 1.95 },
  };

  const designCostMap: Record<DesignLevel, { min: number; max: number }> = {
    existing: { min: 0, max: 0 },
    uiux_needed: { min: 120, max: 250 },
    premium_custom: { min: 280, max: 550 },
  };

  const deadlineMultMap: Record<DeadlineSpeed, number> = {
    fast_1_2w: 1.25,
    standard_2_4w: 1.0,
    deep_1_2m: 0.95,
    flexible: 0.9,
  };

  const base = baseMap[state.projectType] || baseMap.business;
  const pageMult = pageMultMap[state.pageRange] || pageMultMap["4-7"];
  const design = designCostMap[state.designLevel] || designCostMap.uiux_needed;
  const deadlineMult = deadlineMultMap[state.deadline] || 1.0;

  let featuresMinUSD = 0;
  let featuresMaxUSD = 0;

  state.features.forEach((featId) => {
    const item = FEATURES_LIST.find((f) => f.id === featId);
    if (item) {
      featuresMinUSD += item.costUSDMin;
      featuresMaxUSD += item.costUSDMax;
    }
  });

  const rawMinUSD = (base.min * pageMult.min + design.min + featuresMinUSD) * deadlineMult;
  const rawMaxUSD = (base.max * pageMult.max + design.max + featuresMaxUSD) * deadlineMult;

  // Round USD to nearest 25
  const minPriceUSD = Math.max(200, Math.round(rawMinUSD / 25) * 25);
  const maxPriceUSD = Math.max(350, Math.round(rawMaxUSD / 25) * 25);

  const basePriceUSD = Math.round(base.min * pageMult.min);
  const designPriceUSD = design.min;
  const featuresTotalUSD = featuresMinUSD;

  // Calculate UZS
  const minPriceUZS = convertUSDToUZS(minPriceUSD, exchangeRate);
  const maxPriceUZS = convertUSDToUZS(maxPriceUSD, exchangeRate);
  const basePriceUZS = convertUSDToUZS(basePriceUSD, exchangeRate);
  const designPriceUZS = convertUSDToUZS(designPriceUSD, exchangeRate);
  const featuresTotalUZS = convertUSDToUZS(featuresTotalUSD, exchangeRate);

  const typeOption = PROJECT_TYPES.find((p) => p.id === state.projectType);
  const summaryTitle = typeOption?.uzbekTitle || typeOption?.title || "Loyiha";

  const summaryFeatures = state.features.map((f) => {
    const item = FEATURES_LIST.find((fo) => fo.id === f);
    return item?.uzbekTitle || item?.title || f;
  });

  const durationMap: Record<DeadlineSpeed, string> = {
    fast_1_2w: "7–14 ish kuni",
    standard_2_4w: "15–25 ish kuni",
    deep_1_2m: "1–2 oy",
    flexible: "Kelishuvga binoan",
  };

  const summaryDurationText = durationMap[state.deadline] || `${base.minW}–${base.maxW} hafta`;

  return {
    minPriceUSD,
    maxPriceUSD,
    basePriceUSD,
    designPriceUSD,
    featuresTotalUSD,

    minPriceUZS,
    maxPriceUZS,
    basePriceUZS,
    designPriceUZS,
    featuresTotalUZS,

    exchangeRate,
    minWeeks: base.minW,
    maxWeeks: base.maxW,
    summaryTitle,
    summaryFeatures,
    summaryDurationText,

    // Backward compatibility
    minPrice: minPriceUSD,
    maxPrice: maxPriceUSD,
  };
}

// Aliases as requested
export const calculateWebsitePrice = calculateProjectPrice;
export const calculateServicePrice = calculateProjectPrice;
