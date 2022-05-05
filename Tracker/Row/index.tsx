import * as React from 'react';
import TrackerContext from '../../context/TrackerContext';

export default function Row({ side, main }) {
  const { sidebarWidth, xPosition } = React.useContext(TrackerContext);
  return (
    <div
      style={{
        display: 'inline-flex',
        width: '100%',
      }}
    >
      <div style={{ width: sidebarWidth }}>{side}</div>

      <div
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', left: '50%' }}>
          <div
            style={{
              transform: `translate(${xPosition}px, 0px)`,
              position: 'relative',
            }}
          >
            {main}
          </div>
        </div>
      </div>
    </div>
  );
}
