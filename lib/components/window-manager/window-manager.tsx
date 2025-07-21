"use client";

import type React from "react";

import { useState } from "react";
import { X, Minus, Square } from "lucide-react";
import type { AppWindow } from "../desktop";
import { AppContent } from "./app-content";
import { AppOpeningAnimation } from "./app-opening-animation";
import { IOSSimulatorWindow } from "../ios-simulator";
import { useSimulatorSize } from "../../hooks/use-simulator-size";

interface WindowManagerProps {
  windows: AppWindow[];
  theme?: "light" | "dark";
  onClose: (windowId: string) => void;
  onMinimize: (windowId: string) => void;
  onUpdatePosition: (
    windowId: string,
    position: { x: number; y: number }
  ) => void;
  onUpdateSize: (
    windowId: string,
    size: { width: number; height: number }
  ) => void;
  onBringToFront: (windowId: string) => void;
  onResizeStart?: () => void; // Optional callback for resize start
}

export function WindowManager({
  windows,
  theme = "light",
  onClose,
  onMinimize,
  onUpdatePosition,
  onUpdateSize,
  onBringToFront,
  onResizeStart, // Destructure onResizeStart
}: WindowManagerProps) {
  const simulatorSize = useSimulatorSize();

  const [dragState, setDragState] = useState<{
    windowId: string | null;
    isDragging: boolean;
    startPos: { x: number; y: number };
    startWindowPos: { x: number; y: number };
  }>({
    windowId: null,
    isDragging: false,
    startPos: { x: 0, y: 0 },
    startWindowPos: { x: 0, y: 0 },
  });

  type OpeningAnimation = {
    appId: string;
    appName: string;
    iconPosition: { x: number; y: number };
    windowPosition: { x: number; y: number };
  };
  const [openingAnimations, setOpeningAnimations] = useState<
    OpeningAnimation[]
  >([]);

  // Resizing state
  const [resizeState, setResizeState] = useState<{
    windowId: string | null;
    isResizing: boolean;
    startPos: { x: number; y: number };
    startWindowSize: { width: number; height: number };
  }>({
    windowId: null,
    isResizing: false,
    startPos: { x: 0, y: 0 },
    startWindowSize: { width: 0, height: 0 },
  });
  // Resize mouse events
  const handleResizeMouseDown = (
    e: React.MouseEvent,
    windowId: string,
    windowSize: { width: number; height: number }
  ) => {
    e.stopPropagation();
    if (onResizeStart) {
      onResizeStart(); // Invoke the callback to disable selection rectangle
    }
    setResizeState({
      windowId,
      isResizing: true,
      startPos: { x: e.clientX, y: e.clientY },
      startWindowSize: windowSize,
    });
    // Update the isResizing property in the corresponding AppWindow
    onUpdatePosition(windowId, {
      x: resizeState.startPos.x,
      y: resizeState.startPos.y,
    });
  };

  const handleResizeMouseMove = (e: React.MouseEvent) => {
    if (resizeState.isResizing && resizeState.windowId) {
      const deltaX = e.clientX - resizeState.startPos.x;
      const deltaY = e.clientY - resizeState.startPos.y;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const minWidth = screenWidth * 0.4; // 40% of screen width
      const minHeight = screenHeight * 0.6; // 60% of screen height

      const newWidth = Math.max(
        minWidth,
        resizeState.startWindowSize.width +
          deltaX * (resizeState.startPos.x > e.clientX ? -1 : 1)
      );
      const newHeight = Math.max(
        minHeight,
        resizeState.startWindowSize.height +
          deltaY * (resizeState.startPos.y > e.clientY ? -1 : 1)
      );

      const newPosition = {
        x:
          resizeState.startPos.x > e.clientX
            ? resizeState.startPos.x + deltaX
            : resizeState.startPos.x,
        y:
          resizeState.startPos.y > e.clientY
            ? resizeState.startPos.y + deltaY
            : resizeState.startPos.y,
      };

      onUpdateSize(resizeState.windowId, {
        width: newWidth,
        height: newHeight,
      });
      onUpdatePosition(resizeState.windowId, newPosition);
    }
    // Also allow window dragging
    handleMouseMove(e);
  };

  const handleResizeMouseUp = () => {
    if (resizeState.isResizing && resizeState.windowId) {
      setResizeState({ ...resizeState, isResizing: false });
      onUpdatePosition(resizeState.windowId, {
        x: resizeState.startPos.x,
        y: resizeState.startPos.y,
      });
    }
  };

  const handleMouseUp = () => {
    if (dragState.isDragging) {
      setDragState({
        windowId: null,
        isDragging: false,
        startPos: { x: 0, y: 0 },
        startWindowPos: { x: 0, y: 0 },
      });
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  };

  const handleMouseDown = (
    e: React.MouseEvent,
    windowId: string,
    windowPos: { x: number; y: number }
  ) => {
    e.stopPropagation();
    setDragState({
      windowId,
      isDragging: true,
      startPos: { x: e.clientX, y: e.clientY },
      startWindowPos: windowPos,
    });
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragState.isDragging && dragState.windowId) {
      const deltaX = e.clientX - dragState.startPos.x;
      const deltaY = e.clientY - dragState.startPos.y;

      onUpdatePosition(dragState.windowId, {
        x: dragState.startWindowPos.x + deltaX,
        y: dragState.startWindowPos.y + deltaY,
      });
    }
  };

  const isIOSSimulatorApp = (appId: string) => {
    const result = appId === "gains-chat" || appId === "habitmentor-ai";
    console.log(`isIOSSimulatorApp check: "${appId}" => ${result}`); // Debug log
    return result;
  };

  const isDark = theme === "dark";
  const windowBgClass = isDark ? "bg-gray-800" : "bg-white";
  const titleBarBgClass = isDark
    ? "bg-gray-700 border-gray-600"
    : "bg-gray-100 border-gray-200";
  const titleTextClass = isDark ? "text-gray-200" : "text-gray-700";

  return (
    <div
      className="absolute inset-0 pt-6 pointer-events-auto"
      onMouseMove={handleResizeMouseMove}
      onMouseUp={handleResizeMouseUp}
    >
      {/* Opening Animations */}
      {openingAnimations.map((animation, index) => (
        <AppOpeningAnimation
          key={`${animation.appId}-${index}`}
          appId={animation.appId}
          appName={animation.appName}
          iconPosition={animation.iconPosition}
          windowPosition={animation.windowPosition}
          onComplete={() => {
            setOpeningAnimations((prev) => prev.filter((_, i) => i !== index));
          }}
        />
      ))}
      {windows
        .filter((w) => !w.isMinimized)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((window) => {
          const isSimulator = isIOSSimulatorApp(window.appId);
          // Only add resize handle for non-simulator windows
          return (
            <div
              key={window.id}
              className={`absolute shadow-2xl overflow-hidden window ${
                isSimulator ? "bg-transparent" : `${windowBgClass} rounded-lg`
              }`}
              style={{
                left: window.position.x,
                top: window.position.y,
                width: isSimulator ? simulatorSize.width : window.size.width,
                height: isSimulator ? simulatorSize.height : window.size.height,
                zIndex: window.zIndex,
                userSelect: resizeState.isResizing ? "none" : undefined,
              }}
              onClick={() => onBringToFront(window.id)}
            >
              {isSimulator ? (
                // iOS Simulator Window with title bar above
                <div className="w-full h-full flex flex-col">
                  {/* Simulator Title Bar */}
                  <div
                    className="h-12 bg-gray-700 flex items-center justify-between px-4 text-white text-sm cursor-move select-none rounded-t-lg rounded-b-lg shadow-lg"
                    onMouseDown={(e) =>
                      handleMouseDown(e, window.id, window.position)
                    }
                    style={{ minHeight: "40px", maxHeight: "40px" }} // Force consistent height
                  >
                    <div className="flex items-center space-x-3 flex-shrink-0 w-full justify-between">
                      <div className="flex space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onClose(window.id);
                          }}
                          className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 flex items-center justify-center"
                        >
                          <X className="w-2 h-2 text-red-800 opacity-0 hover:opacity-100" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onMinimize(window.id);
                          }}
                          className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 flex items-center justify-center"
                        >
                          <Minus className="w-2 h-2 text-yellow-800 opacity-0 hover:opacity-100" />
                        </button>
                        <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 flex items-center justify-center">
                          <Square className="w-2 h-2 text-green-800 opacity-0 hover:opacity-100" />
                        </button>
                      </div>
                      <span className="font-medium whitespace-nowrap">
                        {window.title}
                      </span>
                      <span className="text-gray-400 whitespace-nowrap text-right block">
                        iOS 18.2
                      </span>
                    </div>
                  </div>

                  {/* Phone Simulator Area (transparent padding maintained) */}
                  <div className="flex-1 relative bg-transparent pt-2">
                    <div
                      style={{
                        width: simulatorSize.phoneWidth,
                        height: simulatorSize.phoneHeight,
                      }}
                    >
                      <IOSSimulatorWindow
                        appId={window.appId}
                        appName={window.title}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // Regular macOS Window
                <>
                  {/* Title Bar */}
                  <div
                    className={`h-8 ${titleBarBgClass} border-b flex items-center justify-between px-4 cursor-move select-none window-titlebar`}
                    onMouseDown={(e) =>
                      handleMouseDown(e, window.id, window.position)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onClose(window.id);
                        }}
                        className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 flex items-center justify-center"
                      >
                        <X className="w-2 h-2 text-red-800 opacity-0 hover:opacity-100" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMinimize(window.id);
                        }}
                        className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 flex items-center justify-center"
                      >
                        <Minus className="w-2 h-2 text-yellow-800 opacity-0 hover:opacity-100" />
                      </button>
                      <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 flex items-center justify-center">
                        <Square className="w-2 h-2 text-green-800 opacity-0 hover:opacity-100" />
                      </button>
                    </div>
                    <div className={`text-sm font-medium ${titleTextClass}`}>
                      {window.title}
                    </div>
                    <div className="w-12" />
                  </div>

                  {/* Window Content */}
                  <div className="flex-1 overflow-hidden">
                    <AppContent appId={window.appId} theme={theme} />
                  </div>
                </>
              )}
            </div>
          );
        })}
    </div>
  );
}
