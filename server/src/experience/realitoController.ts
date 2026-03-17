// ================================================================
// RDM Digital OS v3 — Realito AI Controller
// Orquestador territorial conversacional
// ================================================================

import type { Request, Response } from "express";
import { optimizeRoute } from "./geneticOptimizer.js";
import type {
  ChatMessageDTO,
  UserPreferences,
  TwinContext,
  RealitoIntent,
  SuggestedAction,
  RealitoChatResponse,
  PlannedRoute,
} from "./types.js";
import { buildTwinsContext } from "./twinContextBuilder.js";
import { db } from "../lib/store.js";

// ================================================================
// Intent Detection
// ================================================================

function detectIntent(message: string): RealitoIntent {
  const m = message.toLowerCase();
  if (/ruta|tour|recorrido|itinerario|caminar|visitar|paseo/.test(m)) return "ROUTES";
  if (/comer|restaurante|paste|comida|gastronomía|hambre|café|bebida/.test(m)) return "GASTRONOMY";
  if (/historia|mina|museo|patrimonio|antiguo|minería|1766|siglo/.test(m)) return "HISTORY";
  if (/aventura|sendero|naturaleza|ecoturismo|bosque|rappel|cuatrimoto/.test(m)) return "ADVENTURE";
  if (/evento|festival|fiesta|feria|celebraci/.test(m)) return "EVENTS";
  if (/cultura|arte|artesanía|platería|leyenda|tradici/.test(m)) return "CULTURE";
  if (/comunidad|foto|experiencia|compartir|reseña/.test(m)) return "COMMUNITY";
  return "HELP";
}

// ================================================================
// Intent Handlers — each returns text + suggested actions
// ================================================================

async function handleRoutesIntent(
  message: string,
  twinsContext: TwinContext[],
  prefs: UserPreferences,
): Promise<{ reply: string; suggestedActions: SuggestedAction[]; gaSuggestion: PlannedRoute }> {
  const route = await optimizeRoute(prefs, twinsContext);

  let reply: string;
  if (route.stops.length > 0) {
    const stopNames = route.stops.map((s) => s.name).join(" → ");
    reply = `He analizado ${twinsContext.length} nodos del gemelo digital y generé una ruta optimizada con confianza del ${Math.round(route.confidenceScore * 100)}%.\n\n` +
      `**Ruta:** ${stopNames}\n` +
      `**Duración estimada:** ${route.objectives.totalDurationMinutes} min · **Distancia:** ${route.objectives.distanceKm} km\n\n` +
      `La ruta prioriza baja afluencia (penalización crowd: ${route.objectives.crowdPenalty}), diversidad temática (${Math.round(route.objectives.diversityScore * 100)}%) y balance comercio/cultura.\n\n` +
      `¿Quieres que la ajuste por duración, tipo de experiencia o evitando algún punto?`;
  } else {
    reply = "No encontré suficientes nodos activos en el gemelo digital para generar una ruta ahora. Intenta más tarde o pregúntame algo específico sobre un lugar.";
  }

  return {
    reply,
    suggestedActions: [
      { label: "🗺️ Ver ruta en el mapa", action: "OPEN_ROUTE", payload: { routeId: route.id } },
      { label: "⏱️ Ruta más corta", action: "REQUEST_SHORTER_ROUTE" },
      { label: "🍽️ Más gastronomía", action: "ADJUST_INTERESTS", payload: { add: "GASTRONOMIA" } },
      { label: "🏔️ Más miradores", action: "ADJUST_INTERESTS", payload: { add: "VIEWPOINT" } },
    ],
    gaSuggestion: route,
  };
}

