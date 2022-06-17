import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Polyline, TileLayer, useMap } from 'react-leaflet';

const defaultZoom = 4;
const trackingZoom = 18;
const defaultPosition = { id: 0, lat: 45, lng: -73 };

const { VITE_PORT_EXPRESS } = import.meta.env;

function Tracker() {
  const [positions, setPositions] = useState([defaultPosition]);
  const map = useMap();
  const foundPosition = useRef(false);

  const fetchPosition = () => {
    return axios.get(`http://localhost:${VITE_PORT_EXPRESS}/api/coordinate/34612`).then((res) => {
      const { id, latitude, longitude } = res.data;
      console.log(res.data);
      if (!id || !latitude || !longitude) {
        return defaultPosition;
      }
      return { id, lat: latitude, lng: longitude };
    });
  };

  const changePosition = (prevPosition, newPosition) => {
    const last = prevPosition[prevPosition.length - 1];
    if (last.lat !== newPosition.lat || last.lng !== newPosition.lng) {
      if (!foundPosition.current) {
        foundPosition.current = true;
        return [newPosition];
      }
      return [...prevPosition, newPosition];
    }
    return prevPosition;
  };

  const setupTimer = () => {
    return setInterval(() => {
      fetchPosition()
        .then((data) => {
          setPositions((prev) => changePosition(prev, data));
        })
        .catch((err) => console.log(err));
    }, 1000);
  };

  const genLine = () => {
    return <Polyline positions={positions} color="red" />;
  };

  const genMarker = () => {
    if (!foundPosition.current || !positions) {
      return null;
    }
    return <Marker position={positions[positions.length - 1]} />;
  };

  useEffect(() => {
    const interval = setupTimer();
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!foundPosition.current) {
      return;
    }
    const p = positions[positions.length - 1];
    map.flyTo(p, trackingZoom);
  }, [positions]);

  return (
    <>
      {genLine()}
      {genMarker()}
    </>
  );
}

function Map({ interactive }) {
  return (
    <MapContainer
      center={defaultPosition}
      zoom={defaultZoom}
      scrollWheelZoom
      className={interactive ? '' : 'map-disabled'}
      zoomControl={interactive}
    >
      {/*  */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

        // className={interactive ? "" : 'map-disabled'}
        // attribution={"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"}

        // url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      <Tracker />
    </MapContainer>
  );
}

export default Map;
