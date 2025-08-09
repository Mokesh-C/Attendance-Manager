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
import ActivityFeed from './components/ActivityFeed';
import UpcomingSchedule from './components/UpcomingSchedule';
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

  // Mock data for dashboard
  const mockActivities = [
    {
      id: 1,
      type: 'attendance',
      title: 'Attendance Marked',
      description: 'Data Structures - 45 students present out of 48',
      timestamp: new Date(Date.now() - 300000),
      metadata: 'Hour 3'
    },
    {
      id: 2,
      type: 'student',
      title: 'New Student Added',
      description: 'Priya Sharma added to Computer Networks subject',
      timestamp: new Date(Date.now() - 1800000),
      metadata: 'Roll: 21CS089'
    },
    {
      id: 3,
      type: 'subject',
      title: 'Subject Updated',
      description: 'Machine Learning faculty changed to Dr. Venkatesh',
      timestamp: new Date(Date.now() - 3600000),
      metadata: 'CS6701'
    },
    {
      id: 4,
      type: 'attendance',
      title: 'Attendance Report Shared',
      description: 'Operating Systems attendance sent via WhatsApp',
      timestamp: new Date(Date.now() - 7200000),
      metadata: '42 recipients'
    }
  ];

  const mockSchedule = [
    {
      id: 1,
      subject: 'Data Structures',
      faculty: 'Dr. Ramanathan',
      room: 'CSE-301',
      startTime: '09:00',
      endTime: '10:00',
      studentCount: 48,
      status: 'upcoming'
    },
    {
      id: 2,
      subject: 'Computer Networks',
      faculty: 'Prof. Lakshmi',
      room: 'CSE-205',
      startTime: '11:00',
      endTime: '12:00',
      studentCount: 45,
      status: 'upcoming'
    },
    {
      id: 3,
      subject: 'Machine Learning',
      faculty: 'Dr. Venkatesh',
      room: 'CSE-401',
      startTime: '14:00',
      endTime: '15:00',
      studentCount: 42,
      status: 'upcoming'
    }
  ];

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

  const getQuickActions = () => [
    {
      title: 'Mark Attendance',
      description: 'Record daily attendance for students in your class',
      icon: 'CheckSquare',
      path: '/mark-attendance',
      color: 'primary',
      stats: null
    }
  ];

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
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