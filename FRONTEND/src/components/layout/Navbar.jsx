import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { useAuthActions } from '../../hooks/useAuthActions';
import { Link2, LogOut, User, LayoutDashboard } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const { logout } = useAuthActions();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-slate-900 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <Link2 className="w-5 h-5 text-white" />
          </div>
          <span>Shortly</span>
        </Link>

        <div className="flex items-center gap-1">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <div className="flex items-center gap-2 px-4 py-2 text-sm text-slate-500">
                <User className="w-4 h-4" />
                <span className="max-w-25 truncate">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};