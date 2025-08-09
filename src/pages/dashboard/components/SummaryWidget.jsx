import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryWidget = ({ title, value, subtitle, icon, trend, color = 'primary' }) => {
  const colorClasses = {
    primary: 'text-primary bg-primary/10',
    secondary: 'text-secondary bg-secondary/10',
    accent: 'text-accent bg-accent/10',
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    destructive: 'text-destructive bg-destructive/10'
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend?.direction === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = () => {
    if (!trend) return '';
    return trend?.direction === 'up' ? 'text-success' : 'text-destructive';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-academic">
      <div className="flex items-center mb-4 gap-3">
        <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${colorClasses?.[color]}`}> 
          <Icon name={icon} size={24} />
        </div>
        <h3 className="text-2xl font-heading font-bold text-foreground">
          {value}
        </h3>
        {trend && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={16} />
            <span className="text-sm font-medium">{trend?.value}</span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">
          {title}
        </p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default SummaryWidget;