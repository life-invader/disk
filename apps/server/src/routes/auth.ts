import { Router, type Router as ExpressRouter } from "express";
import { validate } from "@/middleware/validate.js";
import { loginSchema, registerSchema } from "@/validators/auth.js";
import { check, login, logout, register } from "@/controllers/auth.js";
import { checkUserByEmail } from "@/middleware/checkUserByEmail.js";
import { authMiddleware } from "@/middleware/checkToken.js";

export const authRouter: ExpressRouter = Router();

authRouter.post("/register", [validate(registerSchema), checkUserByEmail], register);
authRouter.post("/login", validate(loginSchema), login);
authRouter.post("/logout", logout);
authRouter.get("/check", check);
