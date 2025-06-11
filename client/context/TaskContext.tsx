import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Task {
  id: string;
  type: 'plant-maintenance' | 'tool-maintenance' | 'fertigation' | 'irrigation' | 'pesticide' | 'herbicide' | 'plantation';
  date: string;
  field: string;
  notes: string;
  // Type-specific fields
  equipment?: string;
  issue?: string;
  parts?: string;
  timeSpent?: string;
  fertilizerName?: string;
  quantity?: string;
  duration?: string;
  crop?: string;
  method?: string;
  area?: string;
  waterSource?: string;
  chemical?: string;
  chemicalType?: string;
  plantName?: string;
  variety?: string;
  number?: string;
  herbicideName?: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  getTodaysTasks: () => Task[];
  getTasksByDate: (date: string) => Task[];
  getTasksByType: (type: Task['type']) => Task[];
  isLoading: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TASKS_STORAGE_KEY = '@farm_tasks';

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      if (storedTasks) {
        const parsed = JSON.parse(storedTasks);
        console.log('Loaded tasks from AsyncStorage:', parsed);
        setTasks(parsed);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTasks = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const getTodaysTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => task.date === today);
  };

  const getTasksByDate = (date: string) => {
    return tasks.filter(task => task.date === date);
  };

  const getTasksByType = (type: Task['type']) => {
    return tasks.filter(task => task.type === type);
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      getTodaysTasks,
      getTasksByDate,
      getTasksByType,
      isLoading,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}