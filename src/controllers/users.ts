import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = (_req: Request, res: Response) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const getUserById = (req: Request, res: Response) => {
  User.findById(req.params.id)
    .then((user) => res.send(user))
    .catch(() => res.status(404).send({ message: 'Пользователь не найден' }));
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar, email, password } = req.body;

  User.create({ name, about, avatar, password, email })
    .then((user) => res.send(user))
    .catch((err) =>
      res.status(400).send({
        message:
          !name || !about || !avatar || !email || !password
            ? 'Поля name,about,avatar,password и email обязательны'
            : err.message,
      })
    );
};

export const updateUser = (req: any, res: Response) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send({ message: err.message }));
};

export const updateAvatar = (req: any, res: Response) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((newAvatar) => res.send(newAvatar))
    .catch((err) => res.status(400).send({ message: err.message }));
};
