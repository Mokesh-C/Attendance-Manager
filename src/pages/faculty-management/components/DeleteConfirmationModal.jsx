import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmationModal = ({ isOpen, onClose, faculty, onConfirm, isLoading }) => {
  if (!isOpen || !faculty) return null;

  const handleConfirm = () => {
    onConfirm(faculty);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-card border border-border rounded-lg shadow-academic-lg w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-destructive/10 rounded-full mx-auto mb-4">
            <Icon name="AlertTriangle" size={24} className="text-destructive" />
          </div>
          
          <h3 className="text-lg font-heading font-semibold text-foreground text-center mb-2">
            Delete Faculty Member
          </h3>
          
          <p className="text-sm text-muted-foreground text-center mb-6">
            Are you sure you want to delete <strong>{faculty?.name}</strong>? This action cannot be undone and will remove all associated data including subject assignments.
          </p>

          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-6">
            <div className="flex items-start">
              <Icon name="AlertCircle" size={16} className="text-warning mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-warning">
                <p className="font-medium mb-1">Warning:</p>
                <ul className="text-xs space-y-1">
                  <li>• All subject assignments will be removed</li>
                  <li>• Historical attendance data will be preserved</li>
                  <li>• This action is irreversible</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              loading={isLoading}
              iconName="Trash2"
              iconPosition="left"
            >
              Delete Faculty
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;