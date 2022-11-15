import { Request, Response } from 'express';
import Card from '../models/card';
import { IRequestWithUserId } from '../../types';

export const getCards = (_req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const createCard = (req: IRequestWithUserId, res: Response) => {
  const { name, link } = req.body;
  const createAd = new Date();
  const likes: string[] = [];
  Card.create({
    name,
    link,
    owner: req.user?._id,
    likes,
    createAd,
  })
    .then((card) => res.send(card))
    .catch((err) =>
      res.status(400).send({
        message: !link || !name ? 'Поля name и link обязательны' : err.message,
      })
    );
};

export const deleteCardById = (req: IRequestWithUserId, res: Response) => {
  Card.findById(req.params.cardId)
    .orFail(new Error('Карточка не найдена'))
    .then((card) => {
      if (card?.owner.toString() !== req.user?._id) {
        throw new Error('Нельзя удалять чужие карточки');
      } else {
        card?.delete();
        res.send(card);
      }
    })
    .catch((err) => res.status(404).send({ message: err.message }));
};

export const updateLike = (req: IRequestWithUserId, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      [req.method === 'PUT' ? '$addToSet' : '$pull']: { likes: req.user?._id },
    },
    { new: true, runValidators: true }
  )
    .then((card) => res.send(card?.likes))
    .catch((err) => res.status(400).send({ message: err.message }));
};