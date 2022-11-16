import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface IRequestWithAuth extends Request {
  user?: JwtPayload | string;
}

interface ICastomJwtPayload extends JwtPayload {
  _id: string;
}

export interface IRequestWithJwt extends Request {
  user?: ICastomJwtPayload;
}

export interface IErrorWithStatusCode extends Error {
  readonly getStatusCode: number;
}
