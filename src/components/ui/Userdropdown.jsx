import { useNavigate } from 'react-router-dom';

function UserDropdown() {
  const navigate = useNavigate();

  const handleUserAction = (action) => {
    switch (action) {
      case 'profile':
        navigate('/profile');
        break;
      case 'logout':
        localStorage.removeItem('authToken');
        navigate('/login');
        break;
      default:
        break;
    }
  };

  return (
    <div className="d-flex justify-content-end mb-3 me-4">
      <div className="dropdown">
        <button
          className="btn btn-light dropdown-toggle d-flex align-items-center"
          type="button"
          id="userMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{
            borderRadius: '50%',
            padding: '10px 14px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            fontSize: '1.2rem',
          }}
        >
          👤
        </button>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuButton">
          <li>
            <h6 className="dropdown-header">👋 Hello, John</h6>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              📧 john.doe@example.com
            </a>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => handleUserAction('profile')}>
              ⚙️ Profile Settings
            </button>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button className="dropdown-item text-danger" onClick={() => handleUserAction('logout')}>
              🚪 Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserDropdown;