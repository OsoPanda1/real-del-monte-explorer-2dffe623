import type { Request, Response } from "express";
import { optimizeRoute } from "./geneticOptimizer.js";
import type { ChatMessageDTO, UserPreferences, TwinContext } from "./types.js";
import { db } from "../lib/store.js";

export const handleRealitoChat = async (req: Request, res: Response) => {
  const body = req.body as {
    message?: string;
    contextHistory?: ChatMessageDTO[];
    userPreferences?: UserPreferences;
  };

  if (!body.message || typeof body.message !== "string" || !body.message.trim()) {
    return res.status(400).json({ error: "El campo 'message' es obligatorio." });
  }

  const message = body.message.trim();
  const contextHistory = body.contextHistory ?? [];
  const userPreferences = body.userPreferences ?? {};

  // Build twin context from in-memory store
  const twinsContext: TwinContext[] = [...db.digitalTwins.values()].map((t) => ({
    id: t.id,
    modelType: "PLACE_TWIN" as const,
    sourceId: t.businessId,
    telemetry: t.state.telemetry as any,
    properties: {} as any,
  }));

  // Intent detection
  const lowerMsg = message.toLowerCase();
  const isRouteRequest = /ruta|tour|recorrido|itinerario|caminar|visitar/.test(lowerMsg);
  const isFoodRequest = /comer|restaurante|paste|comida|gastronomía|hambre/.test(lowerMsg);
  const isHistoryRequest = /historia|mina|museo|patrimonio|antiguo/.test(lowerMsg);
  const isAdventureRequest = /aventura|sendero|naturaleza|ecoturismo|bosque/.test(lowerMsg);

  let gaSuggestion = null;
  if (isRouteRequest) {
    gaSuggestion = await optimizeRoute(userPreferences, twinsContext);
  }

  // Contextual response generation
  let reply: string;

  if (gaSuggestion && gaSuggestion.recommendedPath.length > 0) {
    reply = `He analizado ${twinsContext.length} nodos del gemelo digital y generé una ruta optimizada con confianza del ${(
      gaSuggestion.confidenceScore * 100
    ).toFixed(0)}%. La ruta prioriza baja afluencia y máxima inmersión cultural. ¿Quieres que la ajuste por duración o tipo de experiencia?`;
  } else if (isFoodRequest) {
    reply =
      "Real del Monte es cuna del paste, traído por mineros de Cornwall en 1824. Te recomiendo la Pastería El Portal frente a la plaza principal para el paste tradicional, y La Casa de los Tacos para carnitas auténticas. ¿Quieres que arme una ruta gastronómica completa?";
  } else if (isHistoryRequest) {
    reply =
      "Real del Monte tiene más de 5 siglos de historia minera. La Mina de Acosta te permite descender 400m bajo tierra, y el Panteón Inglés es el único cementerio británico en Latinoamérica. En 1766 ocurrió aquí la primera huelga laboral de América. ¿Te interesa una ruta del patrimonio?";
  } else if (isAdventureRequest) {
    reply =
      "A 2,700m de altitud, los bosques de oyamel y pino ofrecen senderos increíbles. El Cristo Rey en la Peña del Zumate tiene vistas panorámicas de 360°, y hay rutas de rappelling con Eco Aventuras RDM. ¿Cuántas horas tienes disponibles?";
  } else {
    reply =
      "Soy Realito, el núcleo cognitivo de RDM·X. Puedo recomendarte rutas optimizadas con inteligencia de gemelo digital, contarte la historia de 5 siglos de minería, guiarte por la mejor gastronomía o planear aventuras en la montaña. ¿Qué experiencia buscas?";
  }

  // Log interaction
  const interactionId = crypto.randomUUID();
  db.interactions.set(interactionId, {
    id: interactionId,
    kind: "realito_chat",
    context: message.substring(0, 200),
    createdAt: new Date().toISOString(),
  });

  return res.json({
    reply,
    gaSuggestion,
    intent: isRouteRequest
      ? "route"
      : isFoodRequest
      ? "food"
      : isHistoryRequest
      ? "history"
      : isAdventureRequest
      ? "adventure"
      : "general",
    systemPromptLength: twinsContext.length,
    engine: "RDM-X-Hybrid-v3",
  });
};
