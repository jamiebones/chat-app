import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import models from "../models";
const saltRounds = 10;

const { userModel } = models;
const { secret_key } = process.env;

const createNewUser = async (req) => {
  const { name, username, password } = req.body;
  //check if account exist already
  try {
    const user = await userModel.findOne({ username });
    if (user) {
      return {
        success: false,
        message: `user with ${username} already exists`,
      };
    }
    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = new userModel({
      name,
      username,
      password: hash,
    });
    const userId = await newUser.save();
    return {
      userId,
      name,
      username,
      success: true,
    };
  } catch (error) {
    console.log("error");
  }
};

const loginUser = async (req) => {
  try {
    const { username, password } = req.body;
    const userAccount = await userModel.findOne({
      username: username.toLowerCase(),
    });
    if (!userAccount) {
      return {
        message: "User details not found",
        success: false,
      };
    }
    const match = await bcrypt.compare(password, userAccount.password);
    if (!match) {
      //return error to userAccount to let them know the password is incorrect
      return {
        message: "Incorrect credentials",
        success: false,
      };
    }

    const token = jwt.sign(
      {
        username: userAccount.username,
        id: userAccount.id,
        name: userAccount.name,
      },
      secret_key
    );

    return {
      username: userAccount.username,
      id: userAccount.id,
      token: token,
      name: userAccount.name,
      success: true,
    };
  } catch {
    console.log("error");
  }
};

export default { createNewUser, loginUser };
