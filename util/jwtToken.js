const jwt = require("jsonwebtoken");
// genarate jwt toekn
const genarateToken = async (payload, expired) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expired,
  });
  return token;
};

const verifyJWT = async (token) => {
  try {
    if (token) {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.email) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    return false
  }
};
module.exports = { genarateToken, verifyJWT };
