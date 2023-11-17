const express = require("express");
const appRouter = express.Router();
const authenticationRouter = require("./authentication_routes");

appRouter.use(authenticationRouter);

module.exports = appRouter;
