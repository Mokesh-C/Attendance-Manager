import React, { useState, useEffect } from 'react';
import subjectsFaculty from '../../data/subjects_faculty.json';
import timings from '../../data/timings.json';
import studentsData from '../../data/students.json';
import { useNavigate } from 'react-router-dom';
import { getCurrentClassCode, getStudentsForSubject, getSafeData } from '../../utils/classUtils';
import NavigationHeader from '../../components/ui/NavigationHeader';
import MainNavigation from '../../components/ui/MainNavigation';
import QuickActionFAB from '../../components/ui/QuickActionFAB';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import SubjectSelector from './components/SubjectSelector';
import DateTimeSelector from './components/DateTimeSelector';
import StudentAttendanceList from './components/StudentAttendanceList';
import AttendanceConfirmation from './components/AttendanceConfirmation';
import AttendanceActions from './components/AttendanceActions';

import Icon from '../../components/AppIcon';

const MarkAttendance = () => {
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [userRole] = useState('CR'); // Mock user role
  const [userName] = useState('Class Representative');

  // Check authentication
  useEffect(() => {
    const session = localStorage.getItem('psg_class_session');
    console.log('Session check:', session);
    if (session !== 'active') {
      console.log('Redirecting to login');
      navigate('/login-register');
    } else {
      console.log('Session is active, staying on page');
    }
  }, [navigate]);

  // Form state
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date()?.toISOString()?.split('T')?.[0]);
  const [selectedHours, setSelectedHours] = useState([]);
  const [presentStudents, setPresentStudents] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendType, setSendType] = useState('common'); // Default to common, will be updated based on faculty mobile
  const [reportFilter, setReportFilter] = useState('both');

  // Get current class code
  const currentClassCode = getCurrentClassCode();
  
  // Debug logging
  console.log('Current Class Code:', currentClassCode);
  console.log('Available subjects:', subjectsFaculty[currentClassCode]);
  
  // Subjects from static JSON - using current class section
  const subjects = (subjectsFaculty[currentClassCode] || []).sort((a, b) => 
    a.subjectName.localeCompare(b.subjectName)
  );
  // Timings from static JSON
  const hours = timings;
  // Students will be filtered based on subject type and class config
  const allStudents = studentsData;
  
  // Show message if no subjects available for current class
  const noSubjectsMessage = subjects.length === 0 ? 'No subjects available for this class' : null;
  
  // Debug logging
  console.log('Subjects for current class:', subjects);
  console.log('No subjects message:', noSubjectsMessage);

  // Get selected subject data
  const selectedSubjectData = subjects?.find(s => s?.subjectCode === selectedSubject);
  
  // Filter students based on subject type using class config
  const currentStudents = selectedSubjectData ? 
    getStudentsForSubject(allStudents, currentClassCode, selectedSubjectData) : [];

  // Initialize all students as present and set default send type
  useEffect(() => {
    if (selectedSubjectData) {
      const filteredStudents = getStudentsForSubject(allStudents, currentClassCode, selectedSubjectData);
      setPresentStudents(filteredStudents?.map(s => s?.rollNumber)); // All present by default
      
      // Set default send type based on faculty mobile availability
      if (selectedSubjectData?.faculty?.mobile) {
        setSendType('personal');
      } else {
        setSendType('common');
      }
    } else {
      setPresentStudents([]);
      setSendType('common');
    }
  }, [selectedSubject, selectedSubjectData, currentClassCode]);

  const handleStudentToggle = (studentId) => {
    setPresentStudents(prev => 
      prev?.includes(studentId)
        ? prev?.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setPresentStudents([]);
    } else {
      setPresentStudents(currentStudents?.map(s => s?.rollNumber));
    }
  };

  // Calculate if all students are selected
  const allSelected = presentStudents?.length === currentStudents?.length && currentStudents?.length > 0;
  
  // Check if form can be submitted
  const canSubmit = selectedSubject && selectedDate && selectedHours.length > 0 && currentStudents?.length > 0;

  const handleReportFilterChange = (filter) => {
    setReportFilter(filter);
  };

  const handleSubmitAttendance = () => {
    if (!selectedSubject || !selectedDate || selectedHours.length === 0) {
      alert('Please fill all required fields');
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmSubmission = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowConfirmation(false);
    
    // Show success message
    alert('Attendance submitted successfully!');
    
    // Reset form or navigate
    navigate('/dashboard');
  };

  const generateAttendanceReport = () => {
    const subject = selectedSubjectData;
    const presentStudentsList = currentStudents?.filter(s => presentStudents?.includes(s?.rollNumber));
    const absentStudentsList = currentStudents?.filter(s => !presentStudents?.includes(s?.rollNumber));
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date?.toLocaleDateString('en-IN', { 
        weekday: 'long',
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
      });
    };
    const getHourLabel = (hourValue) => {
      const hourObj = hours?.find(h => h?.hour?.toString() === hourValue?.toString());
      return hourObj ? `${hourObj.label} (${hourObj.start} - ${hourObj.end})` : `Hour ${hourValue}`;
    };

    // Only show absent students list, as per requested format
    const absentList = absentStudentsList?.length > 0
      ? absentStudentsList?.map(s => `• ${s?.name} (${s?.rollNumber})`)?.join('\n')
      : 'None';

    const hourLabels = selectedHours.map(getHourLabel).join(', ');
    
    return `🎓 ATTENDANCE REPORT\n\n` +
      `📖 Subject: ${subject?.subjectName} (${subject?.subjectCode})\n` +
      `📅 Date & Hour: ${formatDate(selectedDate)} & ${hourLabels}\n\n` +
      `ATTENDANCE SUMMARY:\n` +
      `✅ Present: ${presentStudentsList?.length}\n` +
      `❌ Absent: ${absentStudentsList?.length}\n` +
      `📈 Attendance: ${((presentStudentsList?.length / currentStudents?.length) * 100)?.toFixed(1)}%\n\n` +
      `❌ ABSENT STUDENTS (${absentStudentsList?.length}):\n${absentList}\n\n` +
      `Time: ${new Date()?.toLocaleString('en-IN')}`;
  };

  // Send logic based on type
  const handleSend = () => {
    const report = generateAttendanceReport();
    if (sendType === 'personal') {
      // WhatsApp to faculty mobile
      let mobile = selectedSubjectData?.faculty?.mobile;
      if (!mobile) {
        alert('Faculty mobile number not available');
        return;
      }
      // Prepend '91' if it's a 10-digit number (without country code)
      if (mobile.length === 10) {
        mobile = `91${mobile}`;
      }
      const encodedReport = encodeURIComponent(report);
      const whatsappUrl = `https://wa.me/${mobile}?text=${encodedReport}`;
      window.open(whatsappUrl, '_blank');
    } else if (sendType === 'common') {
      // WhatsApp generic
      const encodedReport = encodeURIComponent(report);
      const whatsappUrl = `https://wa.me/?text=${encodedReport}`;
      window.open(whatsappUrl, '_blank');
    } else if (sendType === 'mail') {
      // Email to faculty
      const email = selectedSubjectData?.faculty?.email;
      if (!email) {
        alert('Faculty email not available');
        return;
      }
      const subjectLine = `Attendance Report - ${selectedSubjectData?.subjectName} - ${selectedDate}`;
      const body = encodeURIComponent(report);
      const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subjectLine)}&body=${body}`;
      window.open(mailtoUrl);
    }
  };

  const handleLogout = () => {
    navigate('/login-register');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader 
        userRole={userRole}
        userName={userName}
        onLogout={handleLogout}
      />
      <MainNavigation 
        userRole={userRole}
        isCollapsed={isNavCollapsed}
        onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)}
      />
      <QuickActionFAB userRole={userRole} />
      <main className={`pt-16 pb-20 lg:pb-8 transition-academic ${
        isNavCollapsed ? 'lg:pl-16' : 'lg:pl-72'
      }`}>
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          <BreadcrumbTrail />
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Icon name="CheckSquare" size={28} className="text-primary mr-3" />
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                Mark Attendance
              </h1>
            </div>
            <p className="text-muted-foreground">
              Record student attendance for class sessions with automated report generation
            </p>
          </div>
          
          {/* Debug Info */}
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-800 mb-2">Debug Info:</h3>
            <p className="text-sm text-yellow-700">Current Class Code: {currentClassCode}</p>
            <p className="text-sm text-yellow-700">Subjects Count: {subjects.length}</p>
            <p className="text-sm text-yellow-700">Available Subjects: {JSON.stringify(subjects.map(s => s.subjectName))}</p>
            <p className="text-sm text-yellow-700">No Subjects Message: {noSubjectsMessage}</p>
            <p className="text-sm text-yellow-700">Page is rendering: YES</p>
          </div>

          {noSubjectsMessage ? (
            <div className="bg-card rounded-lg border border-border p-8 shadow-academic text-center">
              <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                No Subjects Available
              </h3>
              <p className="text-muted-foreground">
                {noSubjectsMessage}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - Form Controls */}
              <div className="xl:col-span-2 space-y-6">
                <SubjectSelector
                  subjects={subjects}
                  selectedSubject={selectedSubject}
                  onSubjectChange={setSelectedSubject}
                />

              <DateTimeSelector
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                selectedHours={selectedHours}
                onHoursChange={setSelectedHours}
                hours={hours}
              />

              <StudentAttendanceList
                students={currentStudents}
                presentStudents={presentStudents}
                onStudentToggle={handleStudentToggle}
                onSelectAll={handleSelectAll}
                allSelected={allSelected}
              />
            </div>

            {/* Right Column - Actions */}
            <div className="space-y-6">
              <AttendanceActions
                sendType={sendType}
                onSendTypeChange={setSendType}
                onSend={handleSend}
                disabled={!canSubmit}
                presentCount={presentStudents?.length}
                totalCount={currentStudents?.length}
                reportFilter={reportFilter}
                onReportFilterChange={handleReportFilterChange}
                facultyMobile={selectedSubjectData?.faculty?.mobile}
              />

              {/* Quick Stats */}
              <div className="bg-card rounded-lg border border-border p-4 shadow-academic">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                  Quick Stats
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Subjects:</span>
                    <span className="font-medium text-foreground">{subjects?.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Selected Subject:</span>
                    <span className="font-medium text-foreground">
                      {selectedSubjectData ? selectedSubjectData?.subjectCode : 'None'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium text-foreground">
                      {new Date(selectedDate)?.toLocaleDateString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`font-medium ${canSubmit ? 'text-success' : 'text-warning'}`}>
                      {canSubmit ? 'Ready to Send' : 'Incomplete'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </main>
      {/* Confirmation Modal */}
      <AttendanceConfirmation
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmSubmission}
        loading={isSubmitting}
        attendanceData={{
          subject: selectedSubjectData,
          date: selectedDate,
          hour: selectedHours,
          presentStudents: currentStudents?.filter(s => presentStudents?.includes(s?.rollNumber)),
          absentStudents: currentStudents?.filter(s => !presentStudents?.includes(s?.rollNumber))
        }}
      />
    </div>
  );
}

export default MarkAttendance;