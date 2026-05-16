import { useState } from "react";

export default function ChatBox({ currentEmotion }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // 🧠 Handle send (AI connected)
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: "user",
      emotion: currentEmotion,
      time: new Date().toLocaleTimeString(),
    };

    // ✅ Show user message immediately
    setMessages((prev) => [...prev, userMessage]);

    const userInput = input; // store before clearing
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
          emotion: currentEmotion,
          history: messages,
        }),
      });

      const data = await res.json();

      const botReply = {
        text: data.reply,
        sender: "bot",
        time: new Date().toLocaleTimeString(),
      };

      // ✅ Add AI response
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error(error);

      const errorMsg = {
        text: "Something went wrong 😔",
        sender: "bot",
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  // 🧪 Debug (optional)
  console.log("Emotion received:", currentEmotion);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`msg ${msg.sender}`}>
            <span>{msg.text}</span>
            <small>{msg.time}</small>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Tell me how your day was..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}