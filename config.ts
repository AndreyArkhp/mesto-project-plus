import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT = '3000',
  DB_CONN = 'mongodb://localhost:27017/mestodb',
  SECRET_KEY = 'secret-string',
} = process.env;
