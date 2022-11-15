import { Schema, model } from 'mongoose';
import { ICard } from '../../types/card';

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
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  createdAt: Date,
});

export default model<ICard>('card', cardSchema);
