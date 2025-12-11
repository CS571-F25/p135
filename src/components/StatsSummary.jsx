export default function StatsSummary({ entries }) {
  const total = entries.reduce((sum, e) => sum + e.minutes, 0);
  return (
    <div className="card">
      <h2>Weekly Snapshot</h2>
      <p className="muted">Total logged minutes: {total}</p>
    </div>
  );
}