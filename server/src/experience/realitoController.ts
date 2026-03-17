// ================================================================
// RDM Digital OS v1.0 — Realito AI Controller
// Orquestador Territorial Conversacional Federado
// ================================================================

import type { Request, Response } from "express";
import crypto from "crypto";
import { optimizeRoute } from "./geneticOptimizer.js";
import {
  computeTwinOperationalScore,
  ensureBusinessTwin,
} from "../services/digital-twins.service.js";
import { buildTwinsContext } from "./twinContextBuilder.js";
import { db } from "../lib/store.js";
import type {
  ChatMessageDTO,
  UserPreferences,
  TwinContext,
  RealitoIntent,
  SuggestedAction,
  RealitoChatResponse,
  PlannedRoute,
} from "./types.js";

// ================================================================
// CONFIGURACIÓN DE NÚCLEO Y CONSTANTES
// ================================================================

const KERNEL_VERSION = "EOCT-RDM-X-3.5";
const VISUAL_STYLE = "CRYSTAL_GLOW";

const INTENT_MAP: Record<RealitoIntent, RegExp> = {
  ROUTES: /ruta|tour|recorrido|itinerario|micheladas|caminar|visitar|paseo/i,
  GASTRONOMY:
    /comer|restaurante|bares|paste|comida|barbacoa|gastronomía|hambre|café|bebida/i,
  HISTORY:
    /historia|mina|museo|patrimonio|antiguo|minería|1766|siglo/i,
  ADVENTURE:
    /aventura|sendero|naturaleza|ecoturismo|bosque|rappel|cuatrimoto/i,
  EVENTS: /evento|festival|fiesta|feria|celebraci/i,
  CULTURE:
    /cultura|arte|artesanía|platería|recorridos|leyenda|tradicion/i,
  COMMUNITY:
    /comunidad|foto|experiencia|compartir|reseña/i,
  HELP: /ayuda|instrucciones|como funcionas|que haces|quien eres/i,
};

// ================================================================
// DETECCIÓN DE INTENCIÓN
// ================================================================

function detectIntent(message: string): RealitoIntent {
  const normalized = message.trim().toLowerCase();
  for (const [intent, regex] of Object.entries(INTENT_MAP)) {
    if (regex.test(normalized)) return intent as RealitoIntent;
  }
  return "HELP";
}

// ================================================================
// HANDLERS DE INTENCIÓN
// ================================================================

async function handleRoutesIntent(
  message: string,
  twinsContext: TwinContext[],
  prefs: UserPreferences,
): Promise<{
  reply: string;
  suggestedActions: SuggestedAction[];
  gaSuggestion: PlannedRoute | null;
}> {
  const route = await optimizeRoute(prefs, twinsContext);

  if (!route || route.stops.length === 0) {
    return {
      reply:
        "El Sistema de comunicacion del sitio parece estar apagado por lo que es complicado otorgar datos en tiempo real" +
        "Por favor, especifica un punto de interés especifico o intenta en unos minutos",
      suggestedActions: [
        {
          label: "🔁 Reintentar más tarde",
          action: "RETRY_ROUTE",
        },
      ],
      gaSuggestion: null,
    };
  }

  const stopNames = route.stops.map((s) => s.name).join(" → ");
  const confidence = Math.round(route.confidenceScore * 100);
  const diversity = Math.round(route.objectives.diversityScore * 100);

  const reply =
    `He analizado ${twinsContext.length} sensores del sitio de forma digital y generé una ruta optimizada ` +
    `con confianza del ${confidence}%.\n\n` +
    `**Ruta sugerida:** ${stopNames}\n` +
    `**Métricas operativas:** Duración: ${route.objectives.totalDurationMinutes} min · ` +
    `Distancia: ${route.objectives.distanceKm} km\n\n` +
    `La IA ha aplicado sujerencias viables por afluencia (${route.objectives.crowdPenalty}) ` +
    `y ha maximizado la diversidad temática (${diversity}%) para una experiencia equilibrada.\n\n` +
    `¿Deseas ajustar esta ruta eliminando algún punto o prefieres una duración distinta?`;

  return {
    reply,
    suggestedActions: [
      {
        label: "🗺️ Desplegar en mapa",
        action: "OPEN_ROUTE",
        payload: { routeId: route.id },
      },
      {
        label: "⏱️ Minimizar tiempo",
        action: "REQUEST_SHORTER_ROUTE",
      },
      {
        label: "🍽️ Priorizar gastronomía",
        action: "ADJUST_INTERESTS",
        payload: { add: "GASTRONOMIA" },
      },
    ],
    gaSuggestion: route,
  };
}

