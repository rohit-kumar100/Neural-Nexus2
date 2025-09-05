export type UserRole = 'student' | 'faculty' | 'admin' | 'parent' | 'alumni' | 'recruiter';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  year?: number;
  section?: string;
  profileImage?: string;
  parentId?: string;
  mentorId?: string;
}

export interface Student extends User {
  role: 'student';
  rollNumber: string;
  cgpa: number;
  phone: string;
  achievements: Achievement[];
  hideDetails: {
    cgpa: boolean;
    phone: boolean;
  };
}

export interface Achievement {
  id: string;
  type: 'certificate' | 'internship' | 'workshop' | 'volunteering' | 'leadership';
  title: string;
  description: string;
  organization: string;
  date: Date;
  status: 'approved' | 'pending' | 'rejected';
  document?: string;
}

export interface Alumni {
  id: string;
  name: string;
  company: string;
  position: string;
  graduationYear: number;
  department: string;
  linkedin?: string;
  leetcode?: string;
  github?: string;
  profileImage?: string;
}

export interface Recruiter {
  id: string;
  name: string;
  company: string;
  email: string;
  approved: boolean;
}