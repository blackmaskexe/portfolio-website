"use client";

import { useState } from "react";
import { Apple, ToggleLeft } from "lucide-react";

interface MenuBarProps {
  currentTime: Date;
  onControlCenterClick: () => void;
}

export function MenuBar({ currentTime, onControlCenterClick }: MenuBarProps) {
  const [showAppleMenu, setShowAppleMenu] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const appleMenuItems = [
    {
      label: "About the Developer",
      action: () =>
        alert(
          "Hi! I'm a passionate developer creating interactive experiences like this macOS portfolio. Thanks for exploring!"
        ),
    },
    {
      label: "Portfolio Settings...",
      action: () => alert("Portfolio settings coming soon!"),
    },
    {
      label: "Recent Projects",
      action: () => alert("Check out my latest work on GitHub!"),
    },
    {
      label: "View All Projects",
      action: () => alert("Opening full project gallery..."),
    },
    { type: "separator" },
    {
      label: "Developer Contact",
      action: () =>
        alert("Email: developer@example.com\nLinkedIn: /in/developer"),
    },
    {
      label: "Switch to Simple Portfolio",
      action: () => alert("Switching to minimal portfolio view..."),
    },
    { type: "separator" },
    {
      label: "Exit Portfolio",
      action: () => alert("Thanks for visiting my interactive portfolio!"),
    },
  ];

  return (
    <div className="absolute top-0 left-0 right-0 h-6 bg-black/20 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 text-white text-sm font-medium z-50">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={() => setShowAppleMenu(!showAppleMenu)}
            className="hover:bg-white/10 p-1 rounded"
          >
            <Apple className="w-4 h-4" />
          </button>

          {/* Apple Menu Dropdown */}
          {showAppleMenu && (
            <>
              {/* Backdrop to close menu */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowAppleMenu(false)}
              />

              {/* Menu */}
              <div className="absolute top-6 left-0 w-64 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-2xl border border-gray-700/50 py-2 z-50">
                {appleMenuItems.map((item, index) =>
                  item.type === "separator" ? (
                    <div
                      key={index}
                      className="h-px bg-gray-700/60 mx-2 my-1"
                    />
                  ) : (
                    <button
                      key={index}
                      onClick={() => {
                        item.action!();
                        setShowAppleMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-200 hover:bg-blue-600 hover:text-white transition-colors text-sm"
                    >
                      {item.label}
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </div>

        {/* <span>Finder</span> */}
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        {/* <span>Go</span>
        <span>Window</span>
        <span>Help</span> */}
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onControlCenterClick}
          className="flex items-center space-x-1 hover:bg-white/10 px-2 py-1 rounded"
        >
          <ToggleLeft className="w-4 h-4" />
        </button>
        <span className="font-mono">{formatTime(currentTime)}</span>
      </div>
    </div>
  );
}
