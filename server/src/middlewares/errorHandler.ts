import "dotenv/config";
import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const isProduction = process.env.NODE_ENV === "production";

  if (createHttpError.isHttpError(err)) {
    return res.status(err.status).json({
      success: false,
      message: err.message || err.name,
    });
  }

  res.status(500).json({
    success: false,
    message: isProduction ? "Server error, please try later" : err.message,
  });
};
