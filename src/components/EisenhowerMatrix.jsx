import { useState } from "react";

const QUADRANTS = {
  IU: "Important + Urgent",
  INU: "Important + Not Urgent",
  NIU: "Not Important + Urgent",
  NINU: "Not Important + Not Urgent",
};

const PRIORITY_LABELS = {
  IU: "P1",
  INU: "P2",
  NIU: "P3",
  NINU: "P4",
};

export default function EisenhowerMatrix() {
  const [tasks, setTasks] = useState({
    IU: [],
    INU: [],
    NIU: [],
    NINU: [],
  });

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

  const handleDelete = (q, id) => {
    setTasks((prev) => ({
      ...prev,
      [q]: prev[q].filter((t) => t.id !== id),
    }));
  };

  return (
    <>
      <h1>Eisenhower Matrix</h1>

      {/* Input Form */}
      <form onSubmit={handleAdd} className="task-form" style={styles.form}> 
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Finish homework"
          style={styles.input}                                             
        />
        <select
          value={quad}
          onChange={(e) => setQuad(e.target.value)}
          style={styles.input}                                             
        >
          {Object.entries(QUADRANTS).map(([key, label]) => (
            <option key={key} value={key}>
              {PRIORITY_LABELS[key]} – {label}
            </option>
          ))}
        </select>
        <button type="submit" style={styles.button}>Add</button>           
      </form>

      {/* Matrix */}
      <div className="matrix" style={styles.matrix}>                       
        {Object.entries(QUADRANTS).map(([key, label]) => (
          <div className="cell" key={key} style={styles.cell}>            
            <h2>
              {PRIORITY_LABELS[key]} – {label}
            </h2>
            <ul style={styles.ul}>                                        
              {tasks[key].map((t) => (
                <li key={t.id} style={styles.li}>                         
                  {t.title}
                  <button
                    className="del"
                    onClick={() => handleDelete(key, t.id)}
                    style={styles.del}                                    
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

// your styles object stays exactly as you wrote it
const styles = {
  matrix: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "1rem",
    marginTop: "1.5rem",
  },
  cell: {
    border: "1px solid #1f2937",
    background: "#0b1221",
    borderRadius: "0.75rem",
    padding: "1rem",
    minHeight: "160px",
  },
  form: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  input: {
    padding: "0.4rem 0.6rem",
    borderRadius: "0.4rem",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "#e2e8f0",
  },
  button: {
    padding: "0.4rem 0.6rem",
    borderRadius: "0.4rem",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },
  ul: {
    listStyle: "disc",
    paddingLeft: "1.25rem",
    margin: 0,
  },
  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0.25rem 0",
  },
  del: {
    background: "none",
    border: "none",
    color: "#ef4444",
    cursor: "pointer",
    fontSize: "1rem",
  },
};
