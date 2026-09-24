import { Router } from "express";
import movieRoute from "./movie.route";
import talentRoute from "./talent.route";

const router = Router();

router.use("/movies", movieRoute);
router.use("/talents", talentRoute);

export default router;
