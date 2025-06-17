
import React, { useCallback, useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { parseCSV, generateSampleCSV } from '../utils/csvParser';
import { TemperatureReading } from '../types/temperature';
import { toast } from 'sonner';

interface FileUploadProps {
  onDataLoaded: (data: TemperatureReading[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onDataLoaded }) => {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = useCallback(async (file: File) => {
    setIsProcessing(true);
    toast.info(t('processingData'));
    
    try {
      const content = await file.text();
      const data = parseCSV(content);
      
      if (data.length === 0) {
        throw new Error('No valid temperature data found');
      }
      
      onDataLoaded(data);
      toast.success(t('dataProcessed'));
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error(t('errorProcessing'));
    } finally {
      setIsProcessing(false);
    }
  }, [onDataLoaded, t]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.name.endsWith('.csv'));
    
    if (csvFile) {
      handleFileUpload(csvFile);
    }
  }, [handleFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const loadSampleData = useCallback(() => {
    const sampleCSV = generateSampleCSV();
    const data = parseCSV(sampleCSV);
    onDataLoaded(data);
    toast.success('Sample data loaded successfully!');
  }, [onDataLoaded]);

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-5 w-5 text-freeze-600" />
          <span>{t('uploadData')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging 
              ? 'border-freeze-500 bg-freeze-50 dark:bg-freeze-950/20' 
              : 'border-border hover:border-freeze-400'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">{t('dragDropCsv')}</p>
          <p className="text-sm text-muted-foreground mb-4">{t('supportedFormat')}</p>
          
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <div className="relative">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isProcessing}
              />
              <Button 
                disabled={isProcessing} 
                className="bg-freeze-600 hover:bg-freeze-700"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    {t('uploadCsv')}
                  </>
                )}
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              onClick={loadSampleData}
              disabled={isProcessing}
              className="border-freeze-300 text-freeze-700 hover:bg-freeze-50"
            >
              Load Sample Data
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-warning-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium">Expected CSV format:</p>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  Timestamp, Temperature (°C), Status
                </code>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
