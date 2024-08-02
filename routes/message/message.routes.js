const express = require("express");
const {
  saveNewMessageController,
  getMessagesController,
} = require("../../controllers/message/message.controller");
const { API } = require("../../util/constant");

const messageRouter = express.Router();

messageRouter.post(
  API.API_CONTEXT + "message/save-message",
  saveNewMessageController
);
messageRouter.get(
  API.API_CONTEXT + "message/get-messages",
  getMessagesController
);

module.exports = messageRouter;
