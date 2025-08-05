import React from 'react';
import { ArrowLeft, User, Mail, Phone, Calendar, Star } from 'lucide-react';

const Applications = ({ job, applications, onBack }) => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
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
      marginBottom: '10px'
    },
    subtitle: {
      fontSize: '16px',
      color: '#666',
      textAlign: 'center',
      marginBottom: '30px'
    },
    applicationsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    applicationCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      border: '1px solid #e8f5e8'
    },
    applicantHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '20px'
    },
    avatar: {
      width: '50px',
      height: '50px',
      background: 'linear-gradient(135deg, #2196f3, #1976d2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '18px',
      fontWeight: '700'
    },
    applicantName: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#2e2e2e',
      marginBottom: '5px'
    },
    applicantTitle: {
      color: '#666',
      fontSize: '14px'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '10px',
      marginBottom: '15px'
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#555',
      fontSize: '14px'
    },
    matchScore: {
      background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
      color: 'white',
      padding: '5px 15px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px'
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
        Back to Job Details
      </button>

      <h2 style={styles.title}>Applications for {job.title}</h2>
      <p style={styles.subtitle}>Total Applications: {applications.length}</p>

      {applications.length === 0 ? (
        <div style={styles.emptyState}>
          <User size={48} style={{color: '#ccc', marginBottom: '20px'}} />
          <p>No applications received yet.</p>
        </div>
      ) : (
        <div style={styles.applicationsGrid}>
          {applications.map((application) => (
            <div
              key={application.id}
              style={styles.applicationCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              }}
            >
              <div style={styles.applicantHeader}>
                <div style={styles.avatar}>
                  {application.name.charAt(0)}
                </div>
                <div>
                  <div style={styles.applicantName}>{application.name}</div>
                  <div style={styles.applicantTitle}>{application.title}</div>
                </div>
              </div>

              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <Mail size={14} />
                  {application.email}
                </div>
                <div style={styles.infoItem}>
                  <Phone size={14} />
                  {application.phone}
                </div>
                <div style={styles.infoItem}>
                  <Calendar size={14} />
                  Applied on {application.appliedDate}
                </div>
              </div>

              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={styles.matchScore}>
                  <Star size={12} />
                  {application.matchScore}% Match
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;