// import { io } from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';

// const socket = io(`ws://import.meta.env.BASE_URL`);

export default function Update() {
  const [searchParams, setSearchParams] = useSearchParams();

  socket.emit('gps-new', {
    imei: searchParams.get('imei'),
    lat: searchParams.get('lat'),
    lng: searchParams.get('lng'),
  });

  return null;
}
