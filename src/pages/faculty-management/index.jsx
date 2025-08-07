import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import MainNavigation from '../../components/ui/MainNavigation';
import QuickActionFAB from '../../components/ui/QuickActionFAB';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

// Component imports
import FacultyCard from './components/FacultyCard';
import FacultyTable from './components/FacultyTable';
import FacultyModal from './components/FacultyModal';
import FacultyDetailsModal from './components/FacultyDetailsModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import BulkImportModal from './components/BulkImportModal';

const FacultyManagement = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [currentUser] = useState({
    role: 'Faculty',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@psgtech.edu'
  });

  // Modal states
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBulkImportModalOpen, setIsBulkImportModalOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  const [isLoading, setIsLoading] = useState(false);

  // Mock faculty data
  const [faculties, setFaculties] = useState([
    {
      id: 1,
      name: "Dr. Priya Sharma",
      email: "priya.sharma@psgtech.edu",
      mobile: "+91 9876543210",
      department: "CSE",
      assignedSubjects: 4,
      joinDate: "15/08/2019"
    },
    {
      id: 2,
      name: "Prof. Arjun Menon",
      email: "arjun.menon@psgtech.edu",
      mobile: "+91 9876543211",
      department: "ECE",
      assignedSubjects: 3,
      joinDate: "22/07/2020"
    },
    {
      id: 3,
      name: "Dr. Kavitha Raman",
      email: "kavitha.raman@psgtech.edu",
      mobile: "+91 9876543212",
      department: "EEE",
      assignedSubjects: 5,
      joinDate: "10/01/2018"
    },
    {
      id: 4,
      name: "Prof. Suresh Kumar",
      email: "suresh.kumar@psgtech.edu",
      mobile: "+91 9876543213",
      department: "MECH",
      assignedSubjects: 3,
      joinDate: "05/09/2021"
    },
    {
      id: 5,
      name: "Dr. Meera Nair",
      email: "meera.nair@psgtech.edu",
      mobile: "+91 9876543214",
      department: "CIVIL",
      assignedSubjects: 4,
      joinDate: "18/03/2020"
    },
    {
      id: 6,
      name: "Prof. Vikram Singh",
      email: "vikram.singh@psgtech.edu",
      mobile: "+91 9876543215",
      department: "IT",
      assignedSubjects: 6,
      joinDate: "12/11/2019"
    }
  ]);

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'CSE', label: 'Computer Science & Engineering' },
    { value: 'ECE', label: 'Electronics & Communication Engineering' },
    { value: 'EEE', label: 'Electrical & Electronics Engineering' },
    { value: 'MECH', label: 'Mechanical Engineering' },
    { value: 'CIVIL', label: 'Civil Engineering' },
    { value: 'IT', label: 'Information Technology' },
    { value: 'AERO', label: 'Aeronautical Engineering' },
    { value: 'CHEM', label: 'Chemical Engineering' },
    { value: 'BIOTECH', label: 'Biotechnology' },
    { value: 'TEXTILE', label: 'Textile Technology' }
  ];

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setViewMode('card');
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter faculties based on search and department
  const filteredFaculties = faculties?.filter(faculty => {
    const matchesSearch = faculty?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         faculty?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         faculty?.mobile?.includes(searchQuery);
    const matchesDepartment = !selectedDepartment || faculty?.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleAddFaculty = () => {
    setSelectedFaculty(null);
    setModalMode('add');
    setIsFacultyModalOpen(true);
  };

  const handleEditFaculty = (faculty) => {
    setSelectedFaculty(faculty);
    setModalMode('edit');
    setIsFacultyModalOpen(true);
  };

  const handleViewDetails = (faculty) => {
    setSelectedFaculty(faculty);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteFaculty = (faculty) => {
    setSelectedFaculty(faculty);
    setIsDeleteModalOpen(true);
  };

  const handleSaveFaculty = async (facultyData) => {
    setIsLoading(true);
    try {
      if (modalMode === 'edit') {
        setFaculties(prev => prev?.map(f => f?.id === facultyData?.id ? facultyData : f));
      } else {
        setFaculties(prev => [...prev, { ...facultyData, id: Date.now() }]);
      }
      setIsFacultyModalOpen(false);
    } catch (error) {
      console.error('Error saving faculty:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async (faculty) => {
    setIsLoading(true);
    try {
      setFaculties(prev => prev?.filter(f => f?.id !== faculty?.id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting faculty:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkImport = async (file) => {
    // Mock bulk import functionality
    console.log('Importing file:', file?.name);
    // In real implementation, parse CSV and add faculties
  };

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Mobile', 'Department', 'Assigned Subjects', 'Join Date'],
      ...filteredFaculties?.map(f => [
        f?.name,
        f?.email,
        f?.mobile,
        f?.department,
        f?.assignedSubjects,
        f?.joinDate
      ])
    ]?.map(row => row?.join(','))?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `faculty_list_${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader 
        userRole={currentUser?.role}
        userName={currentUser?.name}
      />
      <MainNavigation 
        userRole={currentUser?.role}
        isCollapsed={isNavCollapsed}
        onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)}
      />
      <QuickActionFAB userRole={currentUser?.role} />
      <main className={`pt-16 transition-academic ${
        isMobile ? 'pb-20' : isNavCollapsed ? 'lg:pl-16' : 'lg:pl-72'
      }`}>
        <div className="p-4 lg:p-6 space-y-6">
          <BreadcrumbTrail />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                Faculty Management
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage faculty members and their academic assignments
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsBulkImportModalOpen(true)}
                iconName="Upload"
                iconPosition="left"
                className="hidden lg:flex"
              >
                Bulk Import
              </Button>
              <Button
                variant="outline"
                onClick={handleExport}
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
              <Button
                onClick={handleAddFaculty}
                iconName="Plus"
                iconPosition="left"
              >
                Add Faculty
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4 shadow-academic">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Faculty</p>
                  <p className="text-2xl font-heading font-bold text-foreground">
                    {faculties?.length}
                  </p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <Icon name="Users" size={20} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 shadow-academic">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Departments</p>
                  <p className="text-2xl font-heading font-bold text-foreground">10</p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
                  <Icon name="Building" size={20} className="text-secondary" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 shadow-academic">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Subjects</p>
                  <p className="text-2xl font-heading font-bold text-foreground">4.2</p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
                  <Icon name="BookOpen" size={20} className="text-accent" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 shadow-academic">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active</p>
                  <p className="text-2xl font-heading font-bold text-foreground">
                    {faculties?.length}
                  </p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-card border border-border rounded-lg p-4 shadow-academic">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 flex-1">
                <div className="flex-1 max-w-md">
                  <Input
                    type="search"
                    placeholder="Search faculty by name, email, or mobile..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                  />
                </div>
                
                <div className="w-full sm:w-64">
                  <Select
                    placeholder="Filter by department"
                    options={departmentOptions}
                    value={selectedDepartment}
                    onChange={setSelectedDepartment}
                  />
                </div>
              </div>

              {!isMobile && (
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('table')}
                  >
                    <Icon name="Table" size={16} />
                  </Button>
                  <Button
                    variant={viewMode === 'card' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('card')}
                  >
                    <Icon name="Grid3X3" size={16} />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Faculty List */}
          {filteredFaculties?.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-12 text-center shadow-academic">
              <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
                <Icon name="Users" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                No Faculty Found
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || selectedDepartment 
                  ? 'No faculty members match your current filters.' :'Get started by adding your first faculty member.'
                }
              </p>
              {!searchQuery && !selectedDepartment && (
                <Button
                  onClick={handleAddFaculty}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add First Faculty
                </Button>
              )}
            </div>
          ) : viewMode === 'table' && !isMobile ? (
            <FacultyTable
              faculties={filteredFaculties}
              onEdit={handleEditFaculty}
              onDelete={handleDeleteFaculty}
              onViewDetails={handleViewDetails}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredFaculties?.map((faculty) => (
                <FacultyCard
                  key={faculty?.id}
                  faculty={faculty}
                  onEdit={handleEditFaculty}
                  onDelete={handleDeleteFaculty}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      {/* Modals */}
      <FacultyModal
        isOpen={isFacultyModalOpen}
        onClose={() => setIsFacultyModalOpen(false)}
        faculty={selectedFaculty}
        onSave={handleSaveFaculty}
        mode={modalMode}
      />
      <FacultyDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        faculty={selectedFaculty}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        faculty={selectedFaculty}
        onConfirm={handleConfirmDelete}
        isLoading={isLoading}
      />
      <BulkImportModal
        isOpen={isBulkImportModalOpen}
        onClose={() => setIsBulkImportModalOpen(false)}
        onImport={handleBulkImport}
      />
    </div>
  );
};

export default FacultyManagement;