import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card.jsx';

function FieldWorkerDashboard() {
  return (
    <div className="page">
      <h1>Field Worker Dashboard</h1>
      <div className="stats-grid">
        <Card title="Check In/Out"><Link to="/attendance/check-in">Go →</Link></Card>
        <Card title="My Attendance"><Link to="/attendance/history">View History →</Link></Card>
        <Card title="My Activities"><Link to="/field-worker/activities">View →</Link></Card>
        <Card title="Learning"><Link to="/lms/materials">Materials →</Link></Card>
      </div>
    </div>
  );
}

export default FieldWorkerDashboard;
