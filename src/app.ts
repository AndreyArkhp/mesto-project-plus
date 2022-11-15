import express from 'express';
import mongoose from 'mongoose';
import { DB_CONN, PORT } from '../config';
import { createUser, login } from './controllers/users';
import auth from './middlewares/auth';
import routes from './routes';

mongoose.connect(DB_CONN);

const app = express();

app.use(express.json());
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
