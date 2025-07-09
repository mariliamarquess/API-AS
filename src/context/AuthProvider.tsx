// src/context/AuthProvider.tsx
import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from './AuthContext';
import CookieManager from '../helpers/Cookie';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = (userData: AuthContextType['user'], token: string) => {
    setUser(userData);
    setIsAuthenticated(true);
    CookieManager.setCookie('accessToken', token, 1);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    CookieManager.removeCookie('accessToken');
    navigate('/sign-in');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout }}>
      {children}
    </AuthContext.Provider>
  );
};