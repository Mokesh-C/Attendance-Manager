import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SubjectFilters = ({ 
  searchTerm, 
  onSearchChange, 
  facultyFilter, 
  onFacultyFilterChange, 
  statusFilter, 
  onStatusFilterChange, 
  facultyList, 
  onClearFilters,
  totalSubjects,
  filteredCount 
}) => {
  const facultyOptions = [
    { value: '', label: 'All Faculty' },
    ...facultyList?.map(faculty => ({
      value: faculty?.id,
      label: `${faculty?.name} (${faculty?.department})`
    }))
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const hasActiveFilters = searchTerm || facultyFilter || statusFilter;

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-academic mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-medium text-foreground">
          Filter Subjects
        </h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Input
          type="search"
          placeholder="Search by subject name or code"
          value={searchTerm}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full"
        />

        <Select
          placeholder="Filter by faculty"
          options={facultyOptions}
          value={facultyFilter}
          onChange={onFacultyFilterChange}
          searchable
        />

        <Select
          placeholder="Filter by status"
          options={statusOptions}
          value={statusFilter}
          onChange={onStatusFilterChange}
        />
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>
            Showing {filteredCount} of {totalSubjects} subjects
          </span>
          {hasActiveFilters && (
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={14} />
              <span>Filters applied</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectFilters;