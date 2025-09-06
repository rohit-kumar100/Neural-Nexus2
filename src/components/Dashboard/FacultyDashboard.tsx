import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Users, TrendingUp, FileText, ClipboardList } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { mockAchievements, departments } from '../../data/mockData';

export const FacultyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'approvals' | 'students' | 'rankings' | 'assignments' | 'attendance'>('attendance');
  const [pendingAchievements, setPendingAchievements] = useState(
    mockAchievements.map(a => ({ ...a, studentName: 'Rohit Sharma', studentId: 'CSE3A001' }))
  );

  // ===== Fixed Subjects =====
  const subjects = [
    'Web Technology', 'Design Thinking II', 'Data Analytics', 'Operating Systems', 'Computer Networks',
    'Software Engineering', 'Artificial Intelligence', 'Machine Learning', 'Computer Networks lab', 'Deep Learning'
  ];
  const [selectedSubject, setSelectedSubject] = useState<string>(subjects[0]);
  const [attendance, setAttendance] = useState<Record<string, Record<string, boolean>>>({});

  // ✅ Fixed list of 6 students
  const fixedStudents = [
    { id: 'stu-1', name: 'Rohit Kumar', rollNumber: 'CSE3A001', profileImage: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { id: 'stu-2', name: 'Arya Kumari', rollNumber: 'CSE3A002', profileImage: 'https://randomuser.me/api/portraits/men/46.jpg' },
    { id: 'stu-3', name: 'Shaily yadav', rollNumber: 'CSE3A003', profileImage: 'https://randomuser.me/api/portraits/women/47.jpg' },
    { id: 'stu-4', name: 'Pawanesh Kumar', rollNumber: 'CSE3A004', profileImage: 'https://randomuser.me/api/portraits/men/48.jpg' },
    { id: 'stu-5', name: 'Ananya Gupta', rollNumber: 'CSE3A005', profileImage: 'https://randomuser.me/api/portraits/women/49.jpg' },
    { id: 'stu-6', name: 'Vidhita Singh', rollNumber: 'CSE3A006', profileImage: 'https://randomuser.me/api/portraits/women/50.jpg' },
  ];

  // ===== Attendance =====
  const handleMarkAttendance = (studentId: string, status: boolean) => {
    setAttendance(prev => ({
      ...prev,
      [selectedSubject]: {
        ...(prev[selectedSubject] || {}),
        [studentId]: status
      }
    }));
  };

  const calculateAttendancePercentage = (subject: string) => {
    const subjectAttendance = attendance[subject] || {};
    const total = fixedStudents.length;
    const present = fixedStudents.reduce((acc, s) => acc + (subjectAttendance[s.id] ? 1 : 0), 0);
    return total ? Math.round((present / total) * 100) : 0;
  };

  // ===== Approvals =====
  const handleApproval = (id: string, status: 'approved' | 'rejected') => {
    setPendingAchievements(prev =>
      prev.map(achievement =>
        achievement.id === id ? { ...achievement, status } : achievement
      )
    );
  };

  // ===== Rankings =====
  const departmentRankings = departments.map((dept, index) => ({
    rank: index + 1,
    department: dept,
    avgCGPA: parseFloat((8.5 - index * 0.15).toFixed(2)),
    totalStudents: Math.floor(Math.random() * 300) + 200,
    placementRate: Math.floor(85 - index * 2)
  }));

  // ✅ Use only your fixed 6 students instead of dummy 10
  const myStudents = fixedStudents.map((s, i) => ({
    ...s,
    cgpa: (8.5 - i * 0.2).toFixed(2),
    year: 3,
    section: 'A',
    achievements: [],
  }));

  const stats = [
    { label: 'Pending Approvals', value: '12', icon: Clock, color: 'text-yellow-600' },
    { label: 'Students Mentored', value: '6', icon: Users, color: 'text-blue-600' },
    { label: 'Approved This Month', value: '28', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Total Assignments', value: '8', icon: FileText, color: 'text-purple-600' }
  ];

  const tabs = [
    { id: 'approvals', name: 'Approvals', icon: CheckCircle },
    { id: 'students', name: 'My Students', icon: Users },
    { id: 'rankings', name: 'Rankings', icon: TrendingUp },
    { id: 'assignments', name: 'Assignments', icon: FileText },
    { id: 'attendance', name: 'Attendance', icon: ClipboardList }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {tabs.map(tab => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.name}
          </Button>
        ))}
      </div>

      {/* Attendance */}
      {activeTab === 'attendance' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Attendance Management</h2>

          {/* Subject Selector */}
          <div className="flex flex-wrap gap-2 mb-4">
            {subjects.map((subj) => (
              <Button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={selectedSubject === subj ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}
              >
                {subj}
              </Button>
            ))}
          </div>

          {/* Summary */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-900">
                {selectedSubject} — Attendance: <span className="text-blue-600">{calculateAttendancePercentage(selectedSubject)}%</span>
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    const allPresent: Record<string, boolean> = {};
                    fixedStudents.forEach(s => { allPresent[s.id] = true; });
                    setAttendance(prev => ({ ...prev, [selectedSubject]: allPresent }));
                  }}
                >
                  Mark All Present
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setAttendance(prev => ({ ...prev, [selectedSubject]: {} }))}
                >
                  Clear
                </Button>
              </div>
            </div>
          </Card>

          {/* Student List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fixedStudents.map((student, index) => {
              const marked = attendance[selectedSubject]?.[student.id] ?? false;
              return (
                <motion.div key={student.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img src={student.profileImage} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <h3 className="font-semibold text-gray-900">{student.name}</h3>
                          <p className="text-sm text-gray-600">{student.rollNumber}</p>
                        </div>
                      </div>
                      <Badge variant={marked ? 'success' : 'error'}>
                        {marked ? 'Present' : 'Absent'}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleMarkAttendance(student.id, true)}>
                        Present
                      </Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={() => handleMarkAttendance(student.id, false)}>
                        Absent
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};
