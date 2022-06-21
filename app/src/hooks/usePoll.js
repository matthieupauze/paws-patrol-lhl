import axios from 'axios';
import { useEffect, useState } from 'react';

const { VITE_PORT_EXPRESS } = import.meta.env;
const deviceId = 2;

const usePoll = (updatePosition, foundPosition, defaultPosition, isPolling) => {
  const [poller, setPoller] = useState(undefined);

  const fetchPosition = () => {
    return axios
      .get(`http://localhost:${VITE_PORT_EXPRESS}/api/coordinate/${deviceId}`)
      .then((res) => {
        const { id, latitude, longitude } = res.data;
        if (!id || !latitude || !longitude) {
          return defaultPosition;
        }
        return { imei: id, lat: latitude, lng: longitude };
      });
  };

  const setupTimer = () => {
    if (poller) {
      return;
    }
    setPoller(
      setInterval(() => {
        fetchPosition()
          .then((data) => {
            updatePosition({ coords: data, foundPosition });
          })
          .catch((err) => console.log(err));
      }, 1000)
    );
  };

  useEffect(() => {
    if (isPolling) {
      return setupTimer();
    }
    clearInterval(poller);
    setPoller(undefined);
  }, [isPolling]);
};

export default usePoll;
