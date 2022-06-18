import path from 'path';
import { Socket } from 'socket.io';
require('dotenv').config({ path: path.resolve(process.cwd(), '../.env') });
const { VITE_PORT_REACT } = process.env;

export const handleConnection = (socket: Socket) => {
  console.log('A new connection has been made, via:', socket.id);
  socket.on('gps-new', (message) => {
    console.log('Coordinate updates received:', message);
    socket.broadcast.emit('gps-update', message);
  });
};

export const serverConfig = {
  cors: {
    origin: `http://localhost:${VITE_PORT_REACT}`,
  },
};
