import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LandingPage } from './components/LandingPage/LandingPage';
import { LoginForm } from './components/Auth/LoginForm';
import { Navbar } from './components/Layout/Navbar';
import { StudentDashboard } from './components/Dashboard/StudentDashboard';
import { FacultyDashboard } from './components/Dashboard/FacultyDashboard';
import { AdminDashboard } from './components/Dashboard/AdminDashboard';
import { ParentDashboard } from './components/Dashboard/ParentDashboard';
import { AlumniDashboard } from './components/Dashboard/AlumniDashboard';
import { RecruiterDashboard } from './components/Dashboard/RecruiterDashboard';

// ✅ Import Rohit Profile
import RohitProfile from './components/Profile/RohitProfile';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const renderDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'faculty':
        return <FacultyDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'parent':
        return <ParentDashboard />;
      case 'alumni':
        return <AlumniDashboard />;
      case 'recruiter':
        return <RecruiterDashboard />;
      // ✅ New role for Rohit
      case 'rohit':
        return <RohitProfile />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        {!user ? (
          showLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex items-center justify-center p-4"
            >
              <LoginForm onBack={() => setShowLogin(false)} />
            </motion.div>
          ) : (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LandingPage />
            </motion.div>
          )
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Navbar />
            {renderDashboard()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
