import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styles } from '../styles/styles';
import Header from '../components/ui/Header';
import UserHeader from '../components/ui/Userheader';
import StatsCard from '../components/ui/Statscards';
import ResumeUpload from '../components/ui/Resumeupload';
import JobCard from '../components/ui/Jobcard';
import ConsultantProfile from '../components/ui/ConsultantProfile';

function UserDashboard() {
  /* auth / nav */
  const token   = localStorage.getItem('access_token');
  const role    = localStorage.getItem('role');
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();
  const authHdr  = { Authorization: `Bearer ${token}` };

  /* state */
  const [view,        setView]        = useState('dashboard');
  const [selectedJob, setSelectedJob] = useState(null);

  const [jobs,        setJobs]        = useState([]);
  const [titleMap,    setTitleMap]    = useState({});
  const [apps,        setApps]        = useState([]);
  const [matches,     setMatches]     = useState([]);

  const [consultant,  setConsultant]  = useState(null);
  const [name,        setName]        = useState('');
  const [loading,     setLoading]     = useState(true);

  const [upErr,       setUpErr]       = useState('');
  const [upOk,        setUpOk]        = useState('');

  /* utils */
  const fetchApps = async () => {
    const { data } = await axios.get('http://localhost:8000/api/job_applications',{headers:authHdr});
    setApps(data.filter(a=>a.consultant_id == user_id));
  };

  /* profile (name only) */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/profile',
          { headers:{...authHdr,'X-User-Id':user_id,'X-User-Role':role} });
        setName(data.name);
      } catch { navigate('/'); }
    })();
  }, [token, role, user_id, navigate]);

  /* consultant profile */
  useEffect(() => {
    if (!token || role!=='user') return;
    axios.get(`http://localhost:8000/api/consultant_profiles/${user_id}`,{headers:authHdr})
      .then(res=>setConsultant(res.data)).catch(()=>{});
  }, [token, role, user_id]);

  /* jobs */
  useEffect(() => {
    if (!token){ setLoading(false); return;}
    (async ()=>{
      setLoading(true);
      try{
        const { data } = await axios.get('http://localhost:8000/api/jobs/',{headers:authHdr});
        const list = data.map(j => ({
          id:             j.id,
          jobTitle:       j.job_title      ?? 'Untitled Job',
          company:        j.company_name   ?? 'Unknown Company',
          location:       j.location       ?? 'Remote',
          experienceLevel:j.experience_level?? 'Any',
          matchScore:     j.match_score    ?? Math.floor(Math.random()*30+70),
          description:    j.job_description?? 'No description available',
          /* --- convert skills to arrays --- */
          requiredSkills:   Array.isArray(j.required_skills)
                               ? j.required_skills
                               : j.required_skills
                                   ? j.required_skills.split(',').map(s=>s.trim())
                                   : [],
          preferredSkills:  Array.isArray(j.preferred_skills)
                               ? j.preferred_skills
                               : j.preferred_skills
                                   ? j.preferred_skills.split(',').map(s=>s.trim())
                                   : [],
          salaryRange:    j.salary_range   ?? 'Competitive',
          postedDate:     j.posted_date    ?? new Date().toISOString().split('T')[0]
        }));
        const map={}; list.forEach(j=>{ map[j.id]=j.jobTitle; });
        setTitleMap(map); setJobs(list);
      } catch (e){ console.error(e); }
      setLoading(false);
    })();
  }, [token]);

  /* applications */
  useEffect(() => { if (token) fetchApps(); }, [token]);

  /* AI matches */
  useEffect(() => {
    if (!token) return;
    axios.get('http://localhost:8000/api/ranked_applicant_matches',{headers:authHdr})
      .then(r=>setMatches(r.data.filter(m=>m.consultant_id==user_id)))
      .catch(()=>{});
  }, [token, user_id]);

  /* resume upload */
  const uploadResume = async e => {
    const f=e.target.files[0]; if(!f) return;
    const ext='.'+f.name.split('.').pop().toLowerCase();
    if(!['.pdf','.doc','.docx'].includes(ext)){ setUpErr('PDF/DOC/DOCX only'); setUpOk(''); return;}
    if(f.size>5*1024*1024){ setUpErr('Max 5 MB'); setUpOk(''); return;}
    const form=new FormData(); form.append('consultant_id',user_id); form.append('file',f);
    try{ await axios.post('http://localhost:8000/api/upload-resume',form,{headers:{'Content-Type':'multipart/form-data'}}); setUpOk('Resume uploaded!'); setUpErr('');}
    catch(e){ setUpErr(e.response?.data?.detail||'Upload failed'); setUpOk('');}
  };

  /* apply */
  const apply = async id => {
    if (apps.some(a=>a.job_id===id)) return;
    try{
      await axios.post('http://localhost:8000/api/apply',{job_id:id,consultant_id:+user_id},{headers:authHdr});
      await fetchApps();
      alert('Application submitted!');
    }catch(e){ alert(e.response?.data?.detail||'Apply failed');}
  };

  /* logout */
  const logout = () => { localStorage.clear(); navigate('/'); };

  /* loading splash */
  if (loading) {
    return (
      <div style={styles.container}>
        <Header Name={name} onProfileClick={()=>setView('profile')} onLogout={logout}/>
        <div className="container text-center mt-5">
          <div className="spinner-border"/><p className="mt-3">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  /* ------------ views ------------ */
  const ApplicationsView = () => (
    <div style={styles.container}>
      
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>My Applications</h2>
          <button className="btn btn-outline-primary" onClick={()=>setView('dashboard')}>Back</button>
        </div>
        {apps.length===0
          ? <p className="text-center text-muted">No applications yet.</p>
          : <div className="row">
              {apps.map(a=>(
                <div key={a.id} className="col-md-6 col-lg-4 mb-3">
                  <div className="card h-100"><div className="card-body">
                    <h6>Application #{a.id}</h6>
                    <p className="mb-1">Job ID : {a.job_id}</p>
                    <p className="mb-1">Title  : {titleMap[a.job_id]||'—'}</p>
                    <small className="text-muted">
                      {a.applied_at ? 'Applied '+new Date(a.applied_at).toLocaleDateString() : ''}
                    </small>
                  </div></div>
                </div>
              ))}
            </div>}
      </div>
    </div>
  );

  const MatchesView = () => (
    <div style={styles.container}>
      
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>AI Job Matches</h2>
          <button className="btn btn-outline-primary" onClick={()=>setView('dashboard')}>Back</button>
        </div>
        {matches.length===0
          ? <p className="text-center text-muted">No AI matches yet.</p>
          : <div className="row">
              {matches.map((m,i)=>(
                <div key={m.id||i} className="col-md-6 col-lg-4 mb-3">
                  <div className="card h-100"><div className="card-body">
                    <h6>{Math.round(m.match_score)}% Match</h6>
                    <p className="mb-1">Job ID : {m.job_id}</p>
                    <p className="mb-1">Title  : {titleMap[m.job_id]||'—'}</p>
                    <small className="text-success d-block">Skills: {m.top_skills_matched?.join(', ')}</small>
                    <small className="text-warning d-block">Missing: {m.missing_skills?.join(', ')}</small>
                  </div></div>
                </div>
              ))}
            </div>}
      </div>
    </div>
  );

  const JobDetailsView = () => (
    <div style={styles.container}>
      
      <div className="container py-4">
        <button className="btn btn-outline-primary mb-3" onClick={()=>setView('dashboard')}>← Back</button>
        <div className="card shadow-sm">
          <div className="card-body">
            <h3 className="mb-2">{selectedJob.jobTitle}</h3>
            <h6 className="text-muted mb-3">🏢 {selectedJob.company}</h6>
            <p><strong>Location:</strong> {selectedJob.location}</p>
            <p><strong>Experience:</strong> {selectedJob.experienceLevel}</p>
            <p><strong>Salary:</strong> {selectedJob.salaryRange}</p>
            <hr/>
            <h5>Description</h5>
            <p style={{whiteSpace:'pre-wrap'}}>{selectedJob.description}</p>
            <h6 className="mt-4">Required Skills</h6>
            {selectedJob.requiredSkills.length ? selectedJob.requiredSkills.join(', ') : '—'}
            {selectedJob.preferredSkills.length && (
              <>
                <h6 className="mt-3">Preferred Skills</h6>
                {selectedJob.preferredSkills.join(', ')}
              </>
            )}
            <div className="mt-4">
              <button
                className={`btn ${apps.some(a=>a.job_id===selectedJob.id)?'btn-success':'btn-primary'}`}
                disabled={apps.some(a=>a.job_id===selectedJob.id)}
                onClick={()=>apply(selectedJob.id)}
              >
                {apps.some(a=>a.job_id===selectedJob.id) ? '✅ Applied' : '✉️ Apply Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="container">
      <UserHeader Name={name}/>
      {/* quick nav */}
      <div className="row mb-4"><div className="col-12 d-flex gap-2 flex-wrap">
        <button className="btn btn-outline-success btn-sm" onClick={()=>setView('applications')}>📋 My Applications ({apps.length})</button>
        <button className="btn btn-outline-info btn-sm"    onClick={()=>setView('matches')}>🎯 AI Matches ({matches.length})</button>
        <button className="btn btn-outline-primary btn-sm" onClick={()=>setView('profile')}>👤 Edit Profile</button>
      </div></div>

      {/* stats */}
      <div className="row mb-4">
        <StatsCard icon="🎯" value={jobs.length} label="Available Jobs" color="primary"/>
        <StatsCard icon="📈" value={jobs.length ? Math.round(jobs.reduce((a,j)=>a+j.matchScore,0)/jobs.length) : 0} label="Avg Match Score" color="success"/>
        <StatsCard icon="⚡" value={apps.length} label="Applications Sent" color="warning"/>
        <StatsCard icon="🔥" value={matches.length} label="AI Matches" color="info"/>
      </div>

      {/* resume upload */}
      <ResumeUpload uploadError={upErr} uploadSuccess={upOk} handleResumeUpload={uploadResume}/>

      {/* jobs */}
      <div style={styles.statsCard}>
        <div style={styles.sectionHeader}><span style={{fontSize:'1.5rem'}}>🎯</span><h4 className="mb-0">Available Jobs ({jobs.length})</h4></div>
        {jobs.length
          ? jobs.map(j=>(
              <JobCard key={j.id} job={j}
                       onApply={()=>apply(j.id)}
                       isApplied={apps.some(a=>a.job_id===j.id)}
                       onViewDetails={()=>{ setSelectedJob(j); setView('jobDetails'); }}
              />
            ))
          : <div style={styles.emptyState}>
              <div style={{fontSize:'4rem',marginBottom:20}}>🔍</div>
              <h5 className="text-muted mb-3">No jobs available</h5>
            </div>}
      </div>
    </div>
  );

  /* decide view */
  let body;
  if      (view==='profile')      body=<ConsultantProfile consultant={consultant} onBack={()=>setView('dashboard')} onUpdate={p=>{setConsultant(p);setName(p.name);}}/>;
  else if (view==='applications') body=<ApplicationsView/>;
  else if (view==='matches')      body=<MatchesView/>;
  else if (view==='jobDetails')   body=<JobDetailsView/>;
  else                            body=<DashboardView/>;

  /* wrapper with header */
  return (
    <div style={styles.container}>
      <Header Name={name} onProfileClick={()=>setView('profile')} onLogout={logout}/>
      {body}
    </div>
  );
}

export default UserDashboard;
