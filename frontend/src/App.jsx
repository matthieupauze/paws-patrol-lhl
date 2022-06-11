import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

// const getCurrentUserLocation = (map) => {
//   navigator.geolocation.getCurrentPosition((position) => {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;
//     map.setView([latitude, longitude], 15);
//   });
//   $.get("/home");
// };

// const loadMap = function () {
//   const map = L.map("map", {
//     doubleClickZoom: false,
//     bubblingMouseEvents: true,
//     zoomControl: false,
//   }).setView([49.262838, -122.781071], 16);

//   L.control
//     .scale({
//       metric: true,
//       imperial: false,
//       position: "bottomright",
//     })
//     .addTo(map);
//   L.control
//     .zoom({
//       position: "bottomright",
//     })
//     .addTo(map);

//   getCurrentUserLocation(map);
//   // Posting new map title,lat,long to server

//   return map;
// };
// const renderMap = function (map) {
//   L.tileLayer(
//     "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
//     {
//       attribution:
//         'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//       maxZoom: 18,
//       id: "mapbox/streets-v11",
//       tileSize: 512,
//       zoomOffset: -1,
//       accessToken:
//         "pk.eyJ1IjoiZGtlbGw4OCIsImEiOiJjbDJ3Zm44NjMwZjVqM2RxY3gyN3J6dXJ2In0.SYE3QdtfFxH63YvUTI7FMA",
//     }
//   ).addTo(map);
// };

function App() {
  return (
    <MapContainer
      center={[51.049999, -114.066666]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.049999, -114.066666]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default App;
