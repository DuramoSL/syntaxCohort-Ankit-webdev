import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  // Fetch tasks on load
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  // Add new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!title) return;

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setTitle('');
  };

  // Toggle completion
  const toggleTask = async (id, completed) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    });
    const updated = await res.json();
    setTasks(tasks.map((t) => (t._id === id ? updated : t)));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>Full-Stack Task Tracker</h1>
      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li
            key={task._id}
            onClick={() => toggleTask(task._id, task.completed)}
            style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
          >
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}