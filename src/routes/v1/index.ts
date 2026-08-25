import { Router } from "express";
import dashboardRoute from "./dashboard/index";

const router = Router();

router.use("/dashboard", dashboardRoute);

export default router;
