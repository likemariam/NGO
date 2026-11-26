import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card.jsx';

function ManagerDashboard() {
  return (
    <div className="page">
      <h1>Manager Dashboard</h1>
      <div className="stats-grid">
        <Card title="Attendance"><Link to="/attendance/manager-view">View All →</Link></Card>
        <Card title="Reports"><Link to="/attendance/reports">View Reports →</Link></Card>
        <Card title="Materials"><Link to="/lms/materials">View Materials →</Link></Card>
      </div>
    </div>
  );
}

export default ManagerDashboard;
