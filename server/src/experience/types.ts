export type Telemetry = {
  crowdLevel?: number;
  weather?: string;
  openStatus?: boolean;
  [key: string]: unknown;
};

export type TwinProperties = {
  immersion?: "L1" | "L2" | "L3";
  type?: string;
  [key: string]: unknown;
};

export type TwinContext = {
  id: string;
  modelType: "PLACE_TWIN" | "MERCHANT_TWIN" | "ROUTE_TWIN" | "AGENT_TWIN";
  sourceId: string;
  telemetry: Telemetry;
  properties: TwinProperties;
};

export type UserPreferences = {
  durationHours?: number;
  favoriteType?: string;
  maxCrowdLevel?: number;
};

export type ChatMessageDTO = {
  from: "user" | "realito";
  text: string;
};
