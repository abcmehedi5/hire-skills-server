const express = require("express");
const appRouter = express.Router();
const blogRouter = require("./Blog/blog_routes");
const commentRouter = require("./Blog/comment_router");
const userRouter = require("./user/user_routes");
const jobRouter = require("./job/job.routes");

appRouter.use(blogRouter);
appRouter.use(commentRouter);
appRouter.use(userRouter);
appRouter.use(jobRouter);

module.exports = appRouter;
