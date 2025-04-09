
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define types
export type Priority = 'high' | 'medium' | 'low';

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
  dueDate?: string;
  priority: Priority;
  projectId: string;
  tags: string[];
  createdAt: string;
}

interface TodoState {
  tasks: Task[];
  projects: Project[];
  tags: Tag[];
  activeProject: string;
  activeFilter: string;
  searchQuery: string;
}

type TodoAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'ADD_TAG'; payload: Tag }
  | { type: 'DELETE_TAG'; payload: string }
  | { type: 'SET_ACTIVE_PROJECT'; payload: string }
  | { type: 'SET_ACTIVE_FILTER'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string };

// Define initial state
const defaultProject: Project = {
  id: 'default',
  name: 'My Tasks',
  color: '#3b82f6',
};

const initialState: TodoState = {
  tasks: [],
  projects: [defaultProject],
  tags: [],
  activeProject: 'default',
  activeFilter: 'all',
  searchQuery: '',
};

// Load state from localStorage or use initialState
const loadState = (): TodoState => {
  try {
    const savedState = localStorage.getItem('todoState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
  }
  return initialState;
};

// Reducer function
const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id ? action.payload : project
        ),
      };
    case 'DELETE_PROJECT':
      // Don't allow deleting the default project
      if (action.payload === 'default') {
        return state;
      }
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload),
        // Move tasks from deleted project to default project
        tasks: state.tasks.map(task =>
          task.projectId === action.payload
            ? { ...task, projectId: 'default' }
            : task
        ),
        // If the active project is being deleted, switch to default
        activeProject: state.activeProject === action.payload ? 'default' : state.activeProject,
      };
    case 'ADD_TAG':
      return {
        ...state,
        tags: [...state.tags, action.payload],
      };
    case 'DELETE_TAG':
      return {
        ...state,
        tags: state.tags.filter(tag => tag.id !== action.payload),
        // Remove tag from all tasks
        tasks: state.tasks.map(task => ({
          ...task,
          tags: task.tags.filter(tagId => tagId !== action.payload),
        })),
      };
    case 'SET_ACTIVE_PROJECT':
      return {
        ...state,
        activeProject: action.payload,
      };
    case 'SET_ACTIVE_FILTER':
      return {
        ...state,
        activeFilter: action.payload,
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const TodoContext = createContext<{
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Create provider
export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, loadState());

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('todoState', JSON.stringify(state));
  }, [state]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// Create hook for consuming context
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};
