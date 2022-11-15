import dotenv from 'dotenv';

dotenv.config();

export const { PORT = 3000, DB_CONN = '' } = process.env;
export const expiresToken = 3600 * 24 * 7;
