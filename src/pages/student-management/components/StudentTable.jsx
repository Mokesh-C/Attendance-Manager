import React from 'react';
import Icon from '../../../components/AppIcon';

const StudentTable = ({ 
  students
}) => {

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-academic">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4 font-heading font-semibold text-foreground">Name</th>
              <th className="text-left p-4 font-heading font-semibold text-foreground">Roll Number</th>
              <th className="text-left p-4 font-heading font-semibold text-foreground">Email</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student) => (
              <tr 
                key={student?.id} 
                className="border-b border-border hover:bg-muted/30 transition-all duration-200"
              >
                <td className="p-4">
                  <div className="font-medium text-foreground">{student?.name}</div>
                </td>
                <td className="p-4">
                  <span className="text-foreground font-caption">{student?.rollNumber}</span>
                </td>
                <td className="p-4">
                  <span className="text-foreground text-sm">{student?.email}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {students?.length === 0 && (
        <div className="p-8 text-center animate-in fade-in duration-500">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">No students found</p>
          <p className="text-sm text-muted-foreground mt-1">
            {students?.length === 0 ? 'No students available for this class' : 'Try adjusting your search criteria'}
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentTable;