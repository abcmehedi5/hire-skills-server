const express = require("express");
const { API } = require("../../util/constant");
const {controller: blogController, schema:blogSchema, getBlogById} = require('../../controllers/Blog/blog_controllers');

const validator = require("../../middlewares/validator_middleware");

const blogRouter = express.Router();

blogRouter.post(API.API_CONTEXT + API.CREATE_BLOG, validator(blogSchema), blogController);
blogRouter.get(API.API_CONTEXT + "get-blogs/:id", getBlogById);



module.exports = blogRouter;
