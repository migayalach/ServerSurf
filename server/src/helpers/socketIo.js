const { Server: SocketServer } = require("socket.io");

function initSocket(server) {
  const io = new SocketServer(server);
  
  io.on("connection", (socket) => {
    socket.on("message", (data) => {
      const { body, idUser } = data;
      socket.broadcast.emit("message", {
        body,
        from: socket.id,
        idUser,
      });
    });
  });
}

module.exports = initSocket;
