const {
  registerService,
  loginService,
  forgotPasswordService,
  setForgotPasswordService,
  refreshAccessTokenService,
  getSingleUserService,
  getAllUserService,
  getTokenUserService,
} = require("../../services/auth/auth.service");
const { MESSAGE } = require("../../util/constant");

// create new user
const registerController = async (req, res) => {
  try {
    const result = await registerService(req.body);
    if (result?.register) {
      return res.status(200).json({
        message: "Register Successfull",
        status: MESSAGE.SUCCESS_GET.STATUS_CODE,
      });
    } else if (!result?.register) {
      return res.status(400).json({
        message: result.message,
        error: result.error,
        data: result?.register,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message:
        error?.message || "There was a server side error please try again",
    });
  }
};

// login user
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginService(email, password);
    if (result?.login) {
      return res
        .status(200)
        .cookie("accessToken", result.accessToken, {
          httpOnly: true,
          sameSite: "none",
          maxAge: 5 * 60 * 1000, // 5 min
        })
        .cookie("refreshToken", result.refreshToken, {
          httpOnly: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .json({
          message: result.message,
          status: MESSAGE.SUCCESS_GET.STATUS_CODE,
          refreshToken: result.refreshToken,
          accessToken: result.accessToken,
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

// refresh access token controller
const refreshAccessTokenController = async (req, res) => {
  try {
    const response = await refreshAccessTokenService(req, res);
    if (response) {
      return res.status(200).cookie("accessToken", response.accessToken).json({
        message: response.message,
        status: MESSAGE.SUCCESS_GET.STATUS_CODE,
        refreshToken: response.refreshToken,
        accessToken: response.accessToken,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: error?.message || "access token not created" });
  }
};

// forgot password or reset
const forgotPasswordController = async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return { message: "Invalid email address" };
    }
    const result = await forgotPasswordService(email);
    return res.status(200).json({
      message: result?.message,
      url: result?.url,
    });
  } catch (error) {
    return res.status(500).send({
      message:
        error?.message || "There was a server side error please try again",
    });
  }
};

// set password for forgot password
const setForgotPasswordController = async (req, res) => {
  try {
    const { email, token } = req.params;
    const password = req.body.password;
    const result = await setForgotPasswordService(password, email, token);
    if (!result.error) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(500).json({ message: result.message });
    }
  } catch (error) {
    return res.status(500).send({
      message:
        error?.message || "There was a server side error please try again",
    });
  }
};
// single user controller
const getSingleUserController = async (req, res) => {
  try {
    const { email } = req.params;
    const result = await getSingleUserService(email);
    if (result) {
      return res
        .status(200)
        .json({ response: result, message: result.message });
    } else {
      return res.status(500).json({ message: result.message });
    }
  } catch (error) {
    return res.status(500).send({
      message:
        error?.message || "There was a server side error please try again",
    });
  }
};

// get all users
const getAllUsersController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortField = req?.query?.sortField || "createdAt";
    const search = req?.query?.search;
    const sortOrder = req?.query?.sortOrder || "desc";

    // filters
    const filters = {};
    // if (status) {
    //   filters.status = status;
    // }
    const result = await getAllUserService(
      limit,
      skip,
      search,
      filters,
      sortField,
      sortOrder
    );
    if (result.isSuccess) {
      res.status(200).json({
        message: result?.message,
        status: 200,
        isSuccess: result?.isSuccess,
        totalItems: result?.totalItems,
        totalCurrentItems: result?.data?.length,
        data: result?.data,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      isSuccess: false,
    });
  }
};

// single user controller
const getTokenUserController = async (req, res) => {
  try {
    const { token } = req.params;
    const result = await getTokenUserService(token);
    if (result) {
      return res
        .status(200)
        .json({ response: result, message: result.message });
    } else {
      return res.status(500).json({ message: result.message });
    }
  } catch (error) {
    return res.status(500).send({
      message:
        error?.message || "There was a server side error please try again",
    });
  }
};
module.exports = {
  registerController,
  loginController,
  refreshAccessTokenController,
  forgotPasswordController,
  setForgotPasswordController,
  getSingleUserController,
  getAllUsersController,
  getTokenUserController,
};
