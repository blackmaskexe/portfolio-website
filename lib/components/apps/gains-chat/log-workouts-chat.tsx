"use client";
import { useState, useRef, useEffect } from "react";

const initialMessages = [
  { from: "ai", text: "Welcome to Workout Chat! Log your workouts here." },
];

export function LogWorkoutsChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    setMessages((msgs) => [
      ...msgs,
      { from: "user", text: trimmedInput },
      { from: "ai", text: "Chat logging is only available in the mobile app." },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* HEADER */}
      <div className="px-4 pt-8 pb-4">
        <h1 className="text-lg font-bold text-gray-900 tracking-wide">
          Workout Chat
        </h1>
      </div>

      {/* MESSAGES CONTAINER */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-4">
        <div className="space-y-4 max-w-md mx-auto w-full">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm shadow-md ${
                  msg.from === "ai"
                    ? "bg-blue-50 text-blue-900"
                    : "bg-blue-500 text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* INPUT FORM */}
      <form
        className="flex w-full max-w-md mx-auto gap-2 p-4 bg-gradient-to-t from-white via-white/90 to-transparent"
        onSubmit={handleSend}
        autoComplete="off"
      >
        <input
          className="flex-1 rounded-xl px-4 py-3 bg-blue-50 text-blue-900 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          type="text"
          placeholder="Type your workout..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          disabled={!input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
