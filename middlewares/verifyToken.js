const jwt = require('jsonwebtoken')
// verify jwt token
const verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
    .status(401)
    .json({ message: "unauthorized access", error: true });
  }
  
  try {
    // split bearer token
    const token = authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: "unauthorized access", error: true });
  }
};

module.exports = verifyToken;
