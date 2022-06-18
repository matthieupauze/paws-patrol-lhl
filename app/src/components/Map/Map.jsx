import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMap,
  useMapEvents,
  Rectangle,
} from 'react-leaflet';
import { Button, Card, ButtonGroup, ToggleButton } from 'react-bootstrap';

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
  return p1 && p2 ? (
    <>
      <Rectangle bounds={rectangle} />
    </>
  ) : null;
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
      .then((res) => {
        setActive && setActive(false);
      })
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
    //CHANGE THE IMEI !!!
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
            <div className="info w-25 align-self-start m-3">
              <Card className=" w-25 rounded ph-color">
                <div className="d-grid gap-3">
                  <Button
                    className="satelite-view rounded w-100"
                    onClick={(e) => setSateliteView(!sateliteView)}
                  ></Button>
                </div>
              </Card>
            </div>
          )}
          {/* street view button */}
          {sateliteView && (
            <div className="info w-25 align-self-start m-3">
              <Card className=" w-25 rounded ph-color">
                <div className="d-grid gap-3">
                  <Button
                    className="street-view rounded w-100"
                    onClick={(e) => setSateliteView(!sateliteView)}
                  ></Button>
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
              <div className="info w-25 align-self-start m-3">
                <Card className=" w-25 rounded ph-color">
                  <div className="d-grid gap-3">
                    <Button
                      className="satelite-view rounded w-100"
                      onClick={(e) => setSateliteView(!sateliteView)}
                    ></Button>
                  </div>
                </Card>
              </div>
            )}
            {/* street view button */}
            {sateliteView && (
              <div className="info w-25 align-self-start m-3">
                <Card className=" w-25 rounded ph-color">
                  <div className="d-grid gap-3">
                    <Button
                      className="street-view rounded w-100"
                      onClick={(e) => setSateliteView(!sateliteView)}
                    ></Button>
                  </div>
                </Card>
              </div>
            )}
          </section>
        </>
      )}
      {!perimeter && !track && (
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
            {/* satelite view button */}
            {!sateliteView && (
              <div className="info w-25 align-self-start m-3">
                <Card className=" w-25 rounded ph-color">
                  <div className="d-grid gap-3">
                    <Button
                      className="satelite-view rounded w-100"
                      onClick={(e) => setSateliteView(!sateliteView)}
                    ></Button>
                  </div>
                </Card>
              </div>
            )}
            {/* street view button */}
            {sateliteView && (
              <div className="info w-25 align-self-start m-3">
                <Card className=" w-25 rounded ph-color">
                  <div className="d-grid gap-3">
                    <Button
                      className="street-view rounded w-100"
                      onClick={(e) => setSateliteView(!sateliteView)}
                    ></Button>
                  </div>
                </Card>
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}

export default Map;
