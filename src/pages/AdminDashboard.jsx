import { useState, useEffect } from 'react';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for now
  useEffect(() => {
    const mockUsers = [
      { id: 1, name: 'Monish Soorya', email: 'monish@example.com', role: 'user', status: 'active', joinDate: '2024-01-15' },
      { id: 2, name: 'Priya Ramesh', email: 'priya@hire.com', role: 'recruiter', status: 'active', joinDate: '2024-02-20' },
      { id: 3, name: 'Arjun V', email: 'arjun@xyz.com', role: 'user', status: 'inactive', joinDate: '2024-01-10' },
      { id: 4, name: 'Sarah Johnson', email: 'sarah@tech.com', role: 'recruiter', status: 'active', joinDate: '2024-03-05' },
      { id: 5, name: 'Raj Kumar', email: 'raj@dev.com', role: 'user', status: 'active', joinDate: '2024-02-28' },
    ];
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  // Filter users based on search and filters
  useEffect(() => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.status === filterStatus);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filterRole, filterStatus]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // TODO: Call API
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  const handleStatusToggle = (id) => {
    setUsers(prev => prev.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f5e8 50%, #f0f9ff 100%)',
      padding: '20px 0'
    },
    header: {
      background: 'linear-gradient(135deg, #9c27b0, #673ab7)',
      borderRadius: '20px',
      color: 'white',
      padding: '30px',
      marginBottom: '30px',
      boxShadow: '0 10px 30px rgba(156, 39, 176, 0.2)'
    },
    statsCard: {
      backgroundColor: 'white',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
      border: '1px solid #e8f5e8',
      marginBottom: '20px'
    },
    filtersCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '25px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
      border: '1px solid #e8f5e8',
      marginBottom: '25px'
    },
    tableCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      border: '1px solid #e8f5e8'
    },
    searchInput: {
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '12px 15px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#fafafa'
    },
    searchInputFocus: {
      borderColor: '#9c27b0',
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(156, 39, 176, 0.1)'
    },
    select: {
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '12px 15px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#fafafa',
      cursor: 'pointer'
    },
    selectFocus: {
      borderColor: '#9c27b0',
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(156, 39, 176, 0.1)'
    },
    userRow: {
      borderRadius: '10px',
      transition: 'all 0.3s ease',
      backgroundColor: 'white'
    },
    userRowHover: {
      backgroundColor: '#f8f9fa',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
    },
    actionButton: {
      padding: '6px 12px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginRight: '5px'
    },
    badge: {
      padding: '6px 12px',
      borderRadius: '15px',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    roleBadge: {
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500',
      textTransform: 'capitalize'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px'
    }
  };

  const getRoleBadgeStyle = (role) => {
    return role === 'recruiter' 
      ? { ...styles.roleBadge, backgroundColor: '#e3f2fd', color: '#1976d2' }
      : { ...styles.roleBadge, backgroundColor: '#f3e5f5', color: '#7b1fa2' };
  };

  const getStatusBadgeStyle = (status) => {
    return status === 'active'
      ? { ...styles.badge, backgroundColor: '#e8f5e8', color: '#2e7d32' }
      : { ...styles.badge, backgroundColor: '#fafafa', color: '#757575' };
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const recruiters = users.filter(u => u.role === 'recruiter').length;
  const jobSeekers = users.filter(u => u.role === 'user').length;

  return (
    <div style={styles.container}>
      <div className="container">
        {/* Header Section */}
        <div style={styles.header} className="text-center">
          <h1 className="mb-3">
            <span style={{fontSize: '2rem', marginRight: '10px'}}>⚡</span>
            Admin Control Center
          </h1>
          <p className="mb-0 fs-5">Manage users, monitor activity, and oversee platform operations</p>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div style={styles.statsCard} className="text-center">
              <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>👥</div>
              <h3 className="text-primary mb-1">{totalUsers}</h3>
              <p className="text-muted mb-0">Total Users</p>
            </div>
          </div>
          <div className="col-md-3">
            <div style={styles.statsCard} className="text-center">
              <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>✅</div>
              <h3 className="text-success mb-1">{activeUsers}</h3>
              <p className="text-muted mb-0">Active Users</p>
            </div>
          </div>
          <div className="col-md-3">
            <div style={styles.statsCard} className="text-center">
              <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>🏢</div>
              <h3 className="text-info mb-1">{recruiters}</h3>
              <p className="text-muted mb-0">Recruiters</p>
            </div>
          </div>
          <div className="col-md-3">
            <div style={styles.statsCard} className="text-center">
              <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>🎯</div>
              <h3 className="text-warning mb-1">{jobSeekers}</h3>
              <p className="text-muted mb-0">Job Seekers</p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div style={styles.filtersCard}>
          <div style={styles.sectionHeader}>
            <span style={{fontSize: '1.5rem'}}>🔍</span>
            <h5 className="mb-0 text-dark">Search & Filter Users</h5>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <label className="form-label fw-semibold text-dark">Search Users</label>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                style={styles.searchInput}
                onFocus={(e) => Object.assign(e.target.style, styles.searchInputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.searchInput)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold text-dark">Filter by Role</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="form-select"
                style={styles.select}
                onFocus={(e) => Object.assign(e.target.style, styles.selectFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.select)}
              >
                <option value="all">All Roles</option>
                <option value="user">Job Seekers</option>
                <option value="recruiter">Recruiters</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold text-dark">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="form-select"
                style={styles.select}
                onFocus={(e) => Object.assign(e.target.style, styles.selectFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.select)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div style={styles.tableCard}>
          <div style={styles.sectionHeader}>
            <span style={{fontSize: '1.5rem'}}>👤</span>
            <h5 className="mb-0 text-dark">User Management ({filteredUsers.length} users)</h5>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr style={{backgroundColor: '#f8f9fa'}}>
                  <th className="fw-bold text-dark">#</th>
                  <th className="fw-bold text-dark">👤 User</th>
                  <th className="fw-bold text-dark">📧 Email</th>
                  <th className="fw-bold text-dark">🎭 Role</th>
                  <th className="fw-bold text-dark">📊 Status</th>
                  <th className="fw-bold text-dark">📅 Joined</th>
                  <th className="fw-bold text-dark">⚙️ Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr 
                    key={user.id}
                    style={styles.userRow}
                    onMouseEnter={(e) => Object.assign(e.target.parentNode.style, styles.userRowHover)}
                    onMouseLeave={(e) => Object.assign(e.target.parentNode.style, styles.userRow)}
                  >
                    <td className="fw-semibold">{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div 
                          style={{
                            width: '35px',
                            height: '35px',
                            borderRadius: '50%',
                            backgroundColor: '#e3f2fd',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '10px',
                            fontSize: '14px'
                          }}
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <strong>{user.name}</strong>
                      </div>
                    </td>
                    <td className="text-muted">{user.email}</td>
                    <td>
                      <span style={getRoleBadgeStyle(user.role)}>
                        {user.role === 'recruiter' ? '🏢 Recruiter' : '🎯 Job Seeker'}
                      </span>
                    </td>
                    <td>
                      <span style={getStatusBadgeStyle(user.status)}>
                        {user.status === 'active' ? '✅ Active' : '⏸️ Inactive'}
                      </span>
                    </td>
                    <td className="text-muted">{user.joinDate}</td>
                    <td>
                      <button
                        onClick={() => handleStatusToggle(user.id)}
                        style={{
                          ...styles.actionButton,
                          backgroundColor: user.status === 'active' ? '#ff9800' : '#4caf50',
                          color: 'white'
                        }}
                        onMouseOver={(e) => e.target.style.opacity = '0.8'}
                        onMouseOut={(e) => e.target.style.opacity = '1'}
                      >
                        {user.status === 'active' ? '⏸️ Suspend' : '▶️ Activate'}
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        style={{
                          ...styles.actionButton,
                          backgroundColor: '#f44336',
                          color: 'white'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#d32f2f'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-5">
              <div style={{fontSize: '3rem', marginBottom: '20px'}}>🔍</div>
              <h5 className="text-muted">No users found</h5>
              <p className="text-muted">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;