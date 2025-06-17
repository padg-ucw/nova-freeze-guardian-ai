
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DemandForecastPoint } from '../types/temperature';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface DemandForecastChartProps {
  data: DemandForecastPoint[];
}

export const DemandForecastChart: React.FC<DemandForecastChartProps> = ({ data }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cold-500 to-freeze-500"></div>
          <span>{t('demandForecast')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDark ? '#334155' : '#e2e8f0'} 
              />
              <XAxis 
                dataKey="day" 
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={12}
                label={{ value: 'Days', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={12}
                label={{ 
                  value: 'Demand (Units)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#1e293b' : '#ffffff',
                  border: `1px solid ${isDark ? '#475569' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                labelStyle={{ color: isDark ? '#f1f5f9' : '#0f172a' }}
                formatter={(value, name) => [
                  `${value} units`,
                  name === 'demand' ? 'Forecasted Demand' : name
                ]}
              />
              <Area
                type="monotone"
                dataKey="demand"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#demandGradient)"
                fillOpacity={0.6}
              />
              <defs>
                <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
