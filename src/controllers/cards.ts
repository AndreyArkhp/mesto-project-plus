import { Request, Response } from 'express';
import Card from '../models/card';

export const getCards = (_req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const createCard = (req: any, res: Response) => {
  const { name, link } = req.body;
  const createAd = new Date();
  const likes: any[] = [];
  Card.create({
    name,
    link,
    owner: req.user._id,
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

export const deleteCardById = (req: Request, res: Response) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => res.send(card))
    .catch(() => res.status(404).send({ message: 'Пользователь не найден' }));
};

export const updateLike = (req: any, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { [req.method === 'PUT' ? '$addToSet' : '$pull']: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .then((card) => res.send(card?.likes))
    .catch((err) => res.status(400).send({ message: err.message }));
};