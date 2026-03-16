import type { TwinContext, UserPreferences } from "./types.js";

export const calculateFitness = (
  route: TwinContext[],
  userPrefs: UserPreferences
): number => {
  let score = 0;

  route.forEach((step) => {
    const t = step.telemetry || {};
    const p = step.properties || {};

    const maxCrowd = userPrefs.maxCrowdLevel ?? 0.9;

    if (typeof t.crowdLevel === "number" && t.crowdLevel > maxCrowd) {
      score -= 50;
    }

    if (p.type && userPrefs.favoriteType && p.type === userPrefs.favoriteType) {
      score += 100;
    }

    if (p.immersion === "L3") {
      score += 30;
    }
  });

  score += route.length * 10;

  return score;
};

export const optimizeRoute = async (
  userPreferences: UserPreferences,
  twinsContext: TwinContext[]
) => {
  const placeTwins = twinsContext.filter((t) => t.modelType === "PLACE_TWIN");

  if (placeTwins.length === 0) {
    return {
      recommendedPath: [] as string[],
      confidenceScore: 0,
      geneticGen: "GA-FALLBACK",
      explanation: "No hay gemelos de lugares disponibles; no se puede optimizar.",
    };
  }

  // Sort by crowd level (ascending) and type affinity
  const scored = placeTwins
    .map((twin) => ({
      twin,
      fitness: calculateFitness([twin], userPreferences),
    }))
    .sort((a, b) => b.fitness - a.fitness);

  const maxStops = userPreferences.durationHours
    ? Math.min(Math.ceil(userPreferences.durationHours * 2), scored.length)
    : Math.min(3, scored.length);

  const candidate = scored.slice(0, maxStops).map((s) => s.twin);
  const totalFitness = calculateFitness(candidate, userPreferences);
  const confidence = Math.max(0, Math.min(1, totalFitness / 100));

  return {
    recommendedPath: candidate.map((t) => t.sourceId),
    confidenceScore: confidence,
    geneticGen: "RDM-X-v2026-A",
    explanation:
      "Ruta generada considerando crowdLevel, afinidad de tipo e inmersión. GA simplificado (v1).",
  };
};
