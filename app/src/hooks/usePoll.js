import axios from 'axios';
import { useEffect } from 'react';
const { VITE_PORT_EXPRESS } = import.meta.env;

const usePoll = (updatePosition, foundPosition, defaultPosition) => {
  const fetchPosition = () => {
    return axios.get(`http://localhost:${VITE_PORT_EXPRESS}/api/coordinate/34612`).then((res) => {
      const { id, latitude, longitude } = res.data;
      if (!id || !latitude || !longitude) {
        return defaultPosition;
      }
      return { imei: id, lat: latitude, lng: longitude };
    });
  };

  const setupTimer = () => {
    return setInterval(() => {
      fetchPosition()
        .then((data) => {
          updatePosition({ coords: data, foundPosition });
        })
        .catch((err) => console.log(err));
    }, 5000);
  };

  useEffect(() => {
    const interval = setupTimer();
    return () => {
      clearInterval(interval);
    };
  }, []);
};

export default usePoll;
