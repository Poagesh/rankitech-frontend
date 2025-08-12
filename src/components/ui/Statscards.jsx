// rankitech-frontend/src/components/ui/Statscards.jsx
import { styles } from '../../styles/styles';

function StatsCard({ icon, value, label, color }) {
  return (
    <div className="col-md-3 flex">
        <div style={styles.statsCard} className="text-center">
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{icon}</div>
          <h3 className={`mb-1 text-${color}`}>{value}</h3>
          <p className="text-muted mb-0">{label}</p>
    </div>
     </div>
  );
}

export default StatsCard;