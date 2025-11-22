import { useState } from "react";

const DEFAULT_CATEGORIES = ["Productive", "Exercise", "Social", "Screen / Waste"];

export default function TimeTracker() {
  const [activity, setActivity] = useState("");
  const [minutes, setMinutes] = useState("");
  const [category, setCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [entries, setEntries] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();
    const name = activity.trim();
    const mins = Number(minutes);
    if (!name || !mins || mins <= 0) return;

    setEntries((prev) => [
      ...prev,
      { id: Date.now(), activity: name, minutes: mins, category },
    ]);
    setActivity("");
    setMinutes("");
  };

  const handleDelete = (id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  // totals by category
  const totals = entries.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.minutes;
    return acc;
  }, {});

  return (
    <div className="card">
      <h3>Time Tracker</h3>

      {/* Add entry */}
      <form onSubmit={handleAdd} className="row gap">
        <input
          className="task-input"
          placeholder="e.g. Dancing, Social Media..."
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        <input
          type="number"
          min="1"
          className="task-input"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {DEFAULT_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button className="btn">Add</button>
      </form>

      {/* Summary */}
      <div style={{ marginTop: "0.75rem" }}>
        <h4>Summary</h4>
        {Object.keys(totals).length === 0 && (
          <p className="muted">No time logged yet.</p>
        )}
        {Object.entries(totals).map(([cat, mins]) => (
          <div key={cat}>
            {cat}: <strong>{mins} min</strong>
          </div>
        ))}
      </div>

      {/* Entries list */}
      <ul className="todo" style={{ marginTop: "0.75rem" }}>
        {entries.map((e) => (
          <li key={e.id}>
            <div>
              <div>{e.activity}</div>
              <div className="muted">
                {e.category} • {e.minutes} min
              </div>
            </div>
            <button className="icon" onClick={() => handleDelete(e.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
