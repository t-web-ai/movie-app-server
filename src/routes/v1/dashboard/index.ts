import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import adminRoute from "./admin.route";
import authRoute from "./auth.route";
import permissionRoute from "./permission.route";
import roleRoute from "./role.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/admin", [authMiddleware, adminRoute]);
router.use("/role", [authMiddleware, roleRoute]);
router.use("/permission", [authMiddleware, permissionRoute]);

export default router;
