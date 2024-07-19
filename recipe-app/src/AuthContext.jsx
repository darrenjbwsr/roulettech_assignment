import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './authService';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const register = async (username, email, password) => {
      await authService.register(username, email, password);
      navigate('/login')

  }

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    if (data.access) {
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
    } else {
      throw new Error('Login failed');
    }
  };

  const refreshToken = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.refresh) {
      const data = await authService.refreshToken(storedUser.refresh);
      if (data.access) {
        storedUser.access = data.access;
        setUser(storedUser);
        localStorage.setItem('user', JSON.stringify(storedUser));
      } else {
        logout();
      }
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };


  return (
    <AuthContext.Provider value={{ user, login, register, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};



AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default AuthContext;
