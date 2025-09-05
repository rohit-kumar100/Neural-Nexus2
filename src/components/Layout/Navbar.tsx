import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, User, GraduationCap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const getRoleColor = (role: string) => {
    const colors = {
      student: 'text-blue-600',
      faculty: 'text-green-600',
      admin: 'text-red-600',
      parent: 'text-purple-600',
      alumni: 'text-yellow-600',
      recruiter: 'text-indigo-600'
    };
    return colors[role as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-lg border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">MyWork</h1>
            <span className="text-sm text-gray-500">|</span>
            <span className={`text-sm font-medium capitalize ${getRoleColor(user.role)}`}>
              {user.role} Dashboard
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="flex items-center space-x-1"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};