import React from 'react';
import Icon from '../../../components/AppIcon';

const StudentCard = ({ student }) => {

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-academic hover:shadow-academic-md transition-all duration-200 hover:scale-[1.02]">
      <div className="mb-3">
        <h3 className="font-heading font-semibold text-foreground text-base mb-1">
          {student?.name}
        </h3>
        <p className="text-sm text-muted-foreground font-caption">
          Roll: {student?.rollNumber}
        </p>
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