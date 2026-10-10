/// <reference path="./types/express.d.ts" />
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { corsOptions } from "./config/cors.config";
import env from "./config/env.config";
import { ensureDatabaseConnection } from "./middlewares/database.middleware";
import { errorHandler } from "./middlewares/handlers/error.handler";
import router from "./routes";

const app = express();

if (env.ENVIORNMENT === "developement") {
	app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(ensureDatabaseConnection);

app.get("/health", (req, res) => {
	return res.send({
		message: "Server is running",
		url: req.originalUrl,
	});
});

app.use("/api", router);
app.use(errorHandler);

export default app;
