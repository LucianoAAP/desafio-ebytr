require('dotenv').config();
const http = require('http');
const socket = require('socket.io');
const socketListener = require('../socket');
const app = require('./app');

const server = http.createServer(app);

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

socketListener(io);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Conectado na porta ${PORT}`));
