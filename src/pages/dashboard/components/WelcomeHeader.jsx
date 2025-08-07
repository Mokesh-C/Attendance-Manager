import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ userName, userRole, currentTime }) => {
  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Always show generic class rep name
  const displayName = 'Class Representative';
  const getRoleDisplay = () => 'Class Representative';

  const formatDate = () => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date()?.toLocaleDateString('en-IN', options);
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg p-6 mb-8 shadow-academic">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Sun" size={20} className="text-primary-foreground/80" />
            <span className="text-sm font-medium text-primary-foreground/80">
              {getGreeting()}
            </span>
          </div>
          
          <h1 className="text-2xl lg:text-3xl font-heading font-bold mb-2">
            Welcome back, {displayName}!
          </h1>
          
          <p className="text-primary-foreground/90 mb-4">
            • PSG College of Technology
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-primary-foreground/80">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={16} />
              <span>{formatDate()}</span>
            </div>
            {currentTime && (
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} />
                <span>{currentTime}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="hidden lg:block">
          <div className="w-24 h-24 bg-primary-foreground/10 rounded-full flex items-center justify-center">
            <Icon 
              name={userRole === 'CR' ? 'UserCheck' : 'GraduationCap'} 
              size={40} 
              className="text-primary-foreground/80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;