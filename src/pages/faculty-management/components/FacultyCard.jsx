import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FacultyCard = ({ faculty, onEdit, onDelete, onViewDetails }) => {
  const handleEdit = () => {
    onEdit(faculty);
  };

  const handleDelete = () => {
    onDelete(faculty);
  };

  const handleViewDetails = () => {
    onViewDetails(faculty);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-academic hover:shadow-academic-md transition-academic">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-secondary rounded-full">
            <Icon name="GraduationCap" size={20} className="text-secondary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              {faculty?.name}
            </h3>
            <p className="text-sm text-muted-foreground">{faculty?.department}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleViewDetails}
            className="h-8 w-8"
          >
            <Icon name="Eye" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleEdit}
            className="h-8 w-8"
          >
            <Icon name="Edit" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Icon name="Trash2" size={16} />
          </Button>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="Mail" size={14} className="mr-2" />
          <span className="truncate">{faculty?.email}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="Phone" size={14} className="mr-2" />
          <span>{faculty?.mobile}</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="BookOpen" size={14} className="mr-1" />
          <span>{faculty?.assignedSubjects} subjects</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Icon name="Calendar" size={12} className="mr-1" />
          <span>Joined {faculty?.joinDate}</span>
        </div>
      </div>
    </div>
  );
};

export default FacultyCard;