
import React, { useState } from 'react';
import { useTodo } from '@/contexts/TodoContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit2, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProjectList: React.FC = () => {
  const { state, dispatch } = useTodo();
  const { projects, tasks, activeProject } = state;
  const [newProjectName, setNewProjectName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddProject = () => {
    if (newProjectName.trim()) {
      const newProject = {
        id: Date.now().toString(),
        name: newProjectName.trim(),
        color: getRandomColor(),
      };
      dispatch({ type: 'ADD_PROJECT', payload: newProject });
      setNewProjectName('');
      setIsAdding(false);
    }
  };

  const getRandomColor = () => {
    const colors = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getTaskCount = (projectId: string) => {
    return tasks.filter(task => task.projectId === projectId).length;
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Projects</h2>
        {!isAdding && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsAdding(true)} 
            className="h-8 w-8 p-0"
          >
            <Plus size={16} />
          </Button>
        )}
      </div>
      
      {isAdding && (
        <div className="flex items-center gap-2 mb-2 animate-slide-from-top">
          <Input
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Project name"
            className="h-8 text-sm"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddProject();
              if (e.key === 'Escape') setIsAdding(false);
            }}
          />
          <Button size="sm" onClick={handleAddProject} className="h-8">Add</Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsAdding(false)} 
            className="h-8"
          >
            Cancel
          </Button>
        </div>
      )}
      
      <div className="space-y-1">
        <Button
          variant={activeProject === 'all' ? "secondary" : "ghost"}
          className="w-full justify-start h-10 px-2"
          onClick={() => dispatch({ type: 'SET_ACTIVE_PROJECT', payload: 'all' })}
        >
          <span className="w-3 h-3 rounded-full bg-gray-400 mr-2"></span>
          All Tasks
          <span className="ml-2 text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </Button>
        
        {projects.map(project => (
          <Button
            key={project.id}
            variant={activeProject === project.id ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start h-10 px-2 group",
              activeProject === project.id ? "bg-secondary" : "hover:bg-secondary/50"
            )}
            onClick={() => dispatch({ type: 'SET_ACTIVE_PROJECT', payload: project.id })}
          >
            <span 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: project.color }}
            ></span>
            <span className="truncate">{project.name}</span>
            <span className="ml-2 text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full">
              {getTaskCount(project.id)}
            </span>
            
            {project.id !== 'default' && activeProject === project.id && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Are you sure you want to delete this project?')) {
                    dispatch({ type: 'DELETE_PROJECT', payload: project.id });
                  }
                }}
              >
                <Trash size={12} className="text-destructive" />
              </Button>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
