import { useEffect, useMemo, useState } from "react";


function TodoList() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const add = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setItems((xs) => [...xs, { id: Date.now(), text: t, done: false }]);
    setText("");
  };
  const toggle = (id) => setItems((xs) => xs.map(x => x.id === id ? { ...x, done: !x.done } : x));
  const remove = (id) => setItems((xs) => xs.filter(x => x.id !== id));

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
        <button className="btn">Add</button>
      </form>
      <ul className="todo">
        {items.map(it => (
          <li key={it.id}>
            <label>
              <input type="checkbox" checked={it.done} onChange={() => toggle(it.id)} />
              <span className={it.done ? "done" : ""}>{it.text}</span>
            </label>
            <button className="icon" onClick={() => remove(it.id)} title="Delete">✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;