import express from "express";
import cors from "cors";
import { pinoLogger } from "./middlewares/pinoLogger.js";

export const app = express();

// Middlewares
app.use(pinoLogger);
app.use(express.json());
app.use(cors());

//Routes

//Add api routes
//Test route
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: "true" });
});
