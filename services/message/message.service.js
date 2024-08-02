const { MessageModel } = require("../../models/message/message.model");

// create comment by blog
const saveNewMessage = async (payload) => {
  // save to the database
  const message = MessageModel(payload);
  const response = await message.save();

  if (response) {
    return {
      isSuccess: true,
      data: response,
      message: "Massage save successfull",
    };
  } else {
    return {
      isSuccess: false,
      data: null,
      message: "Somthing wrong please try again!",
    };
  }
};

module.exports = {
  saveNewMessage,
};
