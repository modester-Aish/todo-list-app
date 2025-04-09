
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TodoProvider } from '@/contexts/TodoContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Sidebar from '@/components/Sidebar';
import TaskHeader from '@/components/TaskHeader';
import TaskList from '@/components/TaskList';
import TaskStats from '@/components/TaskStats';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const Index = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has completed onboarding
    const userProfile = localStorage.getItem('userProfile');
    if (!userProfile) {
      navigate('/onboarding');
      return;
    }

    try {
      const userData = JSON.parse(userProfile);
      setUserName(userData.name);
    } catch (error) {
      console.error('Error parsing user profile:', error);
    }
  }, [navigate]);

  return (
    <ThemeProvider>
      <TodoProvider>
        <div className="flex h-screen overflow-hidden bg-background">
          <Sidebar />
          
          <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-1 overflow-auto"
          >
            <div className="p-6 max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <Link to="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                  <Home className="h-4 w-4 mr-1" />
                  Landing Page
                </Link>
              </div>
              <TaskHeader userName={userName} />
              <TaskStats />
              <TaskList />
            </div>
          </motion.main>
        </div>
      </TodoProvider>
    </ThemeProvider>
  );
};

export default Index;
