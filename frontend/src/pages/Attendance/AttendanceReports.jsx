import React, { useState } from 'react';
import apiClient from '../../services/apiClient';
import Button from '../../components/common/Button.jsx';
import Card from '../../components/common/Card.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

function AttendanceReports() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!from || !to) { setError('Please select a date range'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await apiClient.get(`/attendance/reports?from=${from}&to=${to}`);
      const env = res?.data ?? res;
      setReport(env);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Attendance Reports</h1>
      <div className="form-card">
        <div className="form-row">
          <div className="field">
            <label>From</label>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div className="field">
            <label>To</label>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        </div>
        <ErrorMessage message={error} />
        <Button onClick={handleGenerate} loading={loading}>Generate Report</Button>
      </div>

      {report && (
        <div className="stats-grid" style={{ marginTop: '2rem' }}>
          <Card title="Period"><p>{report.period}</p></Card>
          <Card title="Total Records"><span className="stat-number">{report.totalRecords}</span></Card>
          <Card title="Full Days"><span className="stat-number">{report.fullDays}</span></Card>
          <Card title="Avg Hours"><span className="stat-number">{report.averageHours}h</span></Card>
        </div>
      )}
    </div>
  );
}

export default AttendanceReports;
