import { db, type BusinessRecord } from "../lib/store.js";

export type TwinSource =
  | "azure-dtdl"
  | "azure-explorer"
  | "eclipse-ditto"
  | "awsim"
  | "forge-digital-twin"
  | "facechain"
  | "awesome-digital-twins";

export interface TwinCapability {
  id: string;
  name: string;
  source: TwinSource;
  description: string;
}

export interface TwinModel {
  id: string;
  displayName: string;
  description: string;
  dtdlContext: string;
  semanticType: string;
  properties: Array<{ name: string; schema: string; writable: boolean }>;
  telemetry: Array<{ name: string; schema: string; unit?: string }>;
  capabilities: TwinCapability[];
}

export interface TwinSceneProfile {
  renderer: "webgl" | "webxr";
  stylePreset: "heritage" | "festival" | "nature";
  pbr: boolean;
  hdri: string;
  postprocess: string[];
}

export interface TwinInstance {
  id: string;
  modelId: string;
  businessId: string;
  name: string;
  tags: string[];
  state: {
    desired: Record<string, string | number | boolean>;
    reported: Record<string, string | number | boolean>;
    telemetry: Record<string, number>;
  };
  scene: TwinSceneProfile;
  graph: {
    incoming: string[];
    outgoing: string[];
  };
  guideAvatar: {
    style: "realista" | "cinematico";
    locale: "es-MX";
    voice: string;
  };
  updatedAt: string;
}

const twinModels: TwinModel[] = [
  {
    id: "dtmi:rdmx:tourism:heritage.poi;1",
    displayName: "Heritage Point of Interest",
    description: "Modelo semántico para minas, museos, plazas y parroquias históricas.",
    dtdlContext: "dtmi:dtdl:context;3",
    semanticType: "rdmx:tourism:poi",
    properties: [
      { name: "status", schema: "string", writable: true },
      { name: "capacity", schema: "integer", writable: true },
      { name: "weatherSensitivity", schema: "double", writable: false },
    ],
    telemetry: [
      { name: "occupancy", schema: "double", unit: "percent" },
      { name: "avgStayMinutes", schema: "double", unit: "minute" },
      { name: "queueMinutes", schema: "double", unit: "minute" },
    ],
    capabilities: [
      {
        id: "semantic-modeling",
        name: "Modelado semántico DTDL",
        source: "azure-dtdl",
        description: "Contratos de propiedades y telemetría validados por tipo.",
      },
      {
        id: "graph-navigation",
        name: "Navegación de grafo",
        source: "azure-explorer",
        description: "Relaciones visibles entre comercios, rutas y eventos.",
      },
      {
        id: "policy-sync",
        name: "Shadow desired/reported",
        source: "eclipse-ditto",
        description: "Sincroniza estado deseado vs observado para auditoría operativa.",
      },
      {
        id: "scene-rendering",
        name: "Pipeline visual inmersivo",
        source: "forge-digital-twin",
        description: "Perfil visual con PBR/HDRI para contexto turístico.",
      },
      {
        id: "avatar-guide",
        name: "Guía avatar personalizada",
        source: "facechain",
        description: "Define estilo visual y voz del guía Realito para cada gemelo.",
      },
      {
        id: "scenario-simulation",
        name: "Simulación de escenarios",
        source: "awsim",
        description: "Ensaya clima/flujo de visitantes para ajuste de rutas.",
      },
      {
        id: "federated-catalog",
        name: "Catálogo de capacidades",
        source: "awesome-digital-twins",
        description: "Base para incorporar conectores y frameworks futuros.",
      },
    ],
  },
];

const defaultSceneByCategory: Record<string, TwinSceneProfile> = {
  cultura: {
    renderer: "webxr",
    stylePreset: "heritage",
    pbr: true,
    hdri: "silver-dawn",
    postprocess: ["bloom", "ambient-occlusion"],
  },
  gastronomia: {
    renderer: "webgl",
    stylePreset: "festival",
    pbr: true,
    hdri: "golden-evening",
    postprocess: ["color-grading"],
  },
  ecoturismo: {
    renderer: "webxr",
    stylePreset: "nature",
    pbr: true,
    hdri: "misty-forest",
    postprocess: ["volumetric-fog", "ssr"],
  },
};

const defaultScene: TwinSceneProfile = {
  renderer: "webgl",
  stylePreset: "heritage",
  pbr: true,
  hdri: "silver-mist",
  postprocess: ["bloom"],
};

const getSceneForBusiness = (business: BusinessRecord): TwinSceneProfile => {
  const fromCategory = defaultSceneByCategory[business.category];
  return fromCategory ?? defaultScene;
};

export function listTwinModels() {
  return twinModels;
}

export function ensureBusinessTwin(business: BusinessRecord): TwinInstance {
  const existing = [...db.digitalTwins.values()].find((twin) => twin.businessId === business.id);
  if (existing) {
    return existing;
  }

  const id = `twin-${business.id}`;
  const twin: TwinInstance = {
    id,
    modelId: twinModels[0].id,
    businessId: business.id,
    name: business.name,
    tags: [business.category, "real-del-monte"],
    state: {
      desired: {
        status: "open",
        targetOccupancy: 70,
      },
      reported: {
        status: business.isActive ? "open" : "closed",
      },
      telemetry: {
        occupancy: 25,
        avgStayMinutes: 35,
        queueMinutes: 5,
      },
    },
    scene: getSceneForBusiness(business),
    graph: {
      incoming: ["destination-real-del-monte"],
      outgoing: ["route-centro-historico", `business-${business.id}`],
    },
    guideAvatar: {
      style: "realista",
      locale: "es-MX",
      voice: "realito-mercurio",
    },
    updatedAt: new Date().toISOString(),
  };

  db.digitalTwins.set(id, twin);
  return twin;
}

export function listTwinInstances() {
  return [...db.digitalTwins.values()];
}

export function simulateTwinScenario(input: {
  twinId: string;
  weather: "clear" | "rain" | "fog";
  projectedVisitors: number;
}) {
  const twin = db.digitalTwins.get(input.twinId);
  if (!twin) {
    return null;
  }

  const weatherPenalty = input.weather === "rain" ? -15 : input.weather === "fog" ? -8 : 0;
  const occupancy = Math.min(100, Math.max(0, (input.projectedVisitors / 120) * 100 + weatherPenalty));
  const queueMinutes = Math.max(0, Math.round(occupancy / 6));

  twin.state.telemetry.occupancy = Number(occupancy.toFixed(2));
  twin.state.telemetry.queueMinutes = queueMinutes;
  twin.state.reported.status = occupancy > 90 ? "saturated" : "open";
  twin.updatedAt = new Date().toISOString();

  const eventId = crypto.randomUUID();
  db.twinEvents.set(eventId, {
    id: eventId,
    twinId: twin.id,
    kind: "scenario_simulation",
    payload: {
      weather: input.weather,
      projectedVisitors: input.projectedVisitors,
      occupancy: twin.state.telemetry.occupancy,
      queueMinutes,
    },
    createdAt: new Date().toISOString(),
  });

  return twin;
}

export function computeTwinOperationalScore(twin: TwinInstance | undefined) {
  if (!twin) {
    return 0;
  }

  const occupancy = twin.state.telemetry.occupancy ?? 0;
  const queue = twin.state.telemetry.queueMinutes ?? 0;
  const experience = Math.max(0, 100 - occupancy * 0.4 - queue * 1.8);
  return Number((experience / 20).toFixed(2));
}
