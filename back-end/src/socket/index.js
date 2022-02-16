module.exports = (io) => io.on('connection', (socket) => {
  socket.on('tasksUpdated', () => {
    io.emit('tasksUpdated');
  });
});
