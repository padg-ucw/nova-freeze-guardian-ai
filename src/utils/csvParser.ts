
import { TemperatureReading } from '../types/temperature';

export const parseCSV = (csvContent: string): TemperatureReading[] => {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
  
  // Find column indices
  const timestampIndex = headers.findIndex(h => h.includes('timestamp') || h.includes('time'));
  const temperatureIndex = headers.findIndex(h => h.includes('temperature') || h.includes('temp'));
  const statusIndex = headers.findIndex(h => h.includes('status'));
  
  if (timestampIndex === -1 || temperatureIndex === -1) {
    throw new Error('CSV must contain Timestamp and Temperature columns');
  }
  
  const readings: TemperatureReading[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    
    if (values.length < Math.max(timestampIndex, temperatureIndex) + 1) {
      continue; // Skip incomplete rows
    }
    
    const timestamp = values[timestampIndex];
    const temperature = parseFloat(values[temperatureIndex]);
    const status = statusIndex >= 0 ? values[statusIndex] : 'OK';
    
    if (!isNaN(temperature) && timestamp) {
      readings.push({
        timestamp,
        temperature,
        status
      });
    }
  }
  
  return readings;
};

export const generateSampleCSV = (): string => {
  const headers = 'Timestamp,Temperature (°C),Status\n';
  let csv = headers;
  
  const startDate = new Date('2024-06-01T00:00:00Z');
  
  for (let i = 0; i < 168; i++) { // 7 days of hourly data
    const currentDate = new Date(startDate.getTime() + i * 60 * 60 * 1000);
    const timestamp = currentDate.toISOString();
    
    // Generate realistic temperature data with some anomalies
    let temperature = 4 + Math.random() * 2; // Normal range 4-6°C
    
    // Inject some anomalies
    if (i >= 24 && i <= 30) { // Day 2, extended warm period
      temperature = 9 + Math.random() * 2;
    } else if (i >= 120 && i <= 125) { // Day 6, shorter warm period
      temperature = 8.5 + Math.random() * 1.5;
    }
    
    const status = temperature > 8 ? 'ALERT' : 'OK';
    
    csv += `${timestamp},${temperature.toFixed(1)},${status}\n`;
  }
  
  return csv;
};
