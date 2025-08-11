import React from 'react';
import { ArrowLeft, Briefcase, Users, Eye } from 'lucide-react';

const JobsList = ({ jobs, onBack, onJobClick }) => {
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
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#2e2e2e',
      textAlign: 'center',
      marginBottom: '30px'
    },
    jobsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    jobCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid #e8f5e8'
    },
    jobTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#2e2e2e',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    jobMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#666',
      fontSize: '14px',
      marginTop: '15px'
    },
    applicationCount: {
      background: 'linear-gradient(135deg, #2196f3, #1976d2)',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600'
    },
    emptyState: {
      textAlign: 'center',
      color: '#666',
      fontSize: '18px',
      marginTop: '50px'
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={onBack}>
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <h2 style={styles.title}>Posted Jobs ({jobs.length})</h2>

      {jobs.length === 0 ? (
        <div style={styles.emptyState}>
          <Briefcase size={48} style={{ color: '#ccc', marginBottom: '20px' }} />
          <p>No jobs posted yet. Start by posting your first job!</p>
        </div>
      ) : (
        <div style={styles.jobsGrid}>
          {jobs.map((job) => (
            <div key={job.id} style={styles.jobCard} onClick={() => onJobClick(job)}>
              <div style={styles.jobTitle}>
                <Briefcase size={20} style={{ color: '#2196f3' }} />
                {job.title}
              </div>
              <p style={{ color: '#666', fontSize: '14px' }}>
                {(job.description || '').substring(0, 100)}...
              </p>
              <div style={styles.jobMeta}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Users size={14} /> Skills: {Array.isArray(job.skills) ? job.skills.join(', ') : job.skills}
                </span>
                <span style={styles.applicationCount}>
                  {job.applications} applications
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsList;