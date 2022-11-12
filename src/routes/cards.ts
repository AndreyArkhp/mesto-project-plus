import { Router } from 'express';
import {
  createCard,
  deleteCardById,
  getCards,
  updateLike,
} from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCardById);
cardsRouter.put('/:cardId/likes', updateLike);
cardsRouter.delete('/:cardId/likes', updateLike);

export default cardsRouter;
