import { Student, Alumni, Recruiter, Achievement } from '../types';

export const departments = [
  'Computer Science Engineering',
  'Artificial Intelligence & Machine Learning',
  'Information Technology',
  'Electronics & Communication Engineering',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Biotechnology',
  'MBA',
  'MCA'
];

export const companies = [
  'Amazon', 'Flipkart', 'TCS', 'Infosys', 'Accenture', 'Wipro', 'Google', 
  'Microsoft', 'Adobe', 'Paytm', 'Zomato', 'Swiggy', 'BYJU\'S', 'Unacademy',
  'PhonePe', 'Razorpay', 'Ola', 'Uber', 'Samsung', 'IBM'
];

export const indianNames = [
  'Rohit Sharma', 'Pawanesh Kumar', 'Ananya Patel', 'Shaily Gupta', 'Vidhita Singh',
  'Aarav Jain', 'Priya Agarwal', 'Karan Malhotra', 'Neha Verma', 'Arjun Reddy',
  'Kavya Nair', 'Rajesh Yadav', 'Pooja Mehta', 'Vikram Singh', 'Sakshi Bansal',
  'Aditya Pandey', 'Riya Chopra', 'Nikhil Sinha', 'Deepika Raj', 'Harsh Thakur',
  'Shreya Kapoor', 'Manish Goel', 'Tanvi Shah', 'Rohan Das', 'Megha Joshi',
  'Siddharth Iyer', 'Nisha Tiwari', 'Abhishek Mishra', 'Ritika Aggarwal', 'Varun Sethi'
];

// ✅ Explicit profileImage for each demo account
export const demoAccounts = {
  student: { 
    email: 'student@mywork.edu', 
    password: 'demo123', 
    name: 'Rohit Sharma',
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg" 
  },
  faculty: { 
    email: 'faculty@mywork.edu', 
    password: 'demo123', 
    name: 'Dr. Priya Agarwal',
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  admin: { 
    email: 'admin@mywork.edu', 
    password: 'demo123', 
    name: 'Prof. Vikram Singh',
    profileImage: "https://randomuser.me/api/portraits/men/40.jpg"
  },
  parent: { 
    email: 'parent@mywork.edu', 
    password: 'demo123', 
    name: 'Mrs. Deepika Raj',
    profileImage: "https://randomuser.me/api/portraits/women/50.jpg"
  },
  alumni: { 
    email: 'alumni@mywork.edu', 
    password: 'demo123', 
    name: 'Aarav Jain',
    profileImage: "https://randomuser.me/api/portraits/men/12.jpg"
  },
  recruiter: { 
    email: 'recruiter@mywork.edu', 
    password: 'demo123', 
    name: 'Neha Verma',
    profileImage: "https://randomuser.me/api/portraits/women/22.jpg"
  }
};

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    type: 'certificate',
    title: 'AWS Cloud Practitioner',
    description: 'Cloud computing fundamentals certification',
    organization: 'Amazon Web Services',
    date: new Date('2024-01-15'),
    status: 'approved'
  },
  {
    id: '2',
    type: 'internship',
    title: 'Software Development Intern',
    description: 'Full-stack development with React and Node.js',
    organization: 'TCS',
    date: new Date('2024-06-01'),
    status: 'pending'
  },
  {
    id: '3',
    type: 'workshop',
    title: 'Machine Learning Bootcamp',
    description: 'Intensive 5-day ML workshop covering algorithms and implementation',
    organization: 'IIT Delhi',
    date: new Date('2024-03-20'),
    status: 'approved'
  },
  {
    id: '4',
    type: 'volunteering',
    title: 'Tech Mentor - Rural Schools',
    description: 'Teaching programming basics to underprivileged students',
    organization: 'NGO TechForAll',
    date: new Date('2024-02-10'),
    status: 'approved'
  },
  {
    id: '5',
    type: 'leadership',
    title: 'Student Council President',
    description: 'Led student body initiatives and organized tech events',
    organization: 'College Student Council',
    date: new Date('2023-08-01'),
    status: 'approved'
  }
];

export const mockAlumni: Alumni[] = companies.flatMap(company => 
  Array.from({ length: 3 }, (_, i) => ({
    id: `${company.toLowerCase()}-${i + 1}`,
    name: indianNames[Math.floor(Math.random() * indianNames.length)],
    company,
    position: ['Software Engineer', 'Senior Developer', 'Product Manager', 'Data Scientist', 'DevOps Engineer'][Math.floor(Math.random() * 5)],
    graduationYear: 2020 + Math.floor(Math.random() * 4),
    department: departments[Math.floor(Math.random() * departments.length)],
    linkedin: `https://linkedin.com/in/${indianNames[Math.floor(Math.random() * indianNames.length)].toLowerCase().replace(' ', '')}`,
    leetcode: `https://leetcode.com/${indianNames[Math.floor(Math.random() * indianNames.length)].toLowerCase().replace(' ', '')}`,
    github: `https://github.com/${indianNames[Math.floor(Math.random() * indianNames.length)].toLowerCase().replace(' ', '')}`,
    profileImage: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`
  }))
);

export const generateStudents = (department: string, year: number, section: string) => {
  const studentsPerSection = 60;
  return Array.from({ length: studentsPerSection }, (_, i) => ({
    id: `${department.toLowerCase().replace(/\s+/g, '')}-${year}-${section}-${i + 1}`,
    name: indianNames[Math.floor(Math.random() * indianNames.length)],
    email: `student${i + 1}.${section.toLowerCase()}${year}@mywork.edu`,
    role: 'student' as const,
    department,
    year,
    section,
    rollNumber: `${department.substring(0, 3).toUpperCase()}${year}${section}${String(i + 1).padStart(3, '0')}`,
    cgpa: parseFloat((7 + Math.random() * 3).toFixed(2)),
    phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    achievements: mockAchievements.slice(0, Math.floor(Math.random() * 5) + 1),
    hideDetails: {
      cgpa: Math.random() > 0.7,
      phone: Math.random() > 0.6
    },
    profileImage: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`
  }));
};

export const mockRecruiters: Recruiter[] = [
  { id: '1', name: 'Rajesh Kumar', company: 'TCS', email: 'rajesh@tcs.com', approved: true },
  { id: '2', name: 'Priya Sharma', company: 'Infosys', email: 'priya@infosys.com', approved: false },
  { id: '3', name: 'Amit Patel', company: 'Accenture', email: 'amit@accenture.com', approved: true },
  { id: '4', name: 'Sneha Gupta', company: 'Wipro', email: 'sneha@wipro.com', approved: false },
];
