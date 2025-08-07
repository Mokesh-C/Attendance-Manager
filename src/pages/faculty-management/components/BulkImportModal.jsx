import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkImportModal = ({ isOpen, onClose, onImport }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      setSelectedFile(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      setSelectedFile(e?.target?.files?.[0]);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    try {
      // Mock import process
      await new Promise(resolve => setTimeout(resolve, 2000));
      onImport(selectedFile);
      onClose();
      setSelectedFile(null);
    } catch (error) {
      console.error('Import error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setDragActive(false);
    onClose();
  };

  const downloadTemplate = () => {
    const csvContent = `Name,Email,Mobile,Department
Dr. John Smith,john.smith@psgtech.edu,9876543210,CSE
Prof. Jane Doe,jane.doe@psgtech.edu,9876543211,ECE`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'faculty_template.csv';
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={handleClose}></div>
      <div className="relative bg-card border border-border rounded-lg shadow-academic-lg w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Bulk Import Faculty
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

        <div className="p-6 space-y-6">
          {/* Instructions */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-heading font-semibold text-foreground mb-2">
              Import Instructions
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Upload a CSV file with faculty data</li>
              <li>• Required columns: Name, Email, Mobile, Department</li>
              <li>• Maximum file size: 5MB</li>
              <li>• Duplicate emails will be skipped</li>
            </ul>
          </div>

          {/* Template Download */}
          <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center">
              <Icon name="Download" size={16} className="text-primary mr-2" />
              <span className="text-sm font-medium text-primary">
                Download CSV Template
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadTemplate}
              iconName="Download"
              iconPosition="left"
            >
              Download
            </Button>
          </div>

          {/* File Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-academic ${
              dragActive
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-full mx-auto">
                <Icon name="Upload" size={24} className="text-muted-foreground" />
              </div>
              
              {selectedFile ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Selected File:
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="FileText" size={16} />
                    <span>{selectedFile?.name}</span>
                    <span>({(selectedFile?.size / 1024)?.toFixed(1)} KB)</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Drop your CSV file here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports CSV, XLSX, XLS files up to 5MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={!selectedFile || isLoading}
              loading={isLoading}
              iconName="Upload"
              iconPosition="left"
            >
              Import Faculty
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkImportModal;