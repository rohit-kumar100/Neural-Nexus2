import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Award, TrendingUp, Smartphone, Brain, Target, Zap, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { UserRole } from '../../types';

export const LandingPage: React.FC = () => {
  const { quickLogin } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const roles: { type: UserRole; name: string; description: string; color: string }[] = [
    { type: 'student', name: 'Student', description: 'Manage certificates, internships & connect with alumni', color: 'bg-blue-500' },
    { type: 'faculty', name: 'Faculty', description: 'Approve achievements, track student progress & mentor', color: 'bg-green-500' },
    { type: 'admin', name: 'Admin', description: 'Generate reports, manage recruiters & oversee platform', color: 'bg-red-500' },
    { type: 'parent', name: 'Parent', description: 'Monitor child\'s progress, view achievements & mentors', color: 'bg-purple-500' },
    { type: 'alumni', name: 'Alumni', description: 'Network with students, share experiences & mentor', color: 'bg-yellow-500' },
    { type: 'recruiter', name: 'Recruiter', description: 'Access verified profiles, offer internships & placements', color: 'bg-indigo-500' }
  ];

  const whyChoose = [
    { icon: Users, title: 'Alumni Support', description: 'Mini LinkedIn for the college – alumni guide & support placements' },
    { icon: Award, title: 'Verified Achievements', description: 'Faculty-approved certificates, internships & activities' },
    { icon: TrendingUp, title: 'NAAC/NIRF Reports', description: 'Admin can easily generate NAAC, NIRF, AICTE reports' },
    { icon: GraduationCap, title: 'Parent Dashboard', description: 'Parents track student progress & achievements' },
    { icon: Zap, title: 'Job Opportunities', description: 'Verified student portfolios improve placement chances' },
    { icon: CheckCircle, title: 'Digital Portfolio', description: 'Auto-generated PDF & web link portfolios' },
    { icon: Brain, title: 'Collaboration', description: 'Connects students, faculty, alumni, parents & recruiters' },
    { icon: Target, title: 'Data-Driven Mentoring', description: 'Real-time insights for better student mentoring' }
  ];

  const uniqueness = [
    { icon: CheckCircle, title: 'All-in-One Platform', description: 'Combines academics, extracurriculars & achievements in one hub' },
    { icon: Award, title: 'Accreditation Ready', description: 'Directly supports NAAC, NIRF, AICTE reporting' },
    { icon: Users, title: 'Alumni + Recruiter Integration', description: 'Private LinkedIn for your institution' },
    { icon: GraduationCap, title: 'Verified Digital Portfolios', description: 'Faculty-approved, auto-generated portfolios for students' }
  ];

  const futureFeatures = [
    { icon: Smartphone, title: 'PWA Support', description: 'Installable app experience across all devices (Coming Soon)' },
    { icon: Brain, title: 'AI Certificate Verification', description: 'Automated authenticity checks (In Development)' },
    { icon: Target, title: 'AI Course Recommendations', description: 'Personalized learning paths (Planned)' },
    { icon: Zap, title: 'Smart Recruiter Matching', description: 'AI-powered recruiter-student matching (Planned)' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-10 w-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">MyWork</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowLoginModal(true)}>Login</Button>
            <Button size="sm" className="ml-[5px]">Signup</Button>
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
            A Centralized Digital Platform for Comprehensive Student Activity Records in HEIs – bridging the gap between students, faculty, alumni, recruiters & parents.
          </motion.p>
        </div>
      </section>

      {/* Why Choose MyWork */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold text-center text-gray-900 mb-4"
          >
            Why Choose MyWork?
          </motion.h3>
          <p className="text-center text-gray-600 mb-12">8 powerful reasons that make MyWork stand out for students, faculty & institutions</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <Card hover className="p-6 text-center">
                  <item.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes MyWork Unique */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What Makes MyWork Unique?</h3>
            <p className="text-gray-600">4 differentiators that set us apart from existing apps or ERPs</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.slice(0, 4).map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <Card hover className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
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
                  <feature.icon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
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

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Choose a Demo Account</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {roles.map((role) => (
                <Button
                  key={role.type}
                  className={`${role.color} text-white w-full py-3`}
                  onClick={() => {
                    quickLogin(role.type);
                    setShowLoginModal(false);
                  }}
                >
                  Login as {role.name}
                </Button>
              ))}
            </div>
            <div className="text-center mt-4">
              <Button variant="ghost" onClick={() => setShowLoginModal(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
