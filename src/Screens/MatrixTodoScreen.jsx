import EisenhowerMatrix from "../components/EisenhowerMatrix"; // adjust path if needed
import TodoList from "../components/TodoList";

export default function MatrixTodoScreen() {
  return (
    <>
      <header className="header">
        <h2>Tasks & Eisenhower Matrix</h2>
        <p className="muted">
          Choose P1–P4 to decide which quadrant a task goes to.
        </p>
      </header>

      <main className="main">
        <div className="left">
          <EisenhowerMatrix />
        </div>
        <div className="right">
          <TodoList />
        </div>
      </main>
    </>
  );
}
