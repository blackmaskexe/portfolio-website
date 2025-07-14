"use client"

import { useEffect, useState } from "react"

interface AppOpeningAnimationProps {
  appId: string
  appName: string
  iconPosition: { x: number; y: number }
  windowPosition: { x: number; y: number }
  onComplete: () => void
}

export function AppOpeningAnimation({
  appId,
  appName,
  iconPosition,
  windowPosition,
  onComplete,
}: AppOpeningAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
      onComplete()
    }, 500)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isAnimating) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {/* Animated window preview */}
      <div
        className="absolute bg-white rounded-lg shadow-2xl transition-all duration-500 ease-out"
        style={{
          left: iconPosition.x,
          top: iconPosition.y,
          width: 64,
          height: 64,
          transform: `translate(${windowPosition.x - iconPosition.x}px, ${windowPosition.y - iconPosition.y}px) scale(12.5)`,
          opacity: 0.8,
        }}
      >
        <div className="h-8 bg-gray-100 rounded-t-lg border-b flex items-center px-4">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Ripple effect from icon */}
      <div
        className="absolute rounded-full bg-white/30 animate-ping"
        style={{
          left: iconPosition.x + 32,
          top: iconPosition.y + 32,
          width: 0,
          height: 0,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  )
}
