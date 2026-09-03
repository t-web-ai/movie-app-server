import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import adminRoute from "./admin.route";
import authRoute from "./auth.route";
import roleRoute from "./role.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/admin", [authMiddleware, adminRoute]);
router.use("/role", [authMiddleware, roleRoute]);

export default router;
