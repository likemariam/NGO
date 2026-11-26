import React, { useEffect, useRef, useState } from 'react';

/**
 * Renders a Code-128 barcode using the JsBarcode CDN or a lightweight
 * canvas implementation. We draw it manually so there is no extra dependency.
 *
 * Uses the browser's Canvas 2D API to draw Code 128 bars.
 */
function BarcodeCard({ value, label }) {
  const canvasRef = useRef(null);
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    if (!value || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // ── Encode value as Code 128B ─────────────────────────────────────────
    const startB = 104;
    const stopCode = 106;
    const checkMultiplier = (i) => (i === 0 ? 1 : i);

    const chars = value.split('').map((c) => c.charCodeAt(0) - 32);
    let checksum = startB;
    chars.forEach((v, i) => { checksum += v * (i + 1); });
    checksum = checksum % 103;

    const sequence = [startB, ...chars, checksum, stopCode];

    // Code 128 bar widths (11 bits per character)
    const CODE128_B = [
      '11011001100','11001101100','11001100110','10010011000','10010001100',
      '10001001100','10011001000','10011000100','10001100100','11001001000',
      '11001000100','11000100100','10110011100','10011011100','10011001110',
      '10111001100','10011101100','10011100110','11001110010','11001011100',
      '11001001110','11011100100','11001110100','11101101110','11101001100',
      '11100101100','11100100110','11101100100','11100110100','11100110010',
      '11011011000','11011000110','11000110110','10100011000','10001011000',
      '10001000110','10110001000','10001101000','10001100010','11010001000',
      '11000101000','11000100010','10110111000','10110001110','10001101110',
      '10111011000','10111000110','10001110110','11101110110','11010001110',
      '11000101110','11011101000','11011100010','11011101110','11101011000',
      '11101000110','11100010110','11101101000','11101100010','11100011010',
      '11101111010','11001000010','11110001010','10100110000','10100001100',
      '10010110000','10010000110','10000101100','10000100110','10110010000',
      '10110000100','10011010000','10011000010','10000110100','10000110010',
      '11000010010','11001010000','11110111010','11000010100','10001111010',
      '10100111100','10010111100','10010011110','10111100100','10011110100',
      '10011110010','11110100100','11110010100','11110010010','11011011110',
      '11011110110','11110110110','10101111000','10100011110','10001011110',
      '10111101000','10111100010','11110101000','11110100010','10111011110',
      '10111101110','11101011110','11110101110','11010000100','11010010000',
      '11010011100','11000111010',
    ];

    const bits = sequence.map((c) => CODE128_B[c] || '').join('') + '11';
    const barW = 2;
    const barH = 60;
    const padding = 12;

    canvas.width  = bits.length * barW + padding * 2;
    canvas.height = barH + 28;

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw bars
    for (let i = 0; i < bits.length; i++) {
      ctx.fillStyle = bits[i] === '1' ? '#1e293b' : '#ffffff';
      ctx.fillRect(padding + i * barW, 4, barW, barH);
    }

    // Draw human-readable text below
    ctx.fillStyle = '#1e293b';
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(value, canvas.width / 2, barH + 20);

    setDataUrl(canvas.toDataURL('image/png'));
  }, [value]);

  const download = () => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${label || 'barcode'}.png`;
    a.click();
  };

  if (!value) return null;

  return (
    <div className="qr-card">
      <p className="qr-label">{label}</p>
      <canvas ref={canvasRef} style={{ maxWidth: '100%' }} />
      {dataUrl && (
        <button className="btn btn-secondary btn-sm" onClick={download} style={{ marginTop: '0.5rem' }}>
          ⬇ Download Barcode
        </button>
      )}
    </div>
  );
}

export default BarcodeCard;
