import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { verifyToken } from "../utils/jwt.js";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw createHttpError(401, "Authorization header missing");

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) throw createHttpError(401, "Bearer token missing");

    const decoded = verifyToken(token, "refresh");

    req.user = decoded;
    next();
  } catch {
    next(createHttpError(401, "Access token invalid or expired"));
  }
}
