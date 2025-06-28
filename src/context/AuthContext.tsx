import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: 'admin' | 'dealer' | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'admin' | 'dealer' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('userRole');
    if (storedAuth === 'true' && (storedRole === 'admin' || storedRole === 'dealer')) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
    }
  }, []);

  const login = (username: string, password: string) => {
    // Bu kısım normalde bir API çağrısı ile backend'de doğrulanır.
    // Şimdilik sabit kullanıcı adları ve şifreler kullanıyoruz.
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      setUserRole('admin');
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'admin');
      showSuccess('Admin olarak giriş yapıldı!');
      navigate('/dashboard');
    } else if (username === 'dealer' && password === 'dealer') {
      setIsAuthenticated(true);
      setUserRole('dealer');
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'dealer');
      showSuccess('Bayi olarak giriş yapıldı!');
      navigate('/dealer-dashboard'); // Bayi paneline yönlendir
    } else {
      showError('Geçersiz kullanıcı adı veya şifre.');
      setIsAuthenticated(false);
      setUserRole(null);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    showSuccess('Başarıyla çıkış yapıldı.');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};