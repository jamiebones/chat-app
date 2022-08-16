"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saltRounds = 10;
const {
  userModel
} = _models.default;
const {
  secret_key
} = process.env;

const createNewUser = async (req, res) => {
  const {
    name,
    username,
    password
  } = req.body;
  console.log("req body", req.body); //check if account exist already

  try {
    const user = await userModel.findOne({
      username
    }).lean();
    console.log("user ", user);

    if (user) {
      res.send({
        success: false,
        message: `user with ${username} already exists`
      });
    }

    const hash = await _bcrypt.default.hash(password, saltRounds);
    const newUser = new userModel({
      name,
      username,
      password: hash
    });
    const userId = await newUser();
    res.send({
      userId,
      name,
      username,
      success: true
    });
  } catch (error) {
    console.log("error");
  }
};

const loginUser = async req => {
  try {
    const {
      username,
      password
    } = req.body;
    const userAccount = await userModel.findOne({
      username: username.toLowerCase()
    });

    if (!userAccount) {
      return {
        message: "User details not found",
        success: false
      };
    }

    const match = await _bcrypt.default.compare(password, userAccount.password);

    if (!match) {
      //return error to userAccount to let them know the password is incorrect
      return {
        message: "Incorrect credentials",
        success: false
      };
    }

    const token = _jsonwebtoken.default.sign({
      username: userAccount.username,
      id: userAccount.id,
      name: userAccount.name
    }, secret_key);

    return {
      username: userAccount.username,
      id: userAccount.id,
      token: token,
      name: userAccount.name,
      success: true
    };
  } catch {
    console.log("error");
  }
};

var _default = {
  createNewUser,
  loginUser
};
exports.default = _default;