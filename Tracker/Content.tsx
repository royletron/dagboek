import * as React from 'react';
import TrackerContext from '../context/TrackerContext';
import Sidebar from '../Tracker/Sidebar';

export default function Content({ children }) {
  const contentRef = React.useRef();
  const { xPosition, setXPosition, sidebarWidth } =
    React.useContext(TrackerContext);
  const onScroll = (e) => {
    // const { width } = contentRef.current.getBoundingClientRect();
    setXPosition((current) => (current || 0) - e.deltaX);
  };
  return (
    <div
      style={{
        flex: 1,
        position: 'relative',
        overflowX: 'hidden',
        overscrollBehaviorX: 'none',
        // willChange: 'transform',
        // direction: 'ltr',
      }}
      onWheel={onScroll}
    >
      <Sidebar />
      <div ref={contentRef} style={{ overflowX: 'visible' }}>
        {children}
        <div
          style={{
            height: '100%',
            position: 'absolute',
            left: `${sidebarWidth}px`,
            right: 0,
            top: 0,
            bottom: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              zIndex: 199,
              top: 0,
              bottom: 0,
              background: 'blue',
              width: '1px',
              transform: `translate(${xPosition}px, 0px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
