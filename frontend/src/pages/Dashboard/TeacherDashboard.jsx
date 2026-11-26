import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card.jsx';

function TeacherDashboard() {
  return (
    <div className="page">
      <h1>Teacher Dashboard</h1>
      <div className="stats-grid">
        <Card title="Materials"><Link to="/lms/materials">Manage Materials →</Link></Card>
        <Card title="Upload Material"><Link to="/lms/materials/upload">Upload New →</Link></Card>
        <Card title="Quizzes"><Link to="/lms/quizzes">Manage Quizzes →</Link></Card>
        <Card title="Questionnaires"><Link to="/lms/questionnaires">View →</Link></Card>
      </div>
    </div>
  );
}

export default TeacherDashboard;
