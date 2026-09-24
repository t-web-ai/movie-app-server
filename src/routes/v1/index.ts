import { Router } from "express";
import dashboardRoute from "./dashboard";
import websiteRoute from "./website";

const router = Router();

router.use("/dashboard", dashboardRoute);
router.use("/website", websiteRoute);

export default router;
