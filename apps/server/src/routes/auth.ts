import { Router, type Router as ExpressRouter } from "express";
import { validate } from "@/middleware/validate.js";
import { registerSchema } from "@/validators/auth.js";
import { login, register } from "@/controllers/auth.js";

export const authRouter: ExpressRouter = Router();

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(registerSchema), login);
