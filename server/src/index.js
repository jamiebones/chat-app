import express from "express";
import "dotenv/config";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import config from "./config";
import controller from "./controller/index.js";

const {
  chatController,
  userController: { createNewUser, loginUser },
  onlineUserController: { saveOnlineUser, removeOnlineUser }
} = controller;

const { dbStart } = config;

const startWebServer = async () => {
  const app = express();

  const PORT = 4000;

  const server = http.Server(app);

  app.use(cors());

  // Configuring body parser middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //start the database
  await dbStart();

  const socketIO = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  //Add this before the app.get() block
  socketIO.on("connection", ( socket ) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on("disconnect", () => {
      console.log(`🔥: A user disconnected`);
    });

    socket.on("user-login", async ( data ) => {
       await saveOnlineUser(data);
    })
  });

  app.post("/create-user", async (req, res) => {
    const data = await createNewUser(req);
    res.send(data);
  });

  app.post("/login", async (req, res) => {
    const data = await loginUser(req);
    res.send(data);
  });

  server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
};

startWebServer();
