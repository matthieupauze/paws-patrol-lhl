import axios from 'axios';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvent } from 'react-leaflet';

const defaultZoom = 19;
const defaultPosition = [45.509966, -73.814608];

const Location = () => {
  const [position, setPosition] = useState(defaultPosition);
  const map = useMap();

  useEffect(() => {
    axios
      .get('api/1234')
      .then((res) => {
        const position = [res.data.latitude, res.data.longitude];
        setPosition(position);
        map.flyTo(position);
        map.setZoom(18);
      })
      .catch((err) => console.log(err));
  }, []);
};

const Map = () => {
  return (
    <MapContainer center={defaultPosition} zoom={defaultZoom} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution={"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"}
        // url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        maxZoom={19}
      />
      <Location />
    </MapContainer>
  );
};

export default Map;
