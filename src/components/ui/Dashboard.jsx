import React from 'react';
import { Plus, Briefcase, Users, TrendingUp } from 'lucide-react';

const Dashboard = ({ onPostJob, onViewJobs, jobsCount }) => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e8f5e8 0%, #e0f2f1 50%, #e1f5fe 100%)',
      padding: '30px'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#2e2e2e',
      textAlign: 'center',
      marginBottom: '40px'
    },
    hubGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    card: {
      background: 'white',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      border: '1px solid #e8f5e8',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center'
    },
    cardIcon: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      color: 'white'
    },
    postJobIcon: {
      background: 'linear-gradient(135deg, #2196f3, #1e88e5)'
    },
    viewJobsIcon: {
      background: 'linear-gradient(135deg, #2196f3, #1976d2)'
    },
    cardTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#2e2e2e',
      marginBottom: '10px'
    },
    cardDescription: {
      color: '#666',
      fontSize: '16px',
      marginBottom: '20px'
    },
    cardCount: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#2196f3',
      marginTop: '10px'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Recruiter Hub</h1>
      
      <div style={styles.hubGrid}>
        <div 
          style={styles.card}
          onClick={onPostJob}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
          }}
        >
          <div style={{...styles.cardIcon, ...styles.postJobIcon}}>
            <Plus size={36} />
          </div>
          <h3 style={styles.cardTitle}>Post Jobs</h3>
          <p style={styles.cardDescription}>
            Create and publish new job opportunities to attract top talent
          </p>
        </div>

        <div 
          style={styles.card}
          onClick={onViewJobs}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
          }}
        >
          <div style={{...styles.cardIcon, ...styles.viewJobsIcon}}>
            <Briefcase size={36} />
          </div>
          <h3 style={styles.cardTitle}>Jobs Posted</h3>
          <p style={styles.cardDescription}>
            View and manage all your posted job listings
          </p>
          <div style={styles.cardCount}>{jobsCount}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;