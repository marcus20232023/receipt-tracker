import { Request, Response, NextFunction } from 'express';
import { CustomError } from './errorHandler';

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const err = new CustomError(`Can't find ${req.originalUrl} on this server!`, 404);
  next(err);
};
