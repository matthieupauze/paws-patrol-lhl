import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer"
import { useEffect, useRef, useState } from "react";

function App() {
  const Location = () => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });
    return position === null ? null : <Marker position={position}></Marker>;
  };

  return (
    <>
    <Header />
    <Login />
    <Footer />
    </>
    // <>
    // <Header />
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
    // <Footer/>
    // </>
  );
}

export default App;
