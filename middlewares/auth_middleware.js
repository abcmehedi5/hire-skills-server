const jwt = require("jsonwebtoken");
const { MESSAGE } = require("../util/constant");

const authenticationMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;
    if (token) {
      if (jwt.verify(token, jwtSecret)) {
        const userInfo = jwt.decode(token, jwtSecret);
        req.userInfo = userInfo;
        return next();
      }
      return res
        .status(MESSAGE.UNAUTHORIZED.STATUS_CODE)
        .json({
          message: MESSAGE.UNAUTHORIZED.CONTENT,
          status_code: MESSAGE.UNAUTHORIZED.STATUS_CODE,
        });
    }
    return res
      .status(MESSAGE.UNAUTHORIZED.STATUS_CODE)
      .json({
        message: MESSAGE.UNAUTHORIZED.CONTENT,
        status_code: MESSAGE.UNAUTHORIZED.STATUS_CODE,
      });
  } catch (error) {
    return res
      .status(MESSAGE.UNAUTHORIZED.STATUS_CODE)
      .json({
        message: MESSAGE.UNAUTHORIZED.CONTENT,
        status_code: MESSAGE.UNAUTHORIZED.STATUS_CODE,
      });
  }
};

module.exports = authenticationMiddleware;
