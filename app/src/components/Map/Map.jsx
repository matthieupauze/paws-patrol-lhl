import { MapContainer, TileLayer } from 'react-leaflet';
import usePoll from '../../hooks/usePoll';
import useTracker from '../../hooks/useTracker';
import useEvent from '../../hooks/useEvent';

const defaultZoom = 4;
const trackingZoom = 18;
const defaultPosition = { imei: 0, lat: 45, lng: -73 };

function Tracker() {
  const { genLine, genMarker, updatePosition, foundPosition } = useTracker({
    defaultPosition,
    trackingZoom,
  });

  // usePoll(updatePosition, foundPosition, defaultPosition);
  useEvent(updatePosition, foundPosition, defaultPosition);

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
