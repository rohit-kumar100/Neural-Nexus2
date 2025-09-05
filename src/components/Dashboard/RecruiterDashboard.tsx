import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Users, Briefcase, Star, Download, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { departments, generateStudents } from '../../data/mockData';

export const RecruiterDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'offers' | 'analytics' | 'profile'>('students');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [minCGPA, setMinCGPA] = useState<number>(7);

  const recruiterData = {
    name: 'Neha Verma',
    company: 'TCS',
    position: 'Senior Talent Acquisition Manager',
    email: 'neha.verma@tcs.com',
    phone: '+91 9876543213',
    approved: true
  };

  // Generate students based on filters
  const getFilteredStudents = () => {
    let allStudents: any[] = [];
    
    if (selectedDepartment && selectedYear) {
      // Get students from selected department and year
      ['A', 'B', 'C'].forEach(section => {
        allStudents = [...allStudents, ...generateStudents(selectedDepartment, selectedYear, section)];
      });
    } else {
      // Get students from all departments if no filter applied
      departments.forEach(dept => {
        [3, 4].forEach(year => { // Only 3rd and 4th year for recruitment
          ['A', 'B'].forEach(section => {
            allStudents = [...allStudents, ...generateStudents(dept, year, section).slice(0, 20)]; // Limit for performance
          });
        });
      });
    }
    
    return allStudents.filter(student => 
      student.cgpa >= minCGPA &&
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      student.achievements.some((a: any) => a.status === 'approved') // Only students with approved achievements
    );
  };

  const filteredStudents = getFilteredStudents().slice(0, 18); // Limit display for performance

  const offers = [
    { id: 1, position: 'Software Engineer Intern', location: 'Bangalore', students: 45, status: 'Active', deadline: '2024-03-15' },
    { id: 2, position: 'Full Stack Developer', location: 'Hyderabad', students: 23, status: 'Active', deadline: '2024-03-20' },
    { id: 3, position: 'Data Analyst', location: 'Chennai', students: 31, status: 'Closed', deadline: '2024-02-28' },
    { id: 4, position: 'DevOps Engineer', location: 'Pune', students: 18, status: 'Draft', deadline: '2024-04-10' }
  ];

  const stats = [
    { label: 'Eligible Students', value: filteredStudents.length.toString(), icon: Users, color: 'text-blue-600' },
    { label: 'Active Offers', value: offers.filter(o => o.status === 'Active').length.toString(), icon: Briefcase, color: 'text-green-600' },
    { label: 'Applications', value: '127', icon: Star, color: 'text-purple-600' },
    { label: 'Shortlisted', value: '34', icon: Users, color: 'text-indigo-600' }
  ];

  const tabs = [
    { id: 'students', name: 'Student Profiles', icon: Users },
    { id: 'offers', name: 'Job Offers', icon: Briefcase },
    { id: 'analytics', name: 'Analytics', icon: Star },
    { id: 'profile', name: 'Company Profile', icon: Users }
  ];

  if (!recruiterData.approved) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Approval Pending</h2>
          <p className="text-gray-600 mb-6">
            Your recruiter account is currently under review by the admin team. 
            You'll receive access to student profiles once approved.
          </p>
          <Badge variant="warning" className="px-4 py-2">Pending Admin Approval</Badge>
        </Card>
      </div>
    );
  }

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

      {/* Students Tab */}
      {activeTab === 'students' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Filters */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Students</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select
                  value={selectedYear || ''}
                  onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Years</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min CGPA</label>
                <select
                  value={minCGPA}
                  onChange={(e) => setMinCGPA(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="6">6.0+</option>
                  <option value="7">7.0+</option>
                  <option value="8">8.0+</option>
                  <option value="9">9.0+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Students Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student, index) => (
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
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Department:</span>
                      <span className="font-medium">{student.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Year:</span>
                      <span className="font-medium">{student.year} | Section {student.section}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CGPA:</span>
                      <span className="font-semibold text-green-600">{student.cgpa}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Achievements:</span>
                      <span className="font-medium">{student.achievements.filter((a: any) => a.status === 'approved').length}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center space-x-1">
                      <Download className="h-3 w-3" />
                      <span>Resume</span>
                    </Button>
                    <Button size="sm" className="flex-1 flex items-center justify-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>Contact</span>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Offers Tab */}
      {activeTab === 'offers' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Job Offers</h2>
            <Button className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>Create New Offer</span>
            </Button>
          </div>

          <div className="space-y-4">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{offer.position}</h3>
                        <Badge variant={
                          offer.status === 'Active' ? 'success' : 
                          offer.status === 'Closed' ? 'error' : 'warning'
                        }>
                          {offer.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <span><span className="font-medium">Location:</span> {offer.location}</span>
                        <span>•</span>
                        <span><span className="font-medium">Applications:</span> {offer.students}</span>
                        <span>•</span>
                        <span><span className="font-medium">Deadline:</span> {new Date(offer.deadline).toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View Applications</Button>
                      <Button size="sm">Manage</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">Recruitment Analytics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Applications by Department</h3>
              <div className="space-y-4">
                {departments.slice(0, 5).map((dept, index) => {
                  const applications = Math.floor(Math.random() * 30) + 10;
                  const maxApplications = 50;
                  return (
                    <div key={dept}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{dept}</span>
                        <span className="text-gray-600">{applications}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(applications / maxApplications) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">CGPA Distribution</h3>
              <div className="space-y-4">
                {[
                  { range: '9.0 - 10.0', count: 12, color: 'bg-green-500' },
                  { range: '8.0 - 8.9', count: 28, color: 'bg-blue-500' },
                  { range: '7.0 - 7.9', count: 45, color: 'bg-yellow-500' },
                  { range: '6.0 - 6.9', count: 23, color: 'bg-orange-500' }
                ].map((cgpa) => (
                  <div key={cgpa.range}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{cgpa.range}</span>
                      <span className="text-gray-600">{cgpa.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${cgpa.color} h-2 rounded-full`}
                        style={{ width: `${(cgpa.count / 108) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">Company Profile</h2>
          
          <Card className="p-8">
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{recruiterData.company}</h3>
                <p className="text-gray-600">IT Services & Consulting</p>
                <Badge variant="success" className="mt-2">Verified Recruiter</Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Recruiter Information</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">Name</p>
                    <p className="text-gray-600">{recruiterData.name}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Position</p>
                    <p className="text-gray-600">{recruiterData.position}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">{recruiterData.email}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">{recruiterData.phone}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Company Statistics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Hires</span>
                    <span className="font-semibold text-gray-900">1,200+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Positions</span>
                    <span className="font-semibold text-gray-900">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Global Offices</span>
                    <span className="font-semibold text-gray-900">50+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employee Count</span>
                    <span className="font-semibold text-gray-900">600,000+</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};