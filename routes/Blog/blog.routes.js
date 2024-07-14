const express = require("express");
const { API } = require("../../util/constant");
const {
  controller: blogController,
  schema: blogSchema,
  getBlogById,
  getBlogByCategory,
  getMyblogByEmail,
  deleteBlogById,
  createBlogController,
} = require("../../controllers/Blog/blog_controllers");

const validator = require("../../middlewares/validator_middleware");

const blogRouter = express.Router();

// Post blogs
blogRouter.post(API.API_CONTEXT + "blog/create", createBlogController);
// Get blogs by category
blogRouter.get(API.API_CONTEXT + "blog/get-blogs/:id", getBlogById);
// Get blogs by category using query parameter
blogRouter.get(API.API_CONTEXT + "blog/get-blogs", getBlogByCategory);
// get blogs by user email
blogRouter.get(API.API_CONTEXT + "blog/Myblog", getMyblogByEmail);
// delete blog by  blog id
blogRouter.delete(API.API_CONTEXT + "blog/delete-blog/:id", deleteBlogById);

module.exports = blogRouter;
