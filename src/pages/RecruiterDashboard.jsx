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
    console.log('📥 Received update data from JobDetails:', updatedData);

    const response = await axios.put(`http://localhost:8000/api/jobs/${jobId}`, updatedData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    console.log('✅ Backend response:', response.data);

    // Create updated job object for local state
    const updatedJob = {
      id: response.data.id,
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
      applications: selectedJob?.applications || 0, // Keep existing count
      topMatches: selectedJob?.topMatches || 0, // Keep existing count
      postedDate: selectedJob?.postedDate || new Date().toISOString().split('T')[0],
      recruiter_id: response.data.recruiter_id,
      required_skills: response.data.required_skills || [],
      preferred_skills: response.data.preferred_skills || [],
      max_candidates: response.data.max_candidates || 5,
      status: response.data.status || 'active'
    };

    // Update jobs list
    setJobs(jobs.map(job => job.id === jobId ? updatedJob : job));
    
    // Update selected job
    setSelectedJob(updatedJob);

    alert('✅ Job updated successfully!');

  } catch (error) {
    console.error('❌ Update failed:', error);
    console.error('❌ Response status:', error.response?.status);
    console.error('❌ Response data:', error.response?.data);
    
    let errorMessage = 'Failed to update job. ';
    if (error.response?.data?.detail) {
      if (Array.isArray(error.response.data.detail)) {
        errorMessage += error.response.data.detail.map(err => `${err.loc?.join('.')} - ${err.msg}`).join(', ');
      } else {
        errorMessage += error.response.data.detail;
      }
    }
    
    alert('❌ ' + errorMessage);
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
    
    console.log(`📋 Fetching applications for job: ${job.title} (ID: ${job.id})`);
    
    // Fetch applications and match results in parallel
    const [applicationsRes, matchResultsRes] = await Promise.allSettled([
      axios.get('http://localhost:8000/api/job_applications', {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get('http://localhost:8000/api/ranked_applicant_matches', {
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => ({ data: [] })) // Don't fail if matches don't exist
    ]);

    // Handle applications response
    if (applicationsRes.status === 'rejected') {
      throw new Error('Failed to fetch applications');
    }

    // Filter applications for this specific job
    const jobApplications = applicationsRes.value.data.filter(app => app.job_id === job.id);
    
    if (jobApplications.length === 0) {
      setApplications([]);
      setSelectedJob(job);
      setCurrentView('applications');
      alert('ℹ️ No applications found for this job yet.');
      return;
    }

    console.log(`📊 Found ${jobApplications.length} applications`);

    // Create match scores lookup
    const matchScores = {};
    if (matchResultsRes.status === 'fulfilled' && matchResultsRes.value.data) {
      matchResultsRes.value.data
        .filter(match => match.job_id === job.id)
        .forEach(match => {
          matchScores[match.consultant_id] = {
            score: Math.round(match.match_score || 0),
            topSkills: match.top_skills_matched || [],
            missingSkills: match.missing_skills || [],
            report: match.report || ''
          };
        });
    }

    // Fetch consultant details with better error handling
    const applicationsWithDetails = await Promise.allSettled(
      jobApplications.map(async (app) => {
        try {
          const consultantRes = await axios.get(
            `http://localhost:8000/api/consultant_profiles/${app.consultant_id}`, 
            {
              headers: { Authorization: `Bearer ${token}` },
              timeout: 10000 // 10 second timeout
            }
          );
          
          const consultant = consultantRes.data;
          const matchData = matchScores[app.consultant_id] || {};
          
          return {
            id: app.id,
            name: consultant.name || 'Unknown',
            title: consultant.position || 'Consultant',
            email: consultant.primary_email || 'N/A',
            phone: consultant.mobile_no || 'N/A',
            location: consultant.location || 'N/A',
            experience: consultant.experience_years ? `${consultant.experience_years} years` : 'N/A',
            appliedDate: app.applied_at ? new Date(app.applied_at).toLocaleDateString() : 'N/A',
            appliedTime: app.applied_at ? new Date(app.applied_at).toLocaleTimeString() : 'N/A',
            matchScore: matchData.score || 0,
            topSkills: matchData.topSkills || [],
            missingSkills: matchData.missingSkills || [],
            report: matchData.report || '',
            consultant_id: app.consultant_id,
            application_id: app.id,
            status: 'Applied' // You might want to add status to your backend
          };
        } catch (error) {
          console.error(`❌ Error fetching consultant ${app.consultant_id}:`, error.message);
          
          // Return partial data for failed requests
          const matchData = matchScores[app.consultant_id] || {};
          return {
            id: app.id,
            name: 'Unknown Applicant',
            title: 'Consultant',
            email: 'N/A',
            phone: 'N/A',
            location: 'N/A',
            experience: 'N/A',
            appliedDate: app.applied_at ? new Date(app.applied_at).toLocaleDateString() : 'N/A',
            appliedTime: 'N/A',
            matchScore: matchData.score || 0,
            topSkills: matchData.topSkills || [],
            missingSkills: matchData.missingSkills || [],
            report: matchData.report || '',
            consultant_id: app.consultant_id,
            application_id: app.id,
            status: 'Applied',
            error: 'Failed to load profile details'
          };
        }
      })
    );

    // Process results and handle any failures
    const validApplications = applicationsWithDetails
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value)
      .sort((a, b) => {
        // Sort by match score (highest first), then by application date (newest first)
        if (a.matchScore !== b.matchScore) {
          return b.matchScore - a.matchScore;
        }
        return new Date(b.appliedDate) - new Date(a.appliedDate);
      });

    const failedCount = applicationsWithDetails.filter(result => result.status === 'rejected').length;
    
    if (failedCount > 0) {
      console.warn(`⚠️ Failed to load ${failedCount} applicant profiles`);
    }

    console.log(`✅ Successfully loaded ${validApplications.length} applications with details`);

    setApplications(validApplications);
    setSelectedJob({
      ...job,
      applicationsCount: validApplications.length,
      averageMatchScore: validApplications.length > 0 
        ? Math.round(validApplications.reduce((sum, app) => sum + app.matchScore, 0) / validApplications.length)
        : 0
    });
    setCurrentView('applications');

    // Show success notification
    if (validApplications.length > 0) {
      alert(`✅ Loaded ${validApplications.length} applications successfully!`);
    }

  } catch (error) {
    console.error('❌ Error in handleViewApplications:', error);
    
    let errorMessage = 'Failed to load applications. ';
    if (error.response?.status === 401) {
      errorMessage += 'Please log in again.';
      // Optionally redirect to login
      // navigate('/');
    } else if (error.response?.status === 403) {
      errorMessage += 'You do not have permission to view these applications.';
    } else if (error.code === 'NETWORK_ERROR') {
      errorMessage += 'Please check your internet connection.';
    } else {
      errorMessage += error.response?.data?.detail || error.message || 'Please try again.';
    }
    
    alert('❌ ' + errorMessage);
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