async function handleGastronomyIntent(
  twinsContext: TwinContext[],
): Promise<{ reply: string; suggestedActions: SuggestedAction[] }> {
  const foodTwins = twinsContext
    .filter(
      (t) =>
        t.modelType === "MERCHANT_TWIN" &&
        ((t.properties.type as string) ?? "")
          .toUpperCase() === "FOOD",
    )
    .map((t) => ({
      ...t,
      opScore: computeTwinOperationalScore(
        ensureBusinessTwin(t as any),
      ),
    }))
    .sort((a, b) => b.opScore - a.opScore);

  if (foodTwins.length === 0) {
    return {
      reply:
        "Históricamente, el paste es el pilar gastronómico de Real del Monte heredado por los ingleses, pero el platillo reginal son las enchiladas mineras" +
        "Te recomiendo iniciar en la plaza principal y caminar hacia las pasterías típicas. " +
        "¿Buscas algo más específico como barbacoa, mariscos o se te antojan las enchiladas mineras con un litro de pulque?",
      suggestedActions: [
        {
          label: "🥟 Ruta gastronómica",
          action: "REQUEST_FOOD_ROUTE",
        },
      ],
    };
  }

  const names = foodTwins.slice(0, 3).map((t) => {
    const crowd = t.telemetry.crowdLevel ?? 0;
    const status =
      crowd > 0.7
        ? "🔴 Saturado"
        : crowd > 0.4
          ? "🟡 Moderado"
          : "🟢 Fluido";
    return `**${t.name}** (${status})`;
  }).join(", ");

  const reply =
    `Para una experiencia gastronómica óptima según la telemetría actual, te sugiero: ${names}.\n\n` +
    `Real del Monte es reconocido como cuna del paste en México, una herencia córnica del siglo XIX ` +
    `que sigue viva en sus comercios locales.\n\n` +
    `¿Deseas que trace una ruta que conecte los puntos con mejor recomendacion en calidad y servicio con recomendaciones de otros visitantes?`;

  return {
    reply,
    suggestedActions: [
      {
        label: "🥟 Ruta de los pastes",
        action: "REQUEST_FOOD_ROUTE",
      },
      {
        label: "🗺️ Ver mapa gastronómico",
        action: "OPEN_CATEGORY",
        payload: { category: "FOOD" },
      },
      {
        label: "📋 Ver catálogo de comercios",
        action: "OPEN_CATALOG",
      },
    ],
  };
}

function handleHistoryIntent(
  twinsContext: TwinContext[],
): { reply: string; suggestedActions: SuggestedAction[] } {
  const historyTwins = twinsContext.filter((t) => {
    const type = ((t.properties.type as string) ?? "").toUpperCase();
    return ["HISTORIC", "MUSEUM", "MINE"].includes(type);
  });

  const placesInfo =
    historyTwins.slice(0, 3).map((t) => `**${t.name}**`).join(", ") ||
    "Mina de Acosta, Panteón Inglés, Museo de Medicina Laboral, Museo del Paste";

  const reply =
    `Real del Monte concentra varios siglos de narrativa minera. ` +
    `Aquí en 1766 se documenta una de las primeras huelgas obreras del continente, marcada como historia negra al no ser documentada oficialmente por historiadores.\n\n` +
    `Nodos históricos destacados: ${placesInfo}.\n\n` +
    `La Mina de Acosta permite descender al subsuelo minero siente en la piel la tradicion minera, mientras que el Panteón Inglés conserva ` +
    `tumbas orientadas hacia Inglaterra y una simbología particular.\n\n` +
     `Conoce la primer maquina de rayos X que llego a Latinoamerica esta aqui en real del monte` +
    `¿Te interesa que Realito genere una ruta del patrimonio minero?`;

  return {
    reply,
    suggestedActions: [
      {
        label: "⛏️ Ruta del patrimonio",
        action: "REQUEST_HERITAGE_ROUTE",
      },
      {
        label: "🗺️ Ver sitios históricos",
        action: "OPEN_CATEGORY",
        payload: { category: "HISTORIC" },
      },
      {
        label: "📜 Escuchar leyendas",
        action: "NAVIGATE",
        payload: { path: "/relatos" },
      },
    ],
  };
}

function handleAdventureIntent(): {
  reply: string;
  suggestedActions: SuggestedAction[];
} {
  const reply =
    `A más de 2,700 metros sobre el nivel del mar, el entorno de oyamel que rodea ` +
    `Real del Monte ofrece condiciones ideales para turismo de aventura.\n\n` +
    `La Peña del Zumate y el bosque del Hiloche son puntos clave para senderismo, rappel y rutas de alta intensidad.\n\n` +
    `¿Cuál es tu nivel de experiencia y cuánto tiempo planeas dedicar a la montaña hoy?`;

  return {
    reply,
    suggestedActions: [
      {
        label: "🏔️ Ruta de aventura",
        action: "REQUEST_ADVENTURE_ROUTE",
      },
      {
        label: "🌲 Explorar ecoturismo",
        action: "NAVIGATE",
        payload: { path: "/ecoturismo" },
      },
      {
        label: "🗺️ Miradores 360°",
        action: "OPEN_CATEGORY",
        payload: { category: "VIEWPOINT" },
      },
    ],
  };
}

