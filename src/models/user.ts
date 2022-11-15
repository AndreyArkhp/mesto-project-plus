import { Schema, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

export interface IUser {
  name?: string;
  about?: string;
  avatar?: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
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
  },
});

export default model<IUser>('user', userSchema);

