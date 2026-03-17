// ================================================================
// RDM Digital OS v3 — Experience Planning API
// ================================================================

import { Router } from "express";
import { z } from "zod";
import { optimizeRoute } from "../experience/geneticOptimizer.js";
import { buildTwinsContext, getTwinById, getTwinsByType } from "../experience/twinContextBuilder.js";
import type { UserPreferences } from "../experience/types.js";

const experienceRouter = Router();

const planSchema = z.object({
  availableMinutes: z.number().int().min(30).max(720).optional().default(180),
  intensity: z.enum(["LOW", "MEDIUM", "HIGH"]).optional().default("MEDIUM"),
  interests: z.array(z.string()).optional().default([]),
  withChildren: z.boolean().optional().default(false),
  mobilityConstraints: z.boolean().optional().default(false),
  maxCrowdLevel: z.number().min(0).max(1).optional().default(0.85),
  favoriteType: z.string().optional(),
});

// POST /api/experience/plan — Generate optimized route
experienceRouter.post("/plan", async (req, res, next) => {
  try {
    const parsed = planSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const prefs: UserPreferences = {
      availableMinutes: parsed.data.availableMinutes,
      intensity: parsed.data.intensity,
      interests: parsed.data.interests,
      withChildren: parsed.data.withChildren,
      mobilityConstraints: parsed.data.mobilityConstraints,
      maxCrowdLevel: parsed.data.maxCrowdLevel,
      favoriteType: parsed.data.favoriteType,
    };

    const twinsContext = buildTwinsContext();
    const route = await optimizeRoute(prefs, twinsContext);

    return res.json(route);
  } catch (err) {
    next(err);
  }
});

// GET /api/experience/twins — All twins with telemetry
experienceRouter.get("/twins", (_req, res) => {
  const twins = buildTwinsContext();
  return res.json({
    count: twins.length,
    twins,
  });
});

// GET /api/experience/twins/:id — Single twin detail
experienceRouter.get("/twins/:id", (req, res) => {
  const twin = getTwinById(req.params.id);
  if (!twin) {
    return res.status(404).json({ error: "Twin no encontrado." });
  }
  return res.json(twin);
});

// GET /api/experience/suggestions — Quick pre-computed suggestions
experienceRouter.get("/suggestions", (_req, res) => {
  const twins = buildTwinsContext();

  // Low crowd places
  const quiet = twins
    .filter((t) => t.modelType === "PLACE_TWIN" && (t.telemetry.crowdLevel ?? 0) < 0.3)
    .slice(0, 3)
    .map((t) => ({ id: t.id, name: t.name, crowdLevel: t.telemetry.crowdLevel }));

  // Popular merchants
  const popular = twins
    .filter((t) => t.modelType === "MERCHANT_TWIN")
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 3)
    .map((t) => ({ id: t.id, name: t.name, popularityScore: t.popularityScore }));

  // High immersion
  const immersive = twins
    .filter((t) => t.immersionLevel >= 0.7)
    .slice(0, 3)
    .map((t) => ({ id: t.id, name: t.name, immersionLevel: t.immersionLevel }));

  return res.json({
    quietPlaces: quiet,
    popularMerchants: popular,
    immersiveExperiences: immersive,
    totalNodes: twins.length,
  });
});

export default experienceRouter;
