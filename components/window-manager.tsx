"use client"

import type React from "react"

import { useState } from "react"
import { X, Minus, Square } from "lucide-react"
import type { AppWindow } from "./desktop"
import { AppContent } from "./app-content"
import { AppOpeningAnimation } from "./app-opening-animation"
import { IOSSimulatorWindow } from "./ios-simulator-window"

interface WindowManagerProps {
  windows: AppWindow[]
  onClose: (windowId: string) => void
  onMinimize: (windowId: string) => void
  onUpdatePosition: (windowId: string, position: { x: number; y: number }) => void
  onUpdateSize: (windowId: string, size: { width: number; height: number }) => void
  onBringToFront: (windowId: string) => void
}

export function WindowManager({
  windows,
  onClose,
  onMinimize,
  onUpdatePosition,
  onUpdateSize,
  onBringToFront,
}: WindowManagerProps) {
  const [dragState, setDragState] = useState<{
    windowId: string | null
    isDragging: boolean
    startPos: { x: number; y: number }
    startWindowPos: { x: number; y: number }
  }>({
    windowId: null,
    isDragging: false,
    startPos: { x: 0, y: 0 },
    startWindowPos: { x: 0, y: 0 },
  })

  const [openingAnimations, setOpeningAnimations] = useState<
    Array<{
      appId: string
      appName: string
      iconPosition: { x: number; y: number }
      windowPosition: { x: number; y: number }
    }>
  >([])

  const handleMouseDown = (e: React.MouseEvent, windowId: string, windowPos: { x: number; y: number }) => {
    onBringToFront(windowId)
    setDragState({
      windowId,
      isDragging: true,
      startPos: { x: e.clientX, y: e.clientY },
      startWindowPos: windowPos,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragState.isDragging && dragState.windowId) {
      const deltaX = e.clientX - dragState.startPos.x
      const deltaY = e.clientY - dragState.startPos.y

      onUpdatePosition(dragState.windowId, {
        x: dragState.startWindowPos.x + deltaX,
        y: dragState.startWindowPos.y + deltaY,
      })
    }
  }

  const handleMouseUp = () => {
    setDragState({
      windowId: null,
      isDragging: false,
      startPos: { x: 0, y: 0 },
      startWindowPos: { x: 0, y: 0 },
    })
  }

  const isIOSSimulatorApp = (appId: string) => {
    return appId === "motivation-app" || appId === "habit-tracker"
  }

  return (
    <div className="absolute inset-0 pt-6" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {/* Opening Animations */}
      {openingAnimations.map((animation, index) => (
        <AppOpeningAnimation
          key={`${animation.appId}-${index}`}
          appId={animation.appId}
          appName={animation.appName}
          iconPosition={animation.iconPosition}
          windowPosition={animation.windowPosition}
          onComplete={() => {
            setOpeningAnimations((prev) => prev.filter((_, i) => i !== index))
          }}
        />
      ))}
      {windows
        .filter((w) => !w.isMinimized)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((window) => {
          const isSimulator = isIOSSimulatorApp(window.appId)

          return (
            <div
              key={window.id}
              className={`absolute shadow-2xl overflow-hidden ${
                isSimulator ? "bg-transparent" : "bg-white rounded-lg"
              }`}
              style={{
                left: window.position.x,
                top: window.position.y,
                width: isSimulator ? 320 : window.size.width,
                height: isSimulator ? 580 : window.size.height,
                zIndex: window.zIndex,
              }}
              onClick={() => onBringToFront(window.id)}
            >
              {isSimulator ? (
                // iOS Simulator Window (just the phone screen)
                <div className="w-full h-full relative">
                  {/* Invisible draggable area at the top */}
                  <div
                    className="absolute top-0 left-0 right-0 h-16 z-10 cursor-move"
                    onMouseDown={(e) => handleMouseDown(e, window.id, window.position)}
                  />

                  {/* Window controls overlay */}
                  <div className="absolute top-2 left-2 flex space-x-2 z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onClose(window.id)
                      }}
                      className="w-4 h-4 bg-red-500 rounded-full hover:bg-red-600 flex items-center justify-center shadow-lg"
                    >
                      <X className="w-2.5 h-2.5 text-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onMinimize(window.id)
                      }}
                      className="w-4 h-4 bg-yellow-500 rounded-full hover:bg-yellow-600 flex items-center justify-center shadow-lg"
                    >
                      <Minus className="w-2.5 h-2.5 text-white" />
                    </button>
                    <button className="w-4 h-4 bg-green-500 rounded-full hover:bg-green-600 flex items-center justify-center shadow-lg">
                      <Square className="w-2.5 h-2.5 text-white" />
                    </button>
                  </div>

                  <IOSSimulatorWindow appId={window.appId} appName={window.title} />
                </div>
              ) : (
                // Regular macOS Window
                <>
                  {/* Title Bar */}
                  <div
                    className="h-8 bg-gray-100 border-b flex items-center justify-between px-4 cursor-move select-none window-titlebar"
                    onMouseDown={(e) => handleMouseDown(e, window.id, window.position)}
                  >
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onClose(window.id)
                        }}
                        className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 flex items-center justify-center"
                      >
                        <X className="w-2 h-2 text-red-800 opacity-0 hover:opacity-100" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onMinimize(window.id)
                        }}
                        className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 flex items-center justify-center"
                      >
                        <Minus className="w-2 h-2 text-yellow-800 opacity-0 hover:opacity-100" />
                      </button>
                      <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 flex items-center justify-center">
                        <Square className="w-2 h-2 text-green-800 opacity-0 hover:opacity-100" />
                      </button>
                    </div>
                    <div className="text-sm font-medium text-gray-700">{window.title}</div>
                    <div className="w-12" />
                  </div>

                  {/* Window Content */}
                  <div className="flex-1 overflow-hidden">
                    <AppContent appId={window.appId} />
                  </div>
                </>
              )}
            </div>
          )
        })}
    </div>
  )
}
