import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubjectCard = ({ subject, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${subject?.name}"? This action cannot be undone.`)) {
      onDelete(subject?.id);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-academic hover:shadow-academic-md transition-academic">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
            {subject?.name}
          </h3>
          <p className="text-sm font-caption text-muted-foreground">
            Code: {subject?.code}
          </p>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(subject)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="Edit" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="text-muted-foreground hover:text-destructive"
          >
            <Icon name="Trash2" size={16} />
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-sm">
          <Icon name="GraduationCap" size={16} className="text-muted-foreground mr-2" />
          <span className="text-foreground">
            {subject?.faculty ? subject?.faculty?.name : 'No faculty assigned'}
          </span>
          {subject?.faculty && (
            <span className="text-muted-foreground ml-2">
              ({subject?.faculty?.department})
            </span>
          )}
        </div>

        <div className="flex items-center text-sm">
          <Icon name="Users" size={16} className="text-muted-foreground mr-2" />
          <span className="text-foreground">
            {subject?.students?.length} student{subject?.students?.length !== 1 ? 's' : ''} enrolled
          </span>
        </div>

        {subject?.department && (
          <div className="flex items-center text-sm">
            <Icon name="Building" size={16} className="text-muted-foreground mr-2" />
            <span className="text-foreground">{subject?.department}</span>
          </div>
        )}
      </div>
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Created: {new Date(subject.createdAt)?.toLocaleDateString('en-IN')}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            subject?.isActive 
              ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
          }`}>
            {subject?.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;