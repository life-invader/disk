# Рекомендации по архитектуре Backend

## ✅ Что было исправлено:

1. **Исправлены критические ошибки:**
   - Удален лишний импорт `ref` из `node:process` в User.ts
   - Добавлена обработка ошибок в `startApp`
   - Исправлена структура `files` в User модели (массив вместо одного ObjectId)

2. **Обновлены скрипты:**
   - Используется `tsx watch` для разработки (hot reload)
   - Настроены скрипты (build, dev, start)

3. **Улучшена конфигурация:**
   - Добавлена валидация переменных окружения
   - Улучшена обработка ошибок

4. **Создана базовая архитектура:**
   - Middleware для обработки ошибок
   - Структура роутов
   - Утилиты (asyncHandler)
   - Типы

## 🏗️ Рекомендации по дальнейшей разработке:

### 1. Структура модулей

Для каждого функционального модуля (auth, users, files) создавайте следующую структуру:

```
src/
├── controllers/
│   └── auth/
│       └── authController.ts    # HTTP запросы/ответы
├── services/
│   └── auth/
│       └── authService.ts       # Бизнес-логика
├── routes/
│   └── auth/
│       └── authRoutes.ts        # Роутинг
└── models/
    └── User.ts                  # Уже есть
```

**Принцип разделения:**
- **Routes** → только маршрутизация, минимальная логика
- **Controllers** → валидация входных данных, вызов сервисов
- **Services** → вся бизнес-логика, работа с БД

### 2. Пример структуры модуля auth

```typescript
// routes/auth/authRoutes.ts
import { Router } from 'express';
import { authController } from '../../controllers/auth/authController.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const router = Router();

router.post('/register', asyncHandler(authController.register));
router.post('/login', asyncHandler(authController.login));

export default router;

// controllers/auth/authController.ts
import { Request, Response } from 'express';
import { authService } from '../../services/auth/authService.js';
import { AppError } from '../../middleware/errorHandler.js';

export const authController = {
  async register(req: Request, res: Response) {
    const { email, password } = req.body;
    // Валидация
    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }
    // Вызов сервиса
    const user = await authService.register(email, password);
    res.status(201).json({ status: 'success', data: user });
  },
  
  // ... другие методы
};

// services/auth/authService.ts
import UserModel from '../../models/User.js';
import bcrypt from 'bcryptjs';

export const authService = {
  async register(email: string, password: string) {
    // Проверка существования
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new AppError('User already exists', 400);
    }
    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);
    // Создание пользователя
    const user = await UserModel.create({
      email,
      password: hashedPassword,
    });
    return user;
  },
  
  // ... другие методы
};
```

### 3. Необходимые зависимости для дальнейшей разработки

```bash
# Аутентификация
npm install bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken

# Валидация данных
npm install zod  # или joi, yup

# Работа с файлами
npm install multer
npm install -D @types/multer

# Улучшение CORS (опционально)
npm install cors
npm install -D @types/cors

# Логирование (рекомендуется)
npm install winston
```

### 4. Важные моменты для облачного хранилища:

1. **Безопасность:**
   - Всегда хешируйте пароли (bcrypt)
   - Используйте JWT для аутентификации
   - Валидируйте все входные данные
   - Ограничивайте размер загружаемых файлов

2. **Работа с файлами:**
   - Используйте `multer` для загрузки файлов
   - Храните метаданные в БД, файлы - на диске/в S3
   - Проверяйте типы файлов и размеры
   - Генерируйте уникальные имена файлов

3. **Middleware для auth:**
   - Создайте `authMiddleware.ts` для проверки JWT токенов
   - Используйте его в защищенных роутах

4. **Модель File:**
   ```typescript
   // models/File.ts
   const FileSchema = new Schema({
     name: { type: String, required: true },
     type: { type: String, required: true },
     size: { type: Number, required: true },
     path: { type: String, required: true },
     user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
     parent: { type: Schema.Types.ObjectId, ref: 'File' },
     children: [{ type: Schema.Types.ObjectId, ref: 'File' }],
   }, { timestamps: true });
   ```

### 5. Environment variables

Создайте `.env.example`:
```env
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb://localhost:27017/cloud-storage
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

### 6. Best Practices

- ✅ Всегда используйте `asyncHandler` для async контроллеров
- ✅ Используйте типизацию TypeScript везде
- ✅ Обрабатывайте все ошибки через `AppError`
- ✅ Валидируйте входные данные перед обработкой
- ✅ Используйте JSDoc для документирования функций
- ✅ Разделяйте бизнес-логику (services) и HTTP логику (controllers)
- ✅ Тестируйте код (рекомендуется добавить Jest/Vitest)

### 7. Следующие шаги

1. Создать модель `File` для хранения файлов
2. Настроить аутентификацию (JWT, middleware)
3. Создать роуты для auth (register, login)
4. Создать роуты для работы с файлами (upload, download, delete)
5. Настроить загрузку файлов (multer)
6. Добавить валидацию (zod/joi)
7. Настроить логирование

