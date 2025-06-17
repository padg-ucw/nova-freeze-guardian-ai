
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'red' | 'green' | 'yellow' | 'purple';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const colorClasses = {
  blue: {
    bg: 'bg-freeze-50 dark:bg-freeze-950/20',
    text: 'text-freeze-600 dark:text-freeze-400',
    border: 'border-freeze-200 dark:border-freeze-800',
    icon: 'bg-freeze-100 dark:bg-freeze-900/40'
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-950/20',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
    icon: 'bg-red-100 dark:bg-red-900/40'
  },
  green: {
    bg: 'bg-cold-50 dark:bg-cold-950/20',
    text: 'text-cold-600 dark:text-cold-400',
    border: 'border-cold-200 dark:border-cold-800',
    icon: 'bg-cold-100 dark:bg-cold-900/40'
  },
  yellow: {
    bg: 'bg-warning-50 dark:bg-warning-950/20',
    text: 'text-warning-600 dark:text-warning-400',
    border: 'border-warning-200 dark:border-warning-800',
    icon: 'bg-warning-100 dark:bg-warning-900/40'
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-950/20',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
    icon: 'bg-purple-100 dark:bg-purple-900/40'
  }
};

export const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  trend 
}) => {
  const classes = colorClasses[color];

  return (
    <Card className={`glassmorphism border-2 ${classes.border} ${classes.bg} transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <p className={`text-2xl font-bold ${classes.text}`}>
              {typeof value === 'number' && value > 0 ? value.toLocaleString() : value}
            </p>
            {trend && (
              <div className="flex items-center mt-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  trend.isPositive 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                }`}>
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${classes.icon}`}>
            <Icon className={`h-6 w-6 ${classes.text}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
