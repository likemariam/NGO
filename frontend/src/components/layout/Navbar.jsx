import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <button className="menu-btn" onClick={onMenuClick} aria-label="Toggle menu">☰</button>
      <div className="navbar-brand">NGO DMS</div>
      <div className="navbar-right">
        <span className="user-name">{user?.firstName} {user?.lastName}</span>
        <span className="user-role badge">{user?.role?.replace('_', ' ')}</span>
        <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
