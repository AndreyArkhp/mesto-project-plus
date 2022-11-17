import { IUser } from './user';

export interface ICard {
  name: string;
  link: string;
  owner: IUser;
  likes: string[];
  createdAt: Date;
}
