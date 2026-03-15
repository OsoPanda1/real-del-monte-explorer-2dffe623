import { Router } from "express";
import { z } from "zod";
import { recommendBusinesses } from "../services/recommendations.service.js";
import { db } from "../lib/store.js";

const aiSchema = z.object({
  text: z.string().min(2),
});

const aiRouter = Router();

const inferIntent = (text: string): string => {
  const value = text.toLowerCase();
  if (value.includes("comer") || value.includes("restaurante") || value.includes("paste")) return "comer";
  if (value.includes("aventura") || value.includes("sendero") || value.includes("naturaleza")) return "aventura";
  if (value.includes("hotel") || value.includes("hosped")) return "hospedaje";
  return "cultura";
};

aiRouter.post("/realito", (req, res) => {
  const parsed = aiSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const intent = inferIntent(parsed.data.text);
  const businesses = recommendBusinesses({ intent });

  businesses.forEach((business) => {
    const id = crypto.randomUUID();
    db.interactions.set(id, {
      id,
      kind: "recommendation_view",
      businessId: business.id,
      context: intent,
      createdAt: new Date().toISOString(),
    });
  });

  const top = businesses.slice(0, 3).map((business) => business.name).join(", ");
  const reply = top
    ? `Con base en tu intención (${intent}), te recomiendo: ${top}. Prioricé relevancia temática y visibilidad activa en RDM·X.`
    : "Aún no tengo negocios suficientes para recomendarte. Prueba en unos minutos.";

  return res.json({ reply, intent, businesses: businesses.slice(0, 3) });
});

export default aiRouter;
