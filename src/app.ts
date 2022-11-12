import express, { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import { DB_CONN, PORT } from '../config';
import routes from './routes';

mongoose.connect(DB_CONN);

const app = express();

app.use((req: any, _res: Response, next: NextFunction) => {
  req.user = {
    _id: '636eae5ef7e6c257e8183b6a',
  };

  next();
});
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
