import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  approveClosure,
  reopenTask,
} from '../features/tasks/taskSlice';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const ManagerDashboard = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.tasks.tasks);

  // Filters & sorting
  const [filters, setFilters] = useState({
    status: 'All',
    priority: 'All',
    assignee: 'All',
  });
  const [sortBy, setSortBy] = useState('createdAt');

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredTasks = allTasks
    .filter((task) => {
      return (
        (filters.status === 'All' || task.status === filters.status) &&
        (filters.priority === 'All' || task.priority === filters.priority) &&
        (filters.assignee === 'All' || task.assignee === filters.assignee)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'createdAt') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === 'priority') {
        const levels = { High: 3, Medium: 2, Low: 1 };
        return levels[b.priority] - levels[a.priority];
      }
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

  const pendingTasks = allTasks.filter(
    (task) => task.closureStatus === 'Pending Approval'
  );

  const taskTrendData = Object.values(
    allTasks.reduce((acc, task) => {
      acc[task.createdAt] = acc[task.createdAt] || {
        date: task.createdAt,
        tasks: 0,
      };
      acc[task.createdAt].tasks += 1;
      return acc;
    }, {})
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manager Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-bold text-green-600">
            {allTasks.filter((t) => t.status === 'Open').length}
          </h2>
          <p className="text-gray-600">Open Tasks</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-bold text-blue-600">
            {allTasks.filter((t) => t.status === 'Closed').length}
          </h2>
          <p className="text-gray-600">Closed Tasks</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-bold text-yellow-500">
            {pendingTasks.length}
          </h2>
          <p className="text-gray-600">Pending Approvals</p>
        </div>
      </div>

      {/* Task Trend Chart */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Task Creation Trend</h2>
        {taskTrendData.length === 0 ? (
          <p>No task data available for chart.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={taskTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="tasks"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="All">All Statuses</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          name="priority"
          value={filters.priority}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          name="assignee"
          value={filters.assignee}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="All">All Assignees</option>
          {[...new Set(allTasks.map((t) => t.assignee))].map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={handleSortChange}
          className="border p-2 rounded"
        >
          <option value="createdAt">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {/* Task List with Approval Controls */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Filtered Task List</h2>
        {filteredTasks.length === 0 && <p>No tasks match your filter.</p>}

        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="border p-4 rounded">
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">Assignee: {task.assignee}</p>
              <p className="text-sm text-gray-500">Priority: {task.priority}</p>
              <p className="text-sm text-gray-500">Status: {task.status}</p>
              <p className="text-sm text-gray-500">Closure: {task.closureStatus}</p>

              {task.closureStatus === 'Pending Approval' && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => dispatch(approveClosure(task.id))}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => dispatch(reopenTask(task.id))}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Reopen
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
