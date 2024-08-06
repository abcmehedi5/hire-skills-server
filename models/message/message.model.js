const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MessageModel = model("Conversation", messageSchema);

module.exports = { MessageModel };
