import { z, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateRequest=(schema: z.ZodTypeAny)=> {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        body: req.body,
        query: req.query
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ errors: error.errors });
      } else {
        next(error);
      }
    }
  };
}