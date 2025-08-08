import { useEffect, useState } from 'react';
import axios from 'axios';
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

  useEffect(() => {
    setMatchedJobs([
      { id: 1, jobTitle: 'React Developer', company: 'Tech Corp', matchScore: 92 },
      { id: 2, jobTitle: 'Frontend Engineer', company: 'InnovateX', matchScore: 85 },
    ]);
  }, []);

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
    formData.append('resume', file);

    try {
      const response = await axios.post('http://localhost:8000/api/upload-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadSuccess('Resume uploaded successfully!');
      setUploadError('');
    } catch (error) {
      setUploadError(error.response?.data?.detail || 'Failed to upload resume. Please try again.');
      setUploadSuccess('');
    }
  };

  return (
    <div style={styles.container}>
        <Header />
        <div></div>
      <div className="container">
        
        <UserHeader />
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
        <ResumeUpload
          uploadError={uploadError}
          uploadSuccess={uploadSuccess}
          handleResumeUpload={handleResumeUpload}
        />
        <div style={styles.statsCard}>
          <div style={styles.sectionHeader}>
            <span style={{ fontSize: '1.5rem' }}>🎯</span>
            <h4 className="mb-0 text-dark">Your Best Job Matches</h4>
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
              <h5 className="text-muted mb-3">No job matches yet</h5>
              <p className="text-muted">
                Upload your resume to get personalized job recommendations powered by AI matching
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;