import { Response, Request, NextFunction } from 'express';
import { IErrorWithStatusCode } from '../types';

const handleErrors = (
  err: IErrorWithStatusCode,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { getStatusCode: statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send(statusCode === 500 ? 'Внутреняя ошибка сервера' : message);
  next();
};

export default handleErrors;
