

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

// 🔴 NOTE: no useState here.
// We just read `todos` and `onDelete` from props.
export default function EisenhowerMatrix({ todos, onDelete }) {
  // group todos by quad
  const byQuad = {
    IU: [],
    INU: [],
    NIU: [],
    NINU: [],
  };

  todos.forEach((t) => {
    const q = t.quad || "IU"; // default if missing
    if (byQuad[q]) byQuad[q].push(t);
  });

  return (
    <>
      <h1>Eisenhower Matrix</h1>

      <div className="matrix" style={styles.matrix}>
        {Object.entries(QUADRANTS).map(([key, label]) => (
          <div className="cell" key={key} style={styles.cell}>
            <h2>
              {PRIORITY_LABELS[key]} – {label}
            </h2>
            <ul style={styles.ul}>
              {byQuad[key].map((t) => (
                <li key={t.id} style={styles.li}>
                  {t.text}
                  <button
                    className="del"
                    onClick={() => onDelete(t.id)}
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
