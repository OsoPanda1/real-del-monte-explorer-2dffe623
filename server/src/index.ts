import "dotenv/config";
import cors from "cors";
import express from "express";
import apiRouter from "./routes/index.js";
import { config } from "./config.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/healthz", (_req, res) => {
  res.json({ ok: true, service: "rdmx-api" });
});

app.use("/api", apiRouter);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`RDM backend running on http://localhost:${config.port}`);
});
