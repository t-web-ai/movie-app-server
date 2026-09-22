import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import adminRoute from "./admin.route";
import authRoute from "./auth.route";
import emailSettingRoute from "./emailSetting.route";
import emailTemplateRoute from "./emailTemplate.route";
import genreRoute from "./genre.route";
import logRoute from "./log.route";
import movieRoute from "./movie.route";
import permissionRoute from "./permission.route";
import roleRoute from "./role.route";
import talentRoute from "./talent.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/admin", [authMiddleware, adminRoute]);
router.use("/role", [authMiddleware, roleRoute]);
router.use("/permission", [authMiddleware, permissionRoute]);
router.use("/talent", [authMiddleware, talentRoute]);
router.use("/genre", [authMiddleware, genreRoute]);
router.use("/movie", [authMiddleware, movieRoute]);
router.use("/email-setting", [authMiddleware, emailSettingRoute]);
router.use("/email-template", [authMiddleware, emailTemplateRoute]);
router.use("/log", [authMiddleware, logRoute]);

export default router;
