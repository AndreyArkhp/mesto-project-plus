import { Router } from 'express';
import {
  createCard,
  deleteCardById,
  getCards,
  updateLike,
} from '../controllers/cards';
import {
  createCardValidator,
  cardParamsValidator,
} from '../validation/cerebrateValidators';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCardValidator, createCard);
cardsRouter.delete('/:cardId', cardParamsValidator, deleteCardById);
cardsRouter.put('/:cardId/likes', cardParamsValidator, updateLike);
cardsRouter.delete('/:cardId/likes', cardParamsValidator, updateLike);

export default cardsRouter;
