import type { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      if (!result.success) {
        const fieldErrors: Record<string, string> = {};

        result.error.issues.forEach((issue) => {
          const fieldName = issue.path.at(-1);

          if (typeof fieldName === 'string') {
            fieldErrors[fieldName] = issue.message;
          }
        });

        return res.status(400).json({
          isSuccess: false,
          message: "Некорректные данные",
          fieldErrors,
        });
      }

      next();
    };