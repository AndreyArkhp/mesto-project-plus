import { Router } from 'express';
import notFoundPage from '../middlewares/notFoundPage';
import cardsRouter from './cards';
import usersRouter from './users';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/cards', cardsRouter);
routes.use(notFoundPage);

export default routes;
