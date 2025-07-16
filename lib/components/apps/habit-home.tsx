"use client";

export function HabitHome() {
  return (
    <div className="flex flex-col h-full pt-8 px-4 pb-16">
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
        {/* Example habit cards, replace with dynamic content if needed */}
        <div
          className="flex items-center justify-between p-4 rounded-2xl"
          style={{ background: "#2C2C2E" }}
        >
          <button className="w-8 h-8 flex items-center justify-center rounded-full border-2 mr-3 bg-[#FF6347] border-[#FF6347]">
            <span className="text-white text-xs">✓</span>
          </button>
          <div className="flex-1">
            <div className="text-white font-medium text-base leading-tight">
              Eat clean
            </div>
            <div className="text-xs text-white/50 mt-1">+20 Points</div>
          </div>
          <button className="p-2 text-white/40">{/* More icon */}</button>
        </div>
        <div
          className="flex items-center justify-between p-4 rounded-2xl"
          style={{ background: "#2C2C2E" }}
        >
          <button className="w-8 h-8 flex items-center justify-center rounded-full border-2 mr-3 bg-[#FF6347] border-[#FF6347]">
            <span className="text-white text-xs">✓</span>
          </button>
          <div className="flex-1">
            <div className="text-white font-medium text-base leading-tight">
              Train hard
            </div>
            <div className="text-xs text-white/50 mt-1">+20 Points</div>
          </div>
          <button className="p-2 text-white/40">{/* More icon */}</button>
        </div>
      </div>
    </div>
  );
}
