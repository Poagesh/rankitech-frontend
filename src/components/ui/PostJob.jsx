import React, { useState } from 'react';
import { ArrowLeft, Briefcase, FileText, Users } from 'lucide-react';

const PostJob = ({ onBack, onPostJob }) => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    skills: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobData.title && jobData.description && jobData.skills) {
      onPostJob(jobData);
      setJobData({ title: '', description: '', skills: '' });
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e8f5e8 0%, #e0f2f1 50%, #e1f5fe 100%)',
      padding: '20px'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'white',
      border: 'none',
      borderRadius: '25px',
      padding: '10px 20px',
      cursor: 'pointer',
      marginBottom: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      color: '#2196f3',
      fontWeight: '500'
    },
    formCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      maxWidth: '600px',
      margin: '0 auto'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#2e2e2e',
      textAlign: 'center',
      marginBottom: '30px'
    },
    inputGroup: {
      marginBottom: '25px'
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: '600',
      color: '#2e2e2e',
      marginBottom: '8px',
      fontSize: '16px'
    },
    input: {
      width: '100%',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '15px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#fafafa'
    },
    textarea: {
      width: '100%',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '15px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      backgroundColor: '#fafafa',
      minHeight: '120px',
      resize: 'vertical'
    },
    button: {
      background: 'linear-gradient(135deg, #2196f3, #1e88e5',
      border: 'none',
      borderRadius: '12px',
      padding: '15px 30px',
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
      width: '100%',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <button 
        style={styles.backButton}
        onClick={onBack}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        }}
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <div style={styles.formCard}>
        <h2 style={styles.title}>Post New Job</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Briefcase size={18} />
              Job Title
            </label>
            <input
              type="text"
              style={styles.input}
              placeholder="e.g. Senior Software Engineer"
              value={jobData.title}
              onChange={(e) => setJobData({...jobData, title: e.target.value})}
              onFocus={(e) => {
                e.target.style.borderColor = '#4caf50';
                e.target.style.backgroundColor = 'white';
                e.target.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.backgroundColor = '#fafafa';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <FileText size={18} />
              Job Description
            </label>
            <textarea
              style={styles.textarea}
              placeholder="Describe the role, responsibilities, and requirements..."
              value={jobData.description}
              onChange={(e) => setJobData({...jobData, description: e.target.value})}
              onFocus={(e) => {
                e.target.style.borderColor = '#4caf50';
                e.target.style.backgroundColor = 'white';
                e.target.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.backgroundColor = '#fafafa';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Users size={18} />
              Required Skills
            </label>
            <input
              type="text"
              style={styles.input}
              placeholder="e.g. React, Node.js, Python, AWS"
              value={jobData.skills}
              onChange={(e) => setJobData({...jobData, skills: e.target.value})}
              onFocus={(e) => {
                e.target.style.borderColor = '#4caf50';
                e.target.style.backgroundColor = 'white';
                e.target.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.backgroundColor = '#fafafa';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(76, 175, 80, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
            }}
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;