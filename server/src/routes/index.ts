import { Router } from "express";
import authRouter from "./auth.js";
import businessesRouter from "./businesses.js";
import donationsRouter from "./donations.js";
import weatherRouter from "./weather.js";
import recommendationsRouter from "./recommendations.js";
import aiRouter from "./ai.js";
import digitalTwinsRouter from "./digital-twins.js";
import contentRouter from "./content.js";
import realitoRouter from "./realito.js";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/businesses", businessesRouter);
apiRouter.use("/donations", donationsRouter);
apiRouter.use("/weather", weatherRouter);
apiRouter.use("/recommendations", recommendationsRouter);
apiRouter.use("/ai", aiRouter);
apiRouter.use("/digital-twins", digitalTwinsRouter);
apiRouter.use("/content", contentRouter);
apiRouter.use("/realito", realitoRouter);

export default apiRouter;
