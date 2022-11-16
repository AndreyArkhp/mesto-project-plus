import { Schema, model } from 'mongoose';
import { ICard } from '../types/card';

const cardSchema = new Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  createdAt: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});

export default model<ICard>('card', cardSchema);
