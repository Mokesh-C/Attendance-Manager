import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudentCard = ({ student, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${student?.name}?`)) {
      onDelete(student?.id);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-academic hover:shadow-academic-md transition-academic">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-foreground text-base mb-1">
            {student?.name}
          </h3>
          <p className="text-sm text-muted-foreground font-caption">
            Roll: {student?.rollNumber}
          </p>
        </div>
        <div className="flex items-center space-x-2 ml-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(student)}
            className="h-8 w-8"
          >
            <Icon name="Edit2" size={16} />
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
      <div className="space-y-2">
        <div className="flex items-center text-sm">
          <Icon name="Mail" size={14} className="text-muted-foreground mr-2" />
          <span className="text-foreground truncate">{student?.email}</span>
        </div>
        <div className="flex items-center text-sm">
          <Icon name="Phone" size={14} className="text-muted-foreground mr-2" />
          <span className="text-foreground">{student?.mobile}</span>
        </div>
        <div className="flex items-center text-sm">
          <Icon name="GraduationCap" size={14} className="text-muted-foreground mr-2" />
          <span className="text-foreground">{student?.classSection}</span>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;