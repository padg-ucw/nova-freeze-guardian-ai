
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
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-freeze-500 to-cold-500"></div>
          <span>{t('temperatureChart')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDark ? '#334155' : '#e2e8f0'} 
              />
              <XAxis 
                dataKey="timestamp" 
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={12}
              />
              <YAxis 
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={12}
                label={{ 
                  value: 'Temperature (°C)', 
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
              />
              <ReferenceLine 
                y={8} 
                stroke="#ef4444" 
                strokeDasharray="5 5"
                label={{ value: "Threshold (8°C)", position: "topRight" }}
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  return payload?.isAnomaly ? (
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={4} 
                      fill="#ef4444" 
                      stroke="#ffffff"
                      strokeWidth={2}
                    />
                  ) : (
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={2} 
                      fill="#0ea5e9"
                    />
                  );
                }}
                activeDot={{ 
                  r: 6, 
                  fill: "#0ea5e9",
                  stroke: "#ffffff",
                  strokeWidth: 2
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
