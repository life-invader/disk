import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z.email("Invalid email"),
    password: z.string("Password required")
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be less than 16 characters"),
  }),
});