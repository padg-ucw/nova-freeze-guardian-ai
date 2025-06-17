
import React from 'react';
import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { KPIData, TemperatureReading } from '../types/temperature';
import { toast } from 'sonner';

interface ExportButtonsProps {
  kpiData: KPIData;
  temperatureData: TemperatureReading[];
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({ kpiData, temperatureData }) => {
  const { t } = useLanguage();

  const exportPDF = () => {
    // For now, we'll create a simple report structure
    const reportData = {
      title: 'NovaFreeze Cold Chain Report',
      timestamp: new Date().toISOString(),
      kpis: kpiData,
      dataPoints: temperatureData.length
    };
    
    console.log('PDF Export Data:', reportData);
    toast.success('PDF report data prepared (check console for details)');
  };

  const exportCSV = () => {
    const headers = ['Metric', 'Value'];
    const rows = [
      ['Units Lost', kpiData.unitsLost.toString()],
      ['Financial Loss (CAD)', `$${kpiData.financialLoss.toFixed(2)}`],
      ['Compensation Amount', `$${kpiData.compensationAmount.toFixed(2)}`],
      ['Total Anomalies', kpiData.totalAnomalies.toString()],
      ['Average Deviation', kpiData.averageDeviation]
    ];

    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `novafreeze-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success('CSV report exported successfully!');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        onClick={exportPDF}
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        <FileText className="h-4 w-4 mr-2" />
        {t('exportPdf')}
      </Button>
      <Button
        onClick={exportCSV}
        variant="outline"
        className="border-freeze-300 text-freeze-700 hover:bg-freeze-50"
      >
        <Download className="h-4 w-4 mr-2" />
        {t('exportCsv')}
      </Button>
    </div>
  );
};
