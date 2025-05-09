import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/components/onboarding/UserProfile';
import { WorkPreference } from '@/components/onboarding/WorkPreference';
import { ThemeSelect } from '@/components/onboarding/ThemeSelect';
import { OnboardingComplete } from '@/components/onboarding/OnboardingComplete';
import { toast } from "@/components/ui/use-toast";

// Define onboarding steps
const STEPS = ['profile', 'work', 'theme', 'complete'];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    workPreference: '',
    theme: ''
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      // Save user data to localStorage and redirect to main app
      localStorage.setItem('userProfile', JSON.stringify(userData));
      // Dispatch storage event to notify other components
      window.dispatchEvent(new Event('storage'));
      toast({
        title: "Onboarding completed!",
        description: "Welcome to TaskMaster. Let's get productive!",
      });
      navigate('/home');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const updateUserData = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const renderStep = () => {
    switch (STEPS[step]) {
      case 'profile':
        return <UserProfile 
          userData={userData} 
          updateUserData={updateUserData} 
        />;
      case 'work':
        return <WorkPreference 
          userData={userData}
          updateUserData={updateUserData}
        />;
      case 'theme':
        return <ThemeSelect
          userData={userData}
          updateUserData={updateUserData}
        />;
      case 'complete':
        return <OnboardingComplete userData={userData} />;
      default:
        return <UserProfile 
          userData={userData}
          updateUserData={updateUserData}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">TaskMaster</h1>
          <p className="text-muted-foreground">
            Step {step + 1} of {STEPS.length}
          </p>
          
          <div className="flex justify-center mt-4 space-x-1">
            {STEPS.map((_, index) => (
              <div 
                key={index} 
                className={`h-1 w-16 rounded-full ${index <= step ? 'bg-primary' : 'bg-muted'}`} 
              />
            ))}
          </div>
        </div>
        
        <div className="bg-card p-8 rounded-lg shadow-lg animate-fade-in">
          {renderStep()}
          
          <div className="flex justify-between mt-8">
            {step > 0 && (
              <Button 
                variant="outline" 
                onClick={handleBack}
              >
                Back
              </Button>
            )}
            <div className={step === 0 ? 'w-full flex justify-end' : ''}>
              <Button 
                onClick={handleNext}
                disabled={
                  (STEPS[step] === 'profile' && (!userData.name || !userData.email)) ||
                  (STEPS[step] === 'work' && !userData.workPreference)
                }
                className={step === 0 ? 'ml-auto' : ''}
              >
                {step < STEPS.length - 1 ? 'Continue' : 'Get Started'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
