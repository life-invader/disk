import jwt from "jsonwebtoken";
import { env } from "@/config/env.js";
import type { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ isSuccess: false, message: 'Не авторизован' });
  }

  try {
    req.user = jwt.verify(token, env.JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).send('Invalid token');
  }
};