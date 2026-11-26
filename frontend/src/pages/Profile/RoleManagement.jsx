import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import Card from '../../components/common/Card.jsx';
import Loader from '../../components/common/Loader.jsx';

function RoleManagement() {
  const { data: roles, loading } = useFetch('/roles');

  if (loading) return <Loader />;

  return (
    <div className="page">
      <h1>Role Management</h1>
      <div className="stats-grid">
        {roles?.map((role) => (
          <Card key={role} title={role.replace('_', ' ')}>
            <p className="meta">System role</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default RoleManagement;
