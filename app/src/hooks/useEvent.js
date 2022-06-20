import axios from 'axios';
import { io } from 'socket.io-client';
const { VITE_PORT_EXPRESS } = import.meta.env;
const socket = io(`ws://localhost:${VITE_PORT_EXPRESS}`);

const useEvent = (updatePosition, foundPosition, defaultPosition) => {
  socket.on('gps-update', (coords) => {
    updatePosition({ coords, foundPosition });
  });
};

export default useEvent;
