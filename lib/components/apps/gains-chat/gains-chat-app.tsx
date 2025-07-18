"use client";

import { useState } from "react";
import { Wifi, Battery } from "lucide-react";

export function GainsChatApp() {
  const [currentTime] = useState("2:37");

  return (
    <div className="h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white relative overflow-hidden">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-2 text-white text-sm font-medium">
        <span>{currentTime}</span>
        <div className="flex items-center space-x-1">
          <Wifi className="w-4 h-4" />
          <Battery className="w-6 h-3" />
        </div>
      </div>

      {/* Dynamic Island */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full" />

      {/* App Content */}
      <div className="px-6 pt-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-3xl flex items-center justify-center">
            <span className="text-3xl">💪</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Daily Motivation</h1>
          <p className="text-white/80">Stay strong, stay focused</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-2">Today's Quote</h3>
            <p className="text-white/90">
              "The only impossible journey is the one you never begin."
            </p>
            <p className="text-white/70 text-sm mt-2">- Tony Robbins</p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-3">Your Progress</h3>
            <div className="flex justify-between items-center">
              <span>Workout Streak</span>
              <span className="text-2xl font-bold">7 days 🔥</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <span className="text-sm">Set Goal</span>
            </button>
            <button className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">📊</div>
              <span className="text-sm">Stats</span>
            </button>
          </div>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full" />
    </div>
  );
}
