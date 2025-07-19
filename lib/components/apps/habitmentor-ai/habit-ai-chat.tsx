"use client";

import { useState, useRef, useEffect } from "react";

// The initial message from the AI when the chat loads.
const initialMessages = [
  { from: "ai", text: "How may I help you to improve your habits?" },
  {
    from: "user",
    text: "You can help me by giving me a link to this wonderful app.",
  },
  {
    from: "ai",
    text: "Don't worry bro, I got you! Here's the link: https://habitmentor.ai",
  },
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
    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      {
        from: "ai",
        text: "Sorry, the chat feature is only available in the app.",
      },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-[#18181A]">
      {/* HEADER */}
      <div className="px-4 pt-8 pb-4">
        <h1 className="text-lg font-bold text-white tracking-wide">
          AI Assistant
        </h1>
      </div>

      {/* MESSAGES CONTAINER */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                {msg.text.includes("https://habitmentor.ai") ? (
                  <>
                    {msg.text.replace("https://habitmentor.ai", "")}
                    <a
                      href="https://habitmentor.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[#FF6347] ml-1"
                    >
                      https://habitmentor.ai
                    </a>
                  </>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* INPUT FORM: Now always visible, not covered by overlays */}
      <form
        className="flex w-full max-w-md mx-auto gap-2 p-4 bg-gradient-to-t from-[#18181A] via-[#18181A]/90 to-transparent"
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
  );
}
