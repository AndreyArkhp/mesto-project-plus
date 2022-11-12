import express, { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import cardsRouter from './routes/cards';
import usersRouter from './routes/users';

mongoose.connect('mongodb://localhost:27017/mestodb');

const { PORT = 3001 } = process.env;

const app = express();

app.use((req: any, _res: Response, next: NextFunction) => {
  req.user = {
    _id: '636eae5ef7e6c257e8183b6a',
  };

  next();
});
app.use(express.json());
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
