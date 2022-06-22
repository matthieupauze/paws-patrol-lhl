import usePoll from '../../hooks/usePoll';
import useTracker from '../../hooks/useTracker';
// import useEvent from '../../hooks/useEvent';

function Tracker({ defaultPosition, isPolling, PORT }) {
  const { genLine, genMarker, updatePosition, foundPosition } = useTracker(defaultPosition);

  usePoll(updatePosition, foundPosition, defaultPosition, isPolling, PORT);
  // useEvent(updatePosition, foundPosition, defaultPosition);

  return (
    <>
      {genLine()}
      {genMarker()}
    </>
  );
}

export default Tracker;
