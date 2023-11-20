const express = require("express");
const appRouter = express.Router();
const blogRouter = require("./Blog/blog_routes");

appRouter.use(blogRouter);

module.exports = appRouter;
