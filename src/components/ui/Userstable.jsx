import React from 'react';

function UsersTable({ filteredUsers, handleStatusToggle, handleDelete }) {
  const getStatusBadge = (status) => {
    return status === 'active' 
      ? <span className="badge bg-success">Active</span>
      : <span className="badge bg-secondary">Inactive</span>;
  };

  const getRoleBadge = (role) => {
    return role === 'recruiter' 
      ? <span className="badge bg-primary">Recruiter</span>
      : <span className="badge bg-info">Job Seeker</span>;
  };

  return (
    <div className="users-table-container">
      <div className="table-header">
        <h5 className="mb-0">Users Management</h5>
        <span className="text-muted">({filteredUsers.length} users)</span>
      </div>
      
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Additional Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <strong>{user.name}</strong>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{getRoleBadge(user.role)}</td>
                <td>{getStatusBadge(user.status)}</td>
                <td>{user.joinDate}</td>
                <td>
                  <small className="text-muted">
                    {user.role === 'recruiter' 
                      ? `Company: ${user.company || 'N/A'}`
                      : `College: ${user.college || 'N/A'}`
                    }
                  </small>
                </td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <button 
                      className={`btn ${user.status === 'active' ? 'btn-warning' : 'btn-success'}`}
                      onClick={() => handleStatusToggle(user.id)}
                      title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                    >
                      {user.status === 'active' ? '⏸️' : '▶️'}
                    </button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleDelete(user.id)}
                      title="Delete User"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-4">
            <div className="text-muted">
              <i className="fas fa-users fa-2x mb-3"></i>
              <p>No users found matching your criteria.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersTable;
