import * as React from 'react';
import TrackerContext from '../context/TrackerContext';
import getRelativeCoordinates from '../utils/getRelativeCoordinates';

export default function HorizontalScroll() {
  const { sidebarWidth, xPosition, rangeInPixels, setXPosition } =
    React.useContext(TrackerContext);

  const trackRef = React.useRef();

  const onMove = (e) => {
    //calc position;
    if (trackRef.current) {
      const { width } = trackRef.current.getBoundingClientRect();
      const { x } = getRelativeCoordinates(e, trackRef.current);
      const percent = ((x - 15) / width) * 100;
      const normalPercent = (Math.min(100, Math.max(0, percent)) - 50) / 50;
      setXPosition(-rangeInPixels * normalPercent);
      // setHorizontalPosition(Math.min(100, Math.max(0, percent)));
    }
  };
  const onDown = () => {
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };
  const currentPerc = 50 + (-xPosition / rangeInPixels) * 50;
  const onScroll = (e) => {
    // const { width } = contentRef.current.getBoundingClientRect();
    setXPosition((current) => (current || 0) - e.deltaX);
  };
  return (
    <div
      style={{ height: '20px', background: 'grey', display: 'flex' }}
      onWheel={onScroll}
    >
      <div style={{ width: sidebarWidth }} />
      <div style={{ flex: 1, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 30,
            bottom: 0,
            top: 0,
          }}
          ref={trackRef}
        >
          <div
            onMouseDown={onDown}
            style={{
              position: 'absolute',
              background: 'green',
              borderRadius: '12px',
              height: '100%',
              width: '30px',
              left: `${currentPerc}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
