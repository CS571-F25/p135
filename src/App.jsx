import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const QUADRANTS = {
  IU: "Important + Urgent",
  INU: "Important + Not Urgent",
  NIU: "Not Important + Urgent",
  NINU: "Not Important + Not Urgent",
};


function App() {
    const [tasks, setTasks] = useState({
    IU: [],
    INU: [],
    NIU: [],
    NINU: [],});

  const [title, setTitle] = useState("");
  const [quad, setQuad] = useState("IU");

  const handleAdd = (e) => {
  e.preventDefault();
  const trimmed = title.trim();
  if (!trimmed) return;
  setTasks((prev) => ({
    ...prev,
    [quad]: [...prev[quad], { id: Date.now(), title: trimmed }],
  }));
  setTitle("");
  };

  return (
  <div className="app">
      <h1>Eisenhower Matrix (PoC)</h1>
      <form onSubmit={handleAdd} className="task-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. finish homework"
        />
        <select value={quad} onChange={(e) => setQuad(e.target.value)}>
          <option value="IU">Important + Urgent</option>
          <option value="INU">Important + Not Urgent</option>
          <option value="NIU">Not Important + Urgent</option>
          <option value="NINU">Not Important + Not Urgent</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <div className="matrix">
        <div className="cell">
          <h2>{QUADRANTS.IU}</h2>
          <ul>
            {tasks.IU.map((t) => (
              <li key={t.id}>{t.title}</li>
            ))}
          </ul>
        </div>
        <div className="cell">
          <h2>{QUADRANTS.INU}</h2>
          <ul>
            {tasks.INU.map((t) => (
              <li key={t.id}>{t.title}</li>
            ))}
          </ul>
        </div>
        <div className="cell">
          <h2>{QUADRANTS.NIU}</h2>
          <ul>
            {tasks.NIU.map((t) => (
              <li key={t.id}>{t.title}</li>
            ))}
          </ul>
        </div>
        <div className="cell">
          <h2>{QUADRANTS.NINU}</h2>
          <ul>
            {tasks.NINU.map((t) => (
              <li key={t.id}>{t.title}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="hint">
        Next step: when user adds an IU task, show “you unlocked a low-priority task”.
      </p>
    </div>
  )
}

export default App
