import { useEffect, useState } from 'react';

function UserDashboard() {
  const [matchedJobs, setMatchedJobs] = useState([]);

  // Simulating fetched match data
  useEffect(() => {
    // This will be fetched from API later
    setMatchedJobs([
      {
        id: 1,
        jobTitle: 'React Developer',
        company: 'Tech Corp',
        matchScore: 92,
      },
      {
        id: 2,
        jobTitle: 'Frontend Engineer',
        company: 'InnovateX',
        matchScore: 85,
      },
    ]);
  }, []);

  const styles = {
    

    container: {
      minHeight: '100vh',
      background: 'linear-gradient( 135deg, #e8f5e8 0%, #e0f2f1 50%, #e1f5fe 100%)',
      padding: '20px 0'
    },
    header: {
      background: 'linear-gradient(135deg, #2196f3, #1976d2)',
      borderRadius: '20px',
      color: 'white',
      padding: '30px',
      marginBottom: '30px',
      boxShadow: '0 10px 30px rgba(33, 150, 243, 0.3)'
    },
    statsCard: {
      backgroundColor: 'white',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
      border: '1px solid #e8f5e8',
      marginBottom: '20px'
    },
    uploadButton: {
      background: 'linear-gradient(135deg, #2196f3, #1976d2)',
      border: 'none',
      borderRadius: '12px',
      padding: '15px 30px',
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    uploadButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(33, 150, 243, 0.4)'
    },
    jobCard: {
      backgroundColor: 'white',
      borderRadius: '15px',
      padding: '25px',
      marginBottom: '15px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
      border: '1px solid #e8f5e8',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    jobCardHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 15px 40px rgba(0,0,0,0.12)'
    },
    matchScore: {
      background: 'linear-gradient(135deg, #2196f3, #1976d2)',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600',
      display: 'inline-block'
    },
    companyBadge: {
      backgroundColor: '#e3f2fd',
      color: '#1976d2',
      padding: '6px 12px',
      borderRadius: '15px',
      fontSize: '14px',
      fontWeight: '500',
      display: 'inline-block'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '50px 20px',
      backgroundColor: 'white',
      borderRadius: '15px',
      border: '2px dashed #e0e0e0'
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return '#1976d2';
    if (score >= 80) return '#1976d2';
    return '#1976d2';
  };

  return (
    <div style={styles.container}>

      <div className="container">
        {/* 👤 User Icon Dropdown */}
      <div className="d-flex justify-content-end mb-3 me-4">
        <div className="dropdown">
          <button 
            className="btn btn-light dropdown-toggle d-flex align-items-center" 
            type="button" 
            id="userMenuButton" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
            style={{ 
              borderRadius: '50%', 
              padding: '10px 14px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              fontSize: '1.2rem'
            }}
          >
            👤
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuButton">
            <li><h6 className="dropdown-header">👋 Hello, John</h6></li>
            <li><a className="dropdown-item" href="#">📧 john.doe@example.com</a></li>
            <li><a className="dropdown-item" href="#">⚙️ Profile Settings</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item text-danger" href="#">🚪 Logout</a></li>
          </ul>
        </div>
      </div>
        {/* Header Section */}
        <div style={styles.header} className="text-center">
          <h1 className="mb-3">
            <span style={{fontSize: '2rem', marginRight: '10px'}}>👋</span>
            Welcome Back, John!
          </h1>
          <p className="mb-0 fs-5">Ready to find your dream job? Let's explore your matches!</p>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div style={styles.statsCard} className="text-center">
              <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>🎯</div>
              <h3 className="text-primary mb-1">{matchedJobs.length}</h3>
              <p className="text-muted mb-0">Job Matches</p>
            </div>
          </div>
          <div className="col-md-4">
            <div style={styles.statsCard} className="text-center">
              <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>📈</div>
              <h3 className="text-success mb-1">
                {matchedJobs.length > 0 ? Math.round(matchedJobs.reduce((acc, job) => acc + job.matchScore, 0) / matchedJobs.length) : 0}%
              </h3>
              <p className="text-muted mb-0">Avg Match Score</p>
            </div>
          </div>
          <div className="col-md-4">
            <div style={styles.statsCard} className="text-center">
              <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>⚡</div>
              <h3 className="text-warning mb-1">0</h3>
              <p className="text-muted mb-0">Applications Sent</p>
            </div>
          </div>
        </div>

        {/* Upload Resume Section */}
        <div style={styles.statsCard} className="mb-4">
          <div style={styles.sectionHeader}>
            <span style={{fontSize: '1.5rem'}}>📄</span>
            <h4 className="mb-0 text-dark">Resume Management</h4>
          </div>
          <p className="text-muted mb-3">Upload your resume to get better job matches powered by AI</p>
          <button
            style={styles.uploadButton}
            className="btn"
            onMouseEnter={(e) => Object.assign(e.target.style, {...styles.uploadButton, ...styles.uploadButtonHover})}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.uploadButton)}
          >
            <span>📤</span>
            Upload Resume (Coming Soon)
          </button>
        </div>

        {/* Job Matches Section */}
        <div style={styles.statsCard}>
          <div style={styles.sectionHeader}>
            <span style={{fontSize: '1.5rem'}}>🎯</span>
            <h4 className="mb-0 text-dark">Your Best Job Matches</h4>
          </div>
          
          {matchedJobs.length > 0 ? (
            <div>
              {matchedJobs.map((job) => (
                <div 
                  key={job.id} 
                  style={styles.jobCard}
                  onMouseEnter={(e) => Object.assign(e.target.style, {...styles.jobCard, ...styles.jobCardHover})}
                  onMouseLeave={(e) => Object.assign(e.target.style, styles.jobCard)}
                >
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="text-dark mb-2 fw-bold">
                        <span style={{marginRight: '10px'}}>💼</span>
                        {job.jobTitle}
                      </h5>
                      <div style={styles.companyBadge}>
                        🏢 {job.company}
                      </div>
                    </div>
                    <div 
                      style={{
                        ...styles.matchScore,
                        background: `linear-gradient(135deg, ${getScoreColor(job.matchScore)}, ${getScoreColor(job.matchScore)}dd)`
                      }}
                    >
                      ⭐ {job.matchScore}% Match
                    </div>
                  </div>
                  
                  <div className="d-flex gap-2 mt-3">
                    <button className="btn btn-success btn-sm">
                      ✉️ Apply Now
                    </button>
                    <button className="btn btn-outline-primary btn-sm">
                      👁️ View Details
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      💾 Save Job
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={{fontSize: '4rem', marginBottom: '20px'}}>🔍</div>
              <h5 className="text-muted mb-3">No job matches yet</h5>
              <p className="text-muted">Upload your resume to get personalized job recommendations powered by AI matching</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
