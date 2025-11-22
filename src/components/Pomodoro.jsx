import { useEffect, useMemo, useState } from "react";



function Pomodoro({ onFocusComplete, habits }) {
  const [phase, setPhase] = useState("idle"); // idle | focus | break
  const [focusLen, setFocusLen] = useState(25); // minutes
  const [remaining, setRemaining] = useState(0); // ms
  const [endAt, setEndAt] = useState(null);
  const [activeHabit, setActiveHabit] = useState(habits[0] || "Study");

  // tick
  useEffect(() => {
    if (phase === "idle" || !endAt) return;
    const id = setInterval(() => {
      const rem = Math.max(0, endAt - Date.now());
      setRemaining(rem);
      if (rem <= 0) {
        clearInterval(id);
        if (phase === "focus") {
          onFocusComplete(activeHabit, focusLen); // credit minutes to habit
          // auto start 5-min break
          setPhase("break");
          setEndAt(Date.now() + 5 * 60 * 1000);
          setRemaining(5 * 60 * 1000);
        } else if (phase === "break") {
          setPhase("idle");
          setEndAt(null);
          setRemaining(0);
        }
      }
    }, 250);
    return () => clearInterval(id);
  }, [phase, endAt, focusLen, activeHabit, onFocusComplete]);

  const mmss = useMemo(() => {
    const s = Math.round(remaining / 1000);
    const m = Math.floor(s / 60);
    const ss = String(s % 60).padStart(2, "0");
    return `${m}:${ss}`;
  }, [remaining]);

  const startFocus = () => {
    const ms = focusLen * 60 * 1000;
    setPhase("focus");
    setEndAt(Date.now() + ms);
    setRemaining(ms);
  };

  const stop = () => {
    setPhase("idle");
    setEndAt(null);
    setRemaining(0);
  };

  return (
    <div className="card">
      <h3>Pomodoro</h3>
      <div className="row">
        <label>Focus length (min)</label>
        <input
          type="number"
          min={10}
          max={60}
          value={focusLen}
          onChange={(e) => setFocusLen(Math.max(10, Math.min(60, Number(e.target.value || 25))))}
        />
      </div>
      <div className="row">
        <label>Habit</label>
        <select value={activeHabit} onChange={(e) => setActiveHabit(e.target.value)}>
          {habits.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
      </div>

      <div className={`timer ${phase}`}>
        <div className="big">{phase === "idle" ? `${focusLen}:00` : mmss}</div>
        <div className="sub">
          {phase === "idle" ? "Ready" : phase === "focus" ? "Focus" : "Break (5m)"}
        </div>
      </div>

      <div className="row gap">
        {phase === "idle" ? (
          <button onClick={startFocus} className="btn">Start Focus</button>
        ) : (
          <button onClick={stop} className="btn">Stop</button>
        )}
      </div>
      <p className="muted">Auto-runs a 5-minute break after focus completes.</p>
    </div>
  );
}

export default Pomodoro;
