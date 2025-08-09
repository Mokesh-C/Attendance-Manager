import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ selectedCount, onBulkDelete, onClearSelection }) => {
  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedCount} selected student(s)?`)) {
      onBulkDelete();
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 mb-6 shadow-academic hover:shadow-academic-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-secondary rounded-full">
            <Icon name="Check" size={16} className="text-secondary-foreground" />
          </div>
          <div>
            <p className="font-medium text-foreground">
              {selectedCount} student{selectedCount > 1 ? 's' : ''} selected
            </p>
            <p className="text-sm text-muted-foreground">
              Choose an action to perform on selected students
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
            className="transition-all duration-200 hover:bg-secondary/10"
          >
            Clear
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleBulkDelete}
            iconName="Trash2"
            iconPosition="left"
            className="transition-all duration-200 hover:bg-destructive/20"
          >
            Delete Selected
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;