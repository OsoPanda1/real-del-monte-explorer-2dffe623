import { Router } from "express";
import { listTourismEvents, listTourismRoutes } from "../services/content.service.js";

const contentRouter = Router();

contentRouter.get("/routes", (_req, res) => {
  return res.json({ routes: listTourismRoutes() });
});

contentRouter.get("/events", (_req, res) => {
  return res.json({ events: listTourismEvents() });
});

export default contentRouter;
