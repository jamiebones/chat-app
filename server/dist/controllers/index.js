"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chat = _interopRequireDefault(require("./chat"));

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  chatController: _chat.default,
  userController: _user.default
};
exports.default = _default;