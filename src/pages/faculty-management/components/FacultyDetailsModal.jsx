import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FacultyDetailsModal = ({ isOpen, onClose, faculty }) => {
  if (!isOpen || !faculty) return null;

  const subjectsList = [
    "Data Structures and Algorithms",
    "Database Management Systems", 
    "Computer Networks",
    "Software Engineering"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-card border border-border rounded-lg shadow-academic-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Faculty Details
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        <div className="p-6">
          {/* Faculty Profile */}
          <div className="flex items-start space-x-4 mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-secondary rounded-full">
              <Icon name="GraduationCap" size={24} className="text-secondary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-heading font-semibold text-foreground mb-1">
                {faculty?.name}
              </h3>
              <p className="text-lg text-muted-foreground mb-2">{faculty?.department}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="Calendar" size={14} className="mr-2" />
                <span>Joined on {faculty?.joinDate}</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h4 className="text-lg font-heading font-semibold text-foreground">
                Contact Information
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Icon name="Mail" size={16} className="mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">{faculty?.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Icon name="Phone" size={16} className="mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Mobile</p>
                    <p className="text-sm text-muted-foreground">{faculty?.mobile}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-heading font-semibold text-foreground">
                Academic Information
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Icon name="Building" size={16} className="mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Department</p>
                    <p className="text-sm text-muted-foreground">{faculty?.department}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Icon name="BookOpen" size={16} className="mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Assigned Subjects</p>
                    <p className="text-sm text-muted-foreground">{faculty?.assignedSubjects} subjects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Subjects */}
          <div className="space-y-4">
            <h4 className="text-lg font-heading font-semibold text-foreground">
              Teaching Subjects
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {subjectsList?.map((subject, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-muted rounded-lg border border-border"
                >
                  <Icon name="BookOpen" size={16} className="mr-3 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {faculty?.department} Department
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Icon name="ExternalLink" size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Teaching Load Summary */}
          <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
            <h4 className="text-lg font-heading font-semibold text-foreground mb-3">
              Teaching Load Summary
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-primary">
                  {faculty?.assignedSubjects}
                </p>
                <p className="text-sm text-muted-foreground">Total Subjects</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-secondary">18</p>
                <p className="text-sm text-muted-foreground">Hours/Week</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-accent">156</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-success">92%</p>
                <p className="text-sm text-muted-foreground">Avg Attendance</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button iconName="Edit" iconPosition="left">
            Edit Faculty
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetailsModal;