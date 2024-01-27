const express = require("express");
const appRouter = express.Router();
const blogRouter = require("./Blog/blog_routes");
const commentRouter = require("./Blog/comment_router");
const userRouter = require("./user/user_routes");
const jobRouter = require("./job/job.routes");
const authRouter = require("./auth/auth.routes");

appRouter.use(blogRouter);
appRouter.use(commentRouter);
appRouter.use(userRouter);
appRouter.use(jobRouter);
appRouter.use(authRouter);

module.exports = appRouter;
