import React from 'react';
import Icon from '../../../components/AppIcon';

const InstitutionalHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <img
          src="/assets/images/PSGCTlogo.png"
          alt="PSGCT Logo"
          className="w-16 h-16 rounded-lg shadow-academic-md object-contain bg-primary p-1"
        />
      </div>

      {/* Institution Name */}
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
          PSG RepBuddy
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