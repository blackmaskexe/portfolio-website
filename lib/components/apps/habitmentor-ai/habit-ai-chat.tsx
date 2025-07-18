"use client";

import { useState, useRef, useEffect } from "react";

// The initial message from the AI when the chat loads.
const initialMessages = [
  { from: "ai", text: "How may I help you to improve your habits?" },
];

export function HabitAIChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // This effect automatically scrolls to the newest message.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // This function handles sending a new message.
  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage = { from: "user", text: trimmedInput };
    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput("");
  };

  return (
    // ROOT CONTAINER: This now mirrors the structure of `HabitHome`.
    // `h-full` and `flex-col` create the main layout.
    // `bg-[#18181A]` sets the background for the entire screen.
    <div className="flex flex-col h-full bg-[#18181A]">
      {/* HEADER: Added for consistency with `HabitHome`'s "Overview" header. */}
      {/* `px-4 pt-8 pb-4` provides proper safe-area spacing. */}
      <div className="px-4 pt-8 pb-4">
        <h1 className="text-lg font-bold text-white tracking-wide">
          AI Assistant
        </h1>
      </div>

      {/* MESSAGES CONTAINER: This is the scrollable area for chat bubbles. */}
      {/* `flex-1` makes it expand to fill available space. */}
      {/* `min-h-0` is a crucial flexbox fix to ensure scrolling works inside a flex container. */}
      {/* `px-4` provides side padding, and `pb-4` adds space at the bottom so the last message isn't hidden. */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
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
                    ? "bg-[#232325] text-white/90"
                    : "bg-[#FF6347] text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {/* This empty div is the target for our auto-scrolling ref. */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* INPUT FORM: This area sticks to the bottom. */}
      {/* The background provides a gradient to fade out the messages behind it. */}
      <div className="bg-gradient-to-t from-[#18181A] via-[#18181A]/90 to-transparent">
        <form
          className="flex w-full max-w-md mx-auto gap-2 p-4"
          onSubmit={handleSend}
          autoComplete="off"
        >
          <input
            className="flex-1 rounded-xl px-4 py-3 bg-[#232325] text-white border border-[#3A3A3C] focus:outline-none focus:ring-2 focus:ring-[#FF6347] transition-shadow"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-[#FF6347] text-white font-semibold hover:bg-[#e5533d] transition-colors disabled:bg-[#FF6347]/50 disabled:cursor-not-allowed"
            disabled={!input.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
