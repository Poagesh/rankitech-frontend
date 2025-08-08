import React from 'react';
import '../../styles/styles.css';

function AdminHeader({ Name }) {
  return (
    <div className="header">
      <h1 className="header-title">
        <span className="header-icon">⚡</span> Admin Control Center
      </h1>
      <p className="header-subtitle">
        Welcome {Name}!
        Manage users, monitor activity, and oversee platform operations
      </p>
    </div>
  );
}

export default AdminHeader;