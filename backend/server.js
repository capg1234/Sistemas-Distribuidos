const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const socketHandler = require('./sockets/socketHandler');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

socketHandler(io); // Configura eventos de WebSocket

const PORT = process.env.PORT || 3080;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
