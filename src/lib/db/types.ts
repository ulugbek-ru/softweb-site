import { CalculatorState } from "@/types/calculator";

export type RequestStatus =
  | "NEW"
  | "IN_PROGRESS"
  | "CONTACTED"
  | "CALCULATED"
  | "ACCEPTED"
  | "REJECTED"
  | "COMPLETED";

export type RequestSource = "website" | "telegram";

export type UserOperatorMode = "bot" | "human";

export type MessageSenderType = "CUSTOMER" | "BOT" | "OWNER";

export interface TelegramUserRecord {
  id: string; // Telegram user ID as string
  username?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  currentStep?: string; // Conversation state e.g. IDLE, CALC_STEP_1, WAITING_CONSULTATION
  calcState?: CalculatorState;
  quotationId?: string;
  mode: UserOperatorMode;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerRequestRecord {
  id: string;
  requestNumber: string;
  source: RequestSource;
  status: RequestStatus;
  fullName: string;
  telegram: string;
  phone?: string;
  email?: string;
  company?: string;
  projectType: string;
  selectedServices: string[];
  budgetUZS: string;
  budgetUSD: string;
  deadline: string;
  description: string;
  quotationId?: string;
  telegramUserId?: string;
  calculatorSpecs?: {
    pages?: string;
    design?: string;
    features?: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface QuotationRecord {
  id: string;
  customerId: string;
  service: string;
  answers: Record<string, unknown>;
  basePriceUZS: number;
  basePriceUSD: number;
  additionalCostsUZS: number;
  additionalCostsUSD: number;
  totalPriceUZS: number;
  totalPriceUSD: number;
  currencyRate: number;
  estimatedDuration: string;
  createdAt: string;
}

export interface MessageRecord {
  id: string;
  telegramUserId: string;
  sender: MessageSenderType;
  text: string;
  createdAt: string;
}

export interface OwnerSessionRecord {
  ownerId: string;
  activeReplyToUserId: string | null;
  updatedAt: string;
}

export interface DatabaseSchema {
  telegramUsers: Record<string, TelegramUserRecord>;
  customerRequests: Record<string, CustomerRequestRecord>;
  quotations: Record<string, QuotationRecord>;
  messages: MessageRecord[];
  ownerSessions: Record<string, OwnerSessionRecord>;
}
