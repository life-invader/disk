import { z } from 'zod'

export const baseRegisterSchema = z.object({
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
  passwordConfirm: z
    .string()
    .min(8, 'Минимум 8 символов')
    .max(16, "Пароль должен быть не длиннее 16 символов"),
});

export const registerSchema = baseRegisterSchema.refine((data) => {
  return data.password === data.passwordConfirm
}, { error: "Пароли не совпадают", path: ["passwordConfirm"] });

export type RegisterFormValues = z.infer<typeof registerSchema>;