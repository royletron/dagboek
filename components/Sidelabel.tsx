import * as React from 'react';

export default function Sidelabel({ children }) {
  return (
    <div
      onClick={() => console.log('label')}
      style={{ padding: 10, fontWeight: 'bold' }}
    >
      {children}
    </div>
  );
}
