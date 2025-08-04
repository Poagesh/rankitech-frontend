import { useState } from 'react';

function RecruiterDashboard() {
  const [job, setJob] = useState({
    title: '',
    description: '',
    skills: '',
  });

  const [topConsultants, setTopConsultants] = useState([]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    console.log('Posted Job:', job);

    // Simulated response: top 3 consultant matches
    setTopConsultants([
      {
        name: 'Monish Soorya',
        score: 91,
        experience: '3 years',
        skills: 'React, Python, ML',
      },
      {
        name: 'Priya Ramesh',
        score: 86,
        experience: '2 years',
        skills: 'Node.js, SQL, Bootstrap',
      },
      {
        name: 'Arjun V.',
        score: 80,
        experience: '2.5 years',
        skills: 'React, Django',
      },
    ]);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f5e8 50%, #f0f9ff 100%)',
      padding: '20px 0'
    },
    header: {
      background: 'linear-gradient(135deg, #2196f3, #1976d2)',
      borderRadius: '20px',
      color: 'white',
      padding: '30px',
      marginBottom: '30px',
      boxShadow: '0 10px 30px rgba(33, 150, 243, 0.2)'
    },
    formCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      border: '1px solid #e3f2fd',
      marginBottom: '30px'
    },
    input: {
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '15px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#fafafa'
    },
    inputFocus: {
      borderColor: '#2196f3',
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(33, 150, 243, 0.1)'
    },
    textarea: {
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '15px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#fafafa',
      minHeight: '120px',
      resize: 'vertical'
    },
    textareaFocus: {
      borderColor: '#2196f3',
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(33, 150, 243, 0.1)'
    },
    postButton: {
      background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
      border: 'none',
      borderRadius: '12px',
      padding: '15px 30px',
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
    },
    postButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)'
    },
    resultsCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      border: '1px solid #e8f5e8'
    },
    consultantCard: {
      backgroundColor: '#f8f9fa',
      borderRadius: '15px',
      padding: '20px',
      marginBottom: '15px',
      border: '2px solid #e9ecef',
      transition: 'all 0.3s ease'
    },
    consultantCardHover: {
      backgroundColor: 'white',
      borderColor: '#2196f3',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
    },
    matchScore: {
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600',
      display: 'inline-block'
    },
    experienceBadge: {
      backgroundColor: '#e3f2fd',
      color: '#1976d2',
      padding: '6px 12px',
      borderRadius: '15px',
      fontSize: '14px',
      fontWeight: '500',
      display: 'inline-block'
    },
    skillsTag: {
      backgroundColor: '#f3e5f5',
      color: '#7b1fa2',
      padding: '4px 8px',
      borderRadius: '10px',
      fontSize: '12px',
      margin: '2px',
      display: 'inline-block'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px'
    },
    actionButton: {
      padding: '8px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginRight: '8px'
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return { background: '#4caf50', color: 'white' };
    if (score >= 80) return { background: '#ff9800', color: 'white' };
    return { background: '#f44336', color: 'white' };
  };

  const parseSkills = (skillsString) => {
    return skillsString.split(',').map(skill => skill.trim());
  };

  return (
    <div style={styles.container}>
      <div className="container">
        {/* Header Section */}
        <div style={styles.header} className="text-center">
          <h1 className="mb-3">
            <span style={{fontSize: '2rem', marginRight: '10px'}}>🏢</span>
            Recruiter Hub
          </h1>
          <p className="mb-0 fs-5">Post jobs and discover top talent with AI-powered matching</p>
        </div>

        {/* Job Posting Form */}
        <div style={styles.formCard}>
          <div style={styles.sectionHeader}>
            <span style={{fontSize: '1.5rem'}}>📝</span>
            <h4 className="mb-0 text-dark">Post a New Job</h4>
          </div>
          
          <div>
            <div className="mb-4">
              <label className="form-label fw-semibold text-dark">
                💼 Job Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={job.title}
                onChange={handleChange}
                className="form-control"
                style={styles.input}
                placeholder="e.g. Senior React Developer"
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold text-dark">
                📄 Job Description
              </label>
              <textarea
                name="description"
                required
                value={job.description}
                onChange={handleChange}
                className="form-control"
                style={styles.textarea}
                placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
                onFocus={(e) => Object.assign(e.target.style, styles.textareaFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.textarea)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold text-dark">
                🛠️ Required Skills
              </label>
              <input
                type="text"
                name="skills"
                required
                value={job.skills}
                onChange={handleChange}
                className="form-control"
                style={styles.input}
                placeholder="React, Node.js, Python, Machine Learning (comma-separated)"
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
              />
              <small className="text-muted">Separate multiple skills with commas</small>
            </div>

            <button
              onClick={handlePostJob}
              style={styles.postButton}
              className="btn"
              onMouseEnter={(e) => Object.assign(e.target.style, {...styles.postButton, ...styles.postButtonHover})}
              onMouseLeave={(e) => Object.assign(e.target.style, styles.postButton)}
            >
              <span style={{marginRight: '8px'}}>🚀</span>
              Post Job & Find Matches
            </button>
          </div>
        </div>

        {/* Results Section */}
        {topConsultants.length > 0 && (
          <div style={styles.resultsCard}>
            <div style={styles.sectionHeader}>
              <span style={{fontSize: '1.5rem'}}>🎯</span>
              <h4 className="mb-0 text-dark">Top Matching Candidates</h4>
            </div>
            
            <p className="text-muted mb-4">
              Our AI has found {topConsultants.length} candidates that match your requirements. Here are the top matches:
            </p>

            <div>
              {topConsultants.map((consultant, index) => (
                <div 
                  key={index}
                  style={styles.consultantCard}
                  onMouseEnter={(e) => Object.assign(e.target.style, {...styles.consultantCard, ...styles.consultantCardHover})}
                  onMouseLeave={(e) => Object.assign(e.target.style, styles.consultantCard)}
                >
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="text-dark mb-2 fw-bold">
                        <span style={{marginRight: '10px'}}>👤</span>
                        {consultant.name}
                      </h5>
                      <div className="mb-2">
                        <span style={styles.experienceBadge}>
                          ⏱️ {consultant.experience}
                        </span>
                      </div>
                    </div>
                    <div 
                      style={{
                        ...styles.matchScore,
                        ...getScoreColor(consultant.score)
                      }}
                    >
                      ⭐ {consultant.score}% Match
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <strong className="text-dark">Skills: </strong>
                    {parseSkills(consultant.skills).map((skill, skillIndex) => (
                      <span key={skillIndex} style={styles.skillsTag}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="d-flex gap-2">
                    <button 
                      style={{...styles.actionButton, backgroundColor: '#4caf50', color: 'white'}}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#4caf50'}
                    >
                      💬 Contact
                    </button>
                    <button 
                      style={{...styles.actionButton, backgroundColor: '#2196f3', color: 'white'}}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#1976d2'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#2196f3'}
                    >
                      📋 View Profile
                    </button>
                    <button 
                      style={{...styles.actionButton, backgroundColor: '#ff9800', color: 'white'}}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#f57c00'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#ff9800'}
                    >
                      ⭐ Shortlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecruiterDashboard;