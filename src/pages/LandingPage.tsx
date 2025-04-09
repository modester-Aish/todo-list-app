
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Sparkles, Shield, Zap, Clock } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
          >
            TaskMaster
          </motion.div>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full px-3"
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </Button>
          <Button 
            size="sm" 
            className="rounded-full"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-primary">TaskMaster</span> for your daily productivity
            </h1>
            <p className="text-lg text-muted-foreground">
              A beautiful and intuitive task management app that helps you organize your work and life.
            </p>
            
            <div className="space-y-4">
              <FeatureItem text="Create and organize tasks effortlessly" icon={Sparkles} />
              <FeatureItem text="Track your progress with beautiful visuals" icon={Zap} />
              <FeatureItem text="Customize with themes and workspaces" icon={Shield} />
              <FeatureItem text="Stay focused with priority-based views" icon={Clock} />
            </div>
            
            <motion.div 
              className="mt-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                onClick={handleGetStarted} 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500"
              >
                Get Started
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.div>
              </Button>
            </motion.div>
            
            <div className="mt-8 flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-background bg-primary/80 flex items-center justify-center text-xs text-white font-medium`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Join <span className="font-medium text-foreground">10,000+</span> users organizing their tasks
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl blur-3xl opacity-30"></div>
            <div className="relative bg-card p-6 rounded-xl border border-border/50 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <div className="flex-1" />
                </div>
                
                <div className="space-y-3">
                  <div className="h-10 bg-muted rounded flex items-center px-4">
                    <span className="text-sm font-medium">My Tasks</span>
                  </div>
                  
                  <TaskPreview 
                    title="Complete project proposal" 
                    completed={true}
                    priority="high"
                  />
                  
                  <TaskPreview 
                    title="Research new technologies" 
                    completed={false}
                    priority="medium"
                  />
                  
                  <TaskPreview 
                    title="Team meeting preparation" 
                    completed={false}
                    priority="high"
                  />
                  
                  <TaskPreview 
                    title="Update portfolio website" 
                    completed={false}
                    priority="low"
                  />
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-primary/10 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-primary/20">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Your productivity</div>
                  <div className="text-sm font-medium">Up by 32% this week!</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose TaskMaster?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            TaskMaster combines powerful features with a beautiful interface to help you achieve more every day.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            title="Smart Prioritization" 
            description="Automatically sorts your tasks based on due dates, priorities, and task relationships."
            icon={Zap}
          />
          <FeatureCard 
            title="Beautiful Interface" 
            description="Enjoy a clean, customizable interface that makes task management a pleasure."
            icon={Sparkles}
          />
          <FeatureCard 
            title="Effortless Organization" 
            description="Group tasks into projects, add tags, and filter to find exactly what you need."
            icon={CheckCircle}
          />
        </div>
      </motion.div>
    </div>
  );
};

// Helper Components
const FeatureItem = ({ text, icon: Icon }: { text: string; icon: React.FC<any> }) => (
  <div className="flex items-center gap-2">
    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
      <Icon className="h-4 w-4 text-primary" />
    </div>
    <span>{text}</span>
  </div>
);

const TaskPreview = ({ 
  title, 
  completed, 
  priority 
}: { 
  title: string; 
  completed: boolean; 
  priority: 'low' | 'medium' | 'high';
}) => {
  const priorityColors = {
    low: 'bg-blue-500',
    medium: 'bg-amber-500',
    high: 'bg-rose-500'
  };
  
  return (
    <div className="relative flex items-center p-3 bg-background rounded-md border border-border/50 shadow-sm">
      <div className={`absolute top-0 left-0 h-full w-1.5 rounded-l-md ${priorityColors[priority]}`} />
      <div className="pl-2 flex items-center">
        <div className={`h-5 w-5 rounded-full border ${completed ? 'bg-primary border-primary' : 'border-muted-foreground'} flex items-center justify-center`}>
          {completed && <CheckCircle className="h-4 w-4 text-primary-foreground" />}
        </div>
        <span className={`ml-3 ${completed ? 'line-through text-muted-foreground' : ''}`}>
          {title}
        </span>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon: Icon }: { title: string; description: string; icon: React.FC<any> }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-card p-6 rounded-xl border border-border shadow-sm"
  >
    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

export default LandingPage;
