import path from 'path';
import { Server, Socket } from 'socket.io';
import { Coords } from './types';
require('dotenv').config({ path: path.resolve(process.cwd(), '../.env') });
const { VITE_PORT_REACT } = process.env;

export const registerGPS = (io: Server, socket: Socket) => {
  const handleGPS = (coords: Coords) => {
    socket.broadcast.emit('gps-update', coords);
  };
  socket.on('gps-new', handleGPS);
};

export const serverConfig = {
  cors: {
    origin: `http://localhost:${VITE_PORT_REACT}`,
  },
};
