"use client";

export function HabitAIChat() {
  return (
    <div className="flex flex-col h-full pt-8 px-4 pb-16 items-center justify-center text-center">
      <div className="text-4xl mb-4">🤖</div>
      <h2 className="text-xl font-bold text-white mb-2">AI Chat</h2>
      <p className="text-white/80 mb-4">
        Chat with your AI coach! (This is a placeholder for the AI chat
        feature.)
      </p>
      <div className="rounded-2xl bg-[#232325] p-6 w-full max-w-md mx-auto">
        <div className="text-white/60 text-sm">
          "Hi! How can I help you with your habits today?"
        </div>
      </div>
    </div>
  );
}
