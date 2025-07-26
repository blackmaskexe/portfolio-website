"use client";

import { useState } from "react";
import { Wifi, Battery } from "lucide-react";
import { IoHomeOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { HabitHome } from "./habit-home";
import { HabitAIChat } from "./habit-ai-chat";

export function HabitMentorAIApp() {
  const [currentTime] = useState("2:37");
  const [activeTab, setActiveTab] = useState<"home" | "ai">("home");

  return (
    <div
      className="flex flex-col h-full w-full text-white relative overflow-hidden"
      style={{ background: "#151515" }}
    >
      {/* Status Bar */}
      <div className="relative flex justify-between items-center px-6 pt-3 pb-2 text-white text-sm font-medium">
        <span>{currentTime}</span>
        {/* Dynamic Island - Centered in status bar */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-6 bg-black rounded-full z-30" />
        <div className="flex items-center space-x-1">
          <Wifi className="w-4 h-4" />
          <Battery className="w-6 h-3" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full pt-0 px-0 flex flex-col min-h-0">
        {activeTab === "home" ? <HabitHome /> : <HabitAIChat />}
      </div>

      {/* Bottom Tabs: now always visible, part of flex layout */}
      <div className="w-full bg-[#18181A] border-t border-[#232325] flex justify-around items-center h-16 z-20">
        <button
          className={`flex flex-col items-center justify-center flex-1 h-full pb-2 ${
            activeTab === "home" ? "text-[#FF6347]" : "text-white/60"
          }`}
          onClick={() => setActiveTab("home")}
        >
          <IoHomeOutline size={26} />
          <span className="text-xs mt-1 font-medium">Home</span>
        </button>
        <button
          className={`flex flex-col items-center justify-center flex-1 h-full pb-2 ${
            activeTab === "ai" ? "text-[#FF6347]" : "text-white/60"
          }`}
          onClick={() => setActiveTab("ai")}
        >
          <IoChatbubbleEllipsesOutline size={26} />
          <span className="text-xs mt-1 font-medium">AI Chat</span>
        </button>
      </div>

      {/* Home Indicator: only show on Home tab */}
      {activeTab === "home" && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full z-10" />
      )}
    </div>
  );
}
