"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Terminal } from "@/components/terminal"

interface AnimatedTerminalWindowProps {
  lines: string[]
  typingSpeed?: number
  lineDelay?: number
}

export function AnimatedTerminalWindow({ lines, typingSpeed = 30, lineDelay = 500 }: AnimatedTerminalWindowProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Trigger the genie effect after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!windowRef.current) return

    setIsDragging(true)
    const rect = windowRef.current.getBoundingClientRect()
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return

    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y

    // Constrain to viewport bounds
    const maxX = window.innerWidth - 600 // terminal width
    const maxY = window.innerHeight - 500 // approximate terminal height

    setPosition({
      x: Math.max(-300, Math.min(maxX, newX)), // Allow some off-screen dragging
      y: Math.max(-50, Math.min(maxY, newY)),
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "grabbing"
      document.body.style.userSelect = "none"
    } else {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isDragging, dragStart])

  return (
    <div className="flex justify-center lg:justify-end">
      <div
        ref={windowRef}
        className={`transition-all duration-1000 ease-out transform-gpu ${
          isVisible ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-8 origin-bottom-right"
        } ${isDragging ? "z-50" : "z-10"}`}
        style={{
          transformOrigin: "bottom right",
          animation: isVisible ? "genieEffect 1s ease-out" : undefined,
          width: "600px",
          transform: `translate(${position.x}px, ${position.y}px) ${
            isVisible ? "scale(1)" : "scale(0) translateY(8px)"
          }`,
          cursor: isDragging ? "grabbing" : "default",
        }}
      >
        {/* macOS Window Frame */}
        <div className="bg-gray-800 rounded-t-lg border border-gray-700 shadow-2xl w-full">
          {/* Window Title Bar - Draggable */}
          <div
            className="flex items-center justify-between px-4 py-3 bg-gray-900 rounded-t-lg border-b border-gray-700 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
            </div>
            <span className="text-gray-400 text-sm font-medium pointer-events-none">Terminal</span>
            <div className="w-16"></div> {/* Spacer for centering */}
          </div>

          {/* Terminal Content */}
          <div className="p-0">
            <Terminal lines={lines} typingSpeed={typingSpeed} lineDelay={lineDelay} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes genieEffect {
          0% {
            transform: scale(0) translateY(100px) skewY(10deg);
            opacity: 0;
            transform-origin: bottom right;
          }
          50% {
            transform: scale(0.5) translateY(50px) skewY(5deg);
            opacity: 0.7;
          }
          100% {
            transform: scale(1) translateY(0) skewY(0deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
