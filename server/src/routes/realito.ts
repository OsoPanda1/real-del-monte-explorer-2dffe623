import { Router } from "express";
import { handleRealitoChat } from "../experience/realitoController.js";

const realitoRouter = Router();

realitoRouter.post("/chat", handleRealitoChat);

export default realitoRouter;
