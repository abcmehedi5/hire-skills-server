const express = require("express");
const { API } = require("../../util/constant");
const {controller: blogController, schema:blogSchema, getBlogById, getBlogByCategory} = require('../../controllers/Blog/blog_controllers');

const validator = require("../../middlewares/validator_middleware");

const blogRouter = express.Router();

// Post blogs
blogRouter.post(API.API_CONTEXT + "blog/create", validator(blogSchema), blogController);
// Get blogs by category
blogRouter.get(API.API_CONTEXT + "blog/get-blogs/:id", getBlogById);
// Get blogs by category using query parameter
blogRouter.get(API.API_CONTEXT + "blog", getBlogByCategory);

module.exports = blogRouter;
