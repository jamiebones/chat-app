import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  name: String,
});

export default mongoose.model("user", UserSchema);