import axios from 'axios';
import { useEffect, useState } from 'react';

const DEVICE_ID = 865235030717249;

const usePoll = (updatePosition, foundPosition, defaultPosition, isPolling) => {
  const [poller, setPoller] = useState(undefined);

  const fetchPosition = () => {
    return axios.get(`/api/coordinate/${DEVICE_ID}`).then((res) => {
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
      setupTimer();
    } else {
      clearInterval(poller);
      setPoller(undefined);
    }
    return clearInterval(poller);
  }, [isPolling]);
};

export default usePoll;
