import { io } from 'socket.io-client';

const socket = io('ws://localhost:3000');

export default function Update() {
  socket.emit('gps-update');
}
