
import { useState, useEffect, useCallback } from 'react';
import { TemperatureReading, DemandForecastPoint } from '../types/temperature';

interface UseDynamicDemoProps {
  fullData: TemperatureReading[];
  demandData: DemandForecastPoint[];
}

export const useDynamicDemo = ({ fullData, demandData }: UseDynamicDemoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayData, setDisplayData] = useState<TemperatureReading[]>([]);
  const [displayDemandData, setDisplayDemandData] = useState<DemandForecastPoint[]>([]);

  // Generate 100 demo points from the full dataset
  const generateDemoData = useCallback(() => {
    if (fullData.length === 0) return [];
    
    const demoPoints: TemperatureReading[] = [];
    const interval = Math.max(1, Math.floor(fullData.length / 100));
    
    for (let i = 0; i < Math.min(100, fullData.length); i++) {
      const dataIndex = i * interval;
      if (dataIndex < fullData.length) {
        demoPoints.push({
          ...fullData[dataIndex],
          timestamp: new Date(Date.now() + i * 60000).toISOString() // 1 minute intervals
        });
      }
    }
    
    return demoPoints;
  }, [fullData]);

  const generateDemoDemandData = useCallback(() => {
    if (demandData.length === 0) return [];
    
    const demoDemandPoints: DemandForecastPoint[] = [];
    const interval = Math.max(1, Math.floor(demandData.length / 100));
    
    for (let i = 0; i < Math.min(100, demandData.length); i++) {
      const dataIndex = i * interval;
      if (dataIndex < demandData.length) {
        demoDemandPoints.push({
          ...demandData[dataIndex],
          day: i + 1
        });
      }
    }
    
    return demoDemandPoints;
  }, [demandData]);

  const demoData = generateDemoData();
  const demoDemandData = generateDemoDemandData();

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentIndex(0);
    setDisplayData([]);
    setDisplayDemandData([]);
  };

  const stopDemo = () => {
    setIsPlaying(false);
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    setDisplayData([]);
    setDisplayDemandData([]);
  };

  useEffect(() => {
    if (!isPlaying || currentIndex >= 100) {
      if (currentIndex >= 100) {
        setIsPlaying(false);
      }
      return;
    }

    const timer = setTimeout(() => {
      if (currentIndex < demoData.length) {
        setDisplayData(prev => [...prev, demoData[currentIndex]]);
      }
      if (currentIndex < demoDemandData.length) {
        setDisplayDemandData(prev => [...prev, demoDemandData[currentIndex]]);
      }
      setCurrentIndex(prev => prev + 1);
    }, 100); // 100ms interval for smooth animation

    return () => clearTimeout(timer);
  }, [isPlaying, currentIndex, demoData, demoDemandData]);

  return {
    isPlaying,
    currentIndex,
    displayData,
    displayDemandData,
    startDemo,
    stopDemo,
    resetDemo,
    progress: (currentIndex / 100) * 100
  };
};
