import type { Request, Response, NextFunction } from 'express';

/**
 * Интерфейс для ошибок приложения
 */
export interface IAppError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

/**
 * Создание кастомной ошибки приложения
 */
export class AppError extends Error implements IAppError {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Middleware для обработки ошибок
 */
export const errorHandler = (
  err: IAppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode ?? 500;
  const message = err.message ?? 'Internal Server Error';

  res.status(statusCode).json({
    isSuccess: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

