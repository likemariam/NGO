import React from 'react';

function Loader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="loader-spinner" aria-label="Loading..." role="status" />
    </div>
  );
}

export default Loader;
