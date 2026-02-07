import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './errorHandler.js';
import { notFoundHandler } from './notFoundHandler.js';
import { env } from '../config/env.js';

/**
 * Настройка базовых middleware для Express приложения
 */
export const setupMiddleware = (app: express.Application) => {
  // Парсинг JSON
  app.use(express.json({ limit: '10mb' }));

  // Парсинг URL-encoded данных
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // CORS
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Разрешает принимать куки от фронтенда
  }));

  // Куки
  app.use(cookieParser())

  // Логирование запросов (базовое)
  if (env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.path}`);
      next();
    });
  }
};

/**
 * Настройка обработчиков ошибок (должны быть последними)
 */
export const setupErrorHandlers = (app: express.Application) => {
  // 404 handler
  app.use(notFoundHandler);

  // Global error handler
  app.use(errorHandler);
};

export { AppError } from './errorHandler.js';

