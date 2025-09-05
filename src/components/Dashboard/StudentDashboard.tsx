import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Download, Eye, EyeOff, MessageCircle, Filter, Search, Award, Briefcase, Users, Building } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { mockAchievements, mockAlumni, generateStudents, departments, companies } from '../../data/mockData';
import { generatePDF } from '../../utils/pdfGenerator';

export const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'achievements' | 'alumni' | 'students'>('profile');
  const [hideDetails, setHideDetails] = useState({ cgpa: false, phone: false });
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState('');

  const studentData = {
    name: 'Arya Stark',
    rollNumber: 'CSE20A045',
    department: 'Computer Science Engineering',
    year: 3,
    section: 'A',
    cgpa: 8.75,
    phone: '+91 9876543210',
    email: 'AryaStark@mywork.edu',
    mentor: 'Dr. Priya Agarwal',
    profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
  };

  const filteredAlumni = mockAlumni.filter(alumni => 
    (!selectedCompany || alumni.company === selectedCompany) &&
    alumni.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadPortfolio = () => {
    generatePDF(studentData, mockAchievements.filter(a => a.status === 'approved'));
  };

  const getStudents = () => {
    if (selectedDepartment && selectedYear && selectedSection) {
      return generateStudents(selectedDepartment, selectedYear, selectedSection);
    }
    return [];
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: Award },
    { id: 'achievements', name: 'Achievements', icon: Award },
    { id: 'alumni', name: 'Alumni Network', icon: Users },
    { id: 'students', name: 'Students', icon: Building }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
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

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="p-8">
            <div className="flex items-start space-x-6">
              <img
                src={studentData.profileImage}
                alt={studentData.name}
                className="w-24 h-24 rounded-full object-cover shadow-lg"
              />
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{studentData.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                  <div>
                    <span className="font-medium">Roll Number:</span> {studentData.rollNumber}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {studentData.email}
                  </div>
                  <div>
                    <span className="font-medium">Department:</span> {studentData.department}
                  </div>
                  <div>
                    <span className="font-medium">Year:</span> {studentData.year} | Section: {studentData.section}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">CGPA:</span>
                    {hideDetails.cgpa ? (
                      <span className="text-gray-400">Hidden</span>
                    ) : (
                      <span className="font-semibold text-green-600">{studentData.cgpa}</span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setHideDetails(prev => ({ ...prev, cgpa: !prev.cgpa }))}
                    >
                      {hideDetails.cgpa ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Phone:</span>
                    {hideDetails.phone ? (
                      <span className="text-gray-400">Hidden</span>
                    ) : (
                      <span>{studentData.phone}</span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setHideDetails(prev => ({ ...prev, phone: !prev.phone }))}
                    >
                      {hideDetails.phone ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div>
                    <span className="font-medium">Mentor:</span> {studentData.mentor}
                  </div>
                </div>
              </div>
              <Button onClick={handleDownloadPortfolio} className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download Portfolio</span>
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">My Achievements</h2>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Achievement</span>
            </Button>
          </div>

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
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Alumni Network Tab */}
      {activeTab === 'alumni' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <h2 className="text-2xl font-bold text-gray-900">Alumni Network</h2>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search alumni..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Companies</option>
                {companies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.slice(0, 12).map((alumni, index) => (
              <motion.div
                key={alumni.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={alumni.profileImage}
                      alt={alumni.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{alumni.name}</h3>
                      <p className="text-sm text-gray-600">{alumni.position}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><span className="font-medium">Company:</span> {alumni.company}</p>
                    <p><span className="font-medium">Graduated:</span> {alumni.graduationYear}</p>
                    <p><span className="font-medium">Department:</span> {alumni.department}</p>
                  </div>
                  <div className="flex space-x-2 mb-4">
                    {alumni.linkedin && (
                      <Button variant="outline" size="sm" className="text-xs">LinkedIn</Button>
                    )}
                    {alumni.github && (
                      <Button variant="outline" size="sm" className="text-xs">GitHub</Button>
                    )}
                    {alumni.leetcode && (
                      <Button variant="outline" size="sm" className="text-xs">LeetCode</Button>
                    )}
                  </div>
                  <Button className="w-full flex items-center justify-center space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Connect</span>
                  </Button>
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
          <h2 className="text-2xl font-bold text-gray-900">Student Directory</h2>
          
          {/* Department Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.target.value);
                  setSelectedYear(null);
                  setSelectedSection('');
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            {selectedDepartment && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select
                  value={selectedYear || ''}
                  onChange={(e) => {
                    setSelectedYear(e.target.value ? parseInt(e.target.value) : null);
                    setSelectedSection('');
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Year</option>
                  {[1, 2, 3, 4].map(year => (
                    <option key={year} value={year}>Year {year}</option>
                  ))}
                </select>
              </div>
            )}
            
            {selectedYear && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Section</option>
                  {['A', 'B', 'C'].map(section => (
                    <option key={section} value={section}>Section {section}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Students List */}
          {selectedDepartment && selectedYear && selectedSection && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getStudents().slice(0, 18).map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <Card hover className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={student.profileImage}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{student.name}</h3>
                        <p className="text-sm text-gray-600">{student.rollNumber}</p>
                        <p className="text-xs text-gray-500">CGPA: {student.cgpa}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};