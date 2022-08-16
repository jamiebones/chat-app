"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  chatModel,
  userModel
} = _models.default;

const saveChat = async req => {
  const {
    user,
    message,
    receipient
  } = req.params;
};

var _default = {
  saveChat
};
exports.default = _default;