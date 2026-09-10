import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import adminRoute from "./admin.route";
import authRoute from "./auth.route";
import permissionRoute from "./permission.route";
import roleRoute from "./role.route";
import talentRoute from "./talent.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/admin", [authMiddleware, adminRoute]);
router.use("/role", [authMiddleware, roleRoute]);
router.use("/permission", [authMiddleware, permissionRoute]);
router.use("/talent", [authMiddleware, talentRoute]);

export default router;
