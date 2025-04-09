
import React, { useMemo } from 'react';
import { useTodo } from '@/contexts/TodoContext';
import TaskItem from './TaskItem';
import { motion, AnimatePresence } from 'framer-motion';

const TaskList: React.FC = () => {
  const { state } = useTodo();
  const { tasks, activeProject, activeFilter, searchQuery } = state;

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        // Filter by project
        if (activeProject !== 'all') {
          if (task.projectId !== activeProject) return false;
        }
        
        // Filter by status
        if (activeFilter === 'completed' && !task.completed) return false;
        if (activeFilter === 'active' && task.completed) return false;
        
        // Filter by search
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return task.title.toLowerCase().includes(query) || 
                 (task.description?.toLowerCase().includes(query) || false);
        }
        
        return true;
      })
      .sort((a, b) => {
        // Sort by completion status (incomplete first)
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        
        // Sort by due date if both have due dates
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        
        // Tasks with due dates come before tasks without due dates
        if (a.dueDate && !b.dueDate) return -1;
        if (!a.dueDate && b.dueDate) return 1;
        
        // Sort by priority
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        if (a.priority !== b.priority) {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        
        // Finally, sort by creation date (newest first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [tasks, activeProject, activeFilter, searchQuery]);

  if (filteredTasks.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center p-8 text-center"
      >
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No tasks found</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          {searchQuery 
            ? "No tasks match your search. Try a different search term."
            : "Get started by adding a new task!"}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      <AnimatePresence>
        {filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;
