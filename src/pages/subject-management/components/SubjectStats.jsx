import React from 'react';
import Icon from '../../../components/AppIcon';

const SubjectStats = ({ subjects }) => {
  const totalSubjects = subjects?.length;
  const activeSubjects = subjects?.filter(s => s?.isActive)?.length;
  const totalEnrollments = subjects?.reduce((sum, subject) => sum + subject?.students?.length, 0);
  const avgEnrollment = totalSubjects > 0 ? Math.round(totalEnrollments / totalSubjects) : 0;

  const stats = [
    {
      label: 'Total Subjects',
      value: totalSubjects,
      icon: 'BookOpen',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Active Subjects',
      value: activeSubjects,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Total Enrollments',
      value: totalEnrollments,
      icon: 'Users',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      label: 'Avg. Enrollment',
      value: avgEnrollment,
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 shadow-academic hover:shadow-academic-md transition-academic"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-heading font-bold text-foreground">
                {stat?.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {stat?.label}
              </p>
            </div>
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubjectStats;