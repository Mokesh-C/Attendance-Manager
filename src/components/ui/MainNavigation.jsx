import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const MainNavigation = ({ userRole = 'CR', isCollapsed = false, onToggleCollapse }) => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Ensure userRole has a valid value
  const effectiveUserRole = userRole || 'CR';

  useEffect(() => {
    const checkMobile = () => {
          const isMobileView = window.innerWidth < 768;
    setIsMobile(isMobileView);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      roles: ['CR', 'Faculty'],
      tooltip: 'Overview and quick actions'
    },
    {
      label: 'Mark Attendance',
      path: '/mark-attendance',
      icon: 'CheckSquare',
      roles: ['CR', 'Faculty'],
      tooltip: 'Record student attendance'
    },
    {
      label: 'Students',
      path: '/student-management',
      icon: 'Users',
      roles: ['CR', 'Faculty'],
      tooltip: 'Manage student records'
    },
    {
      label: 'Subjects',
      path: '/subject-management',
      icon: 'BookOpen',
      roles: ['CR', 'Faculty'],
      tooltip: 'Manage subjects and courses'
    }
  ];

  // Always show all navigation items for now to ensure they work
  const filteredItems = navigationItems;

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isLoginPage = location.pathname === '/login-register';

  if (isLoginPage) {
    return null;
  }

  // Mobile Bottom Navigation
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-academic-lg">
        <div className="flex items-center justify-around h-16 px-2">
          {filteredItems?.slice(0, 4)?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-lg transition-academic ${
                isActive(item?.path)
                  ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-primary/20'
              }`}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className={`mb-1 ${isActive(item?.path) ? 'text-primary' : ''}`}
              />
              <span className="text-xs font-caption font-medium truncate">
                {item?.label === 'Mark Attendance' ? 'Attendance' : item?.label}
              </span>
            </button>
          ))}
          
          {filteredItems?.length > 4 && (
            <button
              onClick={() => {
                // Handle overflow menu
              }}
              className="flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-academic"
            >
              <Icon name="MoreHorizontal" size={20} className="mb-1" />
              <span className="text-xs font-caption font-medium">More</span>
            </button>
          )}
        </div>
      </nav>
    );
  }

  // Desktop Sidebar Navigation
  return (
    <nav className={`fixed left-0 top-16 bottom-0 z-40 bg-card border-r border-border shadow-academic transition-academic ${
      isCollapsed ? 'w-25' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Collapse Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h2 className="text-sm font-heading font-semibold text-foreground">
              Navigation
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="ml-auto"
          >
            <Icon 
              name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
              size={16} 
            />
          </Button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 p-4 space-y-2">
          {filteredItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              title={isCollapsed ? item?.tooltip : ''}
              className={`flex items-center w-full p-3 rounded-md transition-academic group ${
                isActive(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-academic'
                  : 'text-foreground hover:bg-primary/20 hover:text-foreground'
              }`}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className={`flex-shrink-0 ${
                  isActive(item?.path) ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                }`}
              />
              {!isCollapsed && (
                <span className="ml-3 text-sm font-medium truncate">
                  {item?.label}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* User Role Indicator */}
        <div className="p-4 border-t border-border">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              effectiveUserRole === 'CR' ? 'bg-secondary' : 'bg-accent'
            }`}>
              <Icon 
                name={effectiveUserRole === 'CR' ? 'UserCheck' : 'GraduationCap'} 
                size={16} 
                className="text-white"
              />
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground">
                  {effectiveUserRole === 'CR' ? 'Class Representative' : 'Faculty'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {effectiveUserRole === 'CR' ? 'Student Access' : 'Admin Access'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;