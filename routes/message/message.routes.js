const express = require("express");
const { saveNewMessageController } = require( "../../controllers/message/message.controller");
const { API } = require("../../util/constant");

const messageRouter = express.Router();

messageRouter.post(
  API.API_CONTEXT + "message/save-message",
  saveNewMessageController
);

module.exports = messageRouter;
