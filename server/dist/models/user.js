"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
const UserSchema = new Schema({
  username: String,
  password: String,
  name: String
});

var _default = _mongoose.default.model("user", UserSchema);

exports.default = _default;