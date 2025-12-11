import { useEffect, useMemo, useState } from "react";


export default function TodoList({ items, onAdd, onToggle, onRemove }) {
   const [text, setText] = useState("");
   const [quad, setQuad] = useState("IU");


  const add = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    onAdd({ text: t, quad });
    setText("");
  };

  return (
    <div className="card">
      <h3>Todo</h3>
      <form onSubmit={add} className="row gap">
        <input
          className="task-input"
          placeholder="Add a task…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select
          className="task-input"
          value={quad}
          onChange={(e) => setQuad(e.target.value)}
        >
          <option value="IU">P1 – Important + Urgent</option>
          <option value="INU">P2 – Important + Not Urgent</option>
          <option value="NIU">P3 – Not Important + Urgent</option>
          <option value="NINU">P4 – Not Important + Not Urgent</option>
        </select>

        <button className="btn btn-primary">Add</button>
      </form>
      <ul className="todo">
        {items.map((it) => (
          <li key={it.id}>
            <label>
              <input
                type="checkbox"
                checked={it.done}
                onChange={() => onToggle(it.id)}
              />
              <span className={it.done ? "done" : ""}>{it.text}</span>
            </label>
            <button className="icon" onClick={() => onRemove(it.id)} title="Delete">
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
