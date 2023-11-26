const express = require("express");
const { API } = require("../../util/constant");
const validator = require("../../middlewares/validator_middleware");
const {
  createUser,
  getAllUsers,
  getSingleUserByEmail,
  userSchema,
  freeEnrollSchema,
  freeEnrollRegister,
  getCheckRoleByEmail,
} = require("../../controllers/user/userController");

const userRouter = express.Router();

// Create a user
userRouter.post(
  API.API_CONTEXT + "user/create",
  validator(userSchema),
  createUser
);

// Get all users
userRouter.get(API.API_CONTEXT + "user", getAllUsers);

// Get a single user by email
userRouter.get(API.API_CONTEXT + "user/singleUser", getSingleUserByEmail);

// free enroll register
userRouter.post(
  API.API_CONTEXT + "enroll/register",
  validator(freeEnrollSchema),
  freeEnrollRegister
);

// check role by email in users table
userRouter.get(API.API_CONTEXT + "user/role", getCheckRoleByEmail);

module.exports = userRouter;
