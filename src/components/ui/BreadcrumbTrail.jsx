import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = ({ customBreadcrumbs = null }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const routeMap = {
    '/dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/student-management': { label: 'Student Management', icon: 'Users' },
    '/subject-management': { label: 'Subject Management', icon: 'BookOpen' },
    '/mark-attendance': { label: 'Mark Attendance', icon: 'CheckSquare' },
    '/faculty-management': { label: 'Faculty Management', icon: 'GraduationCap' },
    '/login-register': { label: 'Authentication', icon: 'LogIn' }
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/dashboard', icon: 'Home' }];

    let currentPath = '';
    pathSegments?.forEach((segment) => {
      currentPath += `/${segment}`;
      const route = routeMap?.[currentPath];
      if (route) {
        breadcrumbs?.push({
          label: route?.label,
          path: currentPath,
          icon: route?.icon
        });
      }
    });

    return breadcrumbs?.length > 1 ? breadcrumbs : [];
  };

  const breadcrumbs = generateBreadcrumbs();
  const isLoginPage = location.pathname === '/login-register';

  if (isLoginPage || breadcrumbs?.length === 0) {
    return null;
  }

  const handleBreadcrumbClick = (path) => {
    if (path !== location.pathname) {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm font-caption mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => {
          const isLast = index === breadcrumbs?.length - 1;
          const isClickable = !isLast && crumb?.path;

          return (
            <li key={crumb?.path || index} className="flex items-center">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="text-muted-foreground mx-2" 
                />
              )}
              <div className="flex items-center">
                {crumb?.icon && (
                  <Icon 
                    name={crumb?.icon} 
                    size={14} 
                    className={`mr-1.5 ${
                      isLast 
                        ? 'text-foreground' 
                        : 'text-muted-foreground'
                    }`}
                  />
                )}
                
                {isClickable ? (
                  <button
                    onClick={() => handleBreadcrumbClick(crumb?.path)}
                    className="text-muted-foreground hover:text-foreground transition-academic font-medium"
                  >
                    {crumb?.label}
                  </button>
                ) : (
                  <span 
                    className={`font-medium ${
                      isLast 
                        ? 'text-foreground' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    {crumb?.label}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;