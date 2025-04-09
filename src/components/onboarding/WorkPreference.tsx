
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Briefcase, Home, Users } from 'lucide-react';

interface WorkPreferenceProps {
  userData: {
    workPreference: string;
  };
  updateUserData: (field: string, value: string) => void;
}

export const WorkPreference: React.FC<WorkPreferenceProps> = ({ userData, updateUserData }) => {
  const workOptions = [
    { id: 'personal', label: 'Personal', icon: Home, description: 'For managing your personal tasks and projects' },
    { id: 'work', label: 'Work', icon: Briefcase, description: 'For managing professional tasks and deadlines' },
    { id: 'team', label: 'Team', icon: Users, description: 'For collaborating with teammates on projects' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">How will you use TaskMaster?</h2>
        <p className="text-muted-foreground">We'll customize your experience based on your preference</p>
      </div>

      <RadioGroup 
        value={userData.workPreference} 
        onValueChange={(value) => updateUserData('workPreference', value)}
        className="space-y-3"
      >
        {workOptions.map((option) => {
          const Icon = option.icon;
          return (
            <div key={option.id} className="flex items-start space-x-3">
              <RadioGroupItem 
                value={option.id} 
                id={option.id}
                className="mt-1"
              />
              <div className="grid gap-1.5">
                <Label 
                  htmlFor={option.id} 
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
    </div>
  );
};
