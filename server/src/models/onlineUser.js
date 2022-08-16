import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OnlineUserSchema = new Schema({
  username: String,
  socketId: String,
  name: String
});

export default mongoose.model("onlineUser", OnlineUserSchema);