"use strict";

var _express = _interopRequireDefault(require("express"));

require("dotenv/config");

var _http = _interopRequireDefault(require("http"));

var _cors = _interopRequireDefault(require("cors"));

var _socket = require("socket.io");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _config2 = _interopRequireDefault(require("./config"));

var _controllers = _interopRequireDefault(require("./controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  chatController,
  userController: {
    createNewUser,
    loginUser
  }
} = _controllers.default;
const {
  dbStart
} = _config2.default;

const startWebServer = async () => {
  const app = (0, _express.default)();
  const PORT = 4000;

  const server = _http.default.Server(app);

  app.use((0, _cors.default)()); // Configuring body parser middleware

  app.use(_bodyParser.default.urlencoded({
    extended: false
  }));
  app.use(_bodyParser.default.json()); //start the database

  await dbStart();
  const socketIO = new _socket.Server(server, {
    cors: {
      origin: "http://localhost:3000"
    }
  }); //Add this before the app.get() block

  socketIO.on("connection", socket => {
    socket.send("Hello from space");
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on("disconnect", () => {
      console.log(`🔥: A user disconnected`);
    });
  });
  app.post("/create-user", createNewUser, (req, res) => {
    console.log("end point hit");
  });
  app.get("/hello", (req, res) => {
    res.send({
      message: "Hello from the server"
    });
  });
  server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
};

startWebServer();