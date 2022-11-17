import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';
import { IUser, IUserModel } from '../types/user';
import UnauthorizedError from '../errors/unauthorizedError';
import { addPassword, notUrl, unauthorized } from '../constants/constants';
import { isAvatarLink } from '../validation/schemaValidators';

const userSchema = new Schema<IUser, IUserModel>({
  name: {
    type: String,
    minLenght: 2,
    maxLingth: 30,
    required: false,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLenght: 2,
    maxLength: 200,
    required: false,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator: isAvatarLink,
      message: notUrl,
    },
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email: string) {
        return isEmail(email);
      },
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.static(
  'findUserByCredentials',
  function findUserByCredentials(email: string, password: string) {
    return this.findOne({ email })
      .select(addPassword)
      .then((user) => {
        if (!user) {
          return Promise.reject(new UnauthorizedError(unauthorized));
        }
        return bcrypt.compare(password, user.password).then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(unauthorized));
          }
          return user;
        });
      });
  },
);

export default model<IUser, IUserModel>('user', userSchema);
