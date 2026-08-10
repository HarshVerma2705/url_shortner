import { Link } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { useAuthActions } from '../../hooks/useAuthActions';

export const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const { logout } = useAuthActions();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Shortener</Link>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <span>Hello, {user?.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};