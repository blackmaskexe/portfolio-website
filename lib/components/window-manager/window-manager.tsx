"use client";

import type React from "react";

import { useState } from "react";
import { X, Minus, Square } from "lucide-react";
import type { AppWindow } from "../desktop";
import { AppContent } from "./app-content";
import { IOSSimulatorWindow } from "../ios-simulator";
import { useSimulatorSize } from "../../hooks/use-simulator-size";

interface WindowManagerProps {
  windows: AppWindow[];
  theme?: "light" | "dark";
  onClose: (windowId: string) => void;
  onMinimize: (windowId: string) => void;
  onUpdateSize: (
    windowId: string,
    size: { width: number; height: number }
  ) => void;
  onUpdatePosition: (
    windowId: string,
    position: { x: number; y: number }
  ) => void;
  onBringToFront: (windowId: string) => void;
}

export function WindowManager({
  windows,
  theme = "light",
  onClose,
  onMinimize,
  onUpdateSize,
  onUpdatePosition,
  onBringToFront,
}: WindowManagerProps) {
  const simulatorSize = useSimulatorSize();

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

  const handleResizeMouseDown = (
    e: React.MouseEvent,
    windowId: string,
    windowSize: { width: number; height: number }
  ) => {
    e.stopPropagation();
    setResizeState({
      windowId,
      isResizing: true,
      startPos: { x: e.clientX, y: e.clientY },
      startWindowSize: windowSize,
    });
  };

  const handleResizeMouseMove = (e: React.MouseEvent) => {
    if (resizeState.isResizing && resizeState.windowId) {
      const deltaX = e.clientX - resizeState.startPos.x;
      const deltaY = e.clientY - resizeState.startPos.y;
      onUpdateSize(resizeState.windowId, {
        width: Math.max(300, resizeState.startWindowSize.width + deltaX),
        height: Math.max(200, resizeState.startWindowSize.height + deltaY),
      });
    }
  };

  const handleResizeMouseUp = () => {
    setResizeState({
      windowId: null,
      isResizing: false,
      startPos: { x: 0, y: 0 },
      startWindowSize: { width: 0, height: 0 },
    });
  };

  const handleDragMouseDown = (
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
  };

  const handleDragMouseMove = (e: React.MouseEvent) => {
    if (dragState.isDragging && dragState.windowId) {
      const deltaX = e.clientX - dragState.startPos.x;
      const deltaY = e.clientY - dragState.startPos.y;
      onBringToFront(dragState.windowId);
      onUpdatePosition(dragState.windowId, {
        x: dragState.startWindowPos.x + deltaX,
        y: dragState.startWindowPos.y + deltaY,
      });
    }
  };

  const handleDragMouseUp = () => {
    setDragState({
      windowId: null,
      isDragging: false,
      startPos: { x: 0, y: 0 },
      startWindowPos: { x: 0, y: 0 },
    });
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
      style={{ overflow: "visible" }} // Adjust overflow to prevent clipping
      onMouseMove={(e) => {
        handleResizeMouseMove(e);
        handleDragMouseMove(e);
      }}
      onMouseUp={() => {
        handleResizeMouseUp();
        handleDragMouseUp();
      }}
    >
      {windows
        .filter((w) => !w.isMinimized)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((window) => {
          const isSimulator = isIOSSimulatorApp(window.appId);
          return (
            <div
              key={window.id}
              className={`absolute shadow-2xl overflow-visible window ${
                isSimulator ? "bg-transparent" : `${windowBgClass} rounded-lg`
              }`}
              style={{
                left: window.position.x,
                top: window.position.y,
                width: isSimulator ? simulatorSize.width : "70vw", // Default width for non-iOS simulator windows
                height: isSimulator ? simulatorSize.height : "70vh", // Default height for non-iOS simulator windows
                zIndex: window.zIndex,
              }}
              onClick={() => onBringToFront(window.id)}
            >
              {isSimulator ? (
                <div className="w-full h-full flex flex-col">
                  <div
                    className="h-12 bg-gray-700 flex items-center justify-between px-4 text-white text-sm select-none rounded-t-lg rounded-b-lg shadow-lg"
                    style={{
                      minHeight: "40px",
                      maxHeight: "40px",
                      cursor: "grab",
                    }}
                    onMouseDown={(e) =>
                      handleDragMouseDown(e, window.id, {
                        x: window.position.x,
                        y: window.position.y,
                      })
                    }
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
                <>
                  <div
                    className={`h-8 ${titleBarBgClass} border-b flex items-center justify-between px-4 select-none window-titlebar`}
                    onMouseDown={(e) =>
                      handleDragMouseDown(e, window.id, {
                        x: window.position.x,
                        y: window.position.y,
                      })
                    }
                    style={{ cursor: "grab" }}
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
