import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureHighlights = () => {
  const features = [
    {
      icon: 'CheckSquare',
      title: 'Quick Attendance',
      description: 'Mark attendance in seconds with smart subject selection'
    },
    {
      icon: 'Share2',
      title: 'Auto Sharing',
      description: 'Instantly share reports via WhatsApp and Email'
    },
    {
      icon: 'Users',
      title: 'Student Management',
      description: 'Comprehensive student database with cross-department support'
    },
    {
      icon: 'BarChart3',
      title: 'Smart Reports',
      description: 'Detailed attendance analytics with PSG branding'
    }
  ];

  return (
    <div className="mt-12 lg:mt-16">
      <h3 className="text-lg font-heading font-semibold text-foreground text-center mb-8">
        Why Choose PSG Attendance Manager?
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {features?.map((feature, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 bg-card border border-border rounded-lg shadow-academic hover:shadow-academic-md transition-academic"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
              <Icon name={feature?.icon} size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground mb-1">
                {feature?.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Academic Year Info */}
      <div className="mt-8 p-4 bg-secondary/5 border border-secondary/20 rounded-lg text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Calendar" size={16} className="text-secondary" />
          <span className="text-sm font-medium text-secondary">Academic Year 2024-25</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Trusted by PSG Tech students and faculty for reliable attendance management
        </p>
      </div>
    </div>
  );
};

export default FeatureHighlights;