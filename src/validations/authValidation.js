import Joi from 'joi';

export const signup = {
	body: Joi.object().keys({
		firstName: Joi.string().trim().min(2).max(66).required(),
		lastName: Joi.string().trim().min(2).max(66).required(),
		email: Joi.string().email().required(),
		password: Joi.string().trim().min(6).max(666).required()
	})
};

export const signin = {
	body: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	})
};

export const signout = {
	body: Joi.object().keys({
		refreshToken: Joi.string().required()
	})
};

export default {
	signup,
	signin,
	signout
};