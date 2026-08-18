import express from "express";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);

app.get("/health", (req, res) => {
  return res.send({
    message: "Server is running",
    url: req.originalUrl,
  });
});

export default server;
