import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styles } from '../styles/styles';
import Header from '../components/ui/Header';
import UserHeader from '../components/ui/Userheader';
import StatsCard from '../components/ui/Statscards';
import ResumeUpload from '../components/ui/Resumeupload';
import JobCard from '../components/ui/Jobcard';
import ConsultantProfile from '../components/ui/ConsultantProfile';

function UserDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [userName, setUserName] = useState('');
  const [consultantData, setConsultantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [matchResults, setMatchResults] = useState([]);

  const token = localStorage.getItem('access_token');
  const role = localStorage.getItem('role');
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();

  // Fetch logged-in user's name and basic info
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
  }, [token, navigate, role, user_id]);

  // Fetch consultant full profile
  useEffect(() => {
    const fetchConsultantProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/consultant_profiles/${user_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConsultantData(response.data);
      } catch (error) {
        console.error('Error fetching consultant profile:', error);
        // If profile fetch fails, we can still show the dashboard
      }
    };

    if (token && user_id && role === 'user') {
      fetchConsultantProfile();
    }
  }, [token, user_id, role]);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:8000/api/jobs/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Map backend fields to JobCard-friendly format with safe defaults
        const jobs = res.data.map((job) => ({
          id: job.id,
          jobTitle: job.job_title || "Untitled Job",
          company: job.company_name || "Unknown Company",
          location: job.location || "Remote",
          experienceLevel: job.experience_level || "Any",
          matchScore: job.match_score || Math.floor(Math.random() * 30 + 70), // Random score 70-100 for demo
          description: job.job_description || "No description available",
          requiredSkills: job.required_skills || [],
          preferredSkills: job.preferred_skills || [],
          salaryRange: job.salary_range || "Competitive",
          postedDate: job.posted_date || new Date().toISOString().split('T')[0]
        }));

        setMatchedJobs(jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        alert("Failed to load jobs. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchJobs();
    }
  }, [token]);

  // Fetch user's job applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/job_applications', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Filter applications for this user
        const userApplications = response.data.filter(app => app.consultant_id == user_id);
        setApplications(userApplications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    if (token && user_id) {
      fetchApplications();
    }
  }, [token, user_id]);

  // Fetch match results
  useEffect(() => {
    const fetchMatchResults = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/ranked_applicant_matches', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Filter match results for this user
        const userMatches = response.data.filter(match => match.consultant_id == user_id);
        setMatchResults(userMatches);
      } catch (error) {
        console.error('Error fetching match results:', error);
      }
    };

    if (token && user_id) {
      fetchMatchResults();
    }
  }, [token, user_id]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleProfileUpdate = (updatedProfile) => {
    setConsultantData(updatedProfile);
    setUserName(updatedProfile.name);
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

    if (!allowedTypes.includes(fileExtension)) {
      setUploadError('Invalid file format. Please upload a PDF, DOC, or DOCX file.');
      setUploadSuccess('');
      return;
    }

    if (file.size > maxSize) {
      setUploadError('File size exceeds 5MB limit.');
      setUploadSuccess('');
      return;
    }

    const formData = new FormData();
    formData.append('consultant_id', user_id);
    formData.append('file', file);

    try {
      await axios.post('http://localhost:8000/api/upload-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadSuccess('Resume uploaded successfully!');
      setUploadError('');
    } catch (error) {
      setUploadError(error.response?.data?.detail || 'Failed to upload resume. Please try again.');
      setUploadSuccess('');
    }
  };

  // Navigate to different views
  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  // Apply to job function
  const handleApplyToJob = async (jobId) => {
    try {
      await axios.post('http://localhost:8000/api/apply', {
        job_id: jobId,
        consultant_id: parseInt(user_id),
      });
      
      // Refresh applications after successful apply
      const response = await axios.get('http://localhost:8000/api/job_applications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userApplications = response.data.filter(app => app.consultant_id == user_id);
      setApplications(userApplications);
      
      alert('Application submitted successfully!');
    } catch (error) {
      alert(error.response?.data?.detail || 'Failed to apply for job.');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div style={styles.container}>
        <Header 
          Name={userName} 
          onProfileClick={() => setCurrentView('profile')} 
          onLogout={handleLogout} 
        />
        <div className="container">
          <div className="text-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Render different views based on currentView
  const renderCurrentView = () => {
    switch (currentView) {
      case 'profile':
        return (
          <ConsultantProfile
            consultant={consultantData}
            onBack={() => setCurrentView('dashboard')}
            onUpdate={handleProfileUpdate}
          />
        );
      
      case 'applications':
        return (
          <div style={styles.container}>
            <div className="container">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>My Applications</h2>
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => setCurrentView('dashboard')}
                >
                  Back to Dashboard
                </button>
              </div>
              
              {applications.length === 0 ? (
                <div className="text-center mt-5">
                  <h5 className="text-muted">No applications yet</h5>
                  <p className="text-muted">Start applying to jobs to see your applications here.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setCurrentView('dashboard')}
                  >
                    Browse Jobs
                  </button>
                </div>
              ) : (
                <div className="row">
                  {applications.map((app, index) => (
                    <div key={app.id || index} className="col-md-6 col-lg-4 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <h6 className="card-title">Application #{app.id}</h6>
                          <p className="card-text">Job ID: {app.job_id}</p>
                          <p className="card-text">
                            <small className="text-muted">
                              Applied: {app.applied_at ? new Date(app.applied_at).toLocaleDateString() : 'Unknown'}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'matches':
        return (
          <div style={styles.container}>
            <div className="container">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>AI Job Matches</h2>
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => setCurrentView('dashboard')}
                >
                  Back to Dashboard
                </button>
              </div>
              
              {matchResults.length === 0 ? (
                <div className="text-center mt-5">
                  <h5 className="text-muted">No AI matches yet</h5>
                  <p className="text-muted">Upload your resume and apply to jobs to get AI-powered matches.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setCurrentView('dashboard')}
                  >
                    Back to Dashboard
                  </button>
                </div>
              ) : (
                <div className="row">
                  {matchResults.map((match, index) => (
                    <div key={match.id || index} className="col-md-6 col-lg-4 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <h6 className="card-title">Match Score: {Math.round(match.match_score)}%</h6>
                          <p className="card-text">Job ID: {match.job_id}</p>
                          <p className="card-text">
                            <small className="text-success">
                              Skills: {match.top_skills_matched}
                            </small>
                          </p>
                          <p className="card-text">
                            <small className="text-warning">
                              Missing: {match.missing_skills}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="container">
            <UserHeader Name={userName} />
            
            {/* Quick Navigation */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="d-flex gap-2 flex-wrap">
                  <button 
                    className="btn btn-outline-success btn-sm"
                    onClick={() => setCurrentView('applications')}
                  >
                    📋 My Applications ({applications.length})
                  </button>
                  <button 
                    className="btn btn-outline-info btn-sm"
                    onClick={() => setCurrentView('matches')}
                  >
                    🎯 AI Matches ({matchResults.length})
                  </button>
                  <button 
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setCurrentView('profile')}
                  >
                    👤 Edit Profile
                  </button>
                </div>
              </div>
            </div>
            
            {/* Stats Summary */}
            <div className="row mb-4">
              <StatsCard icon="🎯" value={matchedJobs.length} label="Available Jobs" color="primary" />
              <StatsCard
                icon="📈"
                value={
                  matchedJobs.length > 0
                    ? Math.round(matchedJobs.reduce((acc, job) => acc + job.matchScore, 0) / matchedJobs.length)
                    : 0
                }
                label="Avg Match Score"
                color="success"
              />
              <StatsCard icon="⚡" value={applications.length} label="Applications Sent" color="warning" />
              <StatsCard icon="🔥" value={matchResults.length} label="AI Matches" color="info" />
            </div>

            {/* Resume Upload */}
            <ResumeUpload
              uploadError={uploadError}
              uploadSuccess={uploadSuccess}
              handleResumeUpload={handleResumeUpload}
            />

            {/* Job Listings */}
            <div style={styles.statsCard}>
              <div style={styles.sectionHeader}>
                <span style={{ fontSize: '1.5rem' }}>🎯</span>
                <h4 className="mb-0 text-dark">Available Jobs ({matchedJobs.length})</h4>
              </div>
              {matchedJobs.length > 0 ? (
                <div>
                  {matchedJobs.map((job) => (
                    <JobCard 
                      key={job.id} 
                      job={job}
                      onApply={() => handleApplyToJob(job.id)}
                      isApplied={applications.some(app => app.job_id === job.id)}
                    />
                  ))}
                </div>
              ) : (
                <div style={styles.emptyState}>
                  <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
                  <h5 className="text-muted mb-3">No jobs available</h5>
                  <p className="text-muted">
                    Check back later for new job opportunities.
                  </p>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div style={styles.container}>
      <Header 
        Name={userName} 
        onProfileClick={() => setCurrentView('profile')} 
        onLogout={handleLogout} 
      />
      {renderCurrentView()}
    </div>
  );
}

export default UserDashboard;
