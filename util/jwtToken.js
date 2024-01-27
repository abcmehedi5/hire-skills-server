const jwt = require("jsonwebtoken");
// genarate jwt toekn
const genarateToken = async (payload, expired) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expired,
  });
  return token;
};
module.exports = { genarateToken };
