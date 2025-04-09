
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface OnboardingCompleteProps {
  userData: {
    name: string;
  };
}

export const OnboardingComplete: React.FC<OnboardingCompleteProps> = ({ userData }) => {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="rounded-full bg-primary/10 p-3">
          <CheckCircle className="h-10 w-10 text-primary" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">You're all set, {userData.name}!</h2>
        <p className="text-muted-foreground">
          Your TaskMaster account has been created. You're ready to start organizing your tasks and boosting your productivity.
        </p>
      </div>

      <div className="p-4 mt-4 rounded-md bg-muted">
        <h3 className="font-medium mb-2">What's next?</h3>
        <ul className="text-sm text-left space-y-2">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Create your first task
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Organize tasks into projects
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            Set priorities and due dates
          </li>
        </ul>
      </div>
    </div>
  );
};
