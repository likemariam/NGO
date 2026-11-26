import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card.jsx';
import { useFetch } from '../../hooks/useFetch';

function AdminDashboard() {
  const { data: users } = useFetch('/users');
  const { data: materials } = useFetch('/materials');

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>
      <div className="stats-grid">
        <Card title="Total Users">
          <span className="stat-number">{users?.length ?? '—'}</span>
          <Link to="/users">Manage Users →</Link>
        </Card>
        <Card title="Learning Materials">
          <span className="stat-number">{materials?.length ?? '—'}</span>
          <Link to="/lms/materials">View Materials →</Link>
        </Card>
        <Card title="Attendance">
          <Link to="/attendance/manager-view">View All →</Link>
        </Card>
        <Card title="Projects">
          <Link to="/funder/projects">View Projects →</Link>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
