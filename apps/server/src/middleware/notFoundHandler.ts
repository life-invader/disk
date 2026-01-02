import type { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler.js';

/**
 * Middleware для обработки 404 ошибок
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new AppError(
    `Route ${req.originalUrl} not found`,
    404
  );
  next(error);
};

