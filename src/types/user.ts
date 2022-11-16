import { Model, Document } from 'mongoose';

export interface IUser {
  name?: string;
  about?: string;
  avatar?: string;
  email: string;
  password: string;
}

export interface IUserModel extends Model<IUser> {
  findUserByCredentials: (
    email: string,
    password: string
  ) => Promise<Document<unknown, never, IUser>>;
}
