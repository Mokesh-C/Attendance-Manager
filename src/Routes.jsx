import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MarkAttendance from './pages/mark-attendance';
import StudentManagement from './pages/student-management';
import FacultyManagement from './pages/faculty-management';
import LoginRegisterPage from './pages/login-register';
import Dashboard from './pages/dashboard';
import SubjectManagement from './pages/subject-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/mark-attendance" element={<MarkAttendance />} />
        <Route path="/student-management" element={<StudentManagement />} />
        <Route path="/faculty-management" element={<FacultyManagement />} />
        <Route path="/login-register" element={<LoginRegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subject-management" element={<SubjectManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
