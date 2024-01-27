const express = require("express");
const { API } = require("../../util/constant");
const validator = require("../../middlewares/validator_middleware");
const {
  registerController,
} = require("../../controllers/auth/auth.controller");
const registerSchema = require("../../schema/auth/registerSchema");
const authRouter = express.Router();
authRouter.post(
  API.API_CONTEXT + "auth/register",
  validator(registerSchema),
  registerController
);

module.exports = authRouter;
