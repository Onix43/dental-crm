import type { UserRole } from "../modules/users/user.types.js";
import jwt from "jsonwebtoken";

export interface JWTPayload {
  id: string;
  role: UserRole;
}

export function generateAccessToken(payload: JWTPayload) {
  return jwt.sign(
    { id: payload.id, role: payload.role },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES as any,
    },
  );
}

export function generateRefreshToken(payload: JWTPayload) {
  return jwt.sign(
    { id: payload.id, role: payload.role },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES as any,
    },
  );
}

export function verifyToken(token: string, type: "access" | "refresh"): JWTPayload {
  const secret =
    type === "refresh"
      ? process.env.REFRESH_TOKEN_SECRET!
      : process.env.ACCESS_TOKEN_SECRET!;

  return jwt.verify(token, secret) as unknown as JWTPayload;
}
