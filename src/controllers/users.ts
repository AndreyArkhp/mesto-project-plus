import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { expiresToken } from '../../config';

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)

    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'test', {
        expiresIn: expiresToken,
      });
      res.cookie('token', token, { maxAge: expiresToken, httpOnly: true });
      res.send('Авторизация прошла успешно');
    })
    .catch((err) => res.status(401).send({ message: err.message }));
};

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
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, password: hash, email }))
    .then((user) => res.send(user))
    .catch((err) =>
      res.status(400).send({
        message:
          !email || !password
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
