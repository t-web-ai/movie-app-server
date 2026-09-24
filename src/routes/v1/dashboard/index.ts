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
router.use("/admins", [authMiddleware, adminRoute]);
router.use("/roles", [authMiddleware, roleRoute]);
router.use("/permissions", [authMiddleware, permissionRoute]);
router.use("/talents", [authMiddleware, talentRoute]);
router.use("/genres", [authMiddleware, genreRoute]);
router.use("/movies", [authMiddleware, movieRoute]);
router.use("/email-setting", [authMiddleware, emailSettingRoute]);
router.use("/email-templates", [authMiddleware, emailTemplateRoute]);
router.use("/logs", [authMiddleware, logRoute]);

export default router;
