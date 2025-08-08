export const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e8f5e8 0%, #e0f2f1 50%, #e1f5fe 100%)',
    padding: '20px 0',
  },
  header: {
    background: 'linear-gradient(135deg, #2196f3, #1976d2)',
    borderRadius: '20px',
    color: 'white',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 10px 30px rgba(33, 150, 243, 0.3)',
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
    border: '1px solid #e8f5e8',
    marginBottom: '20px',
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
    gap: '10px',
  },
  uploadButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(33, 150, 243, 0.4)',
  },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '25px',
    marginBottom: '15px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
    border: '1px solid #e8f5e8',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  jobCardHover: {
    transform: 'translateY(-3px)',
    boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
  },
  matchScore: {
    background: 'linear-gradient(135deg, #2196f3, #1976d2)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    display: 'inline-block',
  },
  companyBadge: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '6px 12px',
    borderRadius: '15px',
    fontSize: '14px',
    fontWeight: '500',
    display: 'inline-block',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '50px 20px',
    backgroundColor: 'white',
    borderRadius: '15px',
    border: '2px dashed #e0e0e0',
  },
};

export const getScoreColor = (score) => {
  if (score >= 90) return '#1976d2';
  if (score >= 80) return '#1976d2';
  return '#1976d2';
};