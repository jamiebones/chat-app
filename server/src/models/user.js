import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  name: String,
  online: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("user", UserSchema);
