
import TodoList from "../components/TodoList";
import EisenhowerMatrix from "../components/EisenhowerMatrix";

export default function MatrixTodoScreen({
  todos,
  addTodo,
  toggleTodo,
  removeTodo,
}) {
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
          <EisenhowerMatrix 
            todos={todos}      
            onDelete={removeTodo}  />
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
