import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, ROLE_DASHBOARD_MAP } from '../../utils/constants';

function Sidebar({ open, onClose }) {
  const { user } = useAuth();
  const role = user?.role;

  // Use the same map App.jsx uses so links always match routes
  const dashboardPath = ROLE_DASHBOARD_MAP[role] || '/dashboard/user';

  const links = [
    { to: dashboardPath,               label: 'Dashboard',       icon: '📊', show: true },
    { to: '/lms/materials',            label: 'Materials',       icon: '📚', show: true },
    { to: '/lms/videos',               label: 'Videos',          icon: '🎬', show: true },
    { to: '/lms/questionnaires',       label: 'Questionnaires',  icon: '📋', show: true },
    { to: '/lms/quizzes',              label: 'Quizzes',         icon: '🧠', show: true },
    { to: '/attendance/check-in',      label: 'Check In/Out',    icon: '⏰', show: true },
    { to: '/attendance/history',       label: 'My Attendance',   icon: '📅', show: true },
    {
      to: '/attendance/manager-view',  label: 'All Attendance',  icon: '👥',
      show: [ROLES.ADMIN, ROLES.MANAGER].includes(role),
    },
    {
      to: '/attendance/reports',       label: 'Reports',         icon: '📈',
      show: [ROLES.ADMIN, ROLES.MANAGER].includes(role),
    },
    { to: '/users',   label: 'User Management', icon: '👤', show: role === ROLES.ADMIN },
    { to: '/roles',   label: 'Roles',           icon: '🔐', show: role === ROLES.ADMIN },
    {
      to: '/funder/projects',          label: 'My Fundings',     icon: '💰',
      show: role === ROLES.FUNDER,
    },
    {
      to: '/field-worker/activities',  label: 'My Activities',   icon: '🏃',
      show: role === ROLES.FIELD_WORKER,
    },
    { to: '/profile', label: 'My Profile', icon: '⚙️', show: true },
  ];

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-logo">NGO DMS</div>
        <ul>
          {links.filter((l) => l.show).map((link) => (
            <li key={link.to}>
              {/* React Router v6: use className fn instead of activeClassName */}
              <NavLink
                to={link.to}
                onClick={onClose}
                className={({ isActive }) => isActive ? 'active' : undefined}
              >
                <span className="icon">{link.icon}</span> {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
