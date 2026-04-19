import TodoApp from "../components/TodoApp";
import Dashboard from "../components/Dashboard";
import Charts from "../components/Charts";
import CalendarView from "../components/CalendarView";
import AIChat from "../components/AIChat";

export default function Home() {
  return (
    <div className="home-container">

      {/* HEADER */}
      <header className="header">
        <h1>🚀 Smart Productivity AI</h1>
        <p>Manage tasks, track progress, and plan your day intelligently</p>
      </header>

      {/* DASHBOARD SECTION */}
      <section className="section">
        <Dashboard />
      </section>

      {/* ANALYTICS + CALENDAR */}
      <section className="grid-2">
        <Charts />
        <CalendarView />
      </section>

      {/* MAIN WORKSPACE */}
      <section className="grid-main">

        {/* TODO APP */}
        <div className="card large">
          <h2>📋 Tasks</h2>
          <TodoApp />
        </div>

        {/* AI ASSISTANT */}
        <div className="card large">
          <h2>🧠 AI Assistant</h2>
          <AIChat />
        </div>

      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>Built with React • Node.js • OpenAI • Recharts</p>
      </footer>

    </div>
  );
}