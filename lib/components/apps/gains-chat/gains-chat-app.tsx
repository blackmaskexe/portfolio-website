"use client";

import { useState } from "react";
import {
  Wifi,
  Battery,
  Search,
  Trophy,
  Home as HomeIcon,
  BarChartBig,
} from "lucide-react";

import logWorkoutImage from "../../../assets/log-workout-image.png";
import { GraphsTab } from "./graphs-tab";
import { LogWorkoutsChat } from "./log-workouts-chat";
import { ExerciseGraph } from "./exercise-graph";

export function GainsChatApp() {
  const [currentTime] = useState("6:03");
  const [activeTab, setActiveTab] = useState<"home" | "graphs" | "log">("home");
  const [activeExercise, setActiveExercise] = useState<null | {
    name: string;
    data: { date: string; weight: number }[];
  }>(null);

  // Navigation logic
  let mainContent;
  if (activeTab === "home") {
    mainContent = (
      <main className="px-5 space-y-6">
        {/* Greeting */}
        <h2 className="text-xl text-gray-800 text-center">
          Hello there, Wonderful user
        </h2>

        {/* Log Workouts Card */}
        <button
          className="bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-200 transition hover:shadow-2xl hover:bg-blue-50 w-full text-left flex flex-col items-start cursor-pointer"
          onClick={() => setActiveTab("log")}
        >
          <div className="w-full h-40 bg-white rounded-xl mb-3 flex items-center justify-center">
            <img
              src={logWorkoutImage.src || (logWorkoutImage as any)}
              className="h-full object-contain"
            />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Log Workouts</h3>
          <p className="text-sm text-gray-500">
            Use a chat-like intuitive interface to track your progress
          </p>
        </button>

        {/* Grid for smaller cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* View Logs Card */}
          <button className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200 flex flex-col items-start transition hover:shadow-2xl hover:bg-blue-50 cursor-pointer">
            <Search className="h-7 w-7 text-blue-500 mb-6" />
            <h3 className="text-base font-bold text-gray-900">View Logs</h3>
            <p className="text-xs text-gray-500">
              Chat turned into Beautiful Logs
            </p>
          </button>

          {/* View Goals Card */}
          <button className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200 flex flex-col items-start transition hover:shadow-2xl hover:bg-blue-50 cursor-pointer">
            <Trophy className="h-7 w-7 text-blue-500 mb-6" />
            <h3 className="text-base font-bold text-gray-900">View Goals</h3>
            <p className="text-xs text-gray-500">
              Set, View, and Achieve Goals
            </p>
          </button>
        </div>
      </main>
    );
  } else if (activeTab === "graphs") {
    if (activeExercise) {
      const { ArrowLeft, ArrowRight } = require("lucide-react");
      mainContent = (
        <>
          <header className="flex items-center px-4 pt-6 pb-2 bg-white border-b border-gray-200">
            <button
              onClick={() => setActiveExercise(null)}
              className="mr-2 text-blue-500 p-1"
              aria-label="Back to exercises"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold flex-1 text-center">Graphs</h1>
            <div className="flex gap-2">
              <button className="text-gray-400 p-1">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button className="text-gray-400 p-1">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </header>
          <ExerciseGraph
            exercise={activeExercise}
            onBack={() => setActiveExercise(null)}
          />
        </>
      );
    } else {
      mainContent = <GraphsTab onExerciseSelect={setActiveExercise} />;
    }
  } else if (activeTab === "log") {
    mainContent = <LogWorkoutsChat />;
  }

  return (
    <div className="w-full h-full bg-gray-50 text-gray-900 relative font-sans">
      {/* Status Bar & Notch */}
      <div className="relative top-0 left-0 right-0 z-20 px-6 pt-4 pb-2 flex justify-between items-center">
        <span className="text-sm font-semibold">{currentTime}</span>
        {/* Dynamic Island - Centered in status bar */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-7 bg-black rounded-full z-30" />
        <div className="flex items-center space-x-1.5">
          <Wifi size={16} />
          <div className="flex items-center">
            <Battery className="w-6 h-3" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pt-16 pb-28 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {activeTab === "graphs" && activeExercise == null ? (
          <header className="text-center">
            <h1 className="text-lg font-bold">Graphs</h1>
          </header>
        ) : null}
        {activeTab === "home" && (
          <header className="text-center">
            <h1 className="text-lg font-bold">Home</h1>
          </header>
        )}
        {activeTab === "log" && (
          <header className="text-center">
            <h1 className="text-lg font-bold">Log Workouts</h1>
          </header>
        )}
        {mainContent}
      </div>

      {/* Bottom Navigation */}
      <footer className="absolute bottom-0 left-0 right-0 h-[90px] bg-white/80 backdrop-blur-md border-t border-gray-200/80">
        <nav className="flex justify-around items-center h-full px-4 pt-2 pb-6">
          <button
            className={`flex flex-col items-center gap-1 ${
              activeTab === "home" ? "text-blue-500" : "text-gray-400"
            }`}
            onClick={() => {
              setActiveTab("home");
              setActiveExercise(null);
            }}
          >
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs font-semibold">Home</span>
          </button>
          <button
            className={`flex flex-col items-center gap-1 ${
              activeTab === "graphs" ? "text-blue-500" : "text-gray-400"
            }`}
            onClick={() => {
              setActiveTab("graphs");
              setActiveExercise(null);
            }}
          >
            <BarChartBig className="h-6 w-6" />
            <span className="text-xs">Graphs</span>
          </button>
        </nav>
        {/* Home Indicator */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full" />
      </footer>
    </div>
  );
}
