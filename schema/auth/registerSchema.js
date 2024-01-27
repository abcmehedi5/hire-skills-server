const Joi = require("joi");
const registerSchema = Joi.object({
  fullName: Joi.string().required().max(50),
  email: Joi.string().email().required().max(50),
  password: Joi.string().required().min(6).max(50),
  username: Joi.string().min(4).required().max(50),
});

module.exports = registerSchema;
