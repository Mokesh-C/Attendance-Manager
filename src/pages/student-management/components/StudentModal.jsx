import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const StudentModal = ({ isOpen, onClose, student, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    mobile: '',
    classSection: '',
    department: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const departmentOptions = [
    { value: 'CSE', label: 'Computer Science Engineering' },
    { value: 'ECE', label: 'Electronics & Communication Engineering' },
    { value: 'EEE', label: 'Electrical & Electronics Engineering' },
    { value: 'MECH', label: 'Mechanical Engineering' },
    { value: 'CIVIL', label: 'Civil Engineering' },
    { value: 'IT', label: 'Information Technology' },
    { value: 'AERO', label: 'Aeronautical Engineering' },
    { value: 'CHEM', label: 'Chemical Engineering' }
  ];

  const classSectionOptions = [
    { value: 'A', label: 'Section A' },
    { value: 'B', label: 'Section B' },
    { value: 'C', label: 'Section C' },
    { value: 'D', label: 'Section D' }
  ];

  useEffect(() => {
    if (student) {
      setFormData({
        name: student?.name || '',
        rollNumber: student?.rollNumber || '',
        email: student?.email || '',
        mobile: student?.mobile || '',
        classSection: student?.classSection || '',
        department: student?.department || ''
      });
    } else {
      setFormData({
        name: '',
        rollNumber: '',
        email: '',
        mobile: '',
        classSection: '',
        department: ''
      });
    }
    setErrors({});
  }, [student, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.rollNumber?.trim()) {
      newErrors.rollNumber = 'Roll number is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.mobile?.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/?.test(formData?.mobile?.replace(/\D/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData?.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData?.classSection) {
      newErrors.classSection = 'Class/Section is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const studentData = {
        ...formData,
        mobile: formData?.mobile?.startsWith('+91') ? formData?.mobile : `+91${formData?.mobile?.replace(/\D/g, '')}`,
        id: student?.id || Date.now()
      };
      
      await onSave(studentData);
      onClose();
    } catch (error) {
      console.error('Error saving student:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg shadow-academic-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            {student ? 'Edit Student' : 'Add New Student'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter student's full name"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            error={errors?.name}
            required
          />

          <Input
            label="Roll Number"
            type="text"
            placeholder="Enter roll number"
            value={formData?.rollNumber}
            onChange={(e) => handleInputChange('rollNumber', e?.target?.value)}
            error={errors?.rollNumber}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />

          <Input
            label="Mobile Number"
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={formData?.mobile}
            onChange={(e) => handleInputChange('mobile', e?.target?.value)}
            error={errors?.mobile}
            required
          />

          <Select
            label="Department"
            placeholder="Select department"
            options={departmentOptions}
            value={formData?.department}
            onChange={(value) => handleInputChange('department', value)}
            error={errors?.department}
            required
            searchable
          />

          <Select
            label="Class/Section"
            placeholder="Select class section"
            options={classSectionOptions}
            value={formData?.classSection}
            onChange={(value) => handleInputChange('classSection', value)}
            error={errors?.classSection}
            required
          />

          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
            >
              {student ? 'Update Student' : 'Add Student'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;