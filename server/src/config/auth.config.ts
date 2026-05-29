import { SEVEN_DAYS } from "../constants/constants.js";

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: SEVEN_DAYS,
};
