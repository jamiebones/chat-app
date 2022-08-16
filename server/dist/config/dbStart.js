"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initDataBase = async () => {
  let url = `mongodb://localhost:27017/chat_db}`;
  console.log("starting database connection :");
  await _mongoose.default.connect(url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
    keepAlive: true
  });
  console.log("chat database connected :");
};

var _default = initDataBase;
exports.default = _default;