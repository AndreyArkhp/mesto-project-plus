import { Router } from 'express';
import cardsRouter from './cards';
import usersRouter from './users';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/cards', cardsRouter);

export default routes;
