const {
  registerService,
  loginService,
  forgotPasswordService,
  setForgotPasswordService,
} = require("../../services/auth/auth.service");
const { MESSAGE } = require("../../util/constant");

// create new user
const registerController = async (req, res) => {
  try {
    const result = await registerService(req, req.body);
    if (result?.register) {
      return res.status(200).json({
        message: "Register Successfull",
        status: MESSAGE.SUCCESS_GET.STATUS_CODE,
      });
    } else if (!result?.register) {
      return res.status(400).json({
        message: result.message,
        status: MESSAGE.BAD_REQUEST,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "There was a server side error please try again" });
  }
};

// login user
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginService(req, email, password);
    if (result?.login) {
      return res.status(200).json({
        message: result.message,
        status: MESSAGE.SUCCESS_GET.STATUS_CODE,
        token: result.token,
      });
    } else if (!result?.login) {
      return res.status(400).json({
        message: result.message,
        status: MESSAGE.BAD_REQUEST,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "There was a server side error please try again" });
  }
};

// forgot password or reset
const forgotPasswordController = async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return { message: "Invalid email address" };
    }
    const result = await forgotPasswordService(req, email);
    return res.status(200).json({
      message: result?.message,
      url:result?.url
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "There was a server side error please try again" });
  }
};

// set password for forgot password
const setForgotPasswordController = async (req, res) => {
  try {
    const { email, token } = req.params;
    const password = req.body.password;
    const result = await setForgotPasswordService(req, password, email, token);
    if (!result.error) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(500).json({ message: result.message });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "There was a server side error please try again" });
  }
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  setForgotPasswordController,
};
