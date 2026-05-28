import { Joi, Segments } from "celebrate";
import { UserRole } from "../users/user.types.js";

export const userRegisterValidationSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(50).trim().required(),
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().min(6).max(30).required(),
    role: Joi.string()
      .valid(...Object.values(UserRole))
      .required(),
    isActive: Joi.boolean().default(false),
  }),
};
export const userLoginValidationSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().required(),
  }),
};
