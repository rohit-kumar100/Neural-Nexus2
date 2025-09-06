import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Award, Calendar, TrendingUp, Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { mockAchievements } from '../../data/mockData';

export const ParentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'attendance' | 'mentor'>('overview');

  const childData = {
    name: 'Rohit',
    rollNumber: '0231csml200',
    department: 'Computer Science Engineering (AI&ML)',
    year: 3,
    section: 'B',
    cgpa: 7.9,
    phone: '+91 9876543210',
    email: 'Rohit@mywork.edu',
    mentor: {
      name: 'Dr. Priya Agarwal',
      email: 'priya.agarwal@mywork.edu',
      phone: '+91 9876543211',
      cabin: 'Room 204, CS Department'
    },
    coordinator: {
      name: 'Prof. Vikram Singh',
      email: 'vikram.singh@mywork.edu',
      phone: '+91 9876543212'
    },
   profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'

  };

  const attendanceData = {
    overall: 87,
    subjects: [
      { name: 'Data Structures', attendance: 92, classes: 45, present: 41 },
      { name: 'Algorithms', attendance: 88, classes: 40, present: 35 },
      { name: 'Database Systems', attendance: 85, classes: 38, present: 32 },
      { name: 'Web Development', attendance: 90, classes: 42, present: 38 },
      { name: 'Computer Networks', attendance: 82, classes: 39, present: 32 }
    ]
  };

  const stats = [
    { label: 'Overall CGPA', value: childData.cgpa.toString(), icon: TrendingUp, color: 'text-green-600' },
    { label: 'Achievements', value: mockAchievements.length.toString(), icon: Award, color: 'text-blue-600' },
    { label: 'Attendance', value: `${attendanceData.overall}%`, icon: Calendar, color: 'text-purple-600' },
    { label: 'Current Year', value: childData.year.toString(), icon: User, color: 'text-indigo-600' }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'achievements', name: 'Achievements', icon: Award },
    { id: 'attendance', name: 'Attendance', icon: Calendar },
    { id: 'mentor', name: 'Mentor Details', icon: MessageCircle }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Child Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card className="p-6">
          <div className="flex items-center space-x-6">
            <img
              src={childData.profileImage}
              alt={childData.name}
              className="w-20 h-20 rounded-full object-cover shadow-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{childData.name}</h1>
              <p className="text-gray-600">{childData.rollNumber} | {childData.department}</p>
              <p className="text-gray-600">Year {childData.year}, Section {childData.section}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">Academic Overview</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Overall CGPA</span>
                  <span className="font-semibold text-green-600">{childData.cgpa}/10</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Class Rank</span>
                  <span className="font-semibold text-blue-600">5th out of 60</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Attendance</span>
                  <span className="font-semibold text-purple-600">{attendanceData.overall}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-gray-700">Pending Assignments</span>
                  <span className="font-semibold text-yellow-600">2</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">{childData.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">{childData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Department</p>
                    <p className="text-gray-600">{childData.department}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">Verified Achievements</h2>
          
          <div className="grid gap-4">
            {mockAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{achievement.title}</h3>
                        <Badge variant={achievement.status === 'approved' ? 'success' : achievement.status === 'pending' ? 'warning' : 'error'}>
                          {achievement.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{achievement.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{achievement.organization}</span>
                        <span>•</span>
                        <span>{achievement.date.toLocaleDateString('en-IN')}</span>
                        <span>•</span>
                        <span className="capitalize">{achievement.type}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Attendance Tab */}
      {activeTab === 'attendance' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">Attendance Record</h2>
          
          <Card className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium text-gray-900">Overall Attendance</span>
                <span className={`text-2xl font-bold ${attendanceData.overall >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                  {attendanceData.overall}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${attendanceData.overall >= 75 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${attendanceData.overall}%` }}
                />
              </div>
              {attendanceData.overall < 75 && (
                <p className="text-sm text-red-600 mt-2">⚠️ Attendance is below minimum required 75%</p>
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Attendance</h3>
            <div className="space-y-4">
              {attendanceData.subjects.map((subject, index) => (
                <motion.div
                  key={subject.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{subject.name}</span>
                    <span className={`font-semibold ${subject.attendance >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                      {subject.attendance}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Present: {subject.present} classes</span>
                    <span>Total: {subject.classes} classes</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full ${subject.attendance >= 75 ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${subject.attendance}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Mentor Details Tab */}
      {activeTab === 'mentor' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">Mentor & Coordinator Details</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mentor Details */}
            <Card className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Academic Mentor</h3>
                  <p className="text-gray-600">Direct guidance & support</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900">Name</p>
                  <p className="text-gray-600">{childData.mentor.name}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">{childData.mentor.email}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">{childData.mentor.phone}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Office</p>
                  <p className="text-gray-600">{childData.mentor.cabin}</p>
                </div>
              </div>
              
              <Button className="w-full mt-6 flex items-center justify-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Contact Mentor</span>
              </Button>
            </Card>

            {/* Coordinator Details */}
            <Card className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Program Coordinator</h3>
                  <p className="text-gray-600">Academic administration</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900">Name</p>
                  <p className="text-gray-600">{childData.coordinator.name}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">{childData.coordinator.email}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">{childData.coordinator.phone}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Role</p>
                  <p className="text-gray-600">Department Coordinator</p>
                </div>
              </div>
              
              <Button className="w-full mt-6 flex items-center justify-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Contact Coordinator</span>
              </Button>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  );
};