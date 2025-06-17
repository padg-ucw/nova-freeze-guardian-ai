
import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface DemoControlsProps {
  isPlaying: boolean;
  progress: number;
  currentIndex: number;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

export const DemoControls: React.FC<DemoControlsProps> = ({
  isPlaying,
  progress,
  currentIndex,
  onStart,
  onStop,
  onReset
}) => {
  return (
    <Card className="glassmorphism border-slate-700/50 bg-slate-900/40">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              onClick={isPlaying ? onStop : onStart}
              variant="outline"
              size="sm"
              className="bg-slate-800/60 border-slate-600 text-slate-200 hover:bg-slate-700/80"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 mr-2" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              {isPlaying ? 'Pause' : 'Play'} Demo
            </Button>
            
            <Button
              onClick={onReset}
              variant="outline"
              size="sm"
              className="bg-slate-800/60 border-slate-600 text-slate-200 hover:bg-slate-700/80"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="flex-1 max-w-xs">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400 min-w-fit">
                {currentIndex}/100
              </span>
              <Progress value={progress} className="flex-1" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
