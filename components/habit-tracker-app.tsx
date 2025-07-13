"use client"

import { useState } from "react"
import { Wifi, Battery } from "lucide-react"

export function HabitTrackerApp() {
  const [currentTime] = useState("2:37")

  return (
    <div className="h-full bg-gradient-to-br from-red-400 to-pink-500 text-white relative overflow-hidden">
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
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-3xl flex items-center justify-center">
            <span className="text-3xl font-bold">H</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Habit Tracker</h1>
          <p className="text-white/80">Build better habits daily</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <h3 className="text-lg font-semibold mb-3">Today's Habits</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🏃‍♂️</span>
                  <span>Morning Run</span>
                </div>
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">💧</span>
                  <span>Drink Water</span>
                </div>
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">📚</span>
                  <span>Read Book</span>
                </div>
                <div className="w-6 h-6 bg-white/30 rounded-full border-2 border-white/50"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🧘‍♀️</span>
                  <span>Meditation</span>
                </div>
                <div className="w-6 h-6 bg-white/30 rounded-full border-2 border-white/50"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-lg font-bold">12</div>
              <div className="text-xs text-white/80">Day Streak</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-lg font-bold">85%</div>
              <div className="text-xs text-white/80">This Week</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-lg font-bold">4</div>
              <div className="text-xs text-white/80">Habits</div>
            </div>
          </div>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full" />
    </div>
  )
}
