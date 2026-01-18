import { z } from 'zod'

export const registerSchema = z.object({
  name: z
    .string("Введите имя")
    .trim()
    .min(2, 'Имя слишком короткое'),
  secondName: z
    .string("Введите фамилию")
    .trim()
    .min(2, 'Фамилия слишком короткая'),
  email: z
    .email('Некорректный email'),
  password: z
    .string()
    .min(8, 'Минимум 8 символов')
    .max(16, "Пароль должен быть не длиннее 16 символов"),
})

export type RegisterFormValues = z.infer<typeof registerSchema>