import { useState } from "react";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", text: message };

    setChat((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await res.json();

      const aiMessage = {
        role: "ai",
        text: data.reply || "No response"
      };

      setChat((prev) => [...prev, aiMessage]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Error connecting to AI server" }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="card ai-chat-card">

      <h2>🧠 AI Productivity Assistant</h2>

      {/* CHAT BOX */}
      <div className="chat-box">

        {chat.length === 0 && (
          <p className="hint">
            Ask me anything about tasks, planning, or productivity 🚀
          </p>
        )}

        {chat.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.role}`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="chat-message ai">
            Typing...
          </div>
        )}

      </div>

      {/* INPUT AREA */}
      <div className="chat-input">

        <input
          type="text"
          value={message}
          placeholder="Ask AI something..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>
  );
}