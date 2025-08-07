import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionFAB = ({ userRole = 'CR' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const quickActions = [
    {
      label: 'Mark Attendance',
      path: '/mark-attendance',
      icon: 'CheckSquare',
      color: 'bg-primary',
      roles: ['CR', 'Faculty']
    },
    {
      label: 'Add Student',
      path: '/student-management',
      icon: 'UserPlus',
      color: 'bg-secondary',
      roles: ['CR', 'Faculty']
    },
    {
      label: 'Quick Report',
      path: '/dashboard',
      icon: 'BarChart3',
      color: 'bg-accent',
      roles: ['Faculty']
    }
  ];

  const filteredActions = quickActions?.filter(action => 
    action?.roles?.includes(userRole)
  );

  const handleActionClick = (path) => {
    navigate(path);
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Hide on desktop and login page
  const isDesktop = window.innerWidth >= 1024;
  const isLoginPage = location.pathname === '/login-register';
  const isMarkAttendancePage = location.pathname === '/mark-attendance';

  if (isDesktop || isLoginPage) {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="mb-4 space-y-3">
          {filteredActions?.map((action, index) => (
            <div
              key={action?.path}
              className={`transform transition-all duration-300 ease-out ${
                isExpanded 
                  ? 'translate-y-0 opacity-100 scale-100' :'translate-y-4 opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => handleActionClick(action?.path)}
                className={`flex items-center justify-center w-12 h-12 ${action?.color} text-white rounded-full shadow-academic-lg hover:shadow-academic-md transition-academic group`}
                title={action?.label}
              >
                <Icon 
                  name={action?.icon} 
                  size={20} 
                  className="group-hover:scale-110 transition-academic"
                />
              </button>
              
              {/* Action Label */}
              <div className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-popover text-popover-foreground px-3 py-1 rounded-lg shadow-academic text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-academic pointer-events-none">
                {action?.label}
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-popover border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Main FAB Button */}
      <button
        onClick={isMarkAttendancePage ? toggleExpanded : () => handleActionClick('/mark-attendance')}
        className={`flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-academic-lg hover:shadow-academic-md transition-academic group ${
          isExpanded ? 'rotate-45' : 'hover:scale-105'
        }`}
      >
        <Icon 
          name={isMarkAttendancePage ? (isExpanded ? 'X' : 'Menu') : 'CheckSquare'} 
          size={24} 
          className="group-hover:scale-110 transition-academic"
        />
      </button>
      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default QuickActionFAB;