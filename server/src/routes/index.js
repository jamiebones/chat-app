import express from "express";

//controllers
import user from "../controller/user";

//controllers;
const router = express.Router();


router
  .post("/create-user", user.createNewUser)
  .post("/login", user.loginUser)


export default router;
