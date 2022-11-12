import { Router } from 'express';
import {
  createCard,
  deleteCardById,
  disLikeCard,
  getCards,
  likeCard,
} from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCardById);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', disLikeCard);

export default cardsRouter;
