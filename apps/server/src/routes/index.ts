import express from 'express';
import { authRouter } from './auth.js';
import { fileRouter } from './file.js';
import type { Router } from 'express';

const appRouter: Router = express.Router();

/**
 * Базовый роут для проверки работы API
 */
appRouter.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

/**
 * Подключение роутов модулей
 */
appRouter.use('/auth', authRouter);
appRouter.use('/file', fileRouter);

export default appRouter;
