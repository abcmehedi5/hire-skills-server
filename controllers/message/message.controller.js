const { saveNewMessage } = require("../../services/message/message.service");

const saveNewMessageController = async (req, res) => {
  const payload = req.body;
  try {
    const data = await saveNewMessage(payload);
    if (data.isSuccess) {
      return res.status(200).json({
        message: data.message,
        isSuccess: data.isSuccess,
        data: data.data,
      });
    } else {
      return res.status(200).json({
        message: data.message,
        isSuccess: data.isSuccess,
        data: data.data,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

module.exports = { saveNewMessageController };
