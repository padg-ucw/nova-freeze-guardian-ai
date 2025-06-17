
export interface TemperatureReading {
  timestamp: string;
  temperature: number;
  status: string;
}

export interface Anomaly {
  startTime: string;
  endTime: string;
  duration: number; // in hours
  avgTemperature: number;
  maxDeviation: number;
}

export interface KPIData {
  unitsLost: number;
  financialLoss: number;
  compensationAmount: number;
  totalAnomalies: number;
  averageDeviation: string;
}

export interface ChartDataPoint {
  timestamp: string;
  temperature: number;
  isAnomaly?: boolean;
}

export interface DemandForecastPoint {
  day: number;
  demand: number;
  confidence: number;
}
