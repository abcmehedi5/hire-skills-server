const express = require("express");
const appRouter = express.Router();
const authenticationRouter = require("./authentication_routes");
const blogRouter = require("./Blog/blog_routes");

appRouter.use(authenticationRouter);
appRouter.use(blogRouter);

module.exports = appRouter;
