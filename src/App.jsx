import { useEffect, useMemo, useState } from "react";
import { FaHome, FaCheck, FaClock } from "react-icons/fa";  // ⬅️ add FaClock
import TimeTrackerScreen from "./Screens/TimeTrackerScreen"; // ⬅️ new import
import { Routes, Route, NavLink } from "react-router-dom";
import SidebarNav from "./components/SidebarNav";

import HabitTracker, { DEFAULT_HABITS } from "./components/HabitTracker";
import MatrixTodoScreen from "./Screens/MatrixTodoScreen";
import Pomodoro from "./components/Pomodoro";
import TodoList from "./components/TodoList";

import DashboardHeader from "./components/DashboardHeader";


const TODOS_KEY = "goalie_todos";



function HomeScreen({ habitTotals, handleFocusComplete, todos, addTodo, toggleTodo,removeTodo }) {
  return (
    <>
      <DashboardHeader habitTotals={habitTotals}/>
        <main className="main">
          <div className="left">
            <Pomodoro
              habits={Object.keys(habitTotals)}
              onFocusComplete={handleFocusComplete}
            />
          </div>
          <div className="right">
            <TodoList 
              items={todos}
              onAdd={addTodo}  
              onToggle={toggleTodo}
              onRemove={removeTodo}
            />
          </div>
        </main>
      </>
  );
}

export default function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const raw = localStorage.getItem(TODOS_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setTodos(parsed);
        }
      } catch {
        // ignore bad JSON
      }
    }
  }, []);
const addTodo = ({ text, quad = "IU" }) => {
  setTodos((prev) => [
    ...prev,
    { id: Date.now(), text, quad, done: false },
  ]);
};

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTodo = (id, patch) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t))
    );
  };


  const [habitTotals, setHabitTotals] = useState(
    Object.fromEntries(DEFAULT_HABITS.map((h) => [h, 0]))
  );

  const handleFocusComplete = (habit, minutes) => {
    setHabitTotals((t) => ({ ...t, [habit]: (t[habit] || 0) + minutes }));
  };

  return (
    <div className="layout">
      <SidebarNav />
      {/* Main routed content */}
      <Routes>
        <Route
          path="/"
          element={
            <HomeScreen
              habitTotals={habitTotals}
              handleFocusComplete={handleFocusComplete}
              todos={todos}
              addTodo={addTodo}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
            />
          }
        />
        <Route path="/matrix" element={<MatrixTodoScreen 
        todos={todos}
        addTodo={addTodo}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo} />} />
        <Route path="/tracker" element={<TimeTrackerScreen />} />
      </Routes>
    </div>
  );
};
