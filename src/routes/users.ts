import { Router } from 'express';
import {
  getUserById,
  getUsers,
  updateAvatar,
  updateUser,
  getMe,
} from '../controllers/users';
import {
  getUserParamsValidator,
  updateAvatarValidator,
  updateUserValidator,
} from '../validation/cerebrateValidators';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getMe);
usersRouter.get('/:id', getUserParamsValidator, getUserById);
usersRouter.patch('/me', updateUserValidator, updateUser);
usersRouter.patch('/me/avatar', updateAvatarValidator, updateAvatar);

export default usersRouter;
