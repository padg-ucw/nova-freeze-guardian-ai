
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';

interface AlertBannerProps {
  anomaliesCount: number;
  onDismiss: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ anomaliesCount, onDismiss }) => {
  const { t } = useLanguage();

  if (anomaliesCount === 0) return null;

  return (
    <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800 animate-pulse-glow">
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertDescription className="flex items-center justify-between">
        <div>
          <span className="font-semibold text-red-800 dark:text-red-200">
            {t('criticalAlert')}:
          </span>
          <span className="ml-2 text-red-700 dark:text-red-300">
            {t('anomalyDetected')} ({anomaliesCount} detected)
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="text-red-600 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900/40"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
