import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FacultyModal = ({ isOpen, onClose, faculty, onSave, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    department: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const departmentOptions = [
    { value: 'CSE', label: 'Computer Science & Engineering' },
    { value: 'ECE', label: 'Electronics & Communication Engineering' },
    { value: 'EEE', label: 'Electrical & Electronics Engineering' },
    { value: 'MECH', label: 'Mechanical Engineering' },
    { value: 'CIVIL', label: 'Civil Engineering' },
    { value: 'IT', label: 'Information Technology' },
    { value: 'AERO', label: 'Aeronautical Engineering' },
    { value: 'CHEM', label: 'Chemical Engineering' },
    { value: 'BIOTECH', label: 'Biotechnology' },
    { value: 'TEXTILE', label: 'Textile Technology' }
  ];

  useEffect(() => {
    if (faculty && mode === 'edit') {
      setFormData({
        name: faculty?.name || '',
        email: faculty?.email || '',
        mobile: faculty?.mobile || '',
        department: faculty?.department || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        mobile: '',
        department: ''
      });
    }
    setErrors({});
  }, [faculty, mode, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Faculty name is required';
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

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const facultyData = {
        ...formData,
        mobile: `+91 ${formData?.mobile}`,
        id: faculty?.id || Date.now(),
        joinDate: faculty?.joinDate || new Date()?.toLocaleDateString('en-GB'),
        assignedSubjects: faculty?.assignedSubjects || 0
      };
      
      await onSave(facultyData);
      onClose();
    } catch (error) {
      console.error('Error saving faculty:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      mobile: '',
      department: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={handleClose}></div>
      <div className="relative bg-card border border-border rounded-lg shadow-academic-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            {mode === 'edit' ? 'Edit Faculty' : 'Add New Faculty'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Faculty Name"
            type="text"
            placeholder="Enter faculty name"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            error={errors?.name}
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
          />

          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
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
              {mode === 'edit' ? 'Update Faculty' : 'Add Faculty'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FacultyModal;