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
        const newPosition = [res.data.latitude, res.data.longitude];
        setPosition(newPosition);
        map.flyTo(newPosition);
        map.setZoom(18);
      })
      .catch((err) => console.log(err));
  }, []);
};

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
        maxZoom={19}
      />
      <Location />
    </MapContainer>
  );
}

export default Map;
