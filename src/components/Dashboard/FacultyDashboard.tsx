import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Users, TrendingUp, FileText, UserCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { mockAchievements, departments, generateStudents } from '../../data/mockData';

export const FacultyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'approvals' | 'students' | 'rankings' | 'assignments'>('approvals');
  const [pendingAchievements, setPendingAchievements] = useState(
    mockAchievements.map(a => ({ ...a, studentName: 'Rohit Sharma', studentId: 'CSE20A045' }))
  );

  const handleApproval = (id: string, status: 'approved' | 'rejected') => {
    setPendingAchievements(prev => 
      prev.map(achievement => 
        achievement.id === id ? { ...achievement, status } : achievement
      )
    );
  };

  const departmentRankings = departments.map((dept, index) => ({
    rank: index + 1,
    department: dept,
    avgCGPA: parseFloat((8.5 - index * 0.15).toFixed(2)),
    totalStudents: Math.floor(Math.random() * 300) + 200,
    placementRate: Math.floor(85 - index * 2)
  }));

  const topStudents = generateStudents('Computer Science Engineering', 3, 'A')
    .sort((a, b) => b.cgpa - a.cgpa)
    .slice(0, 10);

  const stats = [
    { label: 'Pending Approvals', value: '12', icon: Clock, color: 'text-yellow-600' },
    { label: 'Students Mentored', value: '45', icon: Users, color: 'text-blue-600' },
    { label: 'Approved This Month', value: '28', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Total Assignments', value: '8', icon: FileText, color: 'text-purple-600' }
  ];

  const tabs = [
    { id: 'approvals', name: 'Approvals', icon: CheckCircle },
    { id: 'students', name: 'My Students', icon: Users },
    { id: 'rankings', name: 'Rankings', icon: TrendingUp },
    { id: 'assignments', name: 'Assignments', icon: FileText }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
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

      {/* Approvals Tab */}
      {activeTab === 'approvals' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">Pending Approvals</h2>
          
          <div className="space-y-4">
            {pendingAchievements.map((achievement, index) => (
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
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <span><span className="font-medium">Student:</span> {achievement.studentName}</span>
                        <span>•</span>
                        <span><span className="font-medium">Organization:</span> {achievement.organization}</span>
                        <span>•</span>
                        <span>{achievement.date.toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                    {achievement.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleApproval(achievement.id, 'approved')}
                          className="flex items-center space-x-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Approve</span>
                        </Button>
                        <Button
                          onClick={() => handleApproval(achievement.id, 'rejected')}
                          variant="secondary"
                          className="flex items-center space-x-1 bg-red-600 hover:bg-red-700"
                        >
                          <XCircle className="h-4 w-4" />
                          <span>Reject</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Students Tab */}
      {activeTab === 'students' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">My Mentored Students</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topStudents.slice(0, 9).map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={student.profileImage}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.rollNumber}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">CGPA:</span>
                      <span className="font-semibold text-green-600">{student.cgpa}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Achievements:</span>
                      <span className="font-semibold">{student.achievements.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Year:</span>
                      <span>{student.year} | Section {student.section}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 flex items-center justify-center space-x-2">
                    <UserCheck className="h-4 w-4" />
                    <span>View Profile</span>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Rankings Tab */}
      {activeTab === 'rankings' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">Department & Student Rankings</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Department Rankings */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Department Rankings</h3>
              <Card className="p-6">
                <div className="space-y-4">
                  {departmentRankings.slice(0, 8).map((dept, index) => (
                    <motion.div
                      key={dept.department}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-blue-500'
                        }`}>
                          {dept.rank}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{dept.department}</p>
                          <p className="text-sm text-gray-600">{dept.totalStudents} students</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{dept.avgCGPA}</p>
                        <p className="text-sm text-green-600">{dept.placementRate}% placed</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Top Students */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Students (CSE)</h3>
              <Card className="p-6">
                <div className="space-y-4">
                  {topStudents.slice(0, 8).map((student, index) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-blue-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.rollNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{student.cgpa}</p>
                        <p className="text-sm text-gray-600">{student.achievements.length} achievements</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      )}

      {/* Assignments Tab */}
      {activeTab === 'assignments' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Assignments</h2>
            <Button className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Create Assignment</span>
            </Button>
          </div>
          
          <div className="grid gap-4">
            {Array.from({ length: 6 }, (_, i) => ({
              id: i + 1,
              title: `Assignment ${i + 1}: ${['Data Structures', 'Algorithms', 'Database Design', 'Web Development', 'Machine Learning', 'Computer Networks'][i]}`,
              dueDate: new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000),
              submissions: Math.floor(Math.random() * 45) + 20,
              totalStudents: 60,
              status: ['active', 'grading', 'completed'][Math.floor(Math.random() * 3)]
            })).map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                        <Badge variant={
                          assignment.status === 'completed' ? 'success' : 
                          assignment.status === 'grading' ? 'warning' : 'info'
                        }>
                          {assignment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Due: {assignment.dueDate.toLocaleDateString('en-IN')}</span>
                        <span>•</span>
                        <span>Submissions: {assignment.submissions}/{assignment.totalStudents}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View Submissions</Button>
                      <Button size="sm">Grade</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};