function handleGastronomyIntent(twinsContext: TwinContext[]): { reply: string; suggestedActions: SuggestedAction[] } {
  const foodTwins = twinsContext.filter(
    (t) => t.modelType === "MERCHANT_TWIN" &&
      ((t.properties.type as string) ?? "").toUpperCase() === "FOOD",
  );

  if (foodTwins.length > 0) {
    const sorted = [...foodTwins].sort((a, b) => (b.immersionLevel - a.immersionLevel));
    const top3 = sorted.slice(0, 3);
    const names = top3.map((t) => {
      const crowd = t.telemetry.crowdLevel ?? 0;
      const crowdLabel = crowd > 0.7 ? "🔴 concurrido" : crowd > 0.4 ? "🟡 moderado" : "🟢 tranquilo";
      return `**${t.name}** (${crowdLabel})`;
    }).join(", ");

    return {
      reply: `Para comer bien en Real del Monte te recomiendo: ${names}.\n\n` +
        `Real del Monte es cuna del paste, traído por mineros de Cornwall en 1824. La Pastería El Portal frente a la plaza tiene la receta original córnica.\n\n` +
        `¿Quieres que arme una ruta gastronómica completa con los mejores lugares?`,
      suggestedActions: [
        { label: "🥟 Ruta gastronómica", action: "REQUEST_FOOD_ROUTE" },
        { label: "🗺️ Ver en el mapa", action: "OPEN_CATEGORY", payload: { category: "FOOD" } },
        { label: "📋 Ver todos los comercios", action: "OPEN_CATALOG" },
      ],
    };
  }

  return {
    reply: "Real del Monte es cuna del paste, traído por mineros de Cornwall en 1824. Te recomiendo la Pastería El Portal frente a la plaza principal para el paste tradicional, y La Casa de los Tacos para carnitas auténticas. ¿Quieres que arme una ruta gastronómica?",
    suggestedActions: [
      { label: "🥟 Ruta gastronómica", action: "REQUEST_FOOD_ROUTE" },
      { label: "📋 Ver catálogo", action: "OPEN_CATALOG" },
    ],
  };
}

function handleHistoryIntent(twinsContext: TwinContext[]): { reply: string; suggestedActions: SuggestedAction[] } {
  const historyTwins = twinsContext.filter(
    (t) => {
      const type = ((t.properties.type as string) ?? "").toUpperCase();
      return type === "HISTORIC" || type === "MUSEUM" || type === "MINE";
    },
  );

  const placesInfo = historyTwins.slice(0, 3).map((t) => `**${t.name}**`).join(", ");

  return {
    reply: `Real del Monte tiene más de 5 siglos de historia minera. En 1766 ocurrió aquí la primera huelga laboral de América.\n\n` +
      `Lugares históricos destacados: ${placesInfo || "Centro Histórico, Mina de Acosta, Panteón Inglés"}.\n\n` +
      `La Mina de Acosta te permite descender 400m bajo tierra, y el Panteón Inglés es el único cementerio británico en Latinoamérica, con tumbas orientadas hacia Inglaterra.\n\n` +
      `¿Te interesa una ruta del patrimonio minero?`,
    suggestedActions: [
      { label: "⛏️ Ruta patrimonial", action: "REQUEST_HERITAGE_ROUTE" },
      { label: "🗺️ Ver sitios históricos", action: "OPEN_CATEGORY", payload: { category: "HISTORIC" } },
      { label: "📜 Leer leyendas", action: "NAVIGATE", payload: { path: "/relatos" } },
    ],
  };
}

function handleAdventureIntent(): { reply: string; suggestedActions: SuggestedAction[] } {
  return {
    reply: `A 2,700m de altitud, los bosques de oyamel y pino ofrecen senderos increíbles.\n\n` +
      `El Cristo Rey en la Peña del Zumate tiene vistas panorámicas de 360°. Hay rutas de rappelling con Eco Aventuras RDM y recorridos en cuatrimoto por la sierra.\n\n` +
      `¿Cuántas horas tienes disponibles y qué nivel de intensidad buscas?`,
    suggestedActions: [
      { label: "🏔️ Ruta de aventura", action: "REQUEST_ADVENTURE_ROUTE" },
      { label: "🌲 Ver ecoturismo", action: "NAVIGATE", payload: { path: "/ecoturismo" } },
      { label: "🗺️ Miradores en el mapa", action: "OPEN_CATEGORY", payload: { category: "VIEWPOINT" } },
    ],
  };
}

function handleEventsIntent(): { reply: string; suggestedActions: SuggestedAction[] } {
  return {
    reply: `Real del Monte celebra festivales únicos durante todo el año:\n\n` +
      `🎉 **Festival Internacional del Paste** (octubre)\n` +
      `🎭 **Festival de las Ánimas** (noviembre)\n` +
      `⛏️ **Feria de la Plata** (julio)\n` +
      `🎪 **Fiestas Patronales de la Asunción** (agosto)\n\n` +
      `¿Quieres ver el calendario completo de eventos?`,
    suggestedActions: [
      { label: "📅 Ver calendario", action: "NAVIGATE", payload: { path: "/eventos" } },
      { label: "🗺️ Planear visita", action: "REQUEST_EVENT_ROUTE" },
    ],
  };
}

