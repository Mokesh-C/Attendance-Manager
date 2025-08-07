import React, { useState, useEffect } from 'react';
import subjectsFaculty from '../../data/subjects_faculty.json';
import timings from '../../data/timings.json';
import studentsData from '../../data/students.json';
import { useNavigate } from 'react-router-dom';
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

  // Form state
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date()?.toISOString()?.split('T')?.[0]);
  const [selectedHour, setSelectedHour] = useState('');
  const [presentStudents, setPresentStudents] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendType, setSendType] = useState('personal');
  const [reportFilter, setReportFilter] = useState('both');

  // Subjects from static JSON
  const subjects = subjectsFaculty;
  // Timings from static JSON
  const hours = timings;
  // Students from static JSON
  const allStudents = studentsData;

  // Get selected subject data
  const selectedSubjectData = subjects?.find(s => s?.subjectCode === selectedSubject);
  // Always show all students if a subject is selected
  const currentStudents = selectedSubjectData ? allStudents : [];

  // Initialize all students as present
  useEffect(() => {
    if (selectedSubjectData) {
      setPresentStudents(currentStudents?.map(s => s?.rollNumber)); // All present by default
    } else {
      setPresentStudents([]);
    }
  }, [selectedSubject, selectedSubjectData, currentStudents]);

  const handleStudentToggle = (studentId) => {
    setPresentStudents(prev => 
      prev?.includes(studentId)
        ? prev?.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    const allSelected = presentStudents?.length === currentStudents?.length;
    if (allSelected) {
      setPresentStudents([]);
    } else {
      setPresentStudents(currentStudents?.map(s => s?.rollNumber));
    }
  };

  const handleReportFilterChange = (filter) => {
    setReportFilter(filter);
  };

  const handleSubmitAttendance = () => {
    if (!selectedSubject || !selectedDate || !selectedHour) {
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

    return `🎓 ATTENDANCE REPORT\n\n` +
      `📖 Subject: ${subject?.subjectName} (${subject?.subjectCode})\n` +
      `📅 Date & Hour: ${formatDate(selectedDate)} & ${getHourLabel(selectedHour)}\n\n` +
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
      const mobile = selectedSubjectData?.faculty?.mobile;
      if (!mobile) {
        alert('Faculty mobile number not available');
        return;
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

  const allSelected = presentStudents?.length === currentStudents?.length;
  const canSubmit = selectedSubject && selectedDate && selectedHour && currentStudents?.length > 0;

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
                selectedHour={selectedHour}
                onHourChange={setSelectedHour}
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
          hour: selectedHour,
          presentStudents: currentStudents?.filter(s => presentStudents?.includes(s?.rollNumber)),
          absentStudents: currentStudents?.filter(s => !presentStudents?.includes(s?.rollNumber))
        }}
      />
    </div>
  );
}

export default MarkAttendance;