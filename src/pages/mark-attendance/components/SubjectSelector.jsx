import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SubjectSelector = ({ 
  subjects, 
  selectedSubject, 
  onSubjectChange, 
  loading = false 
}) => {
  const subjectOptions = subjects?.length > 0 ? subjects?.map(subject => ({
    value: subject?.subjectCode,
    label: `${subject?.subjectName} (${subject?.subjectCode})`,
    description: `Faculty: ${subject?.faculty?.name || 'N/A'}`
  })) : [
    {
      value: '',
      label: 'No subjects available',
      description: 'N/A'
    }
  ];

  const selectedSubjectData = subjects?.find(s => s?.subjectCode === selectedSubject);

  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-academic">
      <div className="flex items-center mb-3">
        <Icon name="BookOpen" size={20} className="text-primary mr-2" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Subject Selection
        </h3>
      </div>
      <Select
        label="Select Subject"
        placeholder="Choose a subject to mark attendance"
        options={subjectOptions}
        value={selectedSubject}
        onChange={onSubjectChange}
        loading={loading}
        searchable
        required
        className="mb-4"
      />
      {selectedSubjectData && (
        <div className="bg-muted rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Subject Code:</span>
            <span className="text-sm font-mono font-medium text-foreground">
              {selectedSubjectData?.subjectCode || 'N/A'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Faculty:</span>
            <span className="text-sm font-medium text-foreground">
              {selectedSubjectData?.faculty?.name || 'N/A'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectSelector;