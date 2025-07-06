import { createSlice, nanoid } from '@reduxjs/toolkit';
import { format } from 'date-fns';

const getInitialTasks = () => {
  const stored = localStorage.getItem('tasks');
  return stored ? JSON.parse(stored) : [];
};

const initialState = {
  tasks: getInitialTasks(),
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.tasks.push(action.payload);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      },
      prepare: (data) => {
        return {
          payload: {
            id: nanoid(),
            title: data.title,
            description: data.description,
            priority: data.priority,
            status: 'Open',
            assignee: data.assignee,
            createdAt: format(new Date(), 'yyyy-MM-dd'),
            timeSpent: 0,
            closureStatus: 'Not Requested',
          },
        };
      },
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    requestClosure: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.closureStatus = 'Pending Approval';
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    approveClosure: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task && task.closureStatus === 'Pending Approval') {
        task.status = 'Closed';
        task.closureStatus = 'Approved';
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    reopenTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task && task.closureStatus === 'Pending Approval') {
        task.status = 'Open';
        task.closureStatus = 'Reopened';
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    updateTimeSpent: (state, action) => {
      const { taskId, seconds } = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);
      if (task) {
        task.timeSpent += seconds;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },

  },
});

export const {
  addTask,
  deleteTask,
  updateTask,
  requestClosure,
  approveClosure,
  reopenTask,updateTimeSpent,
} = taskSlice.actions;

export default taskSlice.reducer;
