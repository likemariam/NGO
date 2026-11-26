import React, { useState, useMemo } from 'react';
import { useAttendance } from '../../hooks/useAttendance';
import { useAuth } from '../../hooks/useAuth';
import apiClient from '../../services/apiClient';
import Button from '../../components/common/Button.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';
import QRCodeCard from '../../components/lms/QRCodeCard.jsx';
import BarcodeCard from '../../components/lms/BarcodeCard.jsx';

function CheckInCheckOut() {
  const { checkIn, checkOut, loading, error } = useAttendance();
  const { user } = useAuth();
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  // ── Scanner mode (office tablet) ────────────────────────────────────────
  const [scanMode, setScanMode] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [scanResult, setScanResult] = useState('');

  // Each worker's personal ID — encoded into QR and barcode
  const workerCode = useMemo(
    () => (user ? `NGODMS-${user.userId}-${user.email}` : ''),
    [user]
  );

  const handleCheckIn = async () => {
    setMessage('');
    try {
      const r = await checkIn({ location, notes });
      setMessage(`Checked in at ${new Date(r.checkInTime).toLocaleTimeString()}`);
    } catch { /* handled by hook */ }
  };

  const handleCheckOut = async () => {
    setMessage('');
    try {
      const r = await checkOut({ notes });
      setMessage(`Checked out at ${new Date(r.checkOutTime).toLocaleTimeString()}`);
    } catch { /* handled by hook */ }
  };

  const handleScan = async (e) => {
    e.preventDefault();
    setScanResult('');
    try {
      // Scanned QR/barcode content: NGODMS-<userId>-<email>
      const match = scannedCode.match(/^NGODMS-(\d+)-/);
      if (!match) {
        setScanResult('Invalid NGO DMS code');
        return;
      }
      const res = await apiClient.post('/attendance/scan', {
        qrCode: scannedCode,
        location: location || 'Office scanner',
      });
      const env = res?.data ?? res;
      setScanResult(env?.message || 'Scan processed');
    } catch (err) {
      setScanResult(err.response?.data?.message || 'Scan failed');
    }
  };

  return (
    <div className="page">
      <h1>Attendance</h1>

      {/* ── My personal QR + barcode ─────────────────────────────────────── */}
      {user && (
        <div className="code-cards-row">
          <QRCodeCard  value={workerCode} label={`my-qr-${user.userId}`} />
          <BarcodeCard value={String(user.userId).padStart(8, '0')} label={`my-barcode-${user.userId}`} />
        </div>
      )}
      <p className="meta" style={{ textAlign: 'center' }}>
        Show your QR / barcode at the office scanner, or scan a colleague's code below.
      </p>

      {/* ── Manual check in/out ─────────────────────────────────────────── */}
      <div className="form-card">
        <h3>Check In / Check Out</h3>
        <div className="field">
          <label>Location</label>
          <input type="text" placeholder="Office / Field" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="field">
          <label>Notes (optional)</label>
          <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        {message && <p className="success-text">{message}</p>}
        <ErrorMessage message={error} />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="primary"   onClick={handleCheckIn}  loading={loading}>Check In</Button>
          <Button variant="secondary" onClick={handleCheckOut} loading={loading}>Check Out</Button>
        </div>
      </div>

      {/* ── Scanner mode ───────────────────────────────────────────────── */}
      <div className="form-card" style={{ marginTop: '1.5rem' }}>
        <h3>
          Office Scanner
          <button
            className="btn btn-secondary btn-sm"
            style={{ float: 'right' }}
            onClick={() => setScanMode(!scanMode)}
          >
            {scanMode ? 'Hide' : 'Show'} Scanner
          </button>
        </h3>

        {scanMode && (
          <form onSubmit={handleScan}>
            <p className="meta">
              Point a USB/Bluetooth barcode scanner at a worker's QR — it types the code below. Paste manually for testing.
            </p>
            <div className="field">
              <label>Scanned Code</label>
              <input
                type="text"
                placeholder="NGODMS-1-admin@ngodms.com"
                value={scannedCode}
                onChange={(e) => setScannedCode(e.target.value)}
                autoFocus
              />
            </div>
            {scanResult && <p className="success-text">{scanResult}</p>}
            <Button type="submit" variant="primary">Process Scan</Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default CheckInCheckOut;
