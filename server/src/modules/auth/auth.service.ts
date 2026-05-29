import createHttpError from "http-errors";
import { User } from "../users/user.model.js";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../../constants/constants.js";
import type { LoginUserInfo, RegisterUserInfo } from "./auth.types.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../../utils/jwt.js";

export async function registerUserService(user: RegisterUserInfo) {
  const { name, email, password, role } = user;

  const isExists = await User.findOne({
    email,
  });
  if (isExists) throw createHttpError(400, "This user is already exists");

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = await User.create({
    email,
    name,
    role,
    password: hashedPassword,
  });

  return newUser;
}

export async function loginUserService(user: LoginUserInfo) {
  const { email, password } = user;

  const dbUser = await User.findOne({
    email,
  });
  if (!dbUser) throw createHttpError(401, "Invalid email or password");

  const isValidPassword = await bcrypt.compare(password, dbUser.password);
  if (!isValidPassword) throw createHttpError(401, "Invalid email or password");

  // Token generation
  const accessToken = generateAccessToken({ id: dbUser.id, role: dbUser.role });
  const refreshToken = generateRefreshToken({ id: dbUser.id, role: dbUser.role });

  return { accessToken, refreshToken, dbUser };
}

export async function refreshUserService(refreshToken: string) {
  try {
    const payload = verifyToken(refreshToken, "refresh");

    const accessToken = generateAccessToken({ id: payload.id, role: payload.role });
    return accessToken;
  } catch (err) {
    throw createHttpError(401, "Invalid or expired refresh token");
  }
}
