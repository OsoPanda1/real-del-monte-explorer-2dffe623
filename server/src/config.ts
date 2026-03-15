export const config = {
  port: Number(process.env.PORT ?? 8787),
  jwtSecret: process.env.JWT_SECRET ?? "rdmx-dev-secret",
  publicBaseUrl: process.env.PUBLIC_BASE_URL ?? "http://localhost:5173",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
};
