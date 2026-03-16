import { db } from "../lib/store.js";
import { emitMsrEvent } from "./audit.service.js";

const tierQuota: Record<"free" | "creator" | "guardian" | "institutional", number> = {
  free: 100,
  creator: 500,
  guardian: 1500,
  institutional: 10000,
};

export function ensureMembership(userId: string) {
  const existing = db.memberships.get(userId);
  if (existing) return existing;
  const record = {
    userId,
    tier: "free" as const,
    active: true,
    quota: tierQuota.free,
    updatedAt: new Date().toISOString(),
  };
  db.memberships.set(userId, record);
  return record;
}

export function setMembership(input: { userId: string; tier: "free" | "creator" | "guardian" | "institutional" }) {
  const membership = {
    userId: input.userId,
    tier: input.tier,
    active: true,
    quota: tierQuota[input.tier],
    updatedAt: new Date().toISOString(),
  };
  db.memberships.set(input.userId, membership);
  emitMsrEvent({ layer: "L5", category: "economy.membership.updated", summary: `Membresía ${input.tier}`, payload: { userId: input.userId, quota: membership.quota } });
  return membership;
}

export function ensureTokenBalance(userId: string) {
  const existing = db.tokenBalances.get(userId);
  if (existing) return existing;
  const balance = { userId, balance: 0, updatedAt: new Date().toISOString() };
  db.tokenBalances.set(userId, balance);
  return balance;
}

export function createLedgerEntry(input: { userId: string; kind: "credit" | "debit"; amount: number; reason: string }) {
  const id = crypto.randomUUID();
  const entry = { id, ...input, createdAt: new Date().toISOString() };
  db.ledger.set(id, entry);

  const balance = ensureTokenBalance(input.userId);
  balance.balance = input.kind === "credit" ? balance.balance + input.amount : balance.balance - input.amount;
  balance.updatedAt = new Date().toISOString();

  return { entry, balance };
}

export function getEconomySummary(userId: string) {
  const membership = ensureMembership(userId);
  const balance = ensureTokenBalance(userId);
  const ledger = [...db.ledger.values()].filter((item) => item.userId === userId).slice(-30);
  return { membership, balance, ledger };
}
