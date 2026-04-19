import { useEffect, useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // 📥 Fetch todos
  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then(setTodos)
      .catch((err) => console.log(err));
  }, []);

  // ➕ Add Todo
  const addTodo = async () => {
    if (!text.trim()) return;

    const res = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const newTodo = await res.json();
    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };

  // ✔ Toggle Complete
  const toggleTodo = async (id) => {
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT"
    });

    const updated = await res.json();

    setTodos((prev) =>
      prev.map((t) => (t._id === id ? updated : t))
    );
  };

  // ❌ Delete Todo
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE"
    });

    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="card todo-app">

      <h2>📋 Task Manager</h2>

      {/* INPUT SECTION */}
      <div className="todo-input">

        <input
          type="text"
          value={text}
          placeholder="Add a new task..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />

        <button onClick={addTodo}>
          Add
        </button>

      </div>

      {/* TASK LIST */}
      <div className="todo-list">

        {todos.length === 0 && (
          <p className="empty">No tasks yet 🚀</p>
        )}

        {todos.map((todo) => (
          <div key={todo._id} className="todo-item">

            {/* TASK TEXT */}
            <div
              className={`todo-text ${
                todo.done ? "done" : ""
              }`}
              onClick={() => toggleTodo(todo._id)}
            >
              {todo.text}

              {/* PRIORITY TAG */}
              {todo.priority && (
                <span className={`badge ${todo.priority}`}>
                  {todo.priority}
                </span>
              )}
            </div>

            {/* ACTIONS */}
            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo._id)}
            >
              ✕
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}