
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TemperatureReading } from '../types/temperature';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface TemperatureChartProps {
  data: TemperatureReading[];
}

export const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const chartData = data.map(reading => ({
    timestamp: new Date(reading.timestamp).toLocaleDateString(),
    temperature: reading.temperature,
    isAnomaly: reading.temperature > 8
  }));

  const isDark = theme === 'dark';

  return (
    <Card className="glassmorphism border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          <span>{t('temperatureChart')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDark ? '#475569' : '#cbd5e1'} 
              />
              <XAxis 
                dataKey="timestamp" 
                stroke={isDark ? '#94a3b8' : '#475569'}
                fontSize={12}
                tick={{ fill: isDark ? '#94a3b8' : '#475569' }}
              />
              <YAxis 
                stroke={isDark ? '#94a3b8' : '#475569'}
                fontSize={12}
                tick={{ fill: isDark ? '#94a3b8' : '#475569' }}
                label={{ 
                  value: 'Temperature (°C)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: isDark ? '#94a3b8' : '#475569' }
                }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#1e293b' : '#ffffff',
                  border: `1px solid ${isDark ? '#475569' : '#cbd5e1'}`,
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  color: isDark ? '#f1f5f9' : '#1e293b'
                }}
                labelStyle={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
              />
              <ReferenceLine 
                y={8} 
                stroke="#dc2626" 
                strokeDasharray="5 5"
                label={{ 
                  value: "Threshold (8°C)", 
                  position: "topLeft",
                  style: { fill: '#dc2626', fontSize: '12px' }
                }}
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#2563eb"
                strokeWidth={2}
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  return payload?.isAnomaly ? (
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={4} 
                      fill="#dc2626" 
                      stroke="#ffffff"
                      strokeWidth={2}
                    />
                  ) : (
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={2} 
                      fill="#2563eb"
                    />
                  );
                }}
                activeDot={{ 
                  r: 6, 
                  fill: "#2563eb",
                  stroke: "#ffffff",
                  strokeWidth: 2
                }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
