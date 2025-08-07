import React from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingSchedule = ({ scheduleItems = [] }) => {
  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time?.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getSubjectColor = (index) => {
    const colors = [
      'bg-primary/10 text-primary border-primary/20',
      'bg-secondary/10 text-secondary border-secondary/20',
      'bg-accent/10 text-accent border-accent/20',
      'bg-success/10 text-success border-success/20'
    ];
    return colors?.[index % colors?.length];
  };

  if (scheduleItems?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-academic">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Today's Schedule
          </h3>
          <Icon name="Calendar" size={20} className="text-muted-foreground" />
        </div>
        
        <div className="text-center py-8">
          <Icon name="CalendarX" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-heading font-semibold text-foreground mb-2">
            No Classes Today
          </h4>
          <p className="text-sm text-muted-foreground">
            Enjoy your free day! Check back tomorrow for your schedule.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-academic">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Today's Schedule
        </h3>
        <Icon name="Calendar" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {scheduleItems?.slice(0, 2)?.map((item, index) => (
          <div key={item?.id || index} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg border ${getSubjectColor(index)}`}>
              <Icon name="BookOpen" size={20} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-heading font-semibold text-foreground">
                {item?.subject}
              </h4>
              <p className="text-sm text-muted-foreground">
                {item?.faculty} • {item?.room}
              </p>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  <span>{formatTime(item?.startTime)} - {formatTime(item?.endTime)}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Users" size={12} />
                  <span>{item?.studentCount} students</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item?.status === 'upcoming' ?'bg-warning/10 text-warning' 
                  : item?.status === 'ongoing' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
              }`}>
                {item?.status === 'upcoming' ? 'Upcoming' : 
                 item?.status === 'ongoing' ? 'Ongoing' : 'Completed'}
              </span>
            </div>
          </div>
        ))}
      </div>
      {scheduleItems?.length > 2 && (
        <div className="mt-6 pt-4 border-t border-border">
          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-academic">
            View Full Schedule ({scheduleItems?.length - 2} more)
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingSchedule;