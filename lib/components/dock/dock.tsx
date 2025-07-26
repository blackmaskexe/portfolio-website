"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import type { AppWindow } from "../desktop";

import habitTrackerLogo from "../../assets/app-icons/habitmentor-ai.png";
import motivationAppLogo from "../../assets/app-icons/gains-chat.png";
import projectManagerLogo from "../../assets/app-icons/project-manager.png";

console.log(
  "cassey's been waiting too long",
  habitTrackerLogo,
  motivationAppLogo
);

interface DockProps {
  openWindows: AppWindow[];
  onOpenApp: (appId: string, title: string) => void;
  onRestoreWindow: (windowId: string) => void;
}

const dockApps = [
  {
    id: "gains-chat",
    name: "Gains Chat",
    iconPath: motivationAppLogo.src || motivationAppLogo,
  },
  {
    id: "habitmentor-ai",
    name: "HabitMentor AI",
    iconPath: habitTrackerLogo.src || habitTrackerLogo,
  },
  {
    id: "project-manager",
    name: "Project Manager (React)",
    iconPath: projectManagerLogo.src || projectManagerLogo,
  },
];

export function Dock({ openWindows, onOpenApp, onRestoreWindow }: DockProps) {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  const handleAppClick = (appId: string, appName: string) => {
    const minimizedWindow = openWindows.find(
      (w) => w.appId === appId && w.isMinimized
    );
    if (minimizedWindow) {
      onRestoreWindow(minimizedWindow.id);
    } else {
      onOpenApp(appId, appName);
    }
  };

  const isAppOpen = (appId: string) => {
    return openWindows.some((w) => w.appId === appId && !w.isMinimized);
  };

  const isAppMinimized = (appId: string) => {
    return openWindows.some((w) => w.appId === appId && w.isMinimized);
  };

  return (
    <div className="flex justify-center items-end min-h-0 pb-2 z-[2147483647]">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/20">
        <div className="flex items-center space-x-1">
          {/* Regular Apps */}
          {dockApps.map((app) => {
            const isOpen = isAppOpen(app.id);
            const isMinimized = isAppMinimized(app.id);
            const isHovered = hoveredApp === app.id;

            return (
              <div key={app.id} className="relative flex flex-col items-center">
                <button
                  onClick={() => handleAppClick(app.id, app.name)}
                  onMouseEnter={() => setHoveredApp(app.id)}
                  onMouseLeave={() => setHoveredApp(null)}
                  className="relative p-1 transition-all duration-200 ease-out"
                >
                  <div
                    className={`
                      w-12 h-12 transition-all duration-200 overflow-hidden
                      ${isHovered ? "scale-110" : ""}
                    `}
                    style={{
                      borderRadius: "22%",
                      background:
                        "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                      boxShadow: isHovered
                        ? "0 8px 25px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
                        : "0 4px 15px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                  >
                    <img
                      src={app.iconPath as string}
                      alt={app.name}
                      className="w-full h-full object-cover"
                      style={{ borderRadius: "20%" }}
                    />
                  </div>

                  {/* Running indicator */}
                  {(isOpen || isMinimized) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                  )}
                </button>

                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap">
                    {app.name}
                  </div>
                )}
              </div>
            );
          })}

          {/* Separator */}
          <div className="h-12 w-px bg-white/30 mx-2" />

          {/* Trash */}
          <div className="relative flex flex-col items-center">
            <button
              onClick={() => handleAppClick("trash", "Trash")}
              onMouseEnter={() => setHoveredApp("trash")}
              onMouseLeave={() => setHoveredApp(null)}
              className="relative p-2 rounded-xl transition-all duration-200 ease-out hover:bg-white/10"
            >
              <Trash2
                className={`
                  w-12 h-12 text-white transition-all duration-200
                  ${hoveredApp === "trash" ? "scale-110" : ""}
                `}
              />

              {/* Running indicator */}
              {(isAppOpen("trash") || isAppMinimized("trash")) && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
              )}
            </button>

            {/* Tooltip */}
            {hoveredApp === "trash" && (
              <div className="absolute bottom-full mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap">
                Trash
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
