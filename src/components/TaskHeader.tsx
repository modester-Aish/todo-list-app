
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoonIcon, SunIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import TaskModal from './TaskModal';
import { useTodo } from '@/contexts/TodoContext';
import { v4 as uuidv4 } from 'uuid';

interface TaskHeaderProps {
  userName?: string;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ userName }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { dispatch } = useTodo();

  const handleAddTask = (task) => {
    dispatch({
      type: 'ADD_TASK',
      payload: {
        ...task,
        id: uuidv4(),
        completed: false,
        createdAt: new Date().toISOString()
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 relative">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4 md:mb-0"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
          {userName ? `Welcome back, ${userName}` : 'My Tasks'}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what's on your plate today
        </p>
      </motion.div>
      
      <div className="flex items-center gap-3">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-10 w-10 rounded-full"
          >
            {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </Button>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button onClick={() => setModalOpen(true)} className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </motion.div>
      </div>

      {modalOpen && (
        <TaskModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)}
          onSave={handleAddTask}
        />
      )}
    </div>
  );
};

export default TaskHeader;
