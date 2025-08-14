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
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    emailsSent: 0
  });

  const token = localStorage.getItem('access_token');
  const role = localStorage.getItem('role');
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();

  // Fetch admin profile
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
  }, [token, navigate, user_id, role]);

  // Fetch all users (consultants + recruiters)
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        
        // Fetch consultants (job seekers)
        const consultantsResponse = await axios.get('http://localhost:8000/api/consultant_profiles', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Fetch recruiters
        const recruitersResponse = await axios.get('http://localhost:8000/api/recruiters', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Fetch jobs for stats
        const jobsResponse = await axios.get('http://localhost:8000/api/jobs/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Fetch job applications for stats
        const applicationsResponse = await axios.get('http://localhost:8000/api/job_applications', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Format consultants data
        const consultants = consultantsResponse.data.map(consultant => ({
          id: `consultant_${consultant.id}`,
          originalId: consultant.id,
          name: consultant.name,
          email: consultant.primary_email,
          role: 'user',
          status: 'active', // You can add status field to backend if needed
          joinDate: consultant.created_at ? consultant.created_at.split('T')[0] : 'N/A',
          type: 'consultant',
          college: consultant.college,
          city: consultant.city,
          mobile: consultant.mobile_no
        }));

        // Format recruiters data
        const recruiters = recruitersResponse.data.map(recruiter => ({
          id: `recruiter_${recruiter.id}`,
          originalId: recruiter.id,
          name: recruiter.name,
          email: recruiter.email,
          role: 'recruiter',
          status: 'active',
          joinDate: recruiter.created_at ? recruiter.created_at.split('T')[0] : 'N/A',
          type: 'recruiter',
          company: recruiter.company_name,
          phone: recruiter.phone_number
        }));

        // Combine all users
        const allUsers = [...consultants, ...recruiters];
        setUsers(allUsers);
        setFilteredUsers(allUsers);

        // Set stats
        setStats({
          totalJobs: jobsResponse.data.length,
          totalApplications: applicationsResponse.data.length,
          emailsSent: Math.floor(Math.random() * 50 + 10) // Mock data, replace with real endpoint
        });

      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Failed to load user data. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };

    if (token && role === 'admin') {
      fetchAllUsers();
    } else {
      navigate('/');
    }
  }, [token, role, navigate]);

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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const user = users.find(u => u.id === id);
      if (!user) return;

      if (user.type === 'consultant') {
        await axios.delete(`http://localhost:8000/api/consultant_profiles/${user.originalId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (user.type === 'recruiter') {
        await axios.delete(`http://localhost:8000/api/delete-recruiter/${user.originalId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // Remove from local state
      setUsers(prev => prev.filter(user => user.id !== id));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert(error.response?.data?.detail || 'Failed to delete user');
    }
  };

  const handleStatusToggle = async (id) => {
    // Note: You'll need to add status update endpoints to your backend
    // For now, this just toggles locally
    setUsers(prev =>
      prev.map(user =>
        user.id === id
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      )
    );
    
    // TODO: Make API call to update status in backend
    // const user = users.find(u => u.id === id);
    // await axios.put(`http://localhost:8000/api/update-user-status/${user.originalId}`, {
    //   status: user.status === 'active' ? 'inactive' : 'active'
    // });
  };

  // Calculate stats
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const recruiters = users.filter(u => u.role === 'recruiter').length;
  const jobSeekers = users.filter(u => u.role === 'user').length;

  if (loading) {
    return (
      <div className="dashboard">
        <Header Name={userName} onProfileClick={() => {}} onLogout={handleLogout} />
        <div className="container">
          <div className="text-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Header Name={userName} onProfileClick={() => {}} onLogout={handleLogout} />
      <div className="container">
        <AdminHeader Name={userName} />
        
        <div className="row mb-2 flex">
          <StatsCard 
            icon="👥" 
            value={totalUsers} 
            label="Total Users" 
            colorClass="color-blue" 
          />
          <StatsCard 
            icon="✅" 
            value={activeUsers} 
            label="Active Users" 
            colorClass="color-green" 
          />
          <StatsCard 
            icon="🏢" 
            value={recruiters} 
            label="Recruiters" 
            colorClass="color-blue-dark" 
          />
          <StatsCard 
            icon="🎯" 
            value={jobSeekers} 
            label="Job Seekers" 
            colorClass="color-yellow" 
          />
          <StatsCard 
            icon="📊" 
            value={stats.emailsSent} 
            label="Emails Sent" 
            colorClass="color-purple" 
          />
          <StatsCard 
            icon="🔍" 
            value={stats.totalJobs} 
            label="Jobs Posted" 
            colorClass="color-gray" 
          />
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
