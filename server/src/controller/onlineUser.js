import models from "../models";

const { onlineUserModel } = models;

const saveOnlineUser = async ({ username, name, socketId }) => {
  //check if account exist already
  try {
    const userOnline = await onlineUserModel.findOne({ username });
    if (!userOnline) {
      const newUserOnline = new onlineUserModel({
        username,
        name,
        socketId,
      });
    }
    const data = await newUserOnline.save();
    return {
      username,
      socketId,
      name,
      id: data.id,
    };
  } catch (error) {
    console.log("error");
  }
};

const removeOnlineUser = async ({ username }) => {
  const [, onlineUsers] = await Promise.all([
    onlineUserModel.remove({ username }),
    (onlineUsers = await onlineUserModel.find()),
  ]);
  //return the rest users online
  return onlineUsers;
};

export default { saveOnlineUser, removeOnlineUser };
