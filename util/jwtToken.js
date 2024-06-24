const jwt = require("jsonwebtoken");
const { getsingleDataQuery } = require("../sql_queries/sqlQuery");
const { getData } = require("./dao");
const { AuthModel } = require("../models/auth-model/auth.model");
// genarate jwt toekn
const genarateToken = async (payload, expired, key) => {
  const token = await jwt.sign(payload, key || process.env.JWT_SECRET, {
    expiresIn: expired,
  });
  return token;
};

const verifyJWT = async (token, key) => {
  try {
    if (token) {
      const decoded = await jwt.verify(token, key || process.env.JWT_SECRET);
      if (decoded.email) {
        return decoded;
      } else {
        return false;
      }
    }
  } catch (error) {
    return false;
  }
};

// generate access token and refresh token
// const generateAccessAndRefereshTokens = async (pool, email) => {
//   try {
//     // const user = await User.findById(userId)
//     // find user by user id
//     const query = getsingleDataQuery("users", "email");
//     const value = [email];
//     const result = await getData(pool, query, value);
//     const user = result[0];
//     const refreshToken = await genarateToken(
//       {
//         fullName: user.fullName,
//         email: user?.email,
//       },
//       "10d",
//       process.env.JWT_REFRESH_KEY
//     );

//     const accessToken = await genarateToken(
//       {
//         fullName: user.fullName,
//         email: user?.email,
//       },
//       "5m"
//     );

//     user.refreshToken = refreshToken;
//     // await user.save({ validateBeforeSave: false });

//     return { accessToken, refreshToken };
//   } catch (error) {
//     throw new error(
//       500,
//       "Something went wrong while generating referesh and access token"
//     );
//   }
// };

const generateAccessAndRefereshTokens = async (email, model) => {
  try {
    // Find user by email
    const user = await model.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const refreshToken = await genarateToken(
      { fullName: user.fullName, email: user.email },
      "10d",
      process.env.JWT_REFRESH_KEY
    );

    const accessToken = await genarateToken(
      { fullName: user.fullName, email: user.email },
      "5m"
    );

    // Update user with the new refresh token
    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(
      "Something went wrong while generating refresh and access tokens"
    );
  }
};

// generate refresh token

module.exports = { genarateToken, verifyJWT, generateAccessAndRefereshTokens };
