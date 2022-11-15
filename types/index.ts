import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface IRequestWithAuth extends Request {
  user?: JwtPayload | string;
}
