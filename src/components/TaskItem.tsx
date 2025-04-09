
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Check, Edit, Trash, Calendar } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Task, useTodo } from '@/contexts/TodoContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import TaskModal from './TaskModal';
import { motion } from 'framer-motion';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { dispatch } = useTodo();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleToggleComplete = () => {
    dispatch({ type: 'TOGGLE_TASK', payload: task.id });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', payload: task.id });
  };

  const handleUpdateTask = (updatedTask) => {
    dispatch({ 
      type: 'UPDATE_TASK', 
      payload: { ...task, ...updatedTask }
    });
  };

  const priorityColors = {
    high: 'from-red-500 to-red-400',
    medium: 'from-amber-500 to-amber-400',
    low: 'from-blue-500 to-blue-400',
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "task-card", 
          { "opacity-70": task.completed }
        )}
      >
        <div className={`priority-indicator bg-gradient-to-b ${priorityColors[task.priority]}`} />
        <div className="flex items-start gap-2 pl-2">
          <Checkbox 
            checked={task.completed}
            onCheckedChange={handleToggleComplete}
            className="mt-1"
          />
          
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "font-medium text-gray-900 dark:text-gray-100 break-words", 
              { "line-through text-gray-500 dark:text-gray-400": task.completed }
            )}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 break-words">
                {task.description}
              </p>
            )}
            
            {task.dueDate && (
              <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                <Calendar size={14} className="mr-1" />
                {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </div>
            )}
          </div>
          
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={() => setEditModalOpen(true)} className="h-8 w-8">
              <Edit size={16} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDelete} className="h-8 w-8 text-destructive">
              <Trash size={16} />
            </Button>
          </div>
        </div>
      </motion.div>
      
      {editModalOpen && (
        <TaskModal 
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          existingTask={task}
          onSave={handleUpdateTask}
        />
      )}
    </>
  );
};

export default TaskItem;
