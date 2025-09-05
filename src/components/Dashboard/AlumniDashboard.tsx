import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Building, ExternalLink, Search, Filter } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { mockAlumni, companies, generateStudents } from '../../data/mockData';

export const AlumniDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'network' | 'students' | 'chat' | 'profile'>('network');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const currentAlumni = {
    name: 'Aarav Jain',
    company: 'Google',
    position: 'Senior Software Engineer',
    graduationYear: 2019,
    department: 'Computer Science Engineering',
    experience: '5 years',
    linkedin: 'https://linkedin.com/in/aaravjain',
    github: 'https://github.com/aaravjain',
    leetcode: 'https://leetcode.com/aaravjain',
    profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
  };

  const filteredAlumni = mockAlumni.filter(alumni => 
    alumni.id !== 'google-1' && // Exclude current user
    (!selectedCompany || alumni.company === selectedCompany) &&
    alumni.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentStudents = generateStudents('Computer Science Engineering', 4, 'A').slice(0, 12);

  const chatMessages = [
    { id: 1, from: 'Rohit Sharma', message: 'Hi! I\'m interested in software development. Can you guide me?', time: '2 hours ago', unread: true },
    { id: 2, from: 'Priya Agarwal', message: 'What skills should I focus on for product management roles?', time: '1 day ago', unread: true },
    { id: 3, from: 'Karan Malhotra', message: 'Thank you for the internship referral advice!', time: '2 days ago', unread: false },
    { id: 4, from: 'Ananya Patel', message: 'Could you review my resume for tech roles?', time: '3 days ago', unread: false }
  ];

  const stats = [
    { label: 'Alumni Connected', value: '156', icon: Users, color: 'text-blue-600' },
    { label: 'Students Mentored', value: '23', icon: MessageCircle, color: 'text-green-600' },
    { label: 'Companies Represented', value: companies.length.toString(), icon: Building, color: 'text-purple-600' },
    { label: 'Years of Experience', value: currentAlumni.experience.split(' ')[0], icon: Users, color: 'text-indigo-600' }
  ];

  const tabs = [
    { id: 'network', name: 'Alumni Network', icon: Users },
    { id: 'students', name: 'Connect with Students', icon: MessageCircle },
    { id: 'chat', name: 'Messages', icon: MessageCircle },
    { id: 'profile', name: 'My Profile', icon: Users }
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
            {tab.id === 'chat' && chatMessages.filter(m => m.unread).length > 0 && (
              <Badge variant="error" className="px-2 py-0.5">
                {chatMessages.filter(m => m.unread).length}
              </Badge>
            )}
          </motion.button>
        ))}
      </div>

      {/* Alumni Network Tab */}
      {activeTab === 'network' && (
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
                      <Button variant="outline" size="sm" className="text-xs">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        LinkedIn
                      </Button>
                    )}
                    {alumni.github && (
                      <Button variant="outline" size="sm" className="text-xs">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        GitHub
                      </Button>
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
          <h2 className="text-2xl font-bold text-gray-900">Connect with Final Year Students</h2>
          <p className="text-gray-600">Share your experience and mentor the next generation of professionals.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentStudents.map((student, index) => (
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
                    <p><span className="font-medium">Department:</span> {student.department}</p>
                    <p><span className="font-medium">CGPA:</span> {student.cgpa}</p>
                    <p><span className="font-medium">Achievements:</span> {student.achievements.length}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Profile
                    </Button>
                    <Button size="sm" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
          
          <div className="space-y-4">
            {chatMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-6 ${message.unread ? 'border-blue-200 bg-blue-50' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${message.unread ? 'bg-blue-500' : 'bg-gray-400'}`} />
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{message.from}</h3>
                          {message.unread && <Badge variant="info" className="text-xs">New</Badge>}
                        </div>
                        <p className="text-gray-700">{message.message}</p>
                        <p className="text-sm text-gray-500 mt-2">{message.time}</p>
                      </div>
                    </div>
                    <Button size="sm" className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>Reply</span>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
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
          <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
          
          <Card className="p-8">
            <div className="flex items-start space-x-6">
              <img
                src={currentAlumni.profileImage}
                alt={currentAlumni.name}
                className="w-24 h-24 rounded-full object-cover shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentAlumni.name}</h3>
                <p className="text-lg text-gray-600 mb-4">{currentAlumni.position} at {currentAlumni.company}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                  <div>
                    <span className="font-medium">Graduation Year:</span> {currentAlumni.graduationYear}
                  </div>
                  <div>
                    <span className="font-medium">Department:</span> {currentAlumni.department}
                  </div>
                  <div>
                    <span className="font-medium">Experience:</span> {currentAlumni.experience}
                  </div>
                  <div>
                    <span className="font-medium">Current Company:</span> {currentAlumni.company}
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>GitHub</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>LeetCode</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Career Journey</h4>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h5 className="font-medium text-gray-900">Senior Software Engineer - Google</h5>
                <p className="text-sm text-gray-600">2022 - Present</p>
                <p className="text-gray-700 mt-2">Leading full-stack development for Google Search features, managing a team of 5 developers.</p>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <h5 className="font-medium text-gray-900">Software Engineer - Google</h5>
                <p className="text-sm text-gray-600">2020 - 2022</p>
                <p className="text-gray-700 mt-2">Developed scalable backend services and improved system performance by 40%.</p>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <h5 className="font-medium text-gray-900">Software Engineer Intern - Microsoft</h5>
                <p className="text-sm text-gray-600">2019 - 2020</p>
                <p className="text-gray-700 mt-2">Built internal tools and contributed to Azure cloud services development.</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};