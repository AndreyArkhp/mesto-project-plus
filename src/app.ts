import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import { DB_CONN, PORT } from '../config';
import { createUser, login } from './controllers/users';
import { requestLogger, errorLogger } from './middlewares/logger';
import auth from './middlewares/auth';
import routes from './routes';
import handleErrors from './middlewares/handleErrors';
import {
  headersValidator,
  createUserValidator,
  logginValidator,
} from './validation/cerebrateValidators';

mongoose.connect(DB_CONN);

const app = express();

app.use(express.json());
app.use(requestLogger);
app.post('/signin', logginValidator, login);
app.post('/signup', createUserValidator, createUser);
app.use(headersValidator, auth);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
