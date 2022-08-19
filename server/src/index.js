import express from "express";
import "dotenv/config";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

import bodyParser from "body-parser";
import config from "./config";
import controller from "./controller/index.js";

//middleware

import isAuth from "./middleware/isAuth";

import indexRouter from "./routes/index";
import chatRouter from "./routes/chat";

// socket configuration
import WebSockets from "./utils/WebSockets.js";

const {
  chatController,
  userController: { createNewUser, loginUser },
} = controller;

const { dbStart } = config;

const PORT = 4000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//start the database
dbStart();


app.use("/", indexRouter);
app.use("/chat", isAuth, chatRouter);

//register socket middleware
io.use((socket, next) => {
  const { token, user } = socket.handshake.auth;
  console.log("user server ", user)
  socket.token = token;
  socket.user = user;
  next();
});

global.io = io;
global.io.on("connection", WebSockets.connection);

/** catch 404 **/
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist",
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
