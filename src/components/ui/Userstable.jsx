import React from 'react';
import '../../styles/styles.css';

function UsersTable({ filteredUsers, handleStatusToggle, handleDelete }) {
  const getRoleBadgeStyle = (role) =>
    role === 'recruiter'
      ? 'role-badge role-badge-recruiter'
      : 'role-badge role-badge-user';

  const getStatusBadgeStyle = (status) =>
    status === 'active'
      ? 'status-badge status-badge-active'
      : 'status-badge status-badge-inactive';

  return (
    <div className="table-card">
      <div className="section-header">
        <span className="section-icon">👤</span>
        <h5 className="section-title">
          User Management ({filteredUsers.length} users)
        </h5>
      </div>
      <div className="table-responsive">
        <table className="user-table">
          <thead>
            <tr className="table-header">
              <th>count</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className="user-row">
                <td className="fw-semibold">{index + 1}</td>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <strong>{user.name}</strong>
                  </div>
                </td>
                <td className="text-muted">{user.email}</td>
                <td>
                  <span className={getRoleBadgeStyle(user.role)}>
                    {user.role === 'recruiter' ? '🏢 Recruiter' : '🎯 Job Seeker'}
                  </span>
                </td>
                <td>
                  <span className={getStatusBadgeStyle(user.status)}>
                    {user.status === 'active' ? '✅ Active' : '⏸️ Inactive'}
                  </span>
                </td>
                <td className="text-muted">{user.joinDate}</td>
                <td>
                  <button
                    onClick={() => handleStatusToggle(user.id)}
                    className={`action-button ${
                      user.status === 'active' ? 'button-suspend' : 'button-activate'
                    }`}
                  >
                    {user.status === 'active' ? 'Suspend' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="action-button button-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredUsers.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h5 className="no-results-title">No users found</h5>
          <p className="no-results-text">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}

export default UsersTable;