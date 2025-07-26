"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { MenuBar } from "../menu-bar";
import { Dock } from "../dock";
import { WindowManager } from "../window-manager";
import { ControlCenter } from "../control-center";
import { DesktopIcons } from "./desktop-icons";

import wallpaperImage from "../../assets/aurora-wallpaper.jpeg";

export interface AppWindow {
  id: string;
  appId: string;
  title: string;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface DesktopProps {
  theme?: "light" | "dark";
}

const showcaseAppIds = [
  {
    id: "gains-chat",
    title: "Gains Chat",
    isIosSimulator: true,
  },
  {
    id: "habitmentor-ai",
    title: "Habit Mentor AI",
    isIosSimulator: true,
  },
  {
    id: "project-manager",
    title: "Safari", // because it is being shown on a safari style window
    isIosSimulator: false,
  },
  {
    id: "file-explorer",
    title: "File Explorer",
    isIosSimulator: false,
  },
  {
    id: "settings",
    title: "Settings",
    isIosSimulator: false,
  },
];

export function Desktop({ theme = "light" }: DesktopProps) {
  const [openWindows, setOpenWindows] = useState<AppWindow[]>([]);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const desktopRef = useRef<HTMLDivElement>(null);

  // Empty desktop icons array - no icons on desktop
  const [desktopIcons] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const openApp = (appId: string) => {
    const appConfig = showcaseAppIds.find((app) => app.id === appId);
    if (!appConfig) return;
    const { title, isIosSimulator } = appConfig;
    const existingWindow = openWindows.find(
      (w) => w.appId === appId && !w.isMinimized
    );
    if (existingWindow) {
      setOpenWindows((prev) =>
        prev.map((w) =>
          w.id === existingWindow.id
            ? { ...w, zIndex: Math.max(...prev.map((w) => w.zIndex)) + 1 }
            : w
        )
      );
      return;
    }
    const newWindow: AppWindow = {
      id: `${appId}-${Date.now()}`,
      appId,
      title,
      isMinimized: false,
      zIndex: Math.max(...openWindows.map((w) => w.zIndex), 0) + 1,
      position: {
        x: 100 + openWindows.length * 30,
        y: isIosSimulator
          ? 50 + openWindows.length * 20
          : 100 + openWindows.length * 30,
      },
      size: { width: 800, height: 600 },
    };
    setOpenWindows((prev) => [...prev, newWindow]);
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== windowId));
  };

  const minimizeWindow = (windowId: string) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, isMinimized: true } : w))
    );
  };

  const restoreWindow = (windowId: string) => {
    setOpenWindows((prev) =>
      prev.map((w) =>
        w.id === windowId
          ? {
              ...w,
              isMinimized: false,
              zIndex: Math.max(...prev.map((w) => w.zIndex)) + 1,
            }
          : w
      )
    );
  };

  const updateWindowSize = (
    windowId: string,
    size: { width: number; height: number }
  ) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, size } : w))
    );
  };

  const updateWindowPosition = (
    windowId: string,
    position: { x: number; y: number }
  ) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, position } : w))
    );
  };

  const bringToFront = (windowId: string) => {
    setOpenWindows((prev) =>
      prev.map((w) =>
        w.id === windowId
          ? { ...w, zIndex: Math.max(...prev.map((w) => w.zIndex)) + 1 }
          : w
      )
    );
  };

  return (
    <div
      ref={desktopRef}
      className="h-screen w-screen overflow-hidden flex flex-col bg-gradient-to-br from-purple-900 via-purple-600 to-pink-800"
      style={{
        position: "relative", // Ensure proper stacking context
        overflow: "hidden", // Prevent layout shifts
      }}
    >
      {/* Desktop Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat desktop-background"
        style={{
          backgroundImage: `url(${wallpaperImage.src || wallpaperImage})`,
        }}
      />

      {/* Desktop Icons - now empty */}
      <DesktopIcons icons={desktopIcons} onOpenApp={(id) => openApp(id)} />

      {/* Menu Bar */}
      <MenuBar
        currentTime={currentTime}
        onControlCenterClick={() => setShowControlCenter(!showControlCenter)}
      />

      {/* Control Center */}
      {showControlCenter && (
        <ControlCenter
          theme={theme}
          onClose={() => setShowControlCenter(false)}
        />
      )}

      {/* Main content area - flex-1 to take remaining space */}
      <div className="flex-1 relative">
        {/* Window Manager */}
        <WindowManager
          windows={openWindows}
          theme={theme}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onUpdateSize={updateWindowSize}
          onUpdatePosition={updateWindowPosition}
          onBringToFront={bringToFront}
        />
      </div>

      {/* Dock - at the bottom */}
      <Dock
        openWindows={openWindows}
        onOpenApp={(id) => openApp(id)}
        onRestoreWindow={restoreWindow}
      />
    </div>
  );
}
