import React, { useState, useEffect } from 'react';
import studentsData from '../../data/students.json';
import subjectsData from '../../data/subjects.json';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import MainNavigation from '../../components/ui/MainNavigation';
import QuickActionFAB from '../../components/ui/QuickActionFAB';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import WelcomeHeader from './components/WelcomeHeader';
import QuickActionCard from './components/QuickActionCard';
import SummaryWidget from './components/SummaryWidget';
import { getCurrentClassCode } from '../../utils/classUtils';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access if authenticated
    const session = localStorage.getItem('psg_class_session');
    if (session !== 'active') {
      navigate('/login-register');
    } else {
      // Load user data from localStorage
      const classCode = localStorage.getItem('psg_class_code');
      const className = localStorage.getItem('psg_class_name');
      const userType = localStorage.getItem('psg_user_type');
      
      setUserName(className || 'N/A');
      // Map userType to role code for navigation
      const roleCode = userType === 'Class Representative' ? 'CR' : userType;
      setUserRole(roleCode || 'CR');
    }
  }, [navigate]);


  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now?.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);



  const handleLogout = () => {
    localStorage.removeItem('psg_class_session');
    localStorage.removeItem('psg_class_code');
    localStorage.removeItem('psg_class_name');
    localStorage.removeItem('psg_user_type');
    navigate('/login-register');
  };


  const getSummaryWidgets = () => {
    const currentClassCode = getCurrentClassCode();
    const classStudents = studentsData[currentClassCode] || [];
    const classSubjects = subjectsData[currentClassCode] || [];
    
    return [
      {
        title: 'Class Strength',
        value: classStudents.length > 0 ? classStudents.length.toString() : 'N/A',
        subtitle: 'Total students in class',
        icon: 'Users',
        color: 'primary'
      },
      {
        title: 'Total Subjects',
        value: classSubjects.length > 0 ? classSubjects.length.toString() : 'N/A',
        subtitle: 'Subjects for this class',
        icon: 'BookOpen',
        color: 'primary'
      }
    ];
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader 
        userRole={userRole}
        userName={userName}
        onLogout={handleLogout}
      />
      <MainNavigation 
        userRole={userRole || 'CR'}
        isCollapsed={isNavCollapsed}
        onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)}
      />
      <QuickActionFAB userRole={userRole} />
      <main className={`pt-16 pb-20 lg:pb-8 transition-academic ${
        isNavCollapsed ? 'lg:pl-25' : 'lg:pl-64'
      }`}>
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          <BreadcrumbTrail />
          
          <WelcomeHeader 
            userName={userName}
            userRole={userRole}
            currentTime={currentTime}
          />

          {/* Summary Widgets */}
          <div className="flex flex-row gap-6 mb-8 sm:grid sm:grid-cols-2">
            {getSummaryWidgets()?.map((widget, index) => (
              <SummaryWidget
                key={index}
                title={widget?.title}
                value={widget?.value}
                subtitle={widget?.subtitle}
                icon={widget?.icon}
                color={widget?.color}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-heading font-semibold text-foreground mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <QuickActionCard
                title="Mark Attendance"
                description="Record daily attendance for students in your class"
                icon="CheckSquare"
                path="/mark-attendance"
                color="primary"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;