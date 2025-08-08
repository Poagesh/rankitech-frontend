import { styles } from '../../styles/styles';

function UserHeader({ Name }) {
  return (
    <div style={styles.header} className="text-center">
      <h1 className="mb-3">
        <span style={{ fontSize: '2rem', marginRight: '10px' }}>👋</span>
        Welcome Back, {Name}!
      </h1>
      <p className="mb-0 fs-5">Ready to find your dream job? Let's explore your matches!</p>
    </div>
  );
}

export default UserHeader;