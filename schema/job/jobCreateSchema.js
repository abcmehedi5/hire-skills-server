const Joi = require("joi");
const jobSchema = Joi.object({
  title: Joi.string().required(),
  company: Joi.string().required(),
  experience: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
  skills: Joi.array().required(),
  requirements: Joi.array().required(),
  salary: Joi.string().required(),
  deadline: Joi.date().required(),
  jobType: Joi.string().required(),
  vacancy: Joi.number().required(),
  employmentType: Joi.string().required(),
  createdBy: Joi.object().required(),
  contacts: Joi.object().required(),
  tags: Joi.array().required(),
  postDate: Joi.date().required(),
});

module.exports = jobSchema;
