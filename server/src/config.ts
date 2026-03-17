const parseOrigins = (input?: string) => {
  if (!input) return ["http://localhost:5173"];
  return input
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

export const config = {
  port: Number(process.env.PORT ?? 8787),
  jwtSecret: process.env.JWT_SECRET ?? "rdmx-dev-secret",
  publicBaseUrl: process.env.PUBLIC_BASE_URL ?? "http://localhost:5173",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
  corsAllowedOrigins: parseOrigins(process.env.CORS_ALLOWED_ORIGINS),
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000),
  rateLimitMaxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 30),
  databaseUrl: process.env.DATABASE_URL,
};
