import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AttendanceActions = ({ 
  sendType,
  onSendTypeChange,
  onSend,
  disabled = false,
  presentCount = 0,
  totalCount = 0,
  reportFilter,
  onReportFilterChange,
  facultyMobile
}) => {
  const attendancePercentage = totalCount > 0 ? ((presentCount / totalCount) * 100)?.toFixed(1) : 0;

  // If sendType is 'personal' but no faculty mobile, switch to 'common'
  React.useEffect(() => {
    if (sendType === 'personal' && !facultyMobile) {
      onSendTypeChange('common');
    }
  }, [sendType, facultyMobile, onSendTypeChange]);

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-academic">
      <div className="flex items-center mb-4">
        <Icon name="Send" size={20} className="text-primary mr-2" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Send Attendance Report
        </h3>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-2xl font-bold text-primary">{totalCount}</p>
          <p className="text-xs text-muted-foreground">Total Students</p>
        </div>
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <p className="text-2xl font-bold text-success">{presentCount}</p>
          <p className="text-xs text-success/80">Present</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-2xl font-bold text-foreground">{attendancePercentage}%</p>
          <p className="text-xs text-muted-foreground">Attendance</p>
        </div>
      </div>

      {/* Report Type Selection (was Send Type) */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-muted-foreground mb-2">Report Type</label>
        <div className="grid grid-cols-1 gap-2">
          <Button
            variant={reportFilter === 'absent' ? 'default' : 'outline'}
            onClick={() => onReportFilterChange('absent')}
            size="sm"
            className="w-full"
          >
            Absent Only
          </Button>
          <Button
            variant={reportFilter === 'present' ? 'default' : 'outline'}
            onClick={() => onReportFilterChange('present')}
            size="sm"
            className="w-full"
          >
            Present Only
          </Button>
          <Button
            variant={reportFilter === 'both' ? 'default' : 'outline'}
            onClick={() => onReportFilterChange('both')}
            size="sm"
            className="w-full"
          >
            Both Present & Absent
          </Button>
        </div>
      </div>
      {/* Send Type Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-muted-foreground mb-2">Send Type</label>
        <div className="grid grid-cols-1 gap-2">
          {facultyMobile && (
            <Button
              variant={sendType === 'personal' ? 'default' : 'outline'}
              onClick={() => onSendTypeChange('personal')}
              iconName="User"
              iconPosition="left"
              size="sm"
              className="w-full md:w-auto"
            >
              Send to Faculty WhatsApp
            </Button>
          )}
          <Button
            variant={sendType === 'common' ? 'default' : 'outline'}
            onClick={() => onSendTypeChange('common')}
            iconName="MessageCircle"
            iconPosition="left"
            size="sm"
            className="w-full md:w-auto"
          >
            Send to Class WhatsApp
          </Button>
          <Button
            variant={sendType === 'mail' ? 'default' : 'outline'}
            onClick={() => onSendTypeChange('mail')}
            iconName="Mail"
            iconPosition="left"
            size="sm"
            className="w-full md:w-auto"
          >
            Send to Faculty Email
          </Button>
        </div>
      </div>

      {/* Send Button */}
      <Button
        variant="default"
        onClick={onSend}
        disabled={disabled || totalCount === 0}
        fullWidth
        iconName="Send"
        iconPosition="left"
        size="lg"
      >
        Send
      </Button>
    </div>
  );
};

export default AttendanceActions;