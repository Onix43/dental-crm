import type { NextFunction, Request, Response } from "express";
import {
  authMeService,
  loginUserService,
  refreshUserService,
  registerUserService,
} from "./auth.service.js";
import { cookieOptions } from "../../config/auth.config.js";
import createHttpError from "http-errors";

export async function registerUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, email, password, role } = req.body;

  try {
    const user = await registerUserService({ name, email, password, role });

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function loginUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = req.body;
  try {
    const { accessToken, refreshToken, dbUser } = await loginUserService({
      email,
      password,
    });

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({ user: dbUser, accessToken });
  } catch (err) {
    next(err);
  }
}

export async function refreshUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { refreshToken } = req.cookies;
  try {
    if (!refreshToken) {
      throw createHttpError(401, "Session expired");
    }

    const newAccessToken = await refreshUserService(refreshToken);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    next(err);
  }
}

export async function logoutUserController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  res.clearCookie("refreshToken", { ...cookieOptions, maxAge: 0 });

  res.status(200).json({ message: "Successfully logged out" });
}

export async function authMeController(req: Request, res: Response) {
  const id = req.user?.id;

  if (!id) throw createHttpError(401, "Unauthorized");

  const user = await authMeService(id);
  res.status(200).json(user);
}
