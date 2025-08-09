// Utility functions for dynamic class management
import classConfig from '../data/Classes.json';

export const getCurrentClassCode = () => {
  return localStorage.getItem('psg_class_code') || '24MXG1';
};

export const getCurrentClassName = () => {
  return localStorage.getItem('psg_class_name') || 'MCA 2024 G1';
};

export const getCurrentUserType = () => {
  return localStorage.getItem('psg_user_type') || 'CR';
};

export const getClassConfig = (classCode) => {
  return classConfig[classCode] || { electives: [classCode], general: [classCode] };
};

// New function to get faculty by email
export const getFacultyByEmail = (facultyEmail, facultyData) => {
  if (!facultyData || !facultyData.faculty) return null;
  return facultyData.faculty.find(f => f.email === facultyEmail) || null;
};

// New function to get subject with complete faculty info
export const getSubjectWithFaculty = (subject, facultyData) => {
  if (!subject || !subject.facultyEmail) {
    return {
      ...subject,
      faculty: { name: 'N/A', email: 'N/A', mobile: 'N/A', department: 'N/A', designation: 'N/A' }
    };
  }
  
  const faculty = getFacultyByEmail(subject.facultyEmail, facultyData);
  return {
    ...subject,
    faculty: faculty || { name: 'N/A', email: 'N/A', mobile: 'N/A', department: 'N/A', designation: 'N/A' }
  };
};

export const getStudentsForSubject = (studentsData, classCode, subjectData) => {
  const config = getClassConfig(classCode);
  
  if (subjectData.type === 'General') {
    // For General subjects, use general array
    const generalClasses = config.general;
    return generalClasses.flatMap(cls => studentsData[cls] || []);
  } else if (subjectData.type === 'Elective') {
    // For Elective subjects, use electives array
    const electiveClasses = config.electives;
    const allStudents = electiveClasses.flatMap(cls => studentsData[cls] || []);
    // Filter students who have this subject
    return allStudents.filter(student => 
      student.subjects && student.subjects.includes(subjectData.subjectCode)
    );
  }
  
  return [];
};

export const getSafeData = (data, defaultValue = 'N/A') => {
  return data || defaultValue;
};
