import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

// Extend Express.Request to include validatedBody
declare global {
  namespace Express {
    interface Request {
      validatedBody?: any;
    }
  }
}

export const validateData = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // Format the Zod issues into a clean array
      const formattedErrors = result.error.issues.map((issue) => ({
        field: issue.path.join("."), // e.g. "name"
        message: issue.message,      // e.g. "Expected string, received undefined"
      }));

      return res.status(400).json({
        error: "Validation failed",
        issues: formattedErrors,
      });
    }

    // If all is good, attach validated data and continue
    req.validatedBody = result.data;
    next();
  };
};
