import React from 'react';
import Icon from '../../../components/AppIcon';

const InstitutionalHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-academic-md">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 text-primary-foreground"
            fill="currentColor"
          >
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>

      {/* Institution Name */}
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
          PSG Attendance Manager
        </h1>
        <p className="text-base font-medium text-secondary">
          PSG College of Technology
        </p>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Streamlined attendance management system for students and faculty
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs font-caption text-muted-foreground">Secure Access</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} className="text-secondary" />
          <span className="text-xs font-caption text-muted-foreground">Institutional</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} className="text-primary" />
          <span className="text-xs font-caption text-muted-foreground">Verified</span>
        </div>
      </div>
    </div>
  );
};

export default InstitutionalHeader;