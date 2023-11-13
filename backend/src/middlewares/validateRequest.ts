import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { InternalServerError, ValidationError } from '../utils/AppError';

/**
 * Express middleware for schema-based validation using the Zod library.
 * Can be applied to either the request body ('body') or URL parameters ('params').
 *
 * @param schema - Zod schema for validation.
 * @param field - Specifies whether to validate 'body' or 'params'.
 */

export const validate =
  (schema: z.Schema, field: 'body' | 'params') =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[field]);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fields = error.errors.map((err: z.ZodIssue) => ({
          [err.path.at(0) || 'error']: {
            message: err.message,
          },
        }));
        next(
          new ValidationError(`Error validating the data from ${field}`, fields)
        );
      }
      next(
        new InternalServerError(
          `Something went wrong when validation the ${field}`
        )
      );
    }
  };
