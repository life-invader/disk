import express from 'express';
import { errorHandler, AppError } from './errorHandler.js';
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

  // CORS (базовая настройка, можно расширить)
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }

    next();
  });

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

