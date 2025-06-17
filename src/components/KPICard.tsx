
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
    bg: 'bg-slate-50 dark:bg-slate-800/50',
    text: 'text-slate-700 dark:text-slate-200',
    border: 'border-slate-200 dark:border-slate-700',
    icon: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
  },
  red: {
    bg: 'bg-red-50/80 dark:bg-red-950/30',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-200 dark:border-red-800',
    icon: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'
  },
  green: {
    bg: 'bg-emerald-50/80 dark:bg-emerald-950/30',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400'
  },
  yellow: {
    bg: 'bg-amber-50/80 dark:bg-amber-950/30',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
    icon: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400'
  },
  purple: {
    bg: 'bg-purple-50/80 dark:bg-purple-950/30',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
    icon: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400'
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
    <Card className={`glassmorphism border ${classes.border} ${classes.bg} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg animate-chart-entry`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              {title}
            </p>
            <p className={`text-2xl font-bold ${classes.text}`}>
              {typeof value === 'number' && value > 0 ? value.toLocaleString() : value}
            </p>
            {trend && (
              <div className="flex items-center mt-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  trend.isPositive 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                }`}>
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${classes.icon}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
