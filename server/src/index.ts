import "dotenv/config";
import cors from "cors";
import express from "express";
import apiRouter from "./routes/index.js";
import { config } from "./config.js";

export const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/healthz", (_req, res) => {
  res.json({ ok: true, service: "rdmx-api" });
});

app.use("/api", apiRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  // eslint-disable-next-line no-console
  console.error("Unhandled API error", err);
  return res.status(500).json({ error: "Internal server error" });
});

export function startServer(port = config.port) {
  return app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`RDM backend running on http://localhost:${port}`);
  });
}

const isEntrypoint = process.argv[1] && process.argv[1].endsWith("index.js");
if (isEntrypoint) {
  startServer();
}
