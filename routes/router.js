const express = require("express");
const appRouter = express.Router();
const blogRouter = require("./Blog/blog_routes");
const commentRouter = require("./Blog/comment_router");
const userRouter = require("./user/user_routes");

appRouter.use(blogRouter);
appRouter.use(commentRouter);
appRouter.use(userRouter);

module.exports = appRouter;
