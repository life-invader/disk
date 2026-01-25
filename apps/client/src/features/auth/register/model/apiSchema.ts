import type z from "zod";
import { baseRegisterSchema } from "./schema";

export const registerApiSchema = baseRegisterSchema
  .omit({
    passwordConfirm: true,
  })

export type RegisterPayload = z.infer<typeof registerApiSchema>