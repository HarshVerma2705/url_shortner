import { useAuth } from '../store/AuthContext';
import { authService } from '../services/auth.service';

export const useAuthActions = () => {
  const { login: setUser, logout: clearUser } = useAuth();

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    await authService.register(name, email, password);
    // Auto-login after register
    return login(email, password);
  };

  const logout = async () => {
    await authService.logout();
    clearUser();
  };

  return { login, register, logout };
};