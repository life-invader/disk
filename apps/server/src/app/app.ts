import express from 'express';
import mongoose from 'mongoose';
import routes from '@/routes/index.js';
import { env } from '@/config/env.js';
import { setupMiddleware, setupErrorHandlers } from '@/middleware/index.js';
import type { Express } from 'express';

const app: Express = express();

/**
 * Инициализация приложения
 */
const initializeApp = () => {
  // Настройка базовых middleware
  setupMiddleware(app);

  // Подключение роутов
  app.use('/', routes);

  // Настройка обработчиков ошибок (должны быть последними)
  setupErrorHandlers(app);

  return app;
};

/**
 * Запуск приложения
 */
export const startApp = async () => {
  try {
    // Подключение к MongoDB
    await mongoose.connect(env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Инициализация Express приложения
    initializeApp();

    // Запуск сервера
    app.listen(env.PORT, () => {
      console.log(`🚀 App started on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start app:', error);
    process.exit(1);
  }
};

export default app;