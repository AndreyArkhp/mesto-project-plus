import { Request, Response, NextFunction } from 'express';
import {
  cardCreateSuccess,
  cardDeleteForbidden,
  cardDeleteSuccess,
  cardNotFound,
  cardsNotFound,
} from '../constants/constants';
import ForbiddenError from '../errors/forbiddenError';
import NotFoundError from '../errors/notFoundError';
import Card from '../models/card';
import { IRequestWithJwt } from '../types';

export const getCards = (_req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .orFail(new NotFoundError(cardsNotFound))
    .then((cards) => res.send(cards))
    .catch(next);
};

export const createCard = (
  req: IRequestWithJwt,
  res: Response,
  next: NextFunction
) => {
  const { name, link } = req.body;
  const likes: string[] = [];
  Card.create({
    name,
    link,
    owner: req.user?._id,
    likes,
    createdAt: new Date(),
  })
    .then((card) => res.send({ message: cardCreateSuccess, card }))
    .catch(next);
};

export const deleteCardById = (
  req: IRequestWithJwt,
  res: Response,
  next: NextFunction
) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError(cardNotFound))
    .then((card) => {
      if (card?.owner.toString() !== req.user?._id) {
        throw new ForbiddenError(cardDeleteForbidden);
      } else {
        card?.delete();
        res.send({ message: cardDeleteSuccess, card });
      }
    })
    .catch(next);
};

export const updateLike = (
  req: IRequestWithJwt,
  res: Response,
  next: NextFunction
) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      [req.method === 'PUT' ? '$addToSet' : '$pull']: { likes: req.user?._id },
    },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError(cardNotFound))
    .then((card) => res.send(card?.likes))
    .catch(next);
};
