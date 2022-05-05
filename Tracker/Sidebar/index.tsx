import * as React from 'react';
import TrackerContext from '../../context/TrackerContext';

export default function Sidebar() {
  const { sidebarWidth } = React.useContext(TrackerContext);
  return (
    <div
      style={{
        width: sidebarWidth,
        overflowY: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 0,
        borderRight: '1px solid orange',
      }}
    ></div>
  );
}
