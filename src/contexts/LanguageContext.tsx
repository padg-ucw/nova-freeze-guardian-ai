
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'es';

interface Translations {
  [key: string]: {
    en: string;
    es: string;
  };
}

const translations: Translations = {
  appTitle: {
    en: 'NovaFreeze - Cold Chain Monitor',
    es: 'NovaFreeze - Monitor de Cadena de Frío'
  },
  dashboard: {
    en: 'Dashboard',
    es: 'Tablero'
  },
  uploadData: {
    en: 'Upload Temperature Data',
    es: 'Cargar Datos de Temperatura'
  },
  uploadCsv: {
    en: 'Upload CSV File',
    es: 'Cargar Archivo CSV'
  },
  dragDropCsv: {
    en: 'Drag and drop your CSV file here, or click to select',
    es: 'Arrastra y suelta tu archivo CSV aquí, o haz clic para seleccionar'
  },
  supportedFormat: {
    en: 'Supported format: CSV with Timestamp, Temperature (°C), Status columns',
    es: 'Formato compatible: CSV con columnas Timestamp, Temperature (°C), Status'
  },
  kpiDashboard: {
    en: 'Key Performance Indicators',
    es: 'Indicadores Clave de Rendimiento'
  },
  unitsLost: {
    en: 'Units Lost',
    es: 'Unidades Perdidas'
  },
  financialLoss: {
    en: 'Financial Loss (CAD)',
    es: 'Pérdida Financiera (CAD)'
  },
  compensationAmount: {
    en: 'Compensation Amount',
    es: 'Monto de Compensación'
  },
  totalAnomalies: {
    en: 'Total Anomalies',
    es: 'Anomalías Totales'
  },
  averageDeviation: {
    en: 'Avg Deviation',
    es: 'Desviación Promedio'
  },
  temperatureChart: {
    en: 'Temperature Monitoring',
    es: 'Monitoreo de Temperatura'
  },
  demandForecast: {
    en: 'Demand Forecast (20 Days)',
    es: 'Pronóstico de Demanda (20 Días)'
  },
  alertSummary: {
    en: 'Alert Frequency Summary',
    es: 'Resumen de Frecuencia de Alertas'
  },
  exportPdf: {
    en: 'Export PDF Report',
    es: 'Exportar Reporte PDF'
  },
  exportCsv: {
    en: 'Export CSV Summary',
    es: 'Exportar Resumen CSV'
  },
  criticalAlert: {
    en: 'Critical Temperature Alert',
    es: 'Alerta Crítica de Temperatura'
  },
  anomalyDetected: {
    en: 'Temperature anomalies detected above 8°C threshold',
    es: 'Anomalías de temperatura detectadas por encima del umbral de 8°C'
  },
  noDataMessage: {
    en: 'No temperature data available. Please upload a CSV file to begin monitoring.',
    es: 'No hay datos de temperatura disponibles. Por favor carga un archivo CSV para comenzar el monitoreo.'
  },
  processingData: {
    en: 'Processing temperature data...',
    es: 'Procesando datos de temperatura...'
  },
  dataProcessed: {
    en: 'Temperature data processed successfully!',
    es: '¡Datos de temperatura procesados exitosamente!'
  },
  errorProcessing: {
    en: 'Error processing temperature data. Please check your CSV format.',
    es: 'Error al procesar datos de temperatura. Por favor verifica el formato de tu CSV.'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
