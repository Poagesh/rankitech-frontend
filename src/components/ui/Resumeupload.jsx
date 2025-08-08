import { styles } from '../../styles/styles';

function ResumeUpload({ uploadError, uploadSuccess, handleResumeUpload }) {
  return (
    <div style={styles.statsCard} className="mb-4">
      <div style={styles.sectionHeader}>
        <span style={{ fontSize: '1.5rem' }}>📄</span>
        <h4 className="mb-0 text-dark">Resume Management</h4>
      </div>
      <p className="text-muted mb-3">Upload your resume to get better job matches powered by AI</p>
      {uploadError && (
        <div className="alert alert-danger" role="alert">
          {uploadError}
        </div>
      )}
      {uploadSuccess && (
        <div className="alert alert-success" role="alert">
          {uploadSuccess}
        </div>
      )}
      <div>
        <input
          type="file"
          id="resumeUpload"
          accept=".pdf,.doc,.docx"
          style={{ display: 'none' }}
          onChange={handleResumeUpload}
        />
        <button
          style={styles.uploadButton}
          className="btn"
          onClick={() => document.getElementById('resumeUpload').click()}
          onMouseEnter={(e) => Object.assign(e.target.style, { ...styles.uploadButton, ...styles.uploadButtonHover })}
          onMouseLeave={(e) => Object.assign(e.target.style, styles.uploadButton)}
        >
          <span>📤</span>
          Upload Resume
        </button>
      </div>
    </div>
  );
}

export default ResumeUpload;