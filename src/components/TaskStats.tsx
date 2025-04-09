
import React, { useMemo } from 'react';
import { useTodo } from '@/contexts/TodoContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, AlertTriangle, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskStats: React.FC = () => {
  const { state } = useTodo();
  const { tasks } = state;

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const highPriority = tasks.filter(task => task.priority === 'high' && !task.completed).length;
    
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return {
      total,
      completed,
      pending,
      highPriority,
      completionRate
    };
  }, [tasks]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      <motion.div variants={item}>
        <StatCard 
          title="Total Tasks" 
          value={stats.total.toString()} 
          icon={BarChart} 
          description="All your tasks"
          className="bg-primary/5 border-primary/10"
        />
      </motion.div>
      
      <motion.div variants={item}>
        <StatCard 
          title="Completed" 
          value={stats.completed.toString()} 
          icon={CheckCircle} 
          description={`${stats.completionRate}% completion rate`}
          className="bg-green-500/5 border-green-500/10"
        />
      </motion.div>
      
      <motion.div variants={item}>
        <StatCard 
          title="Pending" 
          value={stats.pending.toString()} 
          icon={Clock} 
          description="Tasks to be completed"
          className="bg-blue-500/5 border-blue-500/10"
        />
      </motion.div>
      
      <motion.div variants={item}>
        <StatCard 
          title="High Priority" 
          value={stats.highPriority.toString()} 
          icon={AlertTriangle} 
          description="Needs immediate attention"
          className="bg-rose-500/5 border-rose-500/10"
        />
      </motion.div>
    </motion.div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.FC<unknown>;
  description: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, description, className }) => {
  return (
    <Card className={`border ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default TaskStats;
