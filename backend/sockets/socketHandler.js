module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('tarea:nueva', (data) => {
      io.emit('tarea:actualizar', data); // Broadcast
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
};
