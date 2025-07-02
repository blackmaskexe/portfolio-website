"use client"

import { useState, useEffect } from "react"
import { Terminal } from "@/components/terminal"

interface AnimatedTerminalWindowProps {
  lines: string[]
  typingSpeed?: number
  lineDelay?: number
}

export function AnimatedTerminalWindow({ lines, typingSpeed = 30, lineDelay = 500 }: AnimatedTerminalWindowProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simple fade-in animation after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex justify-center lg:justify-end">
      <div
        className={`transition-all duration-1000 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{
          width: "600px",
        }}
      >
        {/* macOS Window Frame */}
        <div className="bg-gray-800 rounded-t-lg border border-gray-700 shadow-2xl w-full">
          {/* Window Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-900 rounded-t-lg border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-400 text-sm font-medium">Terminal</span>
            <div className="w-16"></div>
          </div>

          {/* Terminal Content */}
          <div className="p-0">
            <Terminal lines={lines} typingSpeed={typingSpeed} lineDelay={lineDelay} />
          </div>
        </div>
      </div>
    </div>
  )
}
