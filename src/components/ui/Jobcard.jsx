import { styles, getScoreColor } from '../../styles/styles';
import { useState, useEffect } from 'react';

function JobCard({ job }) {
  const [progressStep, setProgressStep] = useState(0);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step > 3) {
        clearInterval(interval);
      } else {
        setProgressStep(step);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const getProgressPercent = () => {
    return (progressStep / 3) * 100;
  };

  const milestones = [
    { label: 'JD Compared', position: 0 },
    { label: 'Profiles Ranked', position: 50 },
    { label: 'Email Sent', position: 100 },
  ];

  return (
    <div
      style={styles.jobCard}
      onMouseEnter={(e) => Object.assign(e.target.style, { ...styles.jobCard, ...styles.jobCardHover })}
      onMouseLeave={(e) => Object.assign(e.target.style, styles.jobCard)}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h5 className="text-dark mb-2 fw-bold">
            <span style={{ marginRight: '10px' }}>💼</span>
            {job.jobTitle}
          </h5>
          <div style={styles.companyBadge}>🏢 {job.company}</div>
        </div>
        <div
          style={{
            ...styles.matchScore,
            background: `linear-gradient(135deg, ${getScoreColor(job.matchScore)}, ${getScoreColor(job.matchScore)}dd)`,
          }}
        >
          ⭐ {job.matchScore}% Match
        </div>
      </div>

      {/* Inline Milestone Progress Bar */}
      <div className="mb-3" style={{ position: 'relative', padding: '15px 0' }}>
        {/* Progress Bar Track */}
        <div style={{
          position: 'relative',
          height: '12px',
          background: '#e0e0e0',
          borderRadius: '6px',
        }}>
          {/* Filled portion */}
          <div style={{
            position: 'absolute',
            height: '100%',
            background: '#1e88e5',
            borderRadius: '6px',
            width: `${getProgressPercent()}%`,
            transition: 'width 0.5s ease',
          }}></div>

          {/* Milestone dots */}
          {milestones.map((m, index) => (
            <div key={index}
              style={{
                position: 'absolute',
                left: `calc(${m.position}% - 6px)`,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background:'#1e88e5',
                border: `2px solid ${progressStep >= index + 1 ? '#ffffff' : '#ccc'}`,
                transition: 'all 0.3s ease',
                zIndex: 2,
              }}
            ></div>
          ))}
        </div>

        {/* Labels under milestones */}
        <div className="d-flex justify-content-between mt-2" style={{ fontSize: '0.85rem', fontWeight: '500' }}>
          {milestones.map((m, index) => (
            <span key={index} style={{ color: progressStep >= index + 1 ? '#1e88e5' : '#aaa' }}>
              {m.label}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-success btn-sm">✉️ Apply Now</button>
        <button className="btn btn-outline-primary btn-sm">👁️ View Details</button>
        <button className="btn btn-outline-secondary btn-sm">💾 Save Job</button>
      </div>
    </div>
  );
}

export default JobCard;
