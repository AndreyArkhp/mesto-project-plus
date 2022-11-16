import winston from 'winston';
import winstonExpress from 'express-winston';

export const requestLogger = winstonExpress.logger({
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

export const errorLogger = winstonExpress.errorLogger({
  transports: [new winston.transports.File({ filename: 'errors.log' })],
  format: winston.format.json(),
});
