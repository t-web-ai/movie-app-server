import { Router } from "express";
import authRoute from "./auth.route";
import adminRoute from "./admin.route";
import { authMiddleware } from "../../../middlewares/auth.middleware";

const router = Router();

router.use("/auth", authRoute);
router.use("/admin", [authMiddleware, adminRoute]);

export default router;
