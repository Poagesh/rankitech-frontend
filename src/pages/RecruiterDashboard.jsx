import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [recruiterData, setRecruiterData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [topMatches, setTopMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('access_token');
  const role = localStorage.getItem('role');
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();

  // Fetch recruiter profile
  useEffect(() => {
    const fetchRecruiterProfile = async () => {
      try {
        const [profileRes, recruiterRes] = await Promise.all([
          axios.get('http://localhost:8000/api/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
              'X-User-Id': user_id,
              'X-User-Role': role,
            },
          }),
          axios.get(`http://localhost:8000/api/get-recruiter/${user_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        setUserName(profileRes.data.name);
        setRecruiterData({
          name: recruiterRes.data.name,
          position: 'Recruiter',
          email: recruiterRes.data.email,
          phone: recruiterRes.data.phone_number || 'N/A',
          location: recruiterRes.data.location || 'N/A',
          joinDate: recruiterRes.data.created_at ? new Date(recruiterRes.data.created_at).toLocaleDateString() : 'N/A',
          department: 'Human Resources',
          company: recruiterRes.data.company_name || 'N/A'
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        navigate('/');
      }
    };

    if (token && role === 'recruiter') {
      fetchRecruiterProfile();
    } else {
      navigate('/');
    }
  }, [token, navigate, role, user_id]);

  // Fetch jobs posted by this recruiter
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/jobs/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Filter jobs by current recruiter
        const recruiterJobs = response.data.filter(job => job.recruiter_id == user_id);
        
        // Format jobs for the frontend
        const formattedJobs = recruiterJobs.map(job => ({
          id: job.id,
          title: job.job_title,
          description: job.job_description || 'No description provided',
          skills: Array.isArray(job.required_skills) ? job.required_skills.join(', ') : job.required_skills || '',
          location: job.location || 'Remote',
          experience_level: job.experience_level || 'Any',
          salary_range: job.salary_range || 'Competitive',
          applications: 0, // Will be updated when we fetch applications
          topMatches: 0,   // Will be updated when we fetch matches
          postedDate: job.created_at ? job.created_at.split('T')[0] : new Date().toISOString().split('T'),
          recruiter_id: job.recruiter_id,
          required_skills: job.required_skills || [],
          preferred_skills: job.preferred_skills || []
        }));

        setJobs(formattedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        alert('Failed to load jobs. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };

    if (token && user_id) {
      fetchJobs();
    }
  }, [token, user_id]);

  // Fetch applications for recruiter's jobs
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/job_applications', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Filter applications for this recruiter's jobs
        const recruiterJobIds = jobs.map(job => job.id);
        const recruiterApplications = response.data.filter(app => 
          recruiterJobIds.includes(app.job_id)
        );

        setApplications(recruiterApplications);

        // Update job application counts
        setJobs(prevJobs => 
          prevJobs.map(job => ({
            ...job,
            applications: recruiterApplications.filter(app => app.job_id === job.id).length
          }))
        );
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    if (jobs.length > 0) {
      fetchApplications();
    }
  }, [jobs.length, token]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handlePostJob = async (jobData) => {
  try {
    const postPayload = {
      job_title: jobData.title?.trim() || '',
      job_description: jobData.description?.trim() || '',
      location: jobData.location?.trim() || 'Remote',
      employment_type: jobData.employment_type?.trim() || 'Full-time',
      experience_level: jobData.experience_level?.trim() || 'Any',
      salary_range: jobData.salary_range?.trim() || 'Competitive',
      recruiter_id: parseInt(user_id),
      required_skills: jobData.skills 
        ? (Array.isArray(jobData.skills) 
           ? jobData.skills 
           : jobData.skills.split(',').map(s => s.trim()).filter(s => s.length > 0))
        : [],
      preferred_skills: jobData.preferred_skills 
        ? (Array.isArray(jobData.preferred_skills) 
           ? jobData.preferred_skills 
           : jobData.preferred_skills.split(',').map(s => s.trim()).filter(s => s.length > 0))
        : [],
      deadline_to_apply: jobData.deadline_to_apply 
        ? new Date(jobData.deadline_to_apply + 'T23:59:59.999Z').toISOString()
        : null
    };

    console.log('📤 Posting job:', postPayload);

    const response = await axios.post('http://localhost:8000/api/new-job', postPayload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Add the new job to local state
    const newJob = {
      id: response.data.id,
      title: response.data.job_title,
      description: response.data.job_description,
      skills: Array.isArray(response.data.required_skills) 
        ? response.data.required_skills.join(', ') 
        : response.data.required_skills || '',
      location: response.data.location || 'Remote',
      experience_level: response.data.experience_level || 'Any',
      employment_type: response.data.employment_type || 'Full-time',
      salary_range: response.data.salary_range || 'Competitive',
      deadline_to_apply: response.data.deadline_to_apply,
      applications: 0,
      topMatches: 0,
      postedDate: new Date().toISOString().split('T')[0],
      recruiter_id: response.data.recruiter_id,
      required_skills: response.data.required_skills || [],
      preferred_skills: response.data.preferred_skills || []
    };

    setJobs([...jobs, newJob]);
    setCurrentView('dashboard');
    alert('Job posted successfully!');
  } catch (error) {
    console.error('Error posting job:', error);
    console.error('Response:', error.response?.data);
    alert(error.response?.data?.detail || 'Failed to post job. Please try again.');
  }
};


  const handleUpdateJob = async (jobId, updatedData) => {
  try {
    const updatePayload = {};
    
    // Map all fields from JobUpdate schema
    if (updatedData.title?.trim()) {
      updatePayload.job_title = updatedData.title.trim();
    }
    if (updatedData.description?.trim()) {
      updatePayload.job_description = updatedData.description.trim();
    }
    if (updatedData.skills?.trim()) {
      updatePayload.required_skills = updatedData.skills
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);
    }
    if (updatedData.preferred_skills?.trim()) {
      updatePayload.preferred_skills = updatedData.preferred_skills
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);
    }
    if (updatedData.location?.trim()) {
      updatePayload.location = updatedData.location.trim();
    }
    if (updatedData.experience_level?.trim()) {
      updatePayload.experience_level = updatedData.experience_level.trim();
    }
    if (updatedData.salary_range?.trim()) {
      updatePayload.salary_range = updatedData.salary_range.trim();
    }
    if (updatedData.employment_type?.trim()) {
      updatePayload.employment_type = updatedData.employment_type.trim();
    }
    if (updatedData.deadline_to_apply?.trim()) {
      // Convert date to ISO datetime format for backend
      updatePayload.deadline_to_apply = new Date(updatedData.deadline_to_apply + 'T23:59:59.999Z').toISOString();
    }

    console.log('📤 Sending update payload:', JSON.stringify(updatePayload, null, 2));

    const response = await axios.put(`http://localhost:8000/api/jobs/${jobId}`, updatePayload, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    console.log('✅ Update response:', response.data);

    // Update local state with response data
    const updatedJob = {
      ...selectedJob,
      title: response.data.job_title,
      description: response.data.job_description,
      skills: Array.isArray(response.data.required_skills) 
        ? response.data.required_skills.join(', ') 
        : response.data.required_skills || '',
      location: response.data.location,
      experience_level: response.data.experience_level,
      salary_range: response.data.salary_range,
      employment_type: response.data.employment_type,
      deadline_to_apply: response.data.deadline_to_apply,
      required_skills: response.data.required_skills || [],
      preferred_skills: response.data.preferred_skills || []
    };

    setJobs(jobs.map(job => job.id === jobId ? updatedJob : job));
    setSelectedJob(updatedJob);
    alert('Job updated successfully!');

  } catch (error) {
    console.error('❌ Update failed:', error);
    console.error('❌ Response status:', error.response?.status);
    console.error('❌ Response data:', error.response?.data);
    console.error('❌ Validation errors:', error.response?.data?.detail);
    
    let errorMessage = 'Failed to update job. ';
    if (error.response?.data?.detail) {
      if (Array.isArray(error.response.data.detail)) {
        errorMessage += error.response.data.detail.map(err => `${err.loc?.join('.')} - ${err.msg}`).join(', ');
      } else {
        errorMessage += error.response.data.detail;
      }
    }
    
    alert(errorMessage);
  }
};


  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      await axios.delete(`http://localhost:8000/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setJobs(jobs.filter(job => job.id !== jobId));
      setCurrentView('jobsList');
      alert('Job deleted successfully!');
    } catch (error) {
      console.error('Error deleting job:', error);
      alert(error.response?.data?.detail || 'Failed to delete job. Please try again.');
    }
  };

  const handleViewApplications = async (job) => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/job_applications', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Filter applications for this specific job and get consultant details
      const jobApplications = response.data.filter(app => app.job_id === job.id);
      
      // Fetch consultant details for each application
      const applicationsWithDetails = await Promise.all(
        jobApplications.map(async (app) => {
          try {
            const consultantRes = await axios.get(`http://localhost:8000/api/consultant_profiles/${app.consultant_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            
            return {
              id: app.id,
              name: consultantRes.data.name,
              title: 'Consultant', // You might want to add a title field to consultant profile
              email: consultantRes.data.primary_email,
              phone: consultantRes.data.mobile_no || 'N/A',
              appliedDate: app.applied_at ? app.applied_at.split('T')[0] : 'N/A',
              matchScore: 0, // Will be updated when we get match results
              consultant_id: app.consultant_id
            };
          } catch (error) {
            console.error(`Error fetching consultant ${app.consultant_id}:`, error);
            return {
              id: app.id,
              name: 'Unknown',
              title: 'Consultant',
              email: 'N/A',
              phone: 'N/A',
              appliedDate: app.applied_at ? app.applied_at.split('T')[0] : 'N/A',
              matchScore: 0,
              consultant_id: app.consultant_id
            };
          }
        })
      );

      setApplications(applicationsWithDetails);
      setSelectedJob(job);
      setCurrentView('applications');
    } catch (error) {
      console.error('Error fetching applications:', error);
      alert('Failed to load applications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewTopMatches = async (job) => {
    try {
      setLoading(true);
      
      // Use the rank-job-applicants endpoint to get AI-powered matches
      const response = await axios.post('http://localhost:8000/api/rank-job-applicants', {
        job_id: job.id
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const matches = response.data.map(match => ({
        id: match.consultant_id,
        name: match.consultant_name,
        title: 'Consultant',
        matchScore: Math.round(match.match_score),
        skills: match.top_skills_matched || [],
        experience: 'N/A', // Add experience field to your backend if needed
        report: match.report,
        missing_skills: match.missing_skills || []
      }));

      setTopMatches(matches);
      setSelectedJob(job);
      setCurrentView('topMatches');
    } catch (error) {
      console.error('Error fetching top matches:', error);
      alert(error.response?.data?.detail || 'Failed to load top matches. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderCurrentView = () => {
    if (loading) {
      return (
        <div className="container mt-5">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading...</p>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'profile':
        return (
          <RecruiterProfile 
            recruiter={recruiterData}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            onPostJob={() => setCurrentView('postJob')}
            onViewJobs={() => setCurrentView('jobsList')}
            jobsCount={jobs.length}
            totalApplications={applications.length}
          />
        );
      case 'postJob':
        return (
          <PostJob
            onBack={() => setCurrentView('dashboard')}
            onPostJob={handlePostJob}
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
            onDeleteJob={handleDeleteJob}
          />
        );
      case 'jobDetails':
        return (
          <JobDetails
            job={selectedJob}
            onBack={() => setCurrentView('jobsList')}
            onUpdateJob={handleUpdateJob}
            onViewApplications={handleViewApplications}
            onViewTopMatches={handleViewTopMatches}
            onDeleteJob={handleDeleteJob}
          />
        );
      case 'applications':
        return (
          <Applications
            job={selectedJob}
            applications={applications}
            onBack={() => setCurrentView('jobDetails')}
          />
        );
      case 'topMatches':
        return (
          <TopMatches
            job={selectedJob}
            topMatches={topMatches}
            onBack={() => setCurrentView('jobDetails')}
          />
        );
      default:
        return (
          <Dashboard
            onPostJob={() => setCurrentView('postJob')}
            onViewJobs={() => setCurrentView('jobsList')}
            jobsCount={jobs.length}
            totalApplications={applications.length}
          />
        );
    }
  };

  return (
    <div>
      <Header 
        Name={userName} 
        onProfileClick={() => setCurrentView('profile')} 
        onLogout={handleLogout} 
      />
      {renderCurrentView()}
    </div>
  );
};

export default RecruiterDashboard;
