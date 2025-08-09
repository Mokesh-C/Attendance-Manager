import React, { useState, useEffect, useMemo } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import MainNavigation from '../../components/ui/MainNavigation';
import QuickActionFAB from '../../components/ui/QuickActionFAB';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import StudentCard from './components/StudentCard';
import StudentTable from './components/StudentTable';
import SearchAndFilter from './components/SearchAndFilter';
import Icon from '../../components/AppIcon';
import studentsData from '../../data/students.json';
import { getCurrentClassCode, getCurrentClassName, getCurrentUserType, getSafeData } from '../../utils/classUtils';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  // Load user data from localStorage
  useEffect(() => {
    const userType = localStorage.getItem('psg_user_type');
    const className = localStorage.getItem('psg_class_name');
    const roleCode = userType === 'Class Representative' ? 'CR' : userType;
    setUserRole(roleCode || 'CR');
    setUserName(className || 'N/A');
  }, []);

  useEffect(() => {
    // Load students for current class on mount
    const currentClassCode = getCurrentClassCode();
    const classStudents = studentsData[currentClassCode] || [];
    

    
    if (classStudents.length === 0) {
      setSuccessMessage('No students found for this class');
    }
    
    setStudents(
      classStudents.map((s, idx) => ({
        ...s,
        id: idx + 1,
        mobile: s.mobile || 'N/A', // Use actual mobile if available, otherwise N/A
        subjects: s.subjects || ['N/A'], // Handle missing subjects
        classSection: getCurrentClassName(), // Add class section info
      }))
    );
    setIsLoading(false);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        student.name?.toLowerCase().includes(searchLower) ||
        student.rollNumber?.toLowerCase().includes(searchLower) ||
        student.email?.toLowerCase().includes(searchLower);
      return matchesSearch;
    });
  }, [students, searchQuery]);



  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader userRole={userRole} userName={userName} />
      {!isMobile && (
        <MainNavigation 
          userRole={userRole} 
          isCollapsed={isNavCollapsed}
          onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)}
        />
      )}
      <main className={`pt-16 pb-20 lg:pb-8 ${!isMobile ? (isNavCollapsed ? 'lg:pl-25' : 'lg:pl-64') : ''}`}>
        <div className="p-4 lg:p-6">
          <BreadcrumbTrail />
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">Student Management</h1>
            <p className="text-muted-foreground">Below are the students for your class.</p>
          </div>
          {successMessage && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6 shadow-academic animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <p className="text-success font-medium">{successMessage}</p>
              </div>
            </div>
          )}
          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalStudents={students?.length}
            filteredCount={filteredStudents?.length}
          />
          {isLoading ? (
            <div className="text-center py-12 animate-in fade-in duration-500">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground font-medium">Loading students...</p>
            </div>
          ) : isMobile ? (
            <div className="space-y-4">
              {filteredStudents?.map(student => (
                <StudentCard
                  key={student?.id}
                  student={student}
                />
              ))}
              {filteredStudents?.length === 0 && (
                <div className="text-center py-12 animate-in fade-in duration-500">
                  <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground font-medium">No students found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchQuery ? 'Try adjusting your search criteria' : 'Add students to get started'}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <StudentTable
              students={filteredStudents.map(student => ({
                ...student,
                mobile: student.mobile || 'N/A',
              }))}
            />
          )}
        </div>
      </main>

      <QuickActionFAB userRole="CR" />
    </div>
  );
};

export default StudentManagement;