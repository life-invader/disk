import { z } from 'zod'

export const loginSchema = z.object({
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
    .min(6, 'Минимум 6 символов'),
})

export type LoginFormValues = z.infer<typeof loginSchema>