import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FacultyTable = ({ faculties, onEdit, onDelete, onViewDetails }) => {
  const handleEdit = (faculty) => {
    onEdit(faculty);
  };

  const handleDelete = (faculty) => {
    onDelete(faculty);
  };

  const handleViewDetails = (faculty) => {
    onViewDetails(faculty);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-academic">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left py-3 px-4 font-heading font-semibold text-foreground">
                Faculty Name
              </th>
              <th className="text-left py-3 px-4 font-heading font-semibold text-foreground">
                Email
              </th>
              <th className="text-left py-3 px-4 font-heading font-semibold text-foreground">
                Mobile
              </th>
              <th className="text-left py-3 px-4 font-heading font-semibold text-foreground">
                Department
              </th>
              <th className="text-center py-3 px-4 font-heading font-semibold text-foreground">
                Subjects
              </th>
              <th className="text-center py-3 px-4 font-heading font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {faculties?.map((faculty, index) => (
              <tr
                key={faculty?.id}
                className={`border-b border-border hover:bg-muted/50 transition-academic ${
                  index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                }`}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded-full">
                      <Icon name="GraduationCap" size={16} className="text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{faculty?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Joined {faculty?.joinDate}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center text-sm text-foreground">
                    <Icon name="Mail" size={14} className="mr-2 text-muted-foreground" />
                    <span className="truncate max-w-48">{faculty?.email}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center text-sm text-foreground">
                    <Icon name="Phone" size={14} className="mr-2 text-muted-foreground" />
                    <span>{faculty?.mobile}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                    {faculty?.department}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary">
                      <Icon name="BookOpen" size={14} className="mr-1" />
                      {faculty?.assignedSubjects}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewDetails(faculty)}
                      className="h-8 w-8"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(faculty)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(faculty)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacultyTable;