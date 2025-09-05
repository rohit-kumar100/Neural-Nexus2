import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { demoAccounts } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  quickLogin: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('mywork-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Check demo accounts
    const demoAccount = demoAccounts[role];
    if (email === demoAccount.email && password === demoAccount.password) {
      const userData: User = {
        id: `${role}-1`,
        name: demoAccount.name,
        email: demoAccount.email,
        role,
        department: role === 'student' || role === 'faculty' ? 'Computer Science Engineering' : undefined,
        year: role === 'student' ? 3 : undefined,
        section: role === 'student' ? 'A' : undefined
      };
      setUser(userData);
      localStorage.setItem('mywork-user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const quickLogin = (role: UserRole) => {
    const demoAccount = demoAccounts[role];
    const userData: User = {
      id: `${role}-1`,
      name: demoAccount.name,
      email: demoAccount.email,
      role,
      department: role === 'student' || role === 'faculty' ? 'Computer Science Engineering' : undefined,
      year: role === 'student' ? 3 : undefined,
      section: role === 'student' ? 'A' : undefined
    };
    setUser(userData);
    localStorage.setItem('mywork-user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mywork-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, quickLogin }}>
      {children}
    </AuthContext.Provider>
  );
};