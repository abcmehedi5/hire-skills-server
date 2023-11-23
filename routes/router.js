const express = require("express");
const appRouter = express.Router();
const blogRouter = require("./Blog/blog_routes");
const commentRouter = require("./Blog/comment_router");

appRouter.use(blogRouter);
appRouter.use(commentRouter);

module.exports = appRouter;
