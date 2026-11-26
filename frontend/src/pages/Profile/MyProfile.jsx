import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card.jsx';

function MyProfile() {
  const { user } = useAuth();

  return (
    <div className="page">
      <h1>My Profile</h1>
      <Card title="Personal Information" actions={<Link to="/profile/edit" className="btn btn-secondary">Edit</Link>}>
        <div className="profile-row"><span>Name</span><span>{user?.firstName} {user?.lastName}</span></div>
        <div className="profile-row"><span>Email</span><span>{user?.email}</span></div>
        <div className="profile-row"><span>Role</span><span>{user?.role?.replace('_', ' ')}</span></div>
        <div className="profile-row"><span>Phone</span><span>{user?.phone || '—'}</span></div>
      </Card>
    </div>
  );
}

export default MyProfile;
