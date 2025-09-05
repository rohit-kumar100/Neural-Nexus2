import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Award, TrendingUp, Smartphone, Brain, Target, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { UserRole } from '../../types';

export const LandingPage: React.FC = () => {
  const { quickLogin } = useAuth();

  const roles: { type: UserRole; name: string; description: string; color: string }[] = [
    { type: 'student', name: 'Student', description: 'Manage certificates, internships & connect with alumni', color: 'bg-blue-500' },
    { type: 'faculty', name: 'Faculty', description: 'Approve achievements, track student progress & mentor', color: 'bg-green-500' },
    { type: 'admin', name: 'Admin', description: 'Generate reports, manage recruiters & oversee platform', color: 'bg-red-500' },
    { type: 'parent', name: 'Parent', description: 'Monitor child\'s progress, view achievements & mentors', color: 'bg-purple-500' },
    { type: 'alumni', name: 'Alumni', description: 'Network with students, share experiences & mentor', color: 'bg-yellow-500' },
    { type: 'recruiter', name: 'Recruiter', description: 'Access verified profiles, offer internships & placements', color: 'bg-indigo-500' }
  ];

  const futureFeatures = [
    { icon: Smartphone, title: 'PWA Support', description: 'Installable app experience across all devices' },
    { icon: Brain, title: 'AI Certificate Verification', description: 'Automated certificate authenticity checks' },
    { icon: Target, title: 'AI Course Recommendations', description: 'Personalized learning paths based on skills' },
    { icon: Zap, title: 'Smart Student-Recruiter Matching', description: 'AI-powered talent discovery and matching' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-3">
            <GraduationCap className="h-10 w-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">MyWork</h1>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold text-gray-900 mb-6"
          >
            MyWork — Verified Achievements,<br />
            <span className="text-blue-600">Smarter Futures</span>
          </motion.h2>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Comprehensive campus achievement management platform connecting students, faculty, 
            alumni, parents, and recruiters in one unified ecosystem.
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-blue-800 font-medium">2000+ Students</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
              <Award className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">Verified Achievements</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span className="text-purple-800 font-medium">Career Growth</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Accounts */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold text-center text-gray-900 mb-4"
          >
            Try Demo Accounts
          </motion.h3>
          <p className="text-center text-gray-600 mb-12">
            Experience MyWork from different perspectives - click any role to login instantly
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <motion.div
                key={role.type}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card hover className="p-6 h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center`}>
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{role.name}</h4>
                      <p className="text-gray-600 text-sm mb-4">{role.description}</p>
                    </div>
                    <Button
                      onClick={() => quickLogin(role.type)}
                      className={`w-full ${role.color} hover:opacity-90`}
                    >
                      Login as {role.name}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Scope */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Future Roadmap</h3>
            <p className="text-gray-600">Exciting features coming soon to enhance your MyWork experience</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {futureFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <Card hover className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">MyWork</span>
          </div>
          <p className="text-gray-600">© 2024 MyWork. Empowering student success through verified achievements.</p>
        </div>
      </footer>
    </div>
  );
};