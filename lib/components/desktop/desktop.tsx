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
    title: "Project Manager",
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

  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 });
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
    const appConfig = showcaseAppIds.find(app => app.id === appId);
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

  const updateWindowPosition = (
    windowId: string,
    position: { x: number; y: number }
  ) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, position } : w))
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

  const bringToFront = (windowId: string) => {
    setOpenWindows((prev) =>
      prev.map((w) =>
        w.id === windowId
          ? { ...w, zIndex: Math.max(...prev.map((w) => w.zIndex)) + 1 }
          : w
      )
    );
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Check if we're clicking on an interactive element or window dragging area
    const target = e.target as HTMLElement;
    const isInteractiveElement =
      target.closest("button") ||
      target.closest('[role="button"]') ||
      target.closest(".window") ||
      target.closest(".dock") ||
      target.closest(".menu-bar") ||
      target.closest(".cursor-move") ||
      target.classList.contains("cursor-move");

    // Only start selection if NOT clicking on interactive elements
    if (!isInteractiveElement) {
      setIsSelecting(true);
      setSelectionStart({ x: e.clientX, y: e.clientY });
      setSelectionEnd({ x: e.clientX, y: e.clientY });

      // Add global mouse event listeners for dragging
      const handleGlobalMouseMove = (e: MouseEvent) => {
        setSelectionEnd({ x: e.clientX, y: e.clientY });
      };

      const handleGlobalMouseUp = () => {
        setIsSelecting(false);
        document.removeEventListener("mousemove", handleGlobalMouseMove);
        document.removeEventListener("mouseup", handleGlobalMouseUp);
      };

      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }
  };

  // Calculate selection rectangle properties
  const getSelectionRect = () => {
    const left = Math.min(selectionStart.x, selectionEnd.x);
    const top = Math.min(selectionStart.y, selectionEnd.y);
    const width = Math.abs(selectionEnd.x - selectionStart.x);
    const height = Math.abs(selectionEnd.y - selectionStart.y);
    return { left, top, width, height };
  };

  return (
    <div
      ref={desktopRef}
      className="h-screen w-screen overflow-hidden relative bg-gradient-to-br from-purple-900 via-purple-600 to-pink-800"
      onMouseDown={handleMouseDown}
    >
      {/* Desktop Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat desktop-background"
        style={{
          backgroundImage: `url(${wallpaperImage.src || wallpaperImage})`,
        }}
      />

      {/* Selection Rectangle */}
      {isSelecting && (
        <div
          className="absolute border-2 border-blue-500 bg-blue-500/30 pointer-events-none z-50"
          style={{
            left: getSelectionRect().left,
            top: getSelectionRect().top,
            width: getSelectionRect().width,
            height: getSelectionRect().height,
            boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
          }}
        />
      )}

      {/* Desktop Icons - now empty */}
      <DesktopIcons icons={desktopIcons} onOpenApp={id => openApp(id)} />

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

      {/* Window Manager */}
      <WindowManager
        windows={openWindows}
        theme={theme}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onUpdatePosition={updateWindowPosition}
        onUpdateSize={updateWindowSize}
        onBringToFront={bringToFront}
      />

      {/* Dock */}
      <Dock
        openWindows={openWindows}
        onOpenApp={id => openApp(id)}
        onRestoreWindow={restoreWindow}
      />
    </div>
  );
}
