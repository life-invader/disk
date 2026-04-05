import { Router, type Router as ExpressRouter } from "express";
import { fileController } from "@/controllers/file.js";
import { authMiddleware } from "@/middleware/checkToken.js";

export const fileRouter: ExpressRouter = Router();

fileRouter.post("", [authMiddleware], fileController.createDir);
fileRouter.get("", [authMiddleware], fileController.getFiles);