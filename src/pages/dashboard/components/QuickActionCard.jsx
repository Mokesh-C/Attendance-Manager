import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ 
  title, 
  description, 
  icon, 
  path, 
  stats, 
  color = 'primary',
  disabled = false 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!disabled && path) {
      navigate(path);
    }
  };

  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    success: 'bg-success/10 text-success border-success/20'
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 shadow-academic hover:shadow-academic-md transition-academic ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary/30'
    }`}
    onClick={handleClick}>
      <div className="flex items-start justify-between mb-4">
        <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${colorClasses?.[color]}`}>
          <Icon name={icon} size={24} />
        </div>
        {stats && (
          <div className="text-right">
            <p className="text-2xl font-heading font-bold text-foreground">{stats?.value}</p>
            <p className="text-xs text-muted-foreground">{stats?.label}</p>
          </div>
        )}
      </div>
      <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        {description}
      </p>
      <Button 
        variant="ghost" 
        size="sm" 
        iconName="ArrowRight" 
        iconPosition="right"
        disabled={disabled}
        className="w-full justify-between hover:bg-blue-500/10 hover:text-foreground "
      >
        {disabled ? 'Coming Soon' : 'Access'}
      </Button>
    </div>
  );
};

export default QuickActionCard;