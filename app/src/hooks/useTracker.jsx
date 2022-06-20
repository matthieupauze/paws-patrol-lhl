import { useEffect, useReducer, useRef } from 'react';
import { Marker, Polyline, useMap } from 'react-leaflet';

const trackingZoom = 18;

const useTracker = (defaultPosition) => {
  const reducer = (positions, { coords, foundPosition }) => {
    const last = positions[positions.length - 1];
    if (last.lat !== coords.lat || last.lng !== coords.lng) {
      if (!foundPosition.current) {
        foundPosition.current = true; // eslint-disable-line no-param-reassign
        return [coords];
      }
      return [...positions, coords];
    }
    return positions;
  };

  const foundPosition = useRef(false);
  const [positions, updatePosition] = useReducer(reducer, [defaultPosition]);
  const map = useMap();

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
    if (!foundPosition.current) {
      return;
    }
    const p = positions[positions.length - 1];
    map.flyTo(p, trackingZoom);
  }, [positions]);

  return { genLine, genMarker, updatePosition, foundPosition };
};

export default useTracker;
