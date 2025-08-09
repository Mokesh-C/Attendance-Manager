import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import MainNavigation from '../../components/ui/MainNavigation';
import QuickActionFAB from '../../components/ui/QuickActionFAB';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import SubjectTable from './components/SubjectTable';
import facultyData from '../../data/faculty.json';
import subjectsData from '../../data/subjects.json';
import { getCurrentClassCode } from '../../utils/classUtils';

const SubjectManagement = () => {
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState('card');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [facultyFilter, setFacultyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ field: 'name', direction: 'asc' });

  // Mock data
  const [subjects, setSubjects] = useState([]);
  
  // Load user role from localStorage
  useEffect(() => {
    const userType = localStorage.getItem('psg_user_type');
    const className = localStorage.getItem('psg_class_name');
    const roleCode = userType === 'Class Representative' ? 'CR' : userType;
    setUserRole(roleCode || 'CR');
    setUserName(className || 'N/A');
  }, []);
  
  useEffect(() => {
    const currentClassCode = getCurrentClassCode();
    setSubjects(subjectsData[currentClassCode]?.map((s, idx) => {
      const faculty = facultyData.faculty.find(f => f.email === s.facultyEmail);
      return {
        id: idx + 1,
        name: s.subjectName,
        code: s.subjectCode,
        faculty: faculty || { email: s.facultyEmail, name: 'N/A', mobile: '', department: '', designation: '' }
      };
    }) || []);
  }, []);

  const facultyList = [
    {
      id: 'f1',
      name: 'Dr. Rajesh Kumar',
      department: 'Computer Science Engineering',
      email: 'rajesh.kumar@psgtech.edu',
      mobile: '+91 9876543210'
    },
    {
      id: 'f2',
      name: 'Prof. Meera Nair',
      department: 'Computer Science Engineering',
      email: 'meera.nair@psgtech.edu',
      mobile: '+91 9876543211'
    },
    {
      id: 'f3',
      name: 'Dr. Arun Vijay',
      department: 'Computer Science Engineering',
      email: 'arun.vijay@psgtech.edu',
      mobile: '+91 9876543212'
    },
    {
      id: 'f4',
      name: 'Prof. Kavitha Raman',
      department: 'Electronics and Communication',
      email: 'kavitha.raman@psgtech.edu',
      mobile: '+91 9876543213'
    }
  ];

  const studentList = [
    { id: 's1', name: 'Arjun Patel', rollNumber: '21CS001', class: 'III CSE A', email: 'arjun.patel@student.psgtech.edu' },
    { id: 's2', name: 'Sneha Reddy', rollNumber: '21CS002', class: 'III CSE A', email: 'sneha.reddy@student.psgtech.edu' },
    { id: 's3', name: 'Karthik Menon', rollNumber: '21CS003', class: 'III CSE A', email: 'karthik.menon@student.psgtech.edu' },
    { id: 's4', name: 'Divya Krishnan', rollNumber: '21CS004', class: 'III CSE A', email: 'divya.krishnan@student.psgtech.edu' },
    { id: 's5', name: 'Rohit Sharma', rollNumber: '21CS005', class: 'III CSE A', email: 'rohit.sharma@student.psgtech.edu' },
    { id: 's6', name: 'Lakshmi Iyer', rollNumber: '21CS006', class: 'III CSE B', email: 'lakshmi.iyer@student.psgtech.edu' },
    { id: 's7', name: 'Vikram Singh', rollNumber: '21CS007', class: 'III CSE B', email: 'vikram.singh@student.psgtech.edu' },
    { id: 's8', name: 'Priya Nambiar', rollNumber: '21EC001', class: 'III ECE A', email: 'priya.nambiar@student.psgtech.edu' },
    { id: 's9', name: 'Suresh Kumar', rollNumber: '21EC002', class: 'III ECE A', email: 'suresh.kumar@student.psgtech.edu' },
    { id: 's10', name: 'Anitha Raj', rollNumber: '21EC003', class: 'III ECE A', email: 'anitha.raj@student.psgtech.edu' }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 1024) {
        setViewMode('table');
      } else {
        setViewMode('card');
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter and sort subjects
  const getFilteredAndSortedSubjects = () => {
    let filtered = subjects?.filter(subject => {
      const matchesSearch = !searchTerm || 
        subject?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        subject?.code?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      const matchesFaculty = !facultyFilter || subject?.faculty?.id === facultyFilter;
      
      const matchesStatus = !statusFilter || 
        (statusFilter === 'active' && subject?.isActive) ||
        (statusFilter === 'inactive' && !subject?.isActive);

      return matchesSearch && matchesFaculty && matchesStatus;
    });

    // Sort subjects
    filtered?.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortConfig?.field) {
        case 'name':
          aValue = a?.name?.toLowerCase();
          bValue = b?.name?.toLowerCase();
          break;
        case 'code':
          aValue = a?.code?.toLowerCase();
          bValue = b?.code?.toLowerCase();
          break;
        case 'studentCount':
          aValue = a?.students?.length;
          bValue = b?.students?.length;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  const filteredSubjects = getFilteredAndSortedSubjects();

  const handleSort = (field) => {
    setSortConfig(prev => ({
      field,
      direction: prev?.field === field && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFacultyFilter('');
    setStatusFilter('');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader userRole={userRole} userName={userName} />
      <MainNavigation userRole={userRole} isCollapsed={isNavCollapsed} onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)} />
      <QuickActionFAB userRole={userRole} />
      <main className={`pt-16 pb-20 lg:pb-8 transition-academic ${isNavCollapsed ? 'md:ml-25' : 'md:ml-64'}`}>
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          <BreadcrumbTrail />
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">Subject Management</h1>
            <p className="text-muted-foreground">Below are the subjects for your class.</p>
          </div>
          <SubjectTable 
            subjects={filteredSubjects}
            onSort={handleSort}
            sortConfig={sortConfig}
          />
        </div>
      </main>
    </div>
  );
};

export default SubjectManagement;