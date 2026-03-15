import type { AuthUser } from "../types/auth.js";

export interface UserRecord extends AuthUser {
  email: string;
  passwordHash: string;
}

export interface BusinessRecord {
  id: string;
  ownerId: string;
  name: string;
  description?: string;
  category: string;
  latitude: number;
  longitude: number;
  address?: string;
  plan: "basic" | "plus" | "premium";
  isActive: boolean;
  createdAt: string;
}

export interface DonationRecord {
  id: string;
  amount: number;
  providerId: string;
  currency: string;
  createdAt: string;
}


export interface TwinRecord {
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
  scene: {
    renderer: "webgl" | "webxr";
    stylePreset: "heritage" | "festival" | "nature";
    pbr: boolean;
    hdri: string;
    postprocess: string[];
  };
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

export interface TwinEventRecord {
  id: string;
  twinId: string;
  kind: string;
  payload: Record<string, string | number | boolean>;
  createdAt: string;
}
export interface InteractionRecord {
  id: string;
  kind: string;
  context?: string;
  businessId?: string;
  createdAt: string;
}

export const db = {
  users: new Map<string, UserRecord>(),
  usersByEmail: new Map<string, string>(),
  businesses: new Map<string, BusinessRecord>(),
  donations: new Map<string, DonationRecord>(),
  interactions: new Map<string, InteractionRecord>(),
  digitalTwins: new Map<string, TwinRecord>(),
  twinEvents: new Map<string, TwinEventRecord>(),
};
