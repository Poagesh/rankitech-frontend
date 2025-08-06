import React from 'react';
import { ArrowLeft, Star, User, Award, TrendingUp } from 'lucide-react';

const TopMatches = ({ job, topMatches, onBack }) => {
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
      marginBottom: '10px'
    },
    subtitle: {
      fontSize: '16px',
      color: '#666',
      textAlign: 'center',
      marginBottom: '30px'
    },
    matchesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    matchCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      border: '1px solid #e8f5e8',
      position: 'relative'
    },
    topMatchBadge: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'linear-gradient(135deg, #ffd700, #ffb300)',
      color: '#333',
      padding: '5px 10px',
      borderRadius: '15px',
      fontSize: '10px',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      gap: '3px'
    },
    candidateHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '20px'
    },
    avatar: {
      width: '60px',
      height: '60px',
      background: 'linear-gradient(135deg, #2196f3, #1e88e5)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      fontWeight: '700'
    },
    candidateName: {
      fontSize: '22px',
      fontWeight: '700',
      color: '#2e2e2e',
      marginBottom: '5px'
    },
    candidateTitle: {
      color: '#666',
      fontSize: '14px',
      marginBottom: '10px'
    },
    matchScore: {
      fontSize: '32px',
      fontWeight: '700',
      color: ' #2196f3',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    skillsSection: {
      marginTop: '20px'
    },
    skillsTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2e2e2e',
      marginBottom: '10px'
    },
    skillTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px'
    },
    skillTag: {
      background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
      color: '#1976d2',
      padding: '4px 12px',
      borderRadius: '15px',
      fontSize: '12px',
      fontWeight: '500'
    },
    experienceSection: {
      marginTop: '15px',
      padding: '15px',
      background: '#f8f9fa',
      borderRadius: '10px'
    },
    experienceText: {
      color: '#555',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
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

      <h2 style={styles.title}>Top Matches for {job.title}</h2>
      <p style={styles.subtitle}>Best candidates based on skills and experience</p>

      {topMatches.length === 0 ? (
        <div style={styles.emptyState}>
          <Star size={48} style={{color: '#ccc', marginBottom: '20px'}} />
          <p>No top matches found yet.</p>
        </div>
      ) : (
        <div style={styles.matchesGrid}>
          {topMatches.map((match, index) => (
            <div
              key={match.id}
              style={styles.matchCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              }}
            >
              {index === 0 && (
                <div style={styles.topMatchBadge}>
                  <Award size={12} />
                  TOP MATCH
                </div>
              )}

              <div style={styles.candidateHeader}>
                <div style={styles.avatar}>
                  {match.name.charAt(0)}
                </div>
                <div style={{flex: 1}}>
                  <div style={styles.candidateName}>{match.name}</div>
                  <div style={styles.candidateTitle}>{match.title}</div>
                  <div style={styles.matchScore}>
                    <TrendingUp size={24} />
                    {match.matchScore}%
                  </div>
                </div>
              </div>

              <div style={styles.skillsSection}>
                <div style={styles.skillsTitle}>Matching Skills</div>
                <div style={styles.skillTags}>
                  {match.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} style={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div style={styles.experienceSection}>
                <div style={styles.experienceText}>
                  <User size={14} />
                  {match.experience} years of experience
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopMatches;