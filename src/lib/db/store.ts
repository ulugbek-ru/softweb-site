import fs from "fs";
import path from "path";
import {
  CustomerRequestRecord,
  DatabaseSchema,
  MessageRecord,
  MessageSenderType,
  OwnerSessionRecord,
  QuotationRecord,
  RequestStatus,
  TelegramUserRecord,
  UserOperatorMode,
} from "./types";
import { CalculatorState } from "@/types/calculator";

const DATA_DIR = "/data";
const DB_FILE = path.join(DATA_DIR, "softweb-db.json");

// In-memory cache
let inMemoryDb: DatabaseSchema | null = null;

function getInitialDb(): DatabaseSchema {
  return {
    telegramUsers: {},
    customerRequests: {},
    quotations: {},
    messages: [],
    ownerSessions: {},
  };
}

function ensureDbFile(): DatabaseSchema {
  if (inMemoryDb) {
    return inMemoryDb;
  }

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      inMemoryDb = JSON.parse(raw) as DatabaseSchema;
    } else {
      inMemoryDb = getInitialDb();
      fs.writeFileSync(DB_FILE, JSON.stringify(inMemoryDb, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Error initializing database store:", err);
    inMemoryDb = getInitialDb();
  }

  return inMemoryDb;
}

function saveDb(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (inMemoryDb) {
      fs.writeFileSync(DB_FILE, JSON.stringify(inMemoryDb, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Error saving database store to disk:", err);
  }
}

// ----------------- TELEGRAM USERS -----------------

export function getTelegramUser(userId: string | number): TelegramUserRecord | null {
  const db = ensureDbFile();
  const idStr = String(userId);
  return db.telegramUsers[idStr] || null;
}

export function upsertTelegramUser(data: Partial<TelegramUserRecord> & { id: string | number }): TelegramUserRecord {
  const db = ensureDbFile();
  const idStr = String(data.id);
  const now = new Date().toISOString();

  const existing = db.telegramUsers[idStr];
  if (existing) {
    const updated: TelegramUserRecord = {
      ...existing,
      ...data,
      id: idStr,
      updatedAt: now,
    };
    db.telegramUsers[idStr] = updated;
    saveDb();
    return updated;
  }

  const created: TelegramUserRecord = {
    id: idStr,
    username: data.username,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    currentStep: data.currentStep || "IDLE",
    calcState: data.calcState,
    quotationId: data.quotationId,
    mode: data.mode || "bot",
    createdAt: now,
    updatedAt: now,
  };
  db.telegramUsers[idStr] = created;
  saveDb();
  return created;
}

export function setTelegramUserState(
  userId: string | number,
  step: string,
  calcState?: CalculatorState
): TelegramUserRecord {
  const db = ensureDbFile();
  const idStr = String(userId);
  const user = upsertTelegramUser({ id: idStr, currentStep: step, ...(calcState ? { calcState } : {}) });
  return user;
}

export function setTelegramUserMode(userId: string | number, mode: UserOperatorMode): TelegramUserRecord {
  const db = ensureDbFile();
  const idStr = String(userId);
  const user = upsertTelegramUser({ id: idStr, mode });
  return user;
}

// ----------------- CUSTOMER REQUESTS -----------------

let requestSeq = 1000;

export function createCustomerRequest(
  data: Omit<CustomerRequestRecord, "id" | "requestNumber" | "status" | "createdAt" | "updatedAt"> & {
    status?: RequestStatus;
  }
): CustomerRequestRecord {
  const db = ensureDbFile();
  requestSeq += 1;
  const id = `REQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;
  const requestNumber = `#SW-${new Date().getFullYear()}-${requestSeq}`;
  const now = new Date().toISOString();

  const record: CustomerRequestRecord = {
    ...data,
    id,
    requestNumber,
    status: data.status || "NEW",
    createdAt: now,
    updatedAt: now,
  };

  db.customerRequests[id] = record;
  saveDb();
  return record;
}

export function updateCustomerRequestStatus(id: string, status: RequestStatus): CustomerRequestRecord | null {
  const db = ensureDbFile();
  const req = db.customerRequests[id];
  if (!req) return null;

  req.status = status;
  req.updatedAt = new Date().toISOString();
  saveDb();
  return req;
}

export function getCustomerRequest(id: string): CustomerRequestRecord | null {
  const db = ensureDbFile();
  return db.customerRequests[id] || null;
}

export function getRecentRequests(limit = 20): CustomerRequestRecord[] {
  const db = ensureDbFile();
  return Object.values(db.customerRequests)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

// ----------------- QUOTATIONS -----------------

export function createQuotation(
  data: Omit<QuotationRecord, "id" | "createdAt">
): QuotationRecord {
  const db = ensureDbFile();
  const id = `QUO-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;
  const now = new Date().toISOString();

  const record: QuotationRecord = {
    ...data,
    id,
    createdAt: now,
  };

  db.quotations[id] = record;
  saveDb();
  return record;
}

export function getQuotation(id: string): QuotationRecord | null {
  const db = ensureDbFile();
  return db.quotations[id] || null;
}

// ----------------- MESSAGES / CONVERSATIONS -----------------

export function logMessage(telegramUserId: string | number, sender: MessageSenderType, text: string): MessageRecord {
  const db = ensureDbFile();
  const id = `MSG-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`;
  const record: MessageRecord = {
    id,
    telegramUserId: String(telegramUserId),
    sender,
    text,
    createdAt: new Date().toISOString(),
  };

  db.messages.push(record);
  // Cap at last 5000 messages
  if (db.messages.length > 5000) {
    db.messages = db.messages.slice(-5000);
  }
  saveDb();
  return record;
}

export function getConversationHistory(telegramUserId: string | number, limit = 50): MessageRecord[] {
  const db = ensureDbFile();
  const idStr = String(telegramUserId);
  return db.messages
    .filter((m) => m.telegramUserId === idStr)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .slice(-limit);
}

// ----------------- OWNER SESSIONS -----------------

export function setOwnerActiveReply(ownerId: string | number, targetUserId: string | number): void {
  const db = ensureDbFile();
  const ownerIdStr = String(ownerId);
  db.ownerSessions[ownerIdStr] = {
    ownerId: ownerIdStr,
    activeReplyToUserId: String(targetUserId),
    updatedAt: new Date().toISOString(),
  };
  saveDb();
}

export function getOwnerActiveReply(ownerId: string | number): string | null {
  const db = ensureDbFile();
  const ownerIdStr = String(ownerId);
  return db.ownerSessions[ownerIdStr]?.activeReplyToUserId || null;
}

export function clearOwnerActiveReply(ownerId: string | number): void {
  const db = ensureDbFile();
  const ownerIdStr = String(ownerId);
  if (db.ownerSessions[ownerIdStr]) {
    db.ownerSessions[ownerIdStr].activeReplyToUserId = null;
    db.ownerSessions[ownerIdStr].updatedAt = new Date().toISOString();
    saveDb();
  }
}

// ----------------- STATS -----------------

export function getDatabaseStats() {
  const db = ensureDbFile();
  const totalUsers = Object.keys(db.telegramUsers).length;
  const totalRequests = Object.keys(db.customerRequests).length;
  const totalQuotations = Object.keys(db.quotations).length;
  const totalMessages = db.messages.length;

  const requestsByStatus = Object.values(db.customerRequests).reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalUsers,
    totalRequests,
    totalQuotations,
    totalMessages,
    requestsByStatus,
  };
}
