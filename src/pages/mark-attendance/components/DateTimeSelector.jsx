import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const DateTimeSelector = ({ 
  selectedDate, 
  onDateChange, 
  selectedHour, 
  onHourChange, 
  hours = []
}) => {
  const hourOptions = hours?.map(h => ({
    value: h.hour?.toString(),
    label: `${h.label} (${h.start} - ${h.end})`
  }));

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', { weekday: 'long' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-academic">
      <div className="flex items-center mb-3">
        <Icon name="Calendar" size={20} className="text-secondary mr-2" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Date & Time
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            type="date"
            label="Attendance Date"
            value={selectedDate}
            onChange={(e) => onDateChange(e?.target?.value)}
            required
          />
          {selectedDate && (
            <div className="mt-2 p-2 bg-muted rounded-md">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Day:</span>
                <span className="font-medium text-foreground">
                  {getDayName(selectedDate)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-muted-foreground">Formatted:</span>
                <span className="font-medium text-foreground">
                  {formatDate(selectedDate)}
                </span>
              </div>
            </div>
          )}
        </div>

        <div>
          <Select
            label="Class Hour"
            placeholder="Select class hour"
            options={hourOptions}
            value={selectedHour}
            onChange={onHourChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelector;