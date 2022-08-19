import express from "express";

//controllers
import chat from "../controller/chat";

const router = express.Router();

router
  .post("/message", chat.sendChat)
  .get("/retrieve/:postedBy/:to", chat.getChatMessage);

export default router;
