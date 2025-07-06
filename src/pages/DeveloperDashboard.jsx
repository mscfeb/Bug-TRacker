import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  requestClosure,
  updateTimeSpent,
} from "../features/tasks/taskSlice";
import Timer from "../components/Timer";

const DeveloperDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const tasks = useSelector((state) =>
    state.tasks.tasks.filter((t) => t.assignee === user.username)
  );

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTask({
        ...form,
        assignee: user.username,
      })
    );
    setForm({ title: "", description: "", priority: "Medium" });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Developer Dashboard</h1>

      {/* Task Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Add Task</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="border p-2 w-full mb-2 rounded"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.length === 0 && <p>No tasks yet.</p>}
        {tasks.map((task) => (
          <div key={task.id} className="bg-white shadow p-4 rounded">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              Priority: {task.priority}
            </p>
            <p className="text-sm text-gray-500">Status: {task.status}</p>
            <p className="text-sm text-gray-500">
              Closure Status: {task.closureStatus}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="text-sm px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
              <button
                onClick={() => dispatch(requestClosure(task.id))}
                disabled={task.closureStatus !== "Not Requested"}
                className={`text-sm px-2 py-1 ${
                  task.closureStatus === "Not Requested"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-gray-300 cursor-not-allowed"
                } text-white rounded`}
              >
                Request Closure
              </button>
              <Timer
                taskId={task.id}
                timeSpent={task.timeSpent}
                onTimeUpdate={(id, seconds) =>
                  dispatch(updateTimeSpent({ taskId: id, seconds }))
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperDashboard;
