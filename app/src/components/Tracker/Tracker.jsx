import usePoll from '../../hooks/usePoll';
import useTracker from '../../hooks/useTracker';
import useEvent from '../../hooks/useEvent';

function Tracker({ defaultPosition }) {
  const { genLine, genMarker, updatePosition, foundPosition } = useTracker(defaultPosition);

  // usePoll(updatePosition, foundPosition, defaultPosition);
  useEvent(updatePosition, foundPosition, defaultPosition);

  return (
    <>
      {genLine()}
      {genMarker()}
    </>
  );
}

export default Tracker;
