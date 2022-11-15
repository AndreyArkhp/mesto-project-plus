import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface IRequestWithAuth extends Request {
  user?: JwtPayload | string;
}

export interface IRequestWithUserId extends Request {
  user?: { _id: string; exp: number; iat: number };
}