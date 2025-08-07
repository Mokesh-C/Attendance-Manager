import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchAndFilter = ({ 
  searchQuery, 
  onSearchChange, 
  departmentFilter, 
  onDepartmentFilterChange,
  onAddStudent,
  totalStudents,
  filteredCount
}) => {
  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'CSE', label: 'Computer Science Engineering' },
    { value: 'ECE', label: 'Electronics & Communication Engineering' },
    { value: 'EEE', label: 'Electrical & Electronics Engineering' },
    { value: 'MECH', label: 'Mechanical Engineering' },
    { value: 'CIVIL', label: 'Civil Engineering' },
    { value: 'IT', label: 'Information Technology' },
    { value: 'AERO', label: 'Aeronautical Engineering' },
    { value: 'CHEM', label: 'Chemical Engineering' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-academic">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex-1 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                type="search"
                placeholder="Search students by name, roll number, email..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e?.target?.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          
        </div>

        <div className="flex items-center justify-between lg:justify-end space-x-4">
          <div className="text-sm text-muted-foreground">
            {filteredCount !== totalStudents ? (
              <span>Showing {filteredCount} of {totalStudents} students</span>
            ) : (
              <span>{totalStudents} student{totalStudents !== 1 ? 's' : ''}</span>
            )}
          </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;