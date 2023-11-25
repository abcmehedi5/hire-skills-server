const { MESSAGE } = require("../../util/constant");
const {
  userServices,
  getUsers,
  getSingleUser,
  freeEnrollRegisterService
} = require("../../services/User/userService");
const Joi = require("joi");

const userSchema = Joi.object({
  displayName: Joi.string().required(),
  image: Joi.string().optional().allow(""),
  phoneNumber: Joi.string().min(1).max(128).required(),
  date: Joi.string().min(1).max(128).required(),
  email: Joi.string().email().min(5).max(50).required(),
  role: Joi.string().min(1).max(128).required(),
  status: Joi.string().min(1).max(128).required(),
  bio: Joi.string().optional().allow(""),
  birthday: Joi.date().optional().allow(""),
  gender: Joi.string().allow(""),
});

const freeEnrollSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().min(11).max(11).required(),
  date: Joi.string().min(1).max(128).required(),
  email: Joi.string().email().min(5).max(50).required(),
  gender: Joi.string().required(),
  department: Joi.string().required(),
  address: Joi.string().required(),
});

const createUser = async (req, res) => {
  try {
    const result = await userServices(req.pool, req.body);
    if (result) {
      return res.status(MESSAGE.SUCCESS_GET.STATUS_CODE).json({
        message: "User registered successfully",
        status: MESSAGE.SUCCESS_GET.STATUS_CODE,
      });
    }
    return res.status(MESSAGE.NOT_FOUND.STATUS_CODE).json({
      message: "User registration failed",
      status: MESSAGE.NOT_FOUND.STATUS_CODE,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(MESSAGE.SERVER_ERROR.STATUS_CODE)
      .send(MESSAGE.SERVER_ERROR.CONTENT);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers(req.pool);
    return res.status(MESSAGE.SUCCESS_GET.STATUS_CODE).send(users);
  } catch (error) {
    console.error(error);
    return res.status(MESSAGE.SERVER_ERROR.STATUS_CODE).json({
      message: "Users not found",
      status: MESSAGE.SERVER_ERROR.STATUS_CODE,
    });
  }
};

const getSingleUserByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await getSingleUser(req.pool, email);
    if (user) {
      return res.status(MESSAGE.SUCCESS_GET.STATUS_CODE).json({
        message: "User retrieved successfully",
        status: MESSAGE.SUCCESS_GET.STATUS_CODE,
        data: user,
      });
    } else {
      return res.status(MESSAGE.NOT_FOUND.STATUS_CODE).json({
        message: "User not found",
        status: MESSAGE.NOT_FOUND.STATUS_CODE,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(MESSAGE.SERVER_ERROR.STATUS_CODE)
      .send(MESSAGE.SERVER_ERROR.CONTENT);
  }
};

// free enroll register area------------------------

const freeEnrollRegister = async (req, res) => {
  try {
    const result = await freeEnrollRegisterService (req.pool, req.body);
    if (result) {
      return res.status(MESSAGE.SUCCESS_GET.STATUS_CODE).json({
        message: "enroll successfully",
        status: MESSAGE.SUCCESS_GET.STATUS_CODE,
      });
    }
    return res.status(500).json({
      message: "enroll failed",
      status: MESSAGE.NOT_FOUND.STATUS_CODE,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(MESSAGE.SERVER_ERROR.STATUS_CODE)
      .send(MESSAGE.SERVER_ERROR.CONTENT);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getSingleUserByEmail,
  userSchema,
  freeEnrollRegister,
  freeEnrollSchema,
};
