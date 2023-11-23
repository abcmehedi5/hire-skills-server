const express = require("express");
const { API } = require("../../util/constant");
const validator = require("../../middlewares/validator_middleware");
const { createUser, getAllUsers, getSingleUserByEmail, userSchema } = require("../../controllers/user/userController");

const userRouter = express.Router();

// Create a user
userRouter.post(
  API.API_CONTEXT + "user/create",
  validator(userSchema), 
  createUser
);

// Get all users
userRouter.get(
  API.API_CONTEXT + "user",
  getAllUsers
);

// Get a single user by email
userRouter.get(
  API.API_CONTEXT + "user/singleUser",
  getSingleUserByEmail
);

module.exports = userRouter;
