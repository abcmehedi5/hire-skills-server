const express = require("express");
const { API } = require("../../util/constant");
const validator = require("../../middlewares/validator_middleware");
const {
  registerController,
  loginController,
  forgotPasswordController,
  setForgotPasswordController,
  refreshAccessTokenController,
  getSingleUserController,
  getAllUsersController,
} = require("../../controllers/auth/auth.controller");
const registerSchema = require("../../schema/auth/registerSchema");
const authRouter = express.Router();
authRouter.post(
  API.API_CONTEXT + "auth/register",
  validator(registerSchema),
  registerController
);
authRouter.post(API.API_CONTEXT + "auth/login", loginController);
authRouter.post(
  API.API_CONTEXT + "auth/refresh-token",
  refreshAccessTokenController
);
authRouter.post(
  API.API_CONTEXT + "auth/forgot-password",
  forgotPasswordController
);
authRouter.patch(
  API.API_CONTEXT + "auth/reset-password/:email/:token",
  setForgotPasswordController
);
authRouter.get(
  API.API_CONTEXT + "auth/get-single-user/:email",
  getSingleUserController
);
authRouter.get(
  API.API_CONTEXT + "auth/get-users",
  getAllUsersController
);

module.exports = authRouter;
