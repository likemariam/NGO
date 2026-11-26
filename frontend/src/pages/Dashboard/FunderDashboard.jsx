import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card.jsx';

function FunderDashboard() {
  return (
    <div className="page">
      <h1>Funder Dashboard</h1>
      <div className="stats-grid">
        <Card title="My Funded Projects"><Link to="/funder/projects">View →</Link></Card>
        <Card title="Profile"><Link to="/profile">My Profile →</Link></Card>
      </div>
    </div>
  );
}

export default FunderDashboard;
