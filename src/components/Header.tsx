
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 glassmorphism border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
              <div className="w-6 h-6 rounded bg-white/90 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {t('appTitle')}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">AI-Powered Cold Chain Analytics</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60">
              <Button
                variant={language === 'en' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('en')}
                className="rounded-r-none"
              >
                EN
              </Button>
              <Button
                variant={language === 'es' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('es')}
                className="rounded-l-none"
              >
                ES
              </Button>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-700/80 border-slate-200 dark:border-slate-700"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
