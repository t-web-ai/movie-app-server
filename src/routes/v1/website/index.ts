import { Router } from "express";
import movieRoute from "./movie.route";

const router = Router();

router.use("/movies", movieRoute);

export default router;
