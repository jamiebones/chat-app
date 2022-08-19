import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    message: String,
    postedBy: String,
    to: String,
    messageRead: Boolean,
  },

  {
    timestamps: true,
  }
);

//object => {from, message, timestamp }

export default mongoose.model("chat", ChatSchema);
