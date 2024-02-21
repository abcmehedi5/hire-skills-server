const express = require("express");
const { API } = require("../../util/constant");
const validator = require("../../middlewares/validator_middleware");
const {
  registerController, loginController, forgotPasswordController, setForgotPasswordController, refreshAccessTokenController,
} = require("../../controllers/auth/auth.controller");
const registerSchema = require("../../schema/auth/registerSchema");
const authRouter = express.Router();
authRouter.post(API.API_CONTEXT + "auth/register", validator(registerSchema), registerController);
authRouter.post(API.API_CONTEXT + "auth/login", loginController);
authRouter.post(API.API_CONTEXT + "auth/refresh-token", refreshAccessTokenController);
authRouter.post(API.API_CONTEXT + "auth/forgot-password", forgotPasswordController);
authRouter.put(API.API_CONTEXT + "auth/reset-password/:email/:token", setForgotPasswordController);

module.exports = authRouter;
