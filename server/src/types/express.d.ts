import type { JWTPayload } from "../utils/jwt.ts";

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}
