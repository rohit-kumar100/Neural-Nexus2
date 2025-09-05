import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Bell, Users, TrendingUp, CheckCircle, AlertTriangle, Building, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { mockRecruiters, departments } from '../../data/mockData';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'notifications' | 'reports' | 'recruiters'>('overview');
  const [recruiters, setRecruiters] = useState(mockRecruiters);

  const handleRecruiterApproval = (id: string, approved: boolean) => {
    setRecruiters(prev => 
      prev.map(recruiter => 
        recruiter.id === id ? { ...recruiter, approved } : recruiter
      )
    );
  };

  const stats = [
    { label: 'Total Students', value: '2,847', icon: Users, color: 'text-blue-600', change: '+12%' },
    { label: 'Active Faculty', value: '156', icon: Users, color: 'text-green-600', change: '+3%' },
    { label: 'Pending Approvals', value: '23', icon: AlertTriangle, color: 'text-yellow-600', change: '-5%' },
    { label: 'Alumni Network', value: '1,245', icon: Users, color: 'text-purple-600', change: '+8%' }
  ];

  const notifications = [
    { id: 1, type: 'recruiter', message: 'TCS has requested access to student database', time: '2 hours ago', urgent: true },
    { id: 2, type: 'achievement', message: '15 new certificates pending approval', time: '4 hours ago', urgent: false },
    { id: 3, type: 'recruiter', message: 'Infosys recruiter registration pending', time: '1 day ago', urgent: true },
    { id: 4, type: 'system', message: 'NAAC report generation completed', time: '2 days ago', urgent: false },
    { id: 5, type: 'achievement', message: 'Monthly achievement report ready', time: '3 days ago', urgent: false }
  ];

  const departmentStats = departments.map((dept, index) => ({
    department: dept,
    students: Math.floor(Math.random() * 400) + 200,
    faculty: Math.floor(Math.random() * 20) + 10,
    avgCGPA: parseFloat((8.5 - index * 0.1).toFixed(2)),
    placementRate: Math.floor(90 - index * 2)
  }));

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'reports', name: 'Reports', icon: FileText },
    { id: 'recruiters', name: 'Recruiters', icon: Building }
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
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
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
            {tab.id === 'notifications' && (
              <Badge variant="error" className="px-2 py-0.5">
                {notifications.filter(n => n.urgent).length}
              </Badge>
            )}
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
          <h2 className="text-2xl font-bold text-gray-900">Platform Overview</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Department Statistics */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Department Statistics</h3>
              <div className="space-y-4">
                {departmentStats.slice(0, 6).map((dept, index) => (
                  <motion.div
                    key={dept.department}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{dept.department}</p>
                      <p className="text-sm text-gray-600">{dept.students} students | {dept.faculty} faculty</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-600">{dept.avgCGPA}</p>
                      <p className="text-sm text-green-600">{dept.placementRate}%</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'New student registration', count: 25, time: 'Today' },
                  { action: 'Certificates approved', count: 18, time: 'Today' },
                  { action: 'Alumni profiles updated', count: 12, time: 'Yesterday' },
                  { action: 'Recruiter requests', count: 3, time: 'This week' },
                  { action: 'Reports generated', count: 7, time: 'This week' }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                        {activity.count}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-6 ${notification.urgent ? 'border-red-200 bg-red-50' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${notification.urgent ? 'bg-red-500' : 'bg-gray-400'}`} />
                      <div>
                        <p className="font-medium text-gray-900">{notification.message}</p>
                        <p className="text-sm text-gray-600 mt-1">{notification.time}</p>
                      </div>
                    </div>
                    {notification.urgent && (
                      <Badge variant="error">Urgent</Badge>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">Generate Reports</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'NAAC Report', description: 'Comprehensive report for NAAC accreditation', type: 'naac' },
              { name: 'NIRF Report', description: 'National Institutional Ranking Framework report', type: 'nirf' },
              { name: 'AICTE Report', description: 'Annual report for AICTE compliance', type: 'aicte' },
              { name: 'Student Analytics', description: 'Detailed student performance analytics', type: 'analytics' },
              { name: 'Placement Report', description: 'Annual placement statistics and trends', type: 'placement' },
              { name: 'Alumni Report', description: 'Alumni engagement and success metrics', type: 'alumni' }
            ].map((report, index) => (
              <motion.div
                key={report.type}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="p-6">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{report.description}</p>
                    <Button className="w-full flex items-center justify-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Generate Report</span>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recruiters Tab */}
      {activeTab === 'recruiters' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">Recruiter Management</h2>
          
          <div className="space-y-4">
            {recruiters.map((recruiter, index) => (
              <motion.div
                key={recruiter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Building className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{recruiter.name}</h3>
                        <p className="text-gray-600">{recruiter.company}</p>
                        <p className="text-sm text-gray-500">{recruiter.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={recruiter.approved ? 'success' : 'warning'}>
                        {recruiter.approved ? 'Approved' : 'Pending'}
                      </Badge>
                      {!recruiter.approved && (
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleRecruiterApproval(recruiter.id, true)}
                            size="sm"
                            className="flex items-center space-x-1"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Approve</span>
                          </Button>
                          <Button
                            onClick={() => handleRecruiterApproval(recruiter.id, false)}
                            variant="secondary"
                            size="sm"
                          >
                            Reject
                          </Button>
                        </div>
                      )}
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