import { createServer } from "node:http";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { corsOptions } from "./config/cors.config";
import env from "./config/env.config";
import { errorHandler } from "./middlewares/handlers/error.handler";
import router from "./routes";

const app = express();
const server = createServer(app);

if (env.ENVIORNMENT === "developement") {
	app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get("/health", (req, res) => {
	return res.send({
		message: "Server is running",
		url: req.originalUrl,
	});
});

app.use("/api", router);
app.use(errorHandler);

export default server;
