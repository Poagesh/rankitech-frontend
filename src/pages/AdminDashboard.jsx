import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/ui/Adminheader';
import Header from '../components/ui/Header';
import StatsCard from '../components/ui/Statscards';
import Filters from '../components/ui/Filters';
import UsersTable from '../components/ui/Userstable';
import '../styles/styles.css';
import axios from 'axios';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [userName, setUserName] = useState('');

  const token = localStorage.getItem('access_token');
  const role = localStorage.getItem('role');
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();

  // Mock data
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


  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-User-Id': user_id,
            'X-User-Role': role,
          },
        });
        setUserName(res.data.name);
      } catch (err) {
        console.error(err);
        navigate('/'); 
      }
    };

    fetchUserName();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // Filter users
  useEffect(() => {
    let filtered = users;
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }
    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.status === filterStatus);
    }
    setFilteredUsers(filtered);
  }, [users, searchTerm, filterRole, filterStatus]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };

  const handleStatusToggle = (id) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      )
    );
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const recruiters = users.filter(u => u.role === 'recruiter').length;
  const jobSeekers = users.filter(u => u.role === 'user').length;

  return (
      <div className="dashboard">
        <Header Name={userName} onProfileClick={() => {}} onLogout={handleLogout} />
    <div className="container">
        <AdminHeader Name={userName} />
        <div className="stats-row">
          
            <StatsCard icon="👥" value={totalUsers} label="Total Users" colorClass="color-blue" />
          
          
            <StatsCard icon="✅" value={activeUsers} label="Active Users" colorClass="color-green" />
          
          
            <StatsCard icon="🏢" value={recruiters} label="Recruiters" colorClass="color-blue-dark" />
          
          
            <StatsCard icon="🎯" value={jobSeekers} label="Job Seekers" colorClass="color-yellow" />

            <StatsCard icon="📊" value={2} label="Mail Sent" colorClass="color-purple" />

            <StatsCard icon="🔍" value={6} label="Jobs Posted" colorClass="color-gray" />
        </div>
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterRole={filterRole}
          setFilterRole={setFilterRole}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        <UsersTable
          filteredUsers={filteredUsers}
          handleStatusToggle={handleStatusToggle}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;