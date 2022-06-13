import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Login } from "./components/Login";
import { useEffect, useRef, useState } from "react";

function App() {
  const Location = () => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });
    return position === null ? null : <Marker position={position}></Marker>;
  };

  return (
    <Login />
    // <MapContainer
    //   center={[51.049999, -114.066666]}
    //   zoom={18}
    //   scrollWheelZoom={true}
    // >
    //   <TileLayer
    //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //   />
    //   <Location />,
    // </MapContainer>
  );
}

export default App;
