import { Response, NextFunction, Request } from 'express';
import NotFoundError from '../errors/notFoundError';

export default (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
};
