
import React, { useState } from 'react';
import { useTodo } from '@/contexts/TodoContext';
import ProjectList from './ProjectList';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon, Calendar, CheckSquare, Clock, Filter, ChevronLeft, ChevronRight, Settings, User } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const Sidebar: React.FC = () => {
  const { state, dispatch } = useTodo();
  const { activeFilter } = state;
  const { theme, setTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  
  // Get user info
  const userProfile = localStorage.getItem('userProfile') || '{}';
  const userData = JSON.parse(userProfile);
  const userInitials = userData.name ? userData.name.substring(0, 2).toUpperCase() : 'U';

  const filters = [
    { id: 'all', name: 'All Tasks', icon: Filter },
    { id: 'active', name: 'Active', icon: Clock },
    { id: 'completed', name: 'Completed', icon: CheckSquare },
  ];

  return (
    <>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div 
            key="sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0, overflow: 'hidden' }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-r p-4 flex flex-col relative z-20"
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">TaskMaster</h1>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setCollapsed(true)}
                className="h-8 w-8"
              >
                <ChevronLeft size={16} />
              </Button>
            </div>
            
            <div className="flex items-center p-2 mb-6 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground">{userInitials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userData.name || 'User'}</p>
                <p className="text-xs text-muted-foreground truncate">{userData.email || 'user@example.com'}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2 px-1.5">Views</h2>
              <div className="space-y-1">
                {filters.map(filter => (
                  <motion.div 
                    key={filter.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={activeFilter === filter.id ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => dispatch({ type: 'SET_ACTIVE_FILTER', payload: filter.id })}
                    >
                      <filter.icon size={16} className="mr-2" />
                      {filter.name}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex-1 overflow-auto">
              <ProjectList />
            </div>
            
            <div className="mt-auto pt-4 space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <SunIcon size={16} className="mr-2" /> : <MoonIcon size={16} className="mr-2" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <Settings size={16} className="mr-2" />
                Settings
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <User size={16} className="mr-2" />
                Profile
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {collapsed && (
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 56, opacity: 1 }}
          className="h-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-r p-2 flex flex-col items-center"
        >
          <div className="py-4 flex justify-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setCollapsed(false)}
              className="h-8 w-8"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
          
          <div className="flex flex-col items-center space-y-4 mt-4">
            {filters.map(filter => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "secondary" : "ghost"}
                size="icon"
                className="h-10 w-10"
                onClick={() => dispatch({ type: 'SET_ACTIVE_FILTER', payload: filter.id })}
              >
                <filter.icon size={18} />
              </Button>
            ))}
          </div>
          
          <div className="mt-auto pb-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 mb-2"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Sidebar;
