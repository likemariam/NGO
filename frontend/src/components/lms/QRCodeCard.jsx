import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

/**
 * Renders a QR code for a given value using the qrcode npm package.
 * No backend call needed — generated entirely in the browser.
 */
function QRCodeCard({ value, label, size = 220 }) {
  const canvasRef = useRef(null);
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    if (!value) return;
    QRCode.toCanvas(
      canvasRef.current,
      value,
      {
        width: size,
        margin: 2,
        color: { dark: '#1e293b', light: '#ffffff' },
        errorCorrectionLevel: 'H',
      },
      (err) => {
        if (err) console.error('QR error', err);
      }
    );
    // Also generate data URL for download
    QRCode.toDataURL(value, { width: size, margin: 2 }, (err, url) => {
      if (!err) setDataUrl(url);
    });
  }, [value, size]);

  const download = () => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${label || 'qr-code'}.png`;
    a.click();
  };

  if (!value) return null;

  return (
    <div className="qr-card">
      <p className="qr-label">{label}</p>
      <canvas ref={canvasRef} />
      {dataUrl && (
        <button className="btn btn-secondary btn-sm" onClick={download} style={{ marginTop: '0.5rem' }}>
          ⬇ Download QR
        </button>
      )}
    </div>
  );
}

export default QRCodeCard;
