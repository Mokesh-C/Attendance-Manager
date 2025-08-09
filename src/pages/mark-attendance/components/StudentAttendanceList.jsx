import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const StudentAttendanceList = ({ 
  students, 
  presentStudents, 
  onStudentToggle, 
  onSelectAll, 
  allSelected 
}) => {
  const presentCount = presentStudents?.length;
  const totalCount = students?.length;
  const absentCount = totalCount - presentCount;

  if (students?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 shadow-academic text-center">
        <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          No Students Found
        </h3>
        <p className="text-muted-foreground">
          Please select a subject to view enrolled students.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-academic">
      {/* Header with Select All */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Icon name="Users" size={20} className="text-primary mr-2" />
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Student Attendance
            </h3>
          </div>
          <div className="text-sm text-muted-foreground">
            {totalCount} students
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant={allSelected ? "default" : "outline"}
            onClick={onSelectAll}
            iconName={allSelected ? "CheckSquare" : "Square"}
            iconPosition="left"
            size="sm"
          >
            {allSelected ? 'Mark All Absent' : 'Mark All Present'}
          </Button>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-success rounded-full mr-2"></div>
              <span className="text-success font-medium">Present: {presentCount}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-destructive rounded-full mr-2"></div>
              <span className="text-destructive font-medium">Absent: {absentCount}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Student List */}
      <div className="max-h-96 overflow-y-auto">
        <div className="p-4">
          <div>
            {students?.map((student) => {
              const isPresent = presentStudents?.includes(student?.rollNumber);
                return (
                  <div
                    key={student?.rollNumber}
                    className={`flex items-center p-2 rounded-lg border transition-academic cursor-pointer select-none ${
                      isPresent
                        ? 'bg-success/5 border-success/20' :'bg-destructive/5 border-destructive/20'
                    }`}
                    onClick={() => onStudentToggle(student?.rollNumber)}
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        onStudentToggle(student?.rollNumber);
                      }
                    }}
                    aria-pressed={isPresent}
                    role="button"
                  >
                    <Checkbox
                      checked={isPresent}
                      onChange={e => e.stopPropagation() || onStudentToggle(student?.rollNumber)}
                      size="lg"
                      className="mr-3"
                    />
                    <span className="text-sm font-medium text-foreground mr-2" style={{minWidth:120}}>{student?.name}</span>
                    <span className="text-xs font-mono text-muted-foreground mx-2">{student?.rollNumber}</span>
                    <span style={{flex:1}}></span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isPresent
                        ? 'bg-success text-success-foreground'
                        : 'bg-destructive text-destructive-foreground'
                    }`}>
                      {isPresent ? 'Present' : 'Absent'}
                    </span>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
      {/* Summary Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">
              Attendance Summary:
            </span>
            <span className="text-success font-medium">
              {presentCount} Present
            </span>
            <span className="text-destructive font-medium">
              {absentCount} Absent
            </span>
          </div>
          <div className="text-muted-foreground">
            {((presentCount / totalCount) * 100)?.toFixed(1)}% Present
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceList;