const Joi = require('joi');
const { answers } = require('../constants/answers');

const emailValidation = async (ctx, next) => {
  const { email } = ctx.request.body;
  const schema = Joi.object({ email: Joi.string().email().required() });
  if (!schema.validate({ email }).error) {
    await next();
  } else {
    throw new Error(answers.error.impossibleEmail);
  }
};

const passwordValidation = async (ctx, next) => {
  const { password } = ctx.request.body;
  const schema = Joi.object({ password: Joi.string().min(6).required() });
  if (!schema.validate({ password }).error) {
    await next();
  } else {
    throw new Error(answers.error.impossiblePassword);
  }
};

module.exports = {
  emailValidation,
  passwordValidation,
};
