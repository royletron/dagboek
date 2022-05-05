import * as React from 'react';
import CalendarHeaders from '../../Tracker/Headers/Calendar';
import SidebarHeader from '../../Tracker/Headers/Sidebar';

export default function Headers({ height }) {
  return (
    <div style={{ height, background: 'lightgreen', display: 'flex' }}>
      <SidebarHeader />
      <CalendarHeaders />
    </div>
  );
}
