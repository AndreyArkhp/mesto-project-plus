import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../config';
import { unauthorized } from '../constants/constants';
import UnauthorizedError from '../errors/unauthorizedError';
import { IRequestWithAuth } from '../types';

export default (req: IRequestWithAuth, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(unauthorized);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnauthorizedError(unauthorized);
  }

  req.user = payload;
  next();
};
