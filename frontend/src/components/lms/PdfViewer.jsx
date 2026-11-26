import React from 'react';

function PdfViewer({ url }) {
  if (!url) return <p className="meta">No PDF available</p>;

  return (
    <div className="pdf-wrapper">
      <iframe src={url} title="PDF Viewer" width="100%" height="600px" />
    </div>
  );
}

export default PdfViewer;
