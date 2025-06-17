import React, { useState } from 'react';
import { 
  Thermometer, 
  DollarSign, 
  Shield, 
  AlertTriangle, 
  TrendingDown,
  Package
} from 'lucide-react';
import { Header } from '../components/Header';
import { FileUpload } from '../components/FileUpload';
import { KPICard } from '../components/KPICard';
import { TemperatureChart } from '../components/TemperatureChart';
import { DemandForecastChart } from '../components/DemandForecastChart';
import { AlertBanner } from '../components/AlertBanner';
import { ExportButtons } from '../components/ExportButtons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { TemperatureReading, KPIData } from '../types/temperature';
import { detectAnomalies, calculateKPIs, generateDemandForecast } from '../utils/anomalyDetection';
import { DemoControls } from '../components/DemoControls';
import { useDynamicDemo } from '../hooks/useDynamicDemo';

const DashboardContent: React.FC = () => {
  const { t } = useLanguage();
  const [temperatureData, setTemperatureData] = useState<TemperatureReading[]>([]);
  const [showAlert, setShowAlert] = useState(true);

  const anomalies = detectAnomalies(temperatureData);
  const kpiData = calculateKPIs(anomalies);
  const demandForecast = generateDemandForecast(temperatureData);

  // Dynamic demo hook
  const {
    isPlaying,
    currentIndex,
    displayData,
    displayDemandData,
    startDemo,
    stopDemo,
    resetDemo,
    progress
  } = useDynamicDemo({
    fullData: temperatureData,
    demandData: demandForecast
  });

  // Use demo data when playing, otherwise use full data
  const chartTemperatureData = isPlaying && displayData.length > 0 ? displayData : temperatureData;
  const chartDemandData = isPlaying && displayDemandData.length > 0 ? displayDemandData : demandForecast;

  const handleDataLoaded = (data: TemperatureReading[]) => {
    setTemperatureData(data);
    setShowAlert(true);
    console.log('Loaded temperature data:', data.length, 'readings');
    console.log('Detected anomalies:', anomalies.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Alert Banner */}
        {showAlert && anomalies.length > 0 && (
          <AlertBanner 
            anomaliesCount={anomalies.length}
            onDismiss={() => setShowAlert(false)}
          />
        )}

        {/* File Upload Section */}
        <FileUpload onDataLoaded={handleDataLoaded} />

        {/* Dashboard Content */}
        {temperatureData.length > 0 ? (
          <>
            {/* Demo Controls */}
            <DemoControls
              isPlaying={isPlaying}
              progress={progress}
              currentIndex={currentIndex}
              onStart={startDemo}
              onStop={stopDemo}
              onReset={resetDemo}
            />

            {/* KPI Dashboard */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                {t('kpiDashboard')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <KPICard
                  title={t('unitsLost')}
                  value={kpiData.unitsLost}
                  icon={Package}
                  color="red"
                />
                <KPICard
                  title={t('financialLoss')}
                  value={`$${kpiData.financialLoss.toLocaleString()}`}
                  icon={DollarSign}
                  color="red"
                />
                <KPICard
                  title={t('compensationAmount')}
                  value={`$${kpiData.compensationAmount.toLocaleString()}`}
                  icon={Shield}
                  color="green"
                />
                <KPICard
                  title={t('totalAnomalies')}
                  value={kpiData.totalAnomalies}
                  icon={AlertTriangle}
                  color="yellow"
                />
                <KPICard
                  title={t('averageDeviation')}
                  value={kpiData.averageDeviation}
                  icon={TrendingDown}
                  color="blue"
                />
              </div>
            </div>

            <Separator className="my-8" />

            {/* Charts Section */}
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Analytics Dashboard
                  {isPlaying && (
                    <span className="ml-2 text-sm text-blue-400 font-normal">
                      (Live Demo - {currentIndex}/100 points)
                    </span>
                  )}
                </h2>
                <ExportButtons kpiData={kpiData} temperatureData={temperatureData} />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <TemperatureChart data={chartTemperatureData} />
                <DemandForecastChart data={chartDemandData} />
              </div>
            </div>

            {/* Alert Summary */}
            <Card className="glassmorphism border-warning-200 dark:border-warning-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-warning-700 dark:text-warning-300">
                  <AlertTriangle className="h-5 w-5" />
                  <span>{t('alertSummary')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-warning-50 dark:bg-warning-950/20">
                    <div className="text-2xl font-bold text-warning-700 dark:text-warning-300">
                      {anomalies.length}
                    </div>
                    <div className="text-sm text-warning-600 dark:text-warning-400">
                      Critical Alerts
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-red-50 dark:bg-red-950/20">
                    <div className="text-2xl font-bold text-red-700 dark:text-red-300">
                      {anomalies.reduce((sum, a) => sum + a.duration, 0).toFixed(1)}h
                    </div>
                    <div className="text-sm text-red-600 dark:text-red-400">
                      Total Duration
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-freeze-50 dark:bg-freeze-950/20">
                    <div className="text-2xl font-bold text-freeze-700 dark:text-freeze-300">
                      {temperatureData.length}
                    </div>
                    <div className="text-sm text-freeze-600 dark:text-freeze-400">
                      Data Points
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="glassmorphism text-center py-12">
            <CardContent>
              <Thermometer className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">{t('noDataMessage')}</h3>
              <p className="text-muted-foreground">
                Upload your temperature monitoring data to start analyzing cold chain performance.
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t glassmorphism mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            © 2024 NovaFreeze. AI-Powered Cold Chain Analytics. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <DashboardContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
