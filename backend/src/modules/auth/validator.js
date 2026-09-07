const Joi = require('joi');

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().allow('').optional(),
    phone: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().required().min(6).max(32).trim(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().trim().email(),
    password: Joi.string().required().trim().min(6).max(32),
  }),
};

module.exports = {
  register,
  login,
};
