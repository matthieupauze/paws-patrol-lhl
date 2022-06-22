import { MapContainer, Rectangle, TileLayer, useMapEvents } from 'react-leaflet';
import { Card, Button } from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Tracker from '../Tracker';

const defaultZoom = 4;
const defaultPosition = { imei: 0, lat: 45, lng: -73 };

const streetData = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  iconClass: 'satellite-bg',
};
const satelliteData = {
  url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  attribution:
    'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  iconClass: 'street-bg',
};
const darkData = {
  //DARK MODE!
  url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  iconClass: 'satellite-bg',
};

function LocationMarker({ p1, p2, setP1, setP2 }) {
  const [second, setSecond] = useState(false);
  const map = useMapEvents({
    click(e) {
      second ? setP1(e.latlng) : setP2(e.latlng);
      setSecond(!second);
    },
  });

  const rectangle = [p1, p2];
  return p1 && p2 ? <Rectangle bounds={rectangle} /> : null;
}

function Map({ interactive, perimeter, setActive, track, updatePerimeters, PORT }) {
  const [p1, setP1] = useState(null);
  const [p2, setP2] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [satelliteView, setSatelliteView] = useState(false);
  const [darkView, setDarkView] = useState(false);
  const [tileLayerData, setTileLayerData] = useState(streetData);
  const urlRef = useRef(null);

  useEffect(() => {
    if (urlRef.current) {
      urlRef.current.setUrl(tileLayerData.url);
    }
  }, [tileLayerData]);

  const savePerimeter = () => {
    const data = { p1lat: p1.lat, p1long: p1.lng, p2lat: p2.lat, p2long: p2.lng };
    axios
      .post(`http://localhost:${PORT}/api/perimeter/1`, data)
      .then(() => {
        setActive(false);
        updatePerimeters();
      })
      .catch((err) => console.log('err', err.message));
  };

  const startTracking = () => {
    const data = { start: Date.now() };
    axios
      .post(`http://localhost:${PORT}/api/trip/1`, data)
      .then(() => {
        setTracking(true);
      })
      .catch((err) => console.log('err', err.message));
  };

  const stopTracking = () => {
    const data = { end: Date.now() };
    axios
      .patch(`http://localhost:${PORT}/api/trip/1`, data)
      .then(() => {
        setTracking(false);
      })
      .catch((err) => console.log('err', err.message));
  };

  const setSatellite = (isSatellite) => {
    if (isSatellite) {
      setTileLayerData(satelliteData);
      setSatelliteView(true);
      return;
    }
    setTileLayerData(streetData);
    setSatelliteView(false);
  };

  const setDark = (isDark) => {
    if (isDark) {
      setTileLayerData(darkData);
      setDarkView(true);
      return;
    }
    setSatellite(false);
    setDarkView(false);
  };

  return (
    <section className=" d-flex justify-content-end align-items-center flex-column">
      <MapContainer
        center={defaultPosition}
        zoom={defaultZoom}
        scrollWheelZoom
        className={interactive ? '' : 'map-disabled'}
        zoomControl={interactive}
        doubleClickZoom={false}
      >
        <TileLayer ref={urlRef} url={tileLayerData.url} attribution={tileLayerData.attribution} />
        <Tracker defaultPosition={defaultPosition} isPolling={tracking} PORT={PORT} />
        {perimeter && <LocationMarker p1={p1} p2={p2} setP1={setP1} setP2={setP2} />}
      </MapContainer>
      {/* Dark Mode button */}
      {!satelliteView && (
        <div className="info w-25 align-self-start m-3 mb-5 pb-5">
          <Card className=" w-25 rounded ph-color dark contain">
            <div className="d-grid">
              <Button
                className="view-button rounded w-100 dark-bg"
                onClick={() => setDark(!darkView)}
              />
            </div>
          </Card>
        </div>
      )}
      {/* satelite view button */}
      <div className="info w-25 align-self-start m-3 mb-2 pb-2">
        <Card className=" w-25 rounded ph-color contain">
          <div className="d-grid">
            <Button
              className={`view-button rounded w-100 ${tileLayerData.iconClass}`}
              onClick={() => setSatellite(!satelliteView)}
            />
          </div>
        </Card>
      </div>
      {perimeter && (
        <>
          {/* Save perimeter button */}
          {p1 !== null && p2 !== null && (
            <div className="info w-25 mb-5">
              <Card className=" w-100 rounded ph-color">
                <div className="d-grid gap-3">
                  <Button className="btn-color rounded w-100" onClick={savePerimeter}>
                    Save Perimeter
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </>
      )}
      {!perimeter && track && (
        <>
          {/* Tracking button */}
          <div className="info w-25 mb-5 d-flex justify-content-center align-content-center">
            <Card className=" w-100 rounded ph-color">
              <div className="d-grid gap-3">
                <Button
                  className="btn-color rounded w-100"
                  onClick={tracking ? stopTracking : startTracking}
                >
                  {tracking ? 'Stop tracking' : 'Start Tracking'}
                </Button>
              </div>
            </Card>
          </div>
        </>
      )}
    </section>
  );
}

export default Map;
