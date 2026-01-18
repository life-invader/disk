import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z
      .string("Введите имя")
      .trim()
      .min(2, 'Имя слишком короткое'),
    secondName: z
      .string("Введите фамилию")
      .trim()
      .min(2, 'Фамилия слишком короткая'),
    email: z.email("Некорректный email"),
    password: z.string("Password required")
      .min(8, "Пароль должен быть не короче 8 символов")
      .max(16, "Пароль должен быть не длиннее 16 символов"),
  }),
});