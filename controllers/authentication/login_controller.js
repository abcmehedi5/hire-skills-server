const Joi = require("joi");
const { MESSAGE } = require("../../util/constant");
const loginServices = require("../../services/authentication_services/login_services");

const schema = Joi.object({
  email: Joi.string().email().min(1).max(128).required(),
  password: Joi.string().min(1).max(20).required(),
});

const controller = async (req, res) => {
  try {
    const data = await loginServices(req, req.body);
    if (data) {
      return res.status(MESSAGE.SUCCESS_GET.STATUS_CODE).json({
        message: MESSAGE.SUCCESS_GET.CONTENT,
        status: MESSAGE.SUCCESS_GET.STATUS_CODE,
        data,
      });
    }
    return res
      .status(MESSAGE.SUCCESS_GET.STATUS_CODE)
      .json({ message: "Authentication failed" });
  } catch (error) {
    console.log(error);
    return res
      .status(MESSAGE.SERVER_ERROR.STATUS_CODE)
      .send(MESSAGE.SERVER_ERROR.CONTENT);
  }
};

module.exports = { controller, schema };
