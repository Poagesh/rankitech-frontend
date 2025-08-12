import { useState, useEffect } from 'react';
import { styles, getScoreColor } from '../../styles/styles';

/**
 * props
 * ──────────────────────────────────────────────────────────────
 * job            object  – full job
 * onApply        ()      – parent handler
 * isApplied      bool    – already applied?
 * onViewDetails  ()      – show details view
 */
function JobCard({ job, onApply, isApplied = false, onViewDetails }) {
  /* fake progress-bar animation */
  const [step, setStep] = useState(0);
  useEffect(() => {
    let s = 0;
    const iv = setInterval(() => { s += 1; if (s > 3) clearInterval(iv); else setStep(s); }, 1500);
    return () => clearInterval(iv);
  }, []);
  const percent = (step / 3) * 100;
  const marks = [
    { label: 'JD Compared',     pos: 0   },
    { label: 'Profiles Ranked', pos: 50  },
    { label: 'Email Sent',      pos: 100 }
  ];

  /* UI */
  return (
    <div style={styles.jobCard}>
      {/* header */}
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h5 className="text-dark mb-2 fw-bold">
            <span style={{ marginRight: 10 }}>💼</span>{job.jobTitle}
          </h5>
          <div style={styles.companyBadge}>🏢 {job.company}</div>
        </div>
        <div style={{
          ...styles.matchScore,
          background: `linear-gradient(135deg, ${getScoreColor(job.matchScore)}, ${getScoreColor(job.matchScore)}dd)`
        }}>
          ⭐ {job.matchScore}% Match
        </div>
      </div>

      {/* progress bar */}
      <div className="mb-3" style={{ position:'relative', padding:'15px 0' }}>
        <div style={{ position:'relative', height:12, background:'#e0e0e0', borderRadius:6 }}>
          <div style={{
            position:'absolute', height:'100%', borderRadius:6,
            background:'#1e88e5', width:`${percent}%`, transition:'width .5s ease'
          }}/>
          {marks.map((m,i)=>(
            <div key={i} style={{
              position:'absolute', left:`calc(${m.pos}% - 6px)`, top:'50%',
              width:12, height:12, borderRadius:'50%', transform:'translateY(-50%)',
              background:'#1e88e5',
              border:`2px solid ${step>=i+1?'#fff':'#ccc'}`, transition:'all .3s ease'
            }}/>
          ))}
        </div>
        <div className="d-flex justify-content-between mt-2" style={{ fontSize:'.85rem', fontWeight:500 }}>
          {marks.map((m,i)=>(
            <span key={i} style={{ color: step>=i+1 ? '#1e88e5' : '#aaa' }}>{m.label}</span>
          ))}
        </div>
      </div>

      {/* buttons */}
      <div className="d-flex gap-2 mt-3">
        <button
          className={`btn btn-sm ${isApplied ? 'btn-success' : 'btn-primary'}`}
          disabled={isApplied}
          onClick={() => !isApplied && onApply?.()}
        >
          {isApplied ? '✅ Applied' : '✉️ Apply Now'}
        </button>
        <button className="btn btn-outline-primary btn-sm" onClick={() => onViewDetails?.()}>
          👁️ View Details
        </button>
        <button className="btn btn-outline-secondary btn-sm">💾 Save Job</button>
      </div>
    </div>
  );
}

export default JobCard;