function handleCultureIntent(): { reply: string; suggestedActions: SuggestedAction[] } {
  return {
    reply: `La cultura de Real del Monte fusiona herencia indígena, colonial y británica:\n\n` +
      `💎 **Platería artesanal** — tradición de siglos en trabajo de plata\n` +
      `🎨 **Arte local** — galerías y talleres de artistas de la sierra\n` +
      `👻 **Leyendas mineras** — relatos de aparecidos y tesoros enterrados\n` +
      `⛏️ **Dichos mineros** — la sabiduría oral de 5 siglos de minería\n\n` +
      `¿Qué dimensión cultural te interesa explorar?`,
    suggestedActions: [
      { label: "💎 Artesanías", action: "NAVIGATE", payload: { path: "/arte" } },
      { label: "👻 Leyendas", action: "NAVIGATE", payload: { path: "/relatos" } },
      { label: "⛏️ Dichos mineros", action: "NAVIGATE", payload: { path: "/dichos" } },
    ],
  };
}

function handleHelpIntent(): { reply: string; suggestedActions: SuggestedAction[] } {
  return {
    reply: `Soy Realito, el núcleo cognitivo del gemelo digital de Real del Monte.\n\n` +
      `Puedo ayudarte a:\n` +
      `🗺️ **Diseñar rutas** optimizadas con IA y telemetría en tiempo real\n` +
      `🥟 **Descubrir gastronomía** — pastes, carnitas, mole y más\n` +
      `⛏️ **Explorar historia** — 5 siglos de minería y herencia británica\n` +
      `🏔️ **Planear aventura** — senderismo, rappel, miradores\n` +
      `📅 **Encontrar eventos** — festivales, ferias y fiestas\n\n` +
      `¿Qué experiencia buscas hoy?`,
    suggestedActions: [
      { label: "🗺️ Sugerir ruta", action: "SUGGEST_ROUTE" },
      { label: "🥟 Dónde comer", action: "FIND_FOOD" },
      { label: "⛏️ Contar historia", action: "TELL_HISTORY" },
      { label: "🏔️ Aventura", action: "FIND_ADVENTURE" },
    ],
  };
}

// ================================================================
// Main Handler
// ================================================================

export const handleRealitoChat = async (req: Request, res: Response) => {
  const body = req.body as {
    message?: string;
    contextHistory?: ChatMessageDTO[];
    userPreferences?: UserPreferences;
    sessionId?: string;
    geo?: { lat: number; lng: number } | null;
  };

  if (!body.message || typeof body.message !== "string" || !body.message.trim()) {
    return res.status(400).json({ error: "El campo 'message' es obligatorio." });
  }

  const message = body.message.trim();
  const userPreferences = body.userPreferences ?? {};

  // Build twin context from in-memory store
  const twinsContext = buildTwinsContext();

  // Detect intent
  const intent = detectIntent(message);

  let reply: string;
  let suggestedActions: SuggestedAction[];
  let gaSuggestion: PlannedRoute | null = null;

  switch (intent) {
    case "ROUTES": {
      const result = await handleRoutesIntent(message, twinsContext, userPreferences);
      reply = result.reply;
      suggestedActions = result.suggestedActions;
      gaSuggestion = result.gaSuggestion;
      break;
    }
    case "GASTRONOMY": {
      const result = handleGastronomyIntent(twinsContext);
      reply = result.reply;
      suggestedActions = result.suggestedActions;
      break;
    }
    case "HISTORY": {
      const result = handleHistoryIntent(twinsContext);
      reply = result.reply;
      suggestedActions = result.suggestedActions;
      break;
    }
    case "ADVENTURE": {
      const result = handleAdventureIntent();
      reply = result.reply;
      suggestedActions = result.suggestedActions;
      break;
    }
    case "EVENTS": {
      const result = handleEventsIntent();
      reply = result.reply;
      suggestedActions = result.suggestedActions;
      break;
    }
    case "CULTURE": {
      const result = handleCultureIntent();
      reply = result.reply;
      suggestedActions = result.suggestedActions;
      break;
    }
    default: {
      const result = handleHelpIntent();
      reply = result.reply;
      suggestedActions = result.suggestedActions;
      break;
    }
  }

  // Log interaction
  const interactionId = crypto.randomUUID();
  db.interactions.set(interactionId, {
    id: interactionId,
    kind: `realito_chat_${intent.toLowerCase()}`,
    context: message.substring(0, 200),
    createdAt: new Date().toISOString(),
  });

  const response: RealitoChatResponse = {
    reply,
    intent,
    suggestedActions,
    gaSuggestion,
    engine: "RDM-X-Hybrid-v3",
    twinNodesQueried: twinsContext.length,
  };

  return res.json(response);
};
