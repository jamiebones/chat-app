"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
const ChatSchema = new Schema({
  user: String,
  messages: {
    type: Array
  }
}); //object => {from, message, timestamp }

var _default = _mongoose.default.model("chat", ChatSchema);

exports.default = _default;