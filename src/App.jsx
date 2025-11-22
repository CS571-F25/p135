import { useEffect, useMemo, useState } from "react";
import { FaHome, FaCheck, FaClock } from "react-icons/fa";  // ⬅️ add FaClock
import TimeTrackerScreen from "./Screens/TimeTrackerScreen"; // ⬅️ new import
import { Routes, Route, NavLink } from "react-router-dom";


import HabitTracker, { DEFAULT_HABITS } from "./components/HabitTracker";
import MatrixTodoScreen from "./Screens/MatrixTodoScreen";
import Pomodoro from "./components/Pomodoro";
import TodoList from "./components/TodoList";



function HomeScreen({ habitTotals, handleFocusComplete }) {
  return (
    <>
    <header className="header">
          <h2>Dashboard</h2>
          <p className="muted">Top bar shows time spent by habit today</p>
          <HabitTracker totals={habitTotals} />
        </header>

        <main className="main">
          <div className="left">
            <Pomodoro
              habits={Object.keys(habitTotals)}
              onFocusComplete={handleFocusComplete}
            />
          </div>
          <div className="right">
            <TodoList />
          </div>
        </main>
      </>
  );
}

export default function App() {
  const [habitTotals, setHabitTotals] = useState(
    Object.fromEntries(DEFAULT_HABITS.map((h) => [h, 0]))
  );

  const handleFocusComplete = (habit, minutes) => {
    setHabitTotals((t) => ({ ...t, [habit]: (t[habit] || 0) + minutes }));
  };

  return (
    <div className="layout">
      {/* Sidebar is always visible */}
      <aside className="sidebar">
        {/* Home */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            "toolIcon" + (isActive ? " active" : "")
          }
          title="Home"
        >
          <FaHome />
        </NavLink>

        {/* Matrix + Todo */}
        <NavLink
          to="/matrix"
          className={({ isActive }) =>
            "toolIcon" + (isActive ? " active" : "")
          }
          title="Tasks & Matrix"
        >
          <FaCheck />
        </NavLink>

        {/* Time Tracker */}
        <NavLink
          to="/tracker"
          className={({ isActive }) =>
            "toolIcon" + (isActive ? " active" : "")
          }
          title="Time Tracker"
        >
          <FaClock />
        </NavLink>
      </aside>

      {/* Main routed content */}
      <Routes>
        <Route
          path="/"
          element={
            <HomeScreen
              habitTotals={habitTotals}
              handleFocusComplete={handleFocusComplete}
            />
          }
        />
        <Route path="/matrix" element={<MatrixTodoScreen />} />
        <Route path="/tracker" element={<TimeTrackerScreen />} />
      </Routes>
    </div>
  );
};