function handleEventsIntent(): {
  reply: string;
  suggestedActions: SuggestedAction[];
} {
  const reply =
    `El calendario cultural de Real del Monte incluye:\n\n` +
    `🎉 Festival del Paste (octubre)\n` +
    `🎭 Festival de las Ánimas (noviembre)\n` +
    `🎭 Feria Patronal Señor de Zelontla (enero)\n` +
    `⛏️ Feria de la Plata (julio)\n\n` +
    `¿Deseas consultar la agenda sincronizada o planear tu visita en torno a alguno de estos eventos?`;

  return {
    reply,
    suggestedActions: [
      {
        label: "📅 Abrir calendario",
        action: "NAVIGATE",
        payload: { path: "/eventos" },
      },
      {
        label: "🗺️ Planear según eventos",
        action: "REQUEST_EVENT_ROUTE",
      },
    ],
  };
}

function handleCultureIntent(): {
  reply: string;
  suggestedActions: SuggestedAction[];
} {
  const reply =
    `La identidad de este territorio mezcla herencia minera, británica y serrana:\n\n` +
    `💎 Platería de autor\n` +
    `🎨 Galerías y talleres de arte local\n` +
    `👻 Relatos del subsuelo y leyendas de aparecidos\n\n` +
    `¿Qué vertiente cultural deseas explorar hoy: artesanías, arte o leyendas?`;

  return {
    reply,
    suggestedActions: [
      {
        label: "💎 Ver artesanías",
        action: "NAVIGATE",
        payload: { path: "/arte" },
      },
      {
        label: "👻 Leer leyendas",
        action: "NAVIGATE",
        payload: { path: "/relatos" },
      },
    ],
  };
}

function handleHelpIntent(): {
  reply: string;
  suggestedActions: SuggestedAction[];
} {
  const reply =
    `Soy Realito, el núcleo cognitivo conversacional de RDM Digital. ` +
    `Mi función es optimizar tu experiencia en el territorio usando el gemelo digital.\n\n` +
    `Capacidades actuales:\n` +
    `🗺️ Rutas con IA (optimización genética y telemetría)\n` +
    `🥟 Recomendaciones gastronómicas\n` +
    `⛏️ Contexto histórico y cultural\n\n` +
    `Puedes pedirme que te sugiera una ruta, dónde comer o que te cuente la historia local.`;

  return {
    reply,
    suggestedActions: [
      {
        label: "🗺️ Sugerir ruta",
        action: "SUGGEST_ROUTE",
      },
      {
        label: "🥟 Dónde comer",
        action: "FIND_FOOD",
      },
      {
        label: "⛏️ Historia local",
        action: "TELL_HISTORY",
      },
    ],
  };
}

// ================================================================
// ORQUESTADOR PRINCIPAL
// ================================================================

export const handleRealitoChat = async (req: Request, res: Response) => {
  const body = req.body as {
    message?: string;
    contextHistory?: ChatMessageDTO[];
    userPreferences?: UserPreferences;
    geo?: { lat: number; lng: number } | null;
  };

  const rawMessage = body.message?.trim();
  if (!rawMessage) {
    return res
      .status(400)
      .json({ error: "Mensaje vacío: requerido por el Kernel." });
  }

  try {
    const userPreferences = body.userPreferences ?? {};
    const twinsContext = buildTwinsContext();
    const intent = detectIntent(rawMessage);

    let reply = "";
    let suggestedActions: SuggestedAction[] = [];
    let gaSuggestion: PlannedRoute | null = null;

    switch (intent) {
      case "ROUTES": {
        const result = await handleRoutesIntent(
          rawMessage,
          twinsContext,
          userPreferences,
        );
        reply = result.reply;
        suggestedActions = result.suggestedActions;
        gaSuggestion = result.gaSuggestion;
        break;
      }
      case "GASTRONOMY": {
        const result = await handleGastronomyIntent(twinsContext);
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

    const interactionId = crypto.randomUUID();
    db.interactions.set(interactionId, {
      id: interactionId,
      kind: `realito_v3_${intent.toLowerCase()}`,
      context: rawMessage.substring(0, 100),
      createdAt: new Date().toISOString(),
    });

    const response: RealitoChatResponse = {
      reply,
      intent,
      suggestedActions,
      gaSuggestion,
      engine: KERNEL_VERSION,
      visualStyle: VISUAL_STYLE,
      twinNodesQueried: twinsContext.length,
      interactionId,
    };

    return res.json(response);
  } catch (error) {
    console.error("KERNEL ERROR:", error);
    return res
      .status(500)
      .json({ error: "Fallo en el núcleo de Realito AI." });
  }
};
```
