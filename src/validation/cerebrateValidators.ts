import { celebrate, Joi } from 'celebrate';
import { urlPattern } from '../constants/constants';

const idSchema = () => Joi.string().required().hex().length(24);
const emailSchema = () => Joi.string().required().email();
const passwordSchema = () => Joi.string().required().min(6);
const nameUserSchema = () => Joi.string().min(2).max(30);
const aboutUserSchema = () => Joi.string().min(2).max(200);
const urlSchema = () => Joi.string().pattern(urlPattern);

export const logginValidator = celebrate({
  body: Joi.object().keys({
    email: emailSchema(),
    password: passwordSchema(),
  }),
});

export const getUserParamsValidator = celebrate({
  params: Joi.object().keys({
    id: idSchema(),
  }),
});

export const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: nameUserSchema(),
    about: aboutUserSchema(),
    avatar: Joi.string(),
    email: emailSchema(),
    password: passwordSchema(),
  }),
});

export const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: nameUserSchema().required(),
    about: aboutUserSchema().required(),
  }),
});

export const updateAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
});

export const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: nameUserSchema().required(),
    link: urlSchema().required(),
  }),
});

export const cardParamsValidator = celebrate({
  params: Joi.object().keys({
    cardId: idSchema(),
  }),
});
