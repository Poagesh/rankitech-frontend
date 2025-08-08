import React from 'react';
import '../../styles/styles.css';

function Filters({ searchTerm, setSearchTerm, filterRole, setFilterRole, filterStatus, setFilterStatus }) {
  return (
    <div className="filters-card">
      <div className="section-header">
        <span className="section-icon">🔍</span>
        <h5 className="section-title">Search & Filter Users</h5>
      </div>
      <div className="filters-row">
        <div className="filters-column filters-column-6">
          <label className="form-label">Search Users</label>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filters-column filters-column-3">
          <label className="form-label">Filter by Role</label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="form-select"
          >
            <option value="all">All Roles</option>
            <option value="user">Job Seekers</option>
            <option value="recruiter">Recruiters</option>
          </select>
        </div>
        <div className="filters-column filters-column-3">
          <label className="form-label">Filter by Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filters;