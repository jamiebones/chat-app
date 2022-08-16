"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  secret_key
} = process.env;

var _default = (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader) {
    return res.status(403).send("No authorization headers was sent with the request");
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    let decodedToken = _jsonwebtoken.default.verify(token, secret_key);

    req.user = decodedToken;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

exports.default = _default;