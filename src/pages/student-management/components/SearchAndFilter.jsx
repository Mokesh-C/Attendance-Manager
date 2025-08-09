import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchAndFilter = ({ 
  searchQuery, 
  onSearchChange,
  totalStudents,
  filteredCount
}) => {

  return (
    <div className="bg-card border-2 border-border rounded-lg p-4 mb-6 shadow-academic hover:shadow-academic-md transition-all duration-200">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex-1 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-colors duration-200" 
              />
              <Input
                type="search"
                placeholder="Search students by name, roll number, email..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e?.target?.value)}
                className="pl-10 border-2 border-border focus:border-primary shadow-sm transition-all duration-200 focus-within:border-primary"
              />
            </div>
          </div>
          
          
        </div>

        <div className="flex items-center justify-between lg:justify-end space-x-4">
          <div className="text-sm text-muted-foreground transition-all duration-200">
            {filteredCount !== totalStudents ? (
              <span className="text-primary font-medium">Showing {filteredCount} of {totalStudents} students</span>
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