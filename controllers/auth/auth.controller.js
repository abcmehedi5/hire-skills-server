const { registerService } = require("../../services/auth/auth.service");
const { MESSAGE } = require("../../util/constant");
const registerController = async (req, res) => {
  try {
    const result = await registerService(req, req.body);
    if (result?.register) {
      return res.status(200).json({
        message: "Register Successfull",
        status: MESSAGE.SUCCESS_GET.STATUS_CODE,
        data: result,
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

module.exports = { registerController };
