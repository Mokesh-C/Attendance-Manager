import React, { useState, useEffect, useMemo } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import MainNavigation from '../../components/ui/MainNavigation';
import QuickActionFAB from '../../components/ui/QuickActionFAB';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import StudentCard from './components/StudentCard';
import StudentTable from './components/StudentTable';
import StudentModal from './components/StudentModal';
import BulkActions from './components/BulkActions';
import SearchAndFilter from './components/SearchAndFilter';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import studentsData from '../../data/students.json';
import { getCurrentClassCode, getCurrentClassName, getCurrentUserType, getSafeData } from '../../utils/classUtils';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

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
        mobile: 'N/A', // Always set mobile to N/A
        subjects: s.subjects || ['N/A'], // Handle missing subjects
      }))
    );
    const checkMobile = () => {
      // Logic to determine if the view is mobile or not
    };

    setIsMobile(false); // Default to desktop for now
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [students, searchQuery]);

  const handleAddStudent = () => {
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteStudent = (studentId) => {
    // Logic to delete a student
  };

  const handleBulkDelete = () => {
    // Logic to delete selected students
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prevSelected => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter(id => id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id));
    }
  };

  const handleClearSelection = () => {
    setSelectedStudents([]);
  };

  const handleSaveStudent = (student) => {
    // Logic to save a student (add or edit)
    setIsModalOpen(false);
    setEditingStudent(null);
    setSuccessMessage('Student saved successfully');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader userRole="CR" userName="Class Representative" />
      {!isMobile && (
        <MainNavigation 
          userRole="CR" 
          isCollapsed={isNavCollapsed}
          onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)}
        />
      )}
      <main className={`pt-16 pb-20 lg:pb-8 ${!isMobile ? (isNavCollapsed ? 'lg:ml-16' : 'lg:ml-72') : ''}`}>
        <div className="p-4 lg:p-6">
          <BreadcrumbTrail />
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">Student Management</h1>
            <p className="text-muted-foreground">Below are the students for your class.</p>
          </div>
          {successMessage && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <p className="text-success font-medium">{successMessage}</p>
              </div>
            </div>
          )}
          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onAddStudent={handleAddStudent}
            totalStudents={students?.length}
            filteredCount={filteredStudents?.length}
          />
          <BulkActions
            selectedCount={selectedStudents?.length}
            onBulkDelete={handleBulkDelete}
            onClearSelection={handleClearSelection}
          />
          {isMobile ? (
            <div className="space-y-4">
              {filteredStudents?.map(student => (
                <StudentCard
                  key={student?.id}
                  student={student}
                  onEdit={handleEditStudent}
                  onDelete={handleDeleteStudent}
                />
              ))}
              {filteredStudents?.length === 0 && (
                <div className="text-center py-12">
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
              columns={["name", "rollNumber", "email", "mobile"]} // Only show these columns
              selectedStudents={selectedStudents}
              onSelectStudent={handleSelectStudent}
              onSelectAll={handleSelectAll}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
            />
          )}
        </div>
      </main>
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingStudent(null);
        }}
        student={editingStudent}
        onSave={handleSaveStudent}
      />
      <QuickActionFAB userRole="CR" />
    </div>
  );
};

export default StudentManagement;