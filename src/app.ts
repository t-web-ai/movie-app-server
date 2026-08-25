import express from "express";
import { createServer } from "node:http";
import { errorHandler } from "./middlewares/handlers/error.handler";
import router from "./routes";

const app = express();
const server = createServer(app);

app.use(express.json());
app.get("/health", (req, res) => {
  return res.send({
    message: "Server is running",
    url: req.originalUrl,
  });
});

app.use("/api", router);
app.use(errorHandler);

export default server;
