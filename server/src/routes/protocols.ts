import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { listProtocols, raiseGuardianAlert, startProtocol, updateProtocolState } from "../services/protocol.service.js";

const startSchema = z.object({ protocolType: z.enum(["hoyo-negro", "fenix", "futuros"]), context: z.string().min(3) });
const updateSchema = z.object({ protocolId: z.string().min(1), state: z.enum(["completed", "halted"]) });
const alertSchema = z.object({ source: z.string().min(2), level: z.enum(["low", "medium", "high"]), message: z.string().min(3) });

const protocolsRouter = Router();

protocolsRouter.get("/", (_req, res) => {
  return res.json(listProtocols());
});

protocolsRouter.post("/start", requireAuth, (req, res) => {
  const parsed = startSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  return res.status(201).json({ run: startProtocol(parsed.data) });
});

protocolsRouter.post("/state", requireAuth, (req, res) => {
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const run = updateProtocolState(parsed.data);
  if (!run) return res.status(404).json({ error: "Protocol not found" });
  return res.json({ run });
});

protocolsRouter.post("/guardian/alert", requireAuth, (req, res) => {
  const parsed = alertSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  return res.status(201).json({ alert: raiseGuardianAlert(parsed.data) });
});

export default protocolsRouter;
