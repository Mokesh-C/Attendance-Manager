import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'attendance': return 'CheckSquare';
      case 'student': return 'UserPlus';
      case 'subject': return 'BookOpen';
      case 'faculty': return 'GraduationCap';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'attendance': return 'text-primary bg-primary/10';
      case 'student': return 'text-secondary bg-secondary/10';
      case 'subject': return 'text-accent bg-accent/10';
      case 'faculty': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (activities?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          No Recent Activity
        </h3>
        <p className="text-sm text-muted-foreground">
          Your recent activities will appear here once you start using the system.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-academic">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Recent Activity
        </h3>
        <Icon name="Clock" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <div key={activity?.id || index} className="flex items-start space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {activity?.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {activity?.description}
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-xs text-muted-foreground">
                  {formatTime(activity?.timestamp)}
                </span>
                {activity?.metadata && (
                  <span className="text-xs text-muted-foreground">
                    {activity?.metadata}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-academic">
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;