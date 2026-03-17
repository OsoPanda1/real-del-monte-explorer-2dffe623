import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { config } from "../config.js";

const systemRouter = Router();
const prisma = config.databaseUrl ? new PrismaClient() : null;

const withTimeout = async <T>(promise: Promise<T>, timeoutMs: number) => {
  return await Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(`Timeout after ${timeoutMs}ms`)), timeoutMs);
    }),
  ]);
};

async function getDatabaseStatus() {
  if (!prisma) {
    return { ok: false, reason: "DATABASE_URL_NOT_CONFIGURED" };
  }

  try {
    await withTimeout(prisma.$queryRaw`SELECT 1`, 1500);
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      reason: "DATABASE_UNREACHABLE",
      details: error instanceof Error ? error.message : "unknown",
    };
  }
}

systemRouter.get("/health", async (_req, res) => {
  const db = await getDatabaseStatus();
  return res.json({
    ok: true,
    service: "rdmx-api",
    uptimeSec: Math.round(process.uptime()),
    checks: { db },
  });
});

systemRouter.get("/ready", async (_req, res) => {
  const db = await getDatabaseStatus();
  if (!db.ok) {
    return res.status(503).json({
      ok: false,
      code: "NOT_READY",
      checks: { db },
    });
  }

  return res.json({ ok: true, checks: { db } });
});

export default systemRouter;
