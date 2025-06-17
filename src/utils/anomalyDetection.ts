
import { TemperatureReading, Anomaly, KPIData } from '../types/temperature';

const TEMPERATURE_THRESHOLD = 8; // °C
const DURATION_THRESHOLD = 3; // hours
const LOSS_RATE_PER_UNIT = 12.50; // CAD
const COMPENSATION_RATE = 0.8; // 80%

export const detectAnomalies = (readings: TemperatureReading[]): Anomaly[] => {
  const anomalies: Anomaly[] = [];
  let currentAnomaly: {
    start: number;
    temperatures: number[];
  } | null = null;

  for (let i = 0; i < readings.length; i++) {
    const reading = readings[i];
    const temp = reading.temperature;
    const timestamp = new Date(reading.timestamp);

    if (temp > TEMPERATURE_THRESHOLD) {
      if (!currentAnomaly) {
        currentAnomaly = {
          start: i,
          temperatures: [temp]
        };
      } else {
        currentAnomaly.temperatures.push(temp);
      }
    } else {
      if (currentAnomaly) {
        // Check if anomaly duration is >= 3 hours
        const startTime = new Date(readings[currentAnomaly.start].timestamp);
        const endTime = timestamp;
        const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

        if (durationHours >= DURATION_THRESHOLD) {
          const avgTemp = currentAnomaly.temperatures.reduce((a, b) => a + b, 0) / currentAnomaly.temperatures.length;
          const maxDeviation = Math.max(...currentAnomaly.temperatures) - TEMPERATURE_THRESHOLD;

          anomalies.push({
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            duration: durationHours,
            avgTemperature: avgTemp,
            maxDeviation: maxDeviation
          });
        }
        currentAnomaly = null;
      }
    }
  }

  // Handle case where data ends during an anomaly
  if (currentAnomaly && readings.length > 0) {
    const startTime = new Date(readings[currentAnomaly.start].timestamp);
    const endTime = new Date(readings[readings.length - 1].timestamp);
    const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

    if (durationHours >= DURATION_THRESHOLD) {
      const avgTemp = currentAnomaly.temperatures.reduce((a, b) => a + b, 0) / currentAnomaly.temperatures.length;
      const maxDeviation = Math.max(...currentAnomaly.temperatures) - TEMPERATURE_THRESHOLD;

      anomalies.push({
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration: durationHours,
        avgTemperature: avgTemp,
        maxDeviation: maxDeviation
      });
    }
  }

  return anomalies;
};

export const calculateKPIs = (anomalies: Anomaly[]): KPIData => {
  const totalAnomalies = anomalies.length;
  
  // Estimate units lost based on anomaly duration and severity
  const unitsLost = anomalies.reduce((total, anomaly) => {
    return total + Math.ceil(anomaly.duration * anomaly.maxDeviation * 2);
  }, 0);

  const financialLoss = unitsLost * LOSS_RATE_PER_UNIT;
  const compensationAmount = financialLoss * COMPENSATION_RATE;

  const averageDeviation = totalAnomalies > 0 
    ? (anomalies.reduce((sum, a) => sum + a.maxDeviation, 0) / totalAnomalies).toFixed(1) + '°C'
    : '0°C';

  return {
    unitsLost,
    financialLoss: Number(financialLoss.toFixed(2)),
    compensationAmount: Number(compensationAmount.toFixed(2)),
    totalAnomalies,
    averageDeviation
  };
};

export const generateDemandForecast = (readings: TemperatureReading[]) => {
  // Simple forecasting based on temperature stability
  const forecast = [];
  const baselineDemand = 1000;
  
  for (let day = 1; day <= 20; day++) {
    const volatility = Math.sin(day * 0.1) * 100;
    const seasonalEffect = Math.cos(day * 0.05) * 50;
    const demand = baselineDemand + volatility + seasonalEffect + (Math.random() - 0.5) * 50;
    const confidence = Math.max(0.6, 1 - (day * 0.015));
    
    forecast.push({
      day,
      demand: Math.max(0, Math.round(demand)),
      confidence: Number(confidence.toFixed(2))
    });
  }
  
  return forecast;
};
