import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { SECRET_KEY } from '../../config';
import {
  avatarUpdateSuccess,
  badRequst,
  castError,
  existUserCode,
  expiresToken,
  logginOk,
  userAlreadyExist,
  userCreateSuccess,
  userNotFound,
  usersNotFound,
  userUpdateSuccess,
  validationsError,
} from '../constants/constants';
import { IRequestWithJwt } from '../types';
import NotFoundError from '../errors/notFoundError';
import BadRequestError from '../errors/badRequestError';
import DuplicateKeyError from '../errors/duplicateKeyError';

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  // either user or error
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
        expiresIn: expiresToken,
      });
      res.cookie('token', token, { maxAge: expiresToken, httpOnly: true });
      res.send(logginOk);
    })
    .catch(next);
};

export const getUsers = (_req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .orFail(new NotFoundError(usersNotFound))
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  User.findById(req.params.id)
    .orFail(new NotFoundError(userNotFound))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === castError) {
        return next(new BadRequestError(badRequst));
      }
      next(err);
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      password: hash,
      email,
    }))
    .then((user) => res.send({ message: userCreateSuccess, user }))
    .catch((err) => {
      if (err.name === validationsError) {
        next(new BadRequestError(badRequst));
      } else if (err.code === existUserCode) {
        next(new DuplicateKeyError(userAlreadyExist));
      } else {
        next(err);
      }
    });
};

export const updateUser = (
  req: IRequestWithJwt,
  res: Response,
  next: NextFunction,
) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user?._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError(userNotFound))
    .then((user) => res.send({ message: userUpdateSuccess, user }))
    .catch(next);
};

export const updateAvatar = (
  req: IRequestWithJwt,
  res: Response,
  next: NextFunction,
) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user?._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError(userNotFound))
    .then((newAvatar) => res.send({ message: avatarUpdateSuccess, newAvatar }))
    .catch(next);
};

export const getMe = (
  req: IRequestWithJwt,
  res: Response,
  next: NextFunction,
) => {
  User.findById(req.user?._id)
    .orFail(new NotFoundError(userNotFound))
    .then((user) => res.send(user))
    .catch(next);
};
