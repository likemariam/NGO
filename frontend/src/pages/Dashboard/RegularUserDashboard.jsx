import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card.jsx';

function RegularUserDashboard() {
  return (
    <div className="page">
      <h1>Welcome</h1>
      <div className="stats-grid">
        <Card title="Materials"><Link to="/lms/materials">View →</Link></Card>
        <Card title="Quizzes"><Link to="/lms/quizzes">Take a Quiz →</Link></Card>
        <Card title="Attendance"><Link to="/attendance/check-in">Check In →</Link></Card>
        <Card title="Profile"><Link to="/profile">My Profile →</Link></Card>
      </div>
    </div>
  );
}

export default RegularUserDashboard;
