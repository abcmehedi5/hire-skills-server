const {
  userRegisterQuery,
  passwordUpdateQuery,
} = require("../../sql_queries/authSqlQuery");
const { getsingleDataQuery } = require("../../sql_queries/sqlQuery");
const { getData, executeQuery } = require("../../util/dao");
const bcrypt = require("bcrypt");
const {
  genarateToken,
  verifyJWT,
  generateAccessAndRefereshTokens,
} = require("../../util/jwtToken");
const sendMail = require("../../util/mailer");
const { AuthModel } = require("../../models/auth-model/auth.model");

// create new user service
const registerService = async (body) => {
  const { email, password: pass, fullName, username } = body;
  // Hash password
  try {
    const password = await bcrypt.hash(pass, 10);

    // Check if email or username already exists
    const emailExists = await AuthModel.findOne({ email });
    if (emailExists) {
      return { message: "Already registered with this email", register: false };
    }

    const usernameExists = await AuthModel.findOne({ username });
    if (usernameExists) {
      return { message: "Username already used", register: false };
    }

    // Create and save new user
    const newUser = new AuthModel({ email, password, fullName, username });
    const savedUser = await newUser.save();

    return {
      message: "Registration successful",
      error: false,
      register: savedUser,
    };
  } catch (error) {
    return {
      message: "An error occurred during registration",
      error: true,
      register: null,
    };
  }
};

// login user
const loginService = async (email, password) => {
  try {
    // Find the user by email
    const user = await AuthModel.findOne({ email });
    if (!user) {
      return { message: "Account not found", login: false };
    }

    const storedHashedPassword = user.password;
    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      storedHashedPassword
    );

    if (!isPasswordCorrect) {
      return { message: "Invalid Password", login: false };
    }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      user.email,
      AuthModel
    );
    console.log(accessToken);

    return {
      message: "Login Successful",
      login: true,
      refreshToken: refreshToken,
      accessToken: accessToken,
    };
  } catch (error) {
    return {
      message: "An error occurred during login",
      error: true,
      login: false,
    };
  }
};

// refresh access token
const refreshAccessTokenService = async (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken;
  console.log({ oldRefreshToken, cookie });
  // vrify old refresh token
  const { fullName, email } = await verifyJWT(
    oldRefreshToken,
    process.env.JWT_REFRESH_KEY
  ); // return true || false
  if (!email) {
    throw createError(401, "invalid refresh token. please logain again");
  }

  // generate new access token
  const newAccessToken = await genarateToken({ fullName, email }, "5m");
  return {
    accessToken: newAccessToken,
    message: "new access token is generated",
  };
};

// forgot || reset password
const forgotPasswordService = async (email) => {
  try {
    const user = await AuthModel.findOne({ email });

    if (!user) {
      return { message: "User not found with email" };
    }

    // Generate JSON web token
    const token = await genarateToken(
      {
        fullName: user.fullName,
        email: user.email,
      },
      "10m"
    );

    const url = `${process.env.CLIENT_URL}/reset-password/${user.email}/${token}`;

    // Send password reset mail
    await sendMail(user.email, "Password reset", url);

    return {
      message: "Password reset email has been sent to your email.",
      url,
    };
  } catch (error) {
    return {
      message:
        error?.message || "An error occurred while sending the reset email",
      error: true,
    };
  }
};

//set a new password
const setForgotPasswordService = async (password, email, token) => {
  try {
    const user = await AuthModel.findOne({ email });

    if (!user) {
      return { message: "Invalid Reset Password Link", error: true };
    }

    const isUserToken = await verifyJWT(token, process.env.JWT_SECRET_KEY);

    if (!isUserToken) {
      return { message: "Invalid Reset Password Link", error: true };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    user.password = hashPassword;
    await user.save();

    return { message: "Password has been changed", error: false };
  } catch (error) {
    return {
      message:
        error?.message || "An error occurred while resetting the password",
      error: true,
    };
  }
};

// is loggedin user
const getSingleUserService = async (email) => {
  try {
    const response = AuthModel.findOne({ email });
    return response;
  } catch (error) {
    return {
      message:
        error?.message || "An error occurred while resetting the password",
      error: true,
    };
  }
};

// get all users
const getAllUserService = async (
  limit,
  skip,
  search,
  filters,
  sortField = "createdAt",
  sortOrder = "desc"
) => {
  try {
    let query = {};
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }
    // apply filters if they are provided
    if (filters) {
      if (filters.experienceLevel) {
        query.experienceLevel = filters.experienceLevel;
      }
      if (filters.employmentType) {
        query.employmentType = filters.employmentType;
      }
      if (filters.jobType) {
        query.jobType = filters.jobType;
      }
    }

    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder?.toLowerCase() === "asc" ? 1 : -1;
    const totalItems = await AuthModel.countDocuments(filters);
    const res = await AuthModel.aggregate([
      { $match: query },
      { $sort: sort },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          // totalCount: [{ $count: "value" }],
        },
      },
    ]);
    if (res) {
      return {
        data: res[0].data,
        totalItems,
        isSuccess: true,
        message: "Users retrieved successfully",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

const getTokenUserService = async (token) => {
  const decodedToken = await verifyJWT(token);
  try {
    const response = AuthModel.findOne({ email: decodedToken.email });
    return response;
  } catch (error) {
    return {
      message:
        error?.message || "An error occurred while resetting the password",
      error: true,
    };
  }
};

module.exports = {
  registerService,
  loginService,
  refreshAccessTokenService,
  forgotPasswordService,
  setForgotPasswordService,
  getSingleUserService,
  getAllUserService,
  getTokenUserService,
};
