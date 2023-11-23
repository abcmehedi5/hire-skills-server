// // import Joi from "joi";

// const commentSchema = Joi.object({
//   blogId: Joi.string().min(1).max(128).required(),
//   text: Joi.string().min(1).max(1000).required(),
//   name: Joi.string().min(1).max(128).required(),
//   date: Joi.string().min(1).max(128).required(),
//   email: Joi.string().email().min(5).max(50).required(),
//   replies: Joi.array(),
// });

// const replySchema = Joi.object({
//   text: Joi.string().min(1).max(1000).required(),
//   name: Joi.string().min(1).max(128).required(),
//   date: Joi.string().min(1).max(128).required(),
//   email: Joi.string().email().min(5).max(50).required(),
//   image: Joi.string().min(1).max(128).required(),
// });

// module.exports = {
//   commentSchema,
//   replySchema,
// };
