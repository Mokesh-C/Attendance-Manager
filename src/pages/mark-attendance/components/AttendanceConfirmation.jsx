import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AttendanceConfirmation = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  attendanceData,
  loading = false 
}) => {
  if (!isOpen) return null;

  const { subject, date, hour, presentStudents, absentStudents } = attendanceData;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', { 
      weekday: 'long',
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getHourLabel = (hourValue) => {
    const hourMap = {
      '1': '1st Hour (8:00 - 8:50 AM)',
      '2': '2nd Hour (8:50 - 9:40 AM)',
      '3': '3rd Hour (10:00 - 10:50 AM)',
      '4': '4th Hour (10:50 - 11:40 AM)',
      '5': '5th Hour (1:00 - 1:50 PM)',
      '6': '6th Hour (1:50 - 2:40 PM)',
      '7': '7th Hour (2:40 - 3:30 PM)',
      '8': '8th Hour (3:30 - 4:20 PM)'
    };
    return hourMap?.[hourValue] || `Hour ${hourValue}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg border border-border shadow-academic-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon name="CheckCircle" size={24} className="text-primary mr-3" />
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Confirm Attendance
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              disabled={loading}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Subject Details */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
              Class Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Subject:</span>
                <p className="font-medium text-foreground">{subject?.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Subject Code:</span>
                <p className="font-mono font-medium text-foreground">{subject?.code}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Faculty:</span>
                <p className="font-medium text-foreground">{subject?.faculty}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Date:</span>
                <p className="font-medium text-foreground">{formatDate(date)}</p>
              </div>
              <div className="md:col-span-2">
                <span className="text-muted-foreground">Hour:</span>
                <p className="font-medium text-foreground">{getHourLabel(hour)}</p>
              </div>
            </div>
          </div>

          {/* Attendance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Icon name="UserCheck" size={20} className="text-success mr-2" />
                <h4 className="font-heading font-semibold text-success">
                  Present Students
                </h4>
              </div>
              <p className="text-2xl font-bold text-success mb-2">
                {presentStudents?.length}
              </p>
              <p className="text-sm text-success/80">
                {((presentStudents?.length / (presentStudents?.length + absentStudents?.length)) * 100)?.toFixed(1)}% attendance
              </p>
            </div>

            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Icon name="UserX" size={20} className="text-destructive mr-2" />
                <h4 className="font-heading font-semibold text-destructive">
                  Absent Students
                </h4>
              </div>
              <p className="text-2xl font-bold text-destructive mb-2">
                {absentStudents?.length}
              </p>
              <p className="text-sm text-destructive/80">
                Students to be notified
              </p>
            </div>
          </div>

          {/* Absent Students List */}
          {absentStudents?.length > 0 && (
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
              <h4 className="font-heading font-semibold text-destructive mb-3">
                Absent Students ({absentStudents?.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {absentStudents?.map((student) => (
                  <div key={student?.id} className="flex items-center text-sm">
                    <Icon name="Minus" size={14} className="text-destructive mr-2" />
                    <span className="text-foreground">
                      {student?.name} ({student?.rollNumber})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start">
              <Icon name="AlertTriangle" size={20} className="text-warning mr-3 mt-0.5" />
              <div>
                <h4 className="font-heading font-semibold text-warning mb-1">
                  Please Review Carefully
                </h4>
                <p className="text-sm text-warning/80">
                  Once confirmed, attendance will be recorded and reports will be generated. 
                  Make sure all information is correct before proceeding.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30">
          <div className="flex items-center justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Review Again
            </Button>
            <Button
              variant="default"
              onClick={onConfirm}
              loading={loading}
              iconName="Check"
              iconPosition="left"
            >
              Confirm & Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceConfirmation;