import { MapContainer, Rectangle, TileLayer, useMapEvents } from 'react-leaflet';
import { Card, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import usePoll from '../../hooks/usePoll';
import useTracker from '../../hooks/useTracker';
import useEvent from '../../hooks/useEvent';

const { VITE_PORT_EXPRESS } = import.meta.env;

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

function LocationMarker({ p1, p2, setP1, setP2 }) {
  // const [position, setPosition] = useState(null);
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

function Map({ interactive, perimeter, setPerimeters, setActive, track }) {
  const [p1, setP1] = useState(null);
  const [p2, setP2] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [sateliteView, setSateliteView] = useState(true);

  const savePerimeter = () => {
    const data = { p1lat: p1.lat, p1long: p1.lng, p2lat: p2.lat, p2long: p2.lng };
    axios
      // .post(`/api/perimeter/1`, { p1lat, p1long, p2lat, p2long })
      .post(`http://localhost:${VITE_PORT_EXPRESS}/api/perimeter/1`, data)
      .then((res) => setActive && setActive(false))
      .catch((err) => console.log('err', err.message));
  };
  useEffect(() => {
    const loadPerimeters = async () => {
      const { data } = await axios.get(`http://localhost:${VITE_PORT_EXPRESS}/api/perimeter`);
      setPerimeters(data);
    };
    loadPerimeters();
  }, []);

  const startTracking = () => {
    // CHANGE THE IMEI !!!
    const data = { start: Date.now() };
    axios
      // .post(`/api/perimeter/1`, { p1lat, p1long, p2lat, p2long })
      .post(`http://localhost:${VITE_PORT_EXPRESS}/api/trip/1`, data)
      .then((res) => {
        setTracking(true);
      })
      .catch((err) => console.log('err', err.message));
  };
  const stopTracking = () => {
    const data = { end: Date.now() };
    axios
      // .post(`/api/perimeter/1`, { p1lat, p1long, p2lat, p2long })
      .patch(`http://localhost:${VITE_PORT_EXPRESS}/api/trip/1`, data)
      .then((res) => {
        setTracking(false);
      })
      .catch((err) => console.log('err', err.message));
  };

  return (
    <>
      {perimeter && (
        <>
          <MapContainer
            center={defaultPosition}
            zoom={defaultZoom}
            scrollWheelZoom
            className={interactive ? '' : 'map-disabled'}
            zoomControl={interactive}
            doubleClickZoom={false}
          >
            {!sateliteView && (
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            )}
            {sateliteView && (
              <TileLayer
                attribution={
                  'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                }
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            )}
            <Tracker />
            <LocationMarker p1={p1} p2={p2} setP1={setP1} setP2={setP2} />
          </MapContainer>
          {/* save perimeter button */}
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
          {/* satelite view button */}
          {!sateliteView && (
            <div className="info w-25 align-self-start m-3 pb-4">
              <Card className=" w-25 rounded ph-color">
                <div className="d-grid">
                  <Button
                    className="satelite-view rounded w-100"
                    onClick={(e) => setSateliteView(!sateliteView)}
                  />
                </div>
              </Card>
            </div>
          )}
          {/* street view button */}
          {sateliteView && (
            <div className="info w-25 align-self-start m-3 pb-4">
              <Card className=" w-25 rounded ph-color">
                <div className="d-grid">
                  <Button
                    className="street-view rounded w-100"
                    onClick={(e) => setSateliteView(!sateliteView)}
                  />
                </div>
              </Card>
            </div>
          )}
        </>
      )}
      {!perimeter && track && (
        <>
          <section className=" d-flex justify-content-end align-items-center flex-column">
            <MapContainer
              center={defaultPosition}
              zoom={defaultZoom}
              scrollWheelZoom
              className={interactive ? '' : 'map-disabled'}
              zoomControl={interactive}
            >
              {!sateliteView && (
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              )}
              {sateliteView && (
                <TileLayer
                  attribution={
                    'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                  }
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
              )}
              <Tracker />
            </MapContainer>
            <div className="info w-25 mb-5 d-flex justify-content-center align-content-center">
              <Card className=" w-100 rounded ph-color">
                <div className="d-grid gap-3">
                  {!tracking && (
                    <Button className="btn-color rounded w-100" onClick={startTracking}>
                      Start Tracking
                    </Button>
                  )}
                  {tracking && (
                    <Button className="btn-color rounded w-100" onClick={stopTracking}>
                      Stop
                    </Button>
                  )}
                </div>
              </Card>
            </div>
            {/* satelite view button */}
            {!sateliteView && (
              <div className="info w-25 align-self-start m-3 pb-4">
                <Card className=" w-25 rounded ph-color">
                  <div className="d-grid contain">
                    <Button
                      className="satelite-view rounded w-100"
                      onClick={(e) => setSateliteView(!sateliteView)}
                    />
                  </div>
                </Card>
              </div>
            )}
            {/* street view button */}
            {sateliteView && (
              <div className="info w-25 align-self-start m-3 pb-4">
                <Card className=" w-25 rounded ph-color">
                  <div className="d-grid">
                    <Button
                      className="street-view rounded w-100"
                      onClick={(e) => setSateliteView(!sateliteView)}
                    />
                  </div>
                </Card>
              </div>
            )}
          </section>
        </>
      )}
      {!perimeter && !track && (
        <section className=" d-flex justify-content-end align-items-center flex-column">
          <MapContainer
            center={defaultPosition}
            zoom={defaultZoom}
            scrollWheelZoom
            className={interactive ? '' : 'map-disabled'}
            zoomControl={interactive}
          >
            {!sateliteView && (
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            )}
            {sateliteView && (
              <TileLayer
                attribution={
                  'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                }
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            )}
            <Tracker />
          </MapContainer>
          {/* satelite view button */}
          {!sateliteView && (
            <div className="info w-25 align-self-start m-3 pb-4">
              <Card className=" w-25 rounded ph-color">
                <div className="d-grid">
                  <Button
                    className="satelite-view rounded w-100"
                    onClick={(e) => setSateliteView(!sateliteView)}
                  />
                </div>
              </Card>
            </div>
          )}
          {/* street view button */}
          {sateliteView && (
            <div className="info w-25 align-self-start m-3 pb-4">
              <Card className=" w-25 rounded ph-color">
                <div className="d-grid">
                  <Button
                    className="street-view rounded w-100"
                    onClick={(e) => setSateliteView(!sateliteView)}
                  />
                </div>
              </Card>
            </div>
          )}
        </section>
      )}
    </>
  );
}

export default Map;
