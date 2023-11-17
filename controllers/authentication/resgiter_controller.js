const Joi = require("joi");
const { MESSAGE } = require("../../util/constant");
const loginServices = require("../../services/authentication_services/login_services");
const registerServices = require("../../services/authentication_services/register_services")

const schema = Joi.object({
    username: Joi.string().min(1).max(128).required(),
    password: Joi.string().min(1).max(20).required(),
    first_name: Joi.string().min(1).max(128).required(),
    last_name: Joi.string().min(1).max(128).required(),
    email: Joi.string().min(1).max(128).required(),
    phone_no: Joi.string().min(10).max(20).optional()
});

const controller = async (req, res) => {
    try {
        const data = await registerServices(req,req.body);
        if (data !== null) {
            return res.status(MESSAGE.SUCCESS_CREATED.STATUS_CODE).json({
                message: MESSAGE.SUCCESS_CREATED.CONTENT,
                status: MESSAGE.SUCCESS_CREATED.STATUS_CODE,
                data,
            });
        }
        return res
            .status(MESSAGE.BAD_REQUEST.STATUS_CODE)
            .json({ message: MESSAGE.BAD_REQUEST.CONTENT });
    } catch (error) {
        console.log(error);
        return res
            .status(MESSAGE.SERVER_ERROR.STATUS_CODE)
            .send(MESSAGE.SERVER_ERROR.CONTENT);
    }
};

module.exports = { controller, schema };
