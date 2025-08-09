import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import RecruiterProfile from '../components/ui/RecruiterProfile';
import Dashboard from '../components/ui/Dashboard';
import PostJob from '../components/ui/PostJob';
import JobsList from '../components/ui/JobsList';
import JobDetails from '../components/ui/JobDetails';
import Applications from '../components/ui/Applications';
import TopMatches from '../components/ui/TopMatches';

const RecruiterDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedJob, setSelectedJob] = useState(null);
  const [userName, setUserName] = useState('');

  const token = localStorage.getItem('access_token');
  const role = localStorage.getItem('role');
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();
  
  // Mock data
  const [recruiter] = useState({
    name: 'Sarah Johnson',
    position: 'Senior Technical Recruiter',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'January 2022',
    department: 'Human Resources'
  });

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
          console.log(res.data);
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

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      description: 'We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for developing user-facing web applications using modern JavaScript frameworks.',
      skills: 'React, TypeScript, CSS, HTML',
      applications: 15,
      topMatches: 5,
      postedDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Backend Engineer',
      description: 'Join our backend team to build scalable server-side applications. You will work with microservices architecture and cloud technologies.',
      skills: 'Node.js, Python, AWS, Docker',
      applications: 23,
      topMatches: 8,
      postedDate: '2024-01-10'
    }
  ]);

  // Mock applications data
  const mockApplications = [
    {
      id: 1,
      name: 'John Smith',
      title: 'Frontend Developer',
      email: 'john.smith@email.com',
      phone: '+1 (555) 987-6543',
      appliedDate: '2024-01-20',
      matchScore: 92
    },
    {
      id: 2,
      name: 'Emily Chen',
      title: 'React Developer',
      email: 'emily.chen@email.com',
      phone: '+1 (555) 456-7890',
      appliedDate: '2024-01-18',
      matchScore: 88
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      title: 'Full Stack Developer',
      email: 'michael.r@email.com',
      phone: '+1 (555) 321-0987',
      appliedDate: '2024-01-16',
      matchScore: 85
    }
  ];

  // Mock top matches data
  const mockTopMatches = [
    {
      id: 1,
      name: 'Alex Thompson',
      title: 'Senior Frontend Developer',
      matchScore: 95,
      skills: ['React', 'TypeScript', 'CSS', 'HTML', 'JavaScript'],
      experience: 6
    },
    {
      id: 2,
      name: 'Jessica Wang',
      title: 'Frontend Engineer',
      matchScore: 91,
      skills: ['React', 'TypeScript', 'CSS', 'Next.js'],
      experience: 4
    },
    {
      id: 3,
      name: 'David Kim',
      title: 'UI Developer',
      matchScore: 87,
      skills: ['React', 'CSS', 'HTML', 'Sass'],
      experience: 5
    }
  ];

  const handlePostJob = (jobData) => {
    const newJob = {
      id: jobs.length + 1,
      ...jobData,
      applications: 0,
      topMatches: 0,
      postedDate: new Date().toISOString().split('T')[0]
    };
    setJobs([...jobs, newJob]);
    setCurrentView('dashboard');
    alert('Job posted successfully!');
  };

  const handleUpdateJob = (jobId, updatedData) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, ...updatedData } : job
    ));
    setSelectedJob({ ...selectedJob, ...updatedData });
    alert('Job updated successfully!');
  };


  const renderCurrentView = () => {
    switch (currentView) {
      case 'profile':
        return (
          <RecruiterProfile 
            recruiter={recruiter}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            onPostJob={() => setCurrentView('postJob')}
            onViewJobs={() => setCurrentView('jobsList')}
            jobsCount={jobs.length}
          />
        );
      case 'postJob':
        return (
          <PostJob
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'jobsList':
        return (
          <JobsList
            jobs={jobs}
            onBack={() => setCurrentView('dashboard')}
            onJobClick={(job) => {
              setSelectedJob(job);
              setCurrentView('jobDetails');
            }}
          />
        );
      case 'jobDetails':
        return (
          <JobDetails
            job={selectedJob}
            onBack={() => setCurrentView('jobsList')}
            onUpdateJob={handleUpdateJob}
            onViewApplications={(job) => {
              setSelectedJob(job);
              setCurrentView('applications');
            }}
            onViewTopMatches={(job) => {
              setSelectedJob(job);
              setCurrentView('topMatches');
            }}
          />
        );
      case 'applications':
        return (
          <Applications
            job={selectedJob}
            applications={mockApplications}
            onBack={() => setCurrentView('jobDetails')}
          />
        );
      case 'topMatches':
        return (
          <TopMatches
            job={selectedJob}
            topMatches={mockTopMatches}
            onBack={() => setCurrentView('jobDetails')}
          />
        );
      default:
        return (
          <Dashboard
            onPostJob={() => setCurrentView('postJob')}
            onViewJobs={() => setCurrentView('jobsList')}
            jobsCount={jobs.length}
          />
        );
    }
  };

  return (
    <div>
      <Header Name={userName} onProfileClick={() => {}} onLogout={handleLogout} />
      {renderCurrentView()}
    </div>
  );
};

export default RecruiterDashboard;