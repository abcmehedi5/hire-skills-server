const { saveNewMessage, getMessagesService } = require("../../services/message/message.service");

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
// get all message
const getMessagesController = async (req, res) => {
  try {
    const email = req?.query?.email;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortField = req?.query?.sortField || "createdAt";
    const search = req?.query?.search;
    const sortOrder = req?.query?.sortOrder || "desc";
    // filters
    let filters = {};
    // check type of filters
    if (email) {
      filters.email = email;
    }
    // Call your service function to get blog data by email
    const getMessage = await getMessagesService(
      limit,
      skip,
      search,
      filters,
      sortField,
      sortOrder
    );
    return res.status(200).json({
      message: "Message retrieved successfully",
      totalItems: getMessage?.totalItems,
      isSuccess: getMessage?.isSuccess,
      data: getMessage.data,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports = { saveNewMessageController, getMessagesController };
