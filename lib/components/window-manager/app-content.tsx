"use client";

import { Trash2 } from "lucide-react";
import ProjectManagerApp from "../apps/project-manager/project-manager-app";

interface AppContentProps {
  appId: string;
  theme?: "light" | "dark";
}

export function AppContent({ appId, theme = "light" }: AppContentProps) {
  const isDark = theme === "dark";
  const textClass = isDark ? "text-gray-200" : "text-gray-800";
  const subtextClass = isDark ? "text-gray-400" : "text-gray-600";
  const iconClass = isDark ? "text-gray-400" : "text-gray-500";

  switch (appId) {
    case "trash":
      return (
        <div className="h-full p-4 flex items-center justify-center">
          <div className="text-center">
            <Trash2 className={`w-16 h-16 mx-auto mb-4 ${iconClass}`} />
            <h2 className={`text-xl font-bold mb-2 ${textClass}`}>
              Trash is Empty
            </h2>
            <p className={subtextClass}>Items you delete will appear here.</p>
          </div>
        </div>
      );

    case "project-manager":
      return (
        <div className="h-[70vh]">
          {/* Reduce height to 70% of viewport */}
          <div className="h-full w-full">
            <ProjectManagerApp />
          </div>
        </div>
      );

    default:
      return (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className={`text-xl font-bold mb-2 ${textClass}`}>
              App Coming Soon
            </h2>
            <p className={subtextClass}>
              This application is under development.
            </p>
          </div>
        </div>
      );
  }
}
