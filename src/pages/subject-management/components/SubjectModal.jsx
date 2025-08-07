import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SubjectModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  subject = null, 
  facultyList = [], 
  studentList = [] 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    facultyId: '',
    department: '',
    studentIds: [],
    isActive: true
  });
  const [errors, setErrors] = useState({});
  const [studentSearchTerm, setStudentSearchTerm] = useState('');
  const [showStudentSelection, setShowStudentSelection] = useState(false);

  useEffect(() => {
    if (subject) {
      setFormData({
        name: subject?.name || '',
        code: subject?.code || '',
        facultyId: subject?.faculty?.id || '',
        department: subject?.department || '',
        studentIds: subject?.students?.map(s => s?.id) || [],
        isActive: subject?.isActive !== undefined ? subject?.isActive : true
      });
    } else {
      setFormData({
        name: '',
        code: '',
        facultyId: '',
        department: '',
        studentIds: [],
        isActive: true
      });
    }
    setErrors({});
    setStudentSearchTerm('');
  }, [subject, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Subject name is required';
    }

    if (!formData?.code?.trim()) {
      newErrors.code = 'Subject code is required';
    } else if (formData?.code?.length < 3) {
      newErrors.code = 'Subject code must be at least 3 characters';
    }

    if (!formData?.facultyId) {
      newErrors.facultyId = 'Faculty assignment is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      const selectedFaculty = facultyList?.find(f => f?.id === formData?.facultyId);
      const selectedStudents = studentList?.filter(s => formData?.studentIds?.includes(s?.id));
      
      onSave({
        ...formData,
        faculty: selectedFaculty,
        students: selectedStudents,
        id: subject?.id || Date.now()?.toString()
      });
    }
  };

  const handleStudentToggle = (studentId) => {
    setFormData(prev => ({
      ...prev,
      studentIds: prev?.studentIds?.includes(studentId)
        ? prev?.studentIds?.filter(id => id !== studentId)
        : [...prev?.studentIds, studentId]
    }));
  };

  const handleSelectAllStudents = () => {
    const filteredStudents = getFilteredStudents();
    const allSelected = filteredStudents?.every(student => 
      formData?.studentIds?.includes(student?.id)
    );

    if (allSelected) {
      setFormData(prev => ({
        ...prev,
        studentIds: prev?.studentIds?.filter(id => 
          !filteredStudents?.some(student => student?.id === id)
        )
      }));
    } else {
      const newStudentIds = [...formData?.studentIds];
      filteredStudents?.forEach(student => {
        if (!newStudentIds?.includes(student?.id)) {
          newStudentIds?.push(student?.id);
        }
      });
      setFormData(prev => ({ ...prev, studentIds: newStudentIds }));
    }
  };

  const getFilteredStudents = () => {
    return studentList?.filter(student =>
      student?.name?.toLowerCase()?.includes(studentSearchTerm?.toLowerCase()) ||
      student?.rollNumber?.toLowerCase()?.includes(studentSearchTerm?.toLowerCase()) ||
      student?.class?.toLowerCase()?.includes(studentSearchTerm?.toLowerCase())
    );
  };

  const facultyOptions = facultyList?.map(faculty => ({
    value: faculty?.id,
    label: `${faculty?.name} - ${faculty?.department}`,
    description: faculty?.email
  }));

  if (!isOpen) return null;

  const filteredStudents = getFilteredStudents();
  const selectedStudentsCount = formData?.studentIds?.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg shadow-academic-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            {subject ? 'Edit Subject' : 'Add New Subject'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-medium text-foreground">
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Subject Name"
                  type="text"
                  placeholder="e.g., Data Structures and Algorithms"
                  value={formData?.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e?.target?.value }))}
                  error={errors?.name}
                  required
                />

                <Input
                  label="Subject Code"
                  type="text"
                  placeholder="e.g., CS301"
                  value={formData?.code}
                  onChange={(e) => setFormData(prev => ({ ...prev, code: e?.target?.value?.toUpperCase() }))}
                  error={errors?.code}
                  required
                />
              </div>

              <Input
                label="Department"
                type="text"
                placeholder="e.g., Computer Science Engineering"
                value={formData?.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e?.target?.value }))}
              />
            </div>

            {/* Faculty Assignment */}
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-medium text-foreground">
                Faculty Assignment
              </h3>
              
              <Select
                label="Assign Faculty"
                placeholder="Select faculty member"
                options={facultyOptions}
                value={formData?.facultyId}
                onChange={(value) => setFormData(prev => ({ ...prev, facultyId: value }))}
                error={errors?.facultyId}
                searchable
                required
              />
            </div>

            {/* Student Assignment */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-medium text-foreground">
                  Student Assignment
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowStudentSelection(!showStudentSelection)}
                  iconName={showStudentSelection ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                >
                  {selectedStudentsCount} Selected
                </Button>
              </div>

              {showStudentSelection && (
                <div className="border border-border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Input
                      type="search"
                      placeholder="Search students by name, roll number, or class"
                      value={studentSearchTerm}
                      onChange={(e) => setStudentSearchTerm(e?.target?.value)}
                      className="flex-1 mr-4"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleSelectAllStudents}
                    >
                      {filteredStudents?.every(student => formData?.studentIds?.includes(student?.id))
                        ? 'Deselect All' :'Select All'
                      }
                    </Button>
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {filteredStudents?.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">
                        No students found matching your search.
                      </p>
                    ) : (
                      filteredStudents?.map((student) => (
                        <div
                          key={student?.id}
                          className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-academic"
                        >
                          <Checkbox
                            checked={formData?.studentIds?.includes(student?.id)}
                            onChange={() => handleStudentToggle(student?.id)}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                              {student?.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {student?.rollNumber} • {student?.class}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-medium text-foreground">
                Status
              </h3>
              
              <Checkbox
                label="Active Subject"
                description="Students can be enrolled and attendance can be marked"
                checked={formData?.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e?.target?.checked }))}
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/20">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              {subject ? 'Update Subject' : 'Create Subject'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectModal;