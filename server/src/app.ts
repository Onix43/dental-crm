import express from "express";
import cors from "cors";
import { pinoLogger } from "./middlewares/pinoLogger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

export const app = express();

// Middlewares
app.use(pinoLogger);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes

//Test route
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true });
});

//Error handler
app.use(errorHandler);
