import type { Request, Response, NextFunction } from 'express';

/**
 * Обертка для асинхронных обработчиков роутов
 * Автоматически обрабатывает ошибки в async функциях
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

