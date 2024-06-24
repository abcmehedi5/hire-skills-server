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
    const isPasswordCorrect = await bcrypt.compare(password, storedHashedPassword);
    
    if (!isPasswordCorrect) {
      return { message: "Invalid Password", login: false };
    }
    
    // Generate access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user.email, AuthModel);
    console.log(accessToken)

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
const forgotPasswordService = async (req, email) => {
  const userQuery = getsingleDataQuery("users", "email");
  const value = [email];
  const response = await getData(req.pool, userQuery, value);
  const user = response[0];
  if (!user) {
    return { message: "user not found with email" };
  }

  // genarate json web token
  const token = await genarateToken(
    {
      fullName: user.fullName,
      email: user?.email,
    },
    "10m"
  );
  const url = `${process.env.CLIENT_URL}/reset-password/${user?.email}/${token}`;
  // send password rest mail
  await sendMail(user.email, "Password reset", url);
  return {
    message: "Password reset email has been sent on your email.",
    url,
  };
};

// set forgot new password
const setForgotPasswordService = async (req, password, email, token) => {
  const userQuery = getsingleDataQuery("users", "email");
  const value = [email];
  const response = await getData(req.pool, userQuery, value);
  const user = response[0];
  const isUserToken = await verifyJWT(token);
  console.log(isUserToken);
  if (user && isUserToken) {
    const hashPassword = await bcrypt.hash(password, 10);
    // Update the user's password in the database
    const updatePasswordQuery = passwordUpdateQuery("users");
    const updatePasswordValues = [hashPassword, email];
    await executeQuery(req.pool, updatePasswordQuery, updatePasswordValues);
    return { message: "Password has been changed", error: false };
  } else {
    return { message: "Invalid Reset Passowrd Link", error: true };
  }
};

// is loggedin user
const getSingleUser = async (req, email) => {
  const userQuery = getsingleDataQuery("users", "email");
  const value = [email];
  const response = await getData(req.pool, userQuery, value);
  return response;
};

module.exports = {
  registerService,
  loginService,
  refreshAccessTokenService,
  forgotPasswordService,
  setForgotPasswordService,
  getSingleUser,
};
