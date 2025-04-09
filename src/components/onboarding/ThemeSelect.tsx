
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeSelectProps {
  userData: {
    theme: string;
  };
  updateUserData: (field: string, value: string) => void;
}

export const ThemeSelect: React.FC<ThemeSelectProps> = ({ userData, updateUserData }) => {
  const { setTheme } = useTheme();
  
  const themeOptions = [
    { id: 'light', label: 'Light', icon: Sun, description: 'Clean, bright interface' },
    { id: 'dark', label: 'Dark', icon: Moon, description: 'Easier on the eyes in low light' },
    { id: 'system', label: 'System', icon: Laptop, description: 'Follows your device settings' }
  ];

  const handleThemeChange = (value: string) => {
    updateUserData('theme', value);
    if (value === 'system') {
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDarkMode ? 'dark' : 'light');
    } else {
      setTheme(value as 'light' | 'dark');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Choose your theme</h2>
        <p className="text-muted-foreground">Select a theme that works best for you</p>
      </div>

      <RadioGroup 
        value={userData.theme} 
        onValueChange={handleThemeChange}
        className="space-y-3"
      >
        {themeOptions.map((option) => {
          const Icon = option.icon;
          return (
            <div key={option.id} className="flex items-start space-x-3">
              <RadioGroupItem 
                value={option.id} 
                id={`theme-${option.id}`}
                className="mt-1"
              />
              <div className="grid gap-1.5">
                <Label 
                  htmlFor={`theme-${option.id}`} 
                  className="text-base font-medium flex items-center gap-2 cursor-pointer"
                >
                  <Icon className="h-5 w-5" />
                  {option.label}
                </Label>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </div>
          );
        })}
      </RadioGroup>

      <div className="p-4 mt-4 rounded-md bg-muted">
        <p className="text-sm text-center">
          You can always change your theme later in settings
        </p>
      </div>
    </div>
  );
};
