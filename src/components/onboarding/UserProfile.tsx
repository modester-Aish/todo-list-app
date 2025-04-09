
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserRound, Mail } from 'lucide-react';

interface UserProfileProps {
  userData: {
    name: string;
    email: string;
  };
  updateUserData: (field: string, value: string) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userData, updateUserData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Welcome to TaskMaster</h2>
        <p className="text-muted-foreground">Let's get to know you better</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base flex items-center gap-2">
            <UserRound className="h-4 w-4" />
            Name
          </Label>
          <Input 
            id="name"
            type="text"
            value={userData.name}
            onChange={(e) => updateUserData('name', e.target.value)}
            placeholder="Enter your name"
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-base flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </Label>
          <Input 
            id="email"
            type="email"
            value={userData.email}
            onChange={(e) => updateUserData('email', e.target.value)}
            placeholder="Enter your email"
            className="h-12"
          />
        </div>
      </div>
    </div>
  );
};
