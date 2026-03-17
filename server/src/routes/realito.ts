import { Router } from "express";
import { z } from "zod";
import { db } from "../lib/store.js";
import { recommendBusinesses } from "../services/recommendations.service.js";
import { listTourismEvents, listTourismRoutes } from "../services/content.service.js";

const chatSchema = z.object({
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1),
      })
    )
    .default([]),
  context: z
    .object({
      userId: z.string().optional(),
      location: z
        .object({
          lat: z.number(),
          lng: z.number(),
        })
        .optional(),
      queryType: z.string().min(1).optional(),
    })
    .optional(),
});

const inferIntent = (text: string): string => {
  const value = text.toLowerCase();
  if (value.includes("comer") || value.includes("restaurante") || value.includes("paste")) return "comer";
  if (value.includes("aventura") || value.includes("sendero") || value.includes("naturaleza")) return "aventura";
  if (value.includes("hotel") || value.includes("hosped")) return "hospedaje";
  return "cultura";
};

const realitoRouter = Router();

realitoRouter.post("/chat", (req, res) => {
  const parsed = chatSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const latestUserMessage = [...parsed.data.history].reverse().find((message) => message.role === "user");
  const prompt = latestUserMessage?.content ?? "";
  const intent = inferIntent(prompt || parsed.data.context?.queryType || "cultura");

  const businesses = recommendBusinesses({ intent }).slice(0, 3);
  const routes = listTourismRoutes().slice(0, 2);
  const events = listTourismEvents().slice(0, 2);

  const summaryBusinesses = businesses.map((item) => item.name).join(", ");
  const summaryRoutes = routes.map((item) => item.name).join(" y ");

  const reply = summaryBusinesses
    ? `Te propongo comenzar con ${summaryBusinesses}. Si quieres una experiencia guiada, toma ${summaryRoutes}. Puedo ajustar por clima, horario o presupuesto.`
    : "Aún estoy sincronizando recomendaciones. Mientras tanto, te sugiero iniciar en el Centro Histórico y la Ruta del Patrimonio Minero.";

  const interactionId = crypto.randomUUID();
  db.interactions.set(interactionId, {
    id: interactionId,
    kind: "realito_chat",
    context: intent,
    createdAt: new Date().toISOString(),
  });

  return res.json({
    reply,
    intent,
    recommendations: businesses,
    routes,
    events,
    trace: {
      interactionId,
      source: "rdmx-realito-chat-v1",
    },
  });
});
import { handleRealitoChat } from "../experience/realitoController.js";

const realitoRouter = Router();

realitoRouter.post("/chat", handleRealitoChat);

export default realitoRouter;
