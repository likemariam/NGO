import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { formatDate } from '../../utils/formatDate';
import Table from '../../components/common/Table.jsx';
import Button from '../../components/common/Button.jsx';

function UserManagement() {
  const { data: users, loading, error } = useFetch('/users');

  const columns = [
    { key: 'firstName', label: 'Name', render: (u) => `${u.firstName} ${u.lastName}` },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'enabled', label: 'Status', render: (u) => u.enabled ? 'Active' : 'Disabled' },
    { key: 'createdAt', label: 'Created', render: (u) => formatDate(u.createdAt) },
    { key: 'actions', label: '', render: (u) => (
      <Link to={`/users/edit/${u.id}`} className="btn btn-secondary btn-sm">Edit</Link>
    )},
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>User Management</h1>
        <Link to="/users/create"><Button variant="primary">+ Add User</Button></Link>
      </div>
      <Table columns={columns} data={users} loading={loading} error={error} />
    </div>
  );
}

export default UserManagement;
