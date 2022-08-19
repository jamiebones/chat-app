import chat from "../controller/chat"
class WebSockets {
  users = [];

  connection = (client) => {
    client.on("refresh", (data) => {
      const user = this.users.find((u) => u.username === data.user.username);
      if (!user && data !== null) {
        this.users.push({
          socketId: client.id,
          name: data.user.name,
          username: data.user.username,
        });
        global.io.emit("usersResponse", this.users);
      }
    });

    client.on("disconnect", () => {
      this.users = this.users.filter((user) => user.socketId !== client.id);
      global.io.emit("usersResponse", this.users);
    });

    client.on("user-logout", () => {
      this.users = this.users.filter((user) => user.socketId !== client.id);
      global.io.emit("usersResponse", this.users);
    });

    client.on("new-login", (data) => {
      const {
        user: { name, username, socketId },
      } = data;
      this.users.push({
        socketId,
        username,
        name,
      });
      //send the list of updated users to all connected clients
      global.io.emit("usersResponse", this.users);
    });

    client.on("message", async ({ message, postedBy, to }) => {
      //retrieve the socketId from the online users
      const user = this.users.find((u) => u.username === to);
      await chat.sendChat();
      if (user) {
        client.to(user.socketId).emit("messageReceived", { message, to, postedBy });
      }
    });
  };
}

export default new WebSockets();
