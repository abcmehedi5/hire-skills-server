const { getIoInstance, getUserSocketId } = require("../util/socket");

const sendNotification = async (email, data) => {
  const io = getIoInstance();
  const userSocketId = getUserSocketId(email);
  console.log(userSocketId)
  if (userSocketId) {
    // send notification individual user using email
    io.to(userSocketId).emit("sendMessage", data);
    // // Save to Database
    // const newNotification = new NotificationModel(data);
    // await newNotification.save();
  }
};

const notification = { sendNotification };
module.exports = notification;
