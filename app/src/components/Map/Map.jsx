import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Polyline, TileLayer, useMap } from 'react-leaflet';

const defaultZoom = 4;
const trackingZoom = 18;
const defaultPosition = { id: 0, lat: 45, lng: -73 };

function Tracker() {
  const [position, setPosition] = useState([defaultPosition]);
  const map = useMap();
  const foundPosition = useRef(false);

  const fetchPosition = () => {
    return axios.get('http://localhost:3000/api/coordinate/34614').then((res) => {
      const lat = res.data.latitude;
      const lng = res.data.longitude;
      const { id } = res.data;
      return { id, lat, lng };
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
          setPosition((prev) => changePosition(prev, data));
        })
        .catch((err) => console.log(err));
    }, 1000);
  };

  const genLine = () => {
    return <Polyline positions={position} color="red" />;
  };

  const genMarker = () => {
    if (!foundPosition.current) {
      return null;
    }
    return <Marker position={position[position.length - 1]} />;
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
    const p = position[position.length - 1];
    map.flyTo(p, trackingZoom);
  }, [position]);

  return (
    <>
      {genLine()}
      {genMarker()}
    </>
  );
}

function Map({interactive}) {
  return (
    <MapContainer center={defaultPosition} zoom={defaultZoom} scrollWheelZoom  className={interactive ? "" : 'map-disabled'} zoomControl={interactive}>

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
