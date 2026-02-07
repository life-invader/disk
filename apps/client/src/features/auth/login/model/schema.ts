import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .email('Некорректный email'),
  password: z
    .string(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;