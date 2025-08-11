// UserDashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styles } from '../styles/styles';
import Header from '../components/ui/Header';
import UserHeader from '../components/ui/Userheader';
import StatsCard from '../components/ui/Statscards';
import ResumeUpload from '../components/ui/Resumeupload';
import JobCard from '../components/ui/Jobcard';

function UserDashboard() {
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('access_token');
  const role = localStorage.getItem('role');
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();

  // Fetch logged-in user's name
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
        // Show user-friendly error message
        alert("Failed to load jobs. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchJobs();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
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

  if (loading) {
    return (
      <div style={styles.container}>
        <Header Name={userName} onProfileClick={() => {}} onLogout={handleLogout} />
        <div className="container">
          <div className="text-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Header Name={userName} onProfileClick={() => {}} onLogout={handleLogout} />
      <div className="container">
        <UserHeader Name={userName} />
        
        {/* Stats Summary */}
        <div className="row mb-4">
          <StatsCard icon="🎯" value={matchedJobs.length} label="Job Matches" color="primary" />
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
          <StatsCard icon="⚡" value={0} label="Applications Sent" color="warning" />
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
                <JobCard key={job.id} job={job} />
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
    </div>
  );
}

export default UserDashboard;
