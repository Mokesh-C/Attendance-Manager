import React from 'react';
import Icon from '../../../components/AppIcon';

const SubjectTable = ({ subjects }) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-academic">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4 font-heading font-semibold text-foreground">Subject Name</th>
              <th className="text-left p-4 font-heading font-semibold text-foreground">Code</th>
              <th className="text-left p-4 font-heading font-semibold text-foreground">Faculty Name</th>
              <th className="text-left p-4 font-heading font-semibold text-foreground">Faculty Email</th>
            </tr>
          </thead>
          <tbody>
            {subjects?.map((subject) => (
              <tr key={subject?.id} className="border-b border-border hover:bg-muted/30 transition-academic">
                <td className="p-4">{subject?.name}</td>
                <td className="p-4">{subject?.code}</td>
                <td className="p-4">{subject?.faculty?.name}</td>
                <td className="p-4">{subject?.faculty?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {subjects?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">No subjects found</p>
        </div>
      )}
    </div>
  );
};

export default SubjectTable;