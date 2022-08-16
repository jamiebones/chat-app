import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  user: String,
  messages: {
    type: Array,
  }
});

//object => {from, message, timestamp }

export default mongoose.model("chat", ChatSchema);