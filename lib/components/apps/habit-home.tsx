"use client";

import { useState } from "react";

export function HabitHome() {
  const [habits, setHabits] = useState([
    { id: 1, name: "A little bit of everything", checked: false, points: 20 },
  ]);
  const [showPopup, setShowPopup] = useState(false);

  const toggleHabit = (id: number) => {
    setHabits((habits) =>
      habits.map((h) => (h.id === id ? { ...h, checked: !h.checked } : h))
    );
  };

  return (
    <div className="flex flex-col h-full pt-8 px-4 pb-16 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <span className="text-lg font-bold text-white tracking-wide">
          Overview
        </span>
        <button className="p-2 text-white/80">
          {/* Add icon for add habit if needed */}
        </button>
      </div>

      {/* Weekly Completion Progress */}
      <div className="mb-4 p-4 rounded-2xl" style={{ background: "#2C2C2E" }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-semibold">Weekly Completion</span>
          <span className="text-xs text-white/60">Jul 13 - Jul 19</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div
              key={d + i}
              className={
                "w-7 h-7 flex items-center justify-center rounded-lg text-sm font-bold " +
                (i === 2
                  ? "bg-[#FF6347] text-white shadow"
                  : "bg-[#3A3A3C] text-white/80")
              }
            >
              {d}
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex-1 h-2 rounded-full bg-[#3A3A3C] overflow-hidden">
            <div
              className="h-2 rounded-full"
              style={{ width: `14%`, background: "#FF6347" }}
            />
          </div>
          <span className="text-xs text-white/80 font-semibold min-w-[32px] text-right">
            14%
          </span>
        </div>
      </div>

      {/* Top AI Suggestion */}
      <div className="mb-4 p-4 rounded-2xl bg-[#232325]">
        <div className="text-white font-semibold mb-1">Top AI Suggestion:</div>
        <div className="text-white/80 text-sm">
          Try doing your habits at the same time every day! Get more powerful
          suggestions in the app
        </div>
      </div>

      {/* Habits for Today */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-white font-semibold text-base">
          Habits for Today:
        </span>
      </div>
      <div className="space-y-3 mb-4">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="flex items-center justify-between p-4 rounded-2xl"
            style={{ background: "#2C2C2E" }}
          >
            <button
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 mr-3 transition-colors duration-150 ${
                habit.checked
                  ? "bg-[#FF6347] border-[#FF6347]"
                  : "bg-transparent border-[#3A3A3C]"
              }`}
              onClick={() => toggleHabit(habit.id)}
              aria-label={habit.checked ? "Uncheck habit" : "Check habit"}
            >
              {habit.checked ? (
                <span className="text-white text-xs">✓</span>
              ) : null}
            </button>
            <div className="flex-1">
              <div
                className={`text-white font-medium text-base leading-tight ${
                  habit.checked ? "line-through opacity-60" : ""
                }`}
              >
                {habit.name}
              </div>
              <div className="text-xs text-white/50 mt-1">
                +{habit.points} Points
              </div>
            </div>
            <button className="p-2 text-white/40">{/* More icon */}</button>
          </div>
        ))}
      </div>

      {/* Add Habit Button */}
      <button
        className="flex items-center justify-center gap-2 text-[#FF6347] font-semibold text-base py-2 rounded-xl bg-[#232325] hover:bg-[#2C2C2E] transition mb-2"
        onClick={() => setShowPopup(true)}
      >
        + Add Habit
      </button>

      {/* Popup */}
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="bg-[#232325] rounded-2xl p-6 shadow-xl flex flex-col items-center">
            <span className="text-white text-lg font-semibold mb-2">
              Feature only available on the mobile app
            </span>
            <button
              className="mt-4 px-4 py-2 bg-[#FF6347] text-white rounded-lg font-medium hover:bg-[#e5533d] transition"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
