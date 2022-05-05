import * as React from 'react';
import TrackerContext from '../../context/TrackerContext';

export default function SidebarHeader() {
  const { sidebarWidth } = React.useContext(TrackerContext);
  return (
    <div
      style={{ height: '100%', width: sidebarWidth, background: 'lightblue' }}
    ></div>
  );
}
