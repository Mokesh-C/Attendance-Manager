import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { getCurrentClassName, getCurrentUserType } from '../../utils/classUtils';

const NavigationHeader = ({ userRole = getCurrentUserType(), userName = getCurrentClassName(), onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // Use passed userName and userRole

  const handleLogout = () => {
    localStorage.removeItem('psg_class_session');
    if (onLogout) {
      onLogout();
    }
    navigate('/login-register');
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const isLoginPage = location.pathname === '/login-register';

  if (isLoginPage) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-academic">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-primary-foreground"
              fill="currentColor"
            >
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-heading font-semibold text-foreground">
              PSG Attendance Manager
            </h1>
            <p className="text-xs font-caption text-muted-foreground">
              PSG College of Technology
            </p>
          </div>
          <div className="sm:hidden">
            <h1 className="text-base font-heading font-semibold text-foreground">
              PSG AM
            </h1>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleProfileToggle}
            className="flex items-center space-x-2 px-3 hover:bg-blue-500/10 transition-colors"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-secondary rounded-full">
              <Icon name="User" size={16} className="text-secondary-foreground" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-150">{userName}</p>
            </div>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`text-muted-foreground transition-academic ${
                isProfileOpen ? 'rotate-180' : ''
              }`} 
            />
          </Button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-academic-md z-60">
              {/* Only show name, no title text */}
              <div className="p-1">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm text-destructive hover:bg-primary/10 rounded-md transition-academic"
                >
                  <Icon name="LogOut" size={16} className="mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Border */}
      <div className="lg:hidden h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
    </header>
  );
};

export default NavigationHeader;