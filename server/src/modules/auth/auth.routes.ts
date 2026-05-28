import { celebrate } from "celebrate";
import { Router } from "express";
import {
  userLoginValidationSchema,
  userRegisterValidationSchema,
} from "./auth.validation.js";

const router = Router();

router.post("/api/auth/register", celebrate(userRegisterValidationSchema));
router.post("/api/auth/login", celebrate(userLoginValidationSchema));
router.post("/api/auth/refresh");
router.post("/api/auth/logout");

//Protected
router.get("/api/auth/me");

export default router;
