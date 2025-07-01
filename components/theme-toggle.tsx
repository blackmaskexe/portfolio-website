"use client"

import { useState } from "react"

interface ThemeToggleProps {
  onThemeChange?: (isMatrix: boolean) => void
}

export function ThemeToggle({ onThemeChange }: ThemeToggleProps) {
  const [isMatrix, setIsMatrix] = useState(true)

  const handleToggle = () => {
    const newTheme = !isMatrix
    setIsMatrix(newTheme)
    onThemeChange?.(newTheme)

    // Update CSS custom properties for theme switching
    const root = document.documentElement
    if (newTheme) {
      root.style.setProperty("--theme-primary", "#00ff41")
      root.style.setProperty("--theme-primary-dim", "rgba(0, 255, 65, 0.7)")
      root.style.setProperty("--theme-primary-bg", "rgba(0, 255, 65, 0.1)")
      root.style.setProperty("--theme-border", "rgba(0, 255, 65, 0.3)")
    } else {
      root.style.setProperty("--theme-primary", "#3b82f6")
      root.style.setProperty("--theme-primary-dim", "rgba(59, 130, 246, 0.7)")
      root.style.setProperty("--theme-primary-bg", "rgba(59, 130, 246, 0.1)")
      root.style.setProperty("--theme-border", "rgba(59, 130, 246, 0.3)")
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-mono text-gray-400">{isMatrix ? "MATRIX" : "NORMAL"}</span>
      <button
        onClick={handleToggle}
        className="relative w-16 h-8 rounded-full bg-gray-800 border border-gray-600 transition-all duration-300 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-gray-500"
        aria-label="Toggle theme"
      >
        {/* Track */}
        <div className="absolute inset-1 rounded-full bg-gray-900 transition-colors duration-300" />

        {/* Slider */}
        <div
          className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-300 transform ${
            isMatrix
              ? "left-1 bg-green-500 shadow-lg shadow-green-500/50"
              : "left-9 bg-blue-500 shadow-lg shadow-blue-500/50"
          }`}
        >
          {/* Inner glow effect */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-300 ${
              isMatrix ? "bg-green-400 animate-pulse" : "bg-blue-400 animate-pulse"
            }`}
            style={{ opacity: 0.6 }}
          />
        </div>

        {/* Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-2 text-xs">
          <span className={`transition-opacity duration-300 ${isMatrix ? "opacity-100" : "opacity-30"}`}>{"</>"}</span>
          <span className={`transition-opacity duration-300 ${!isMatrix ? "opacity-100" : "opacity-30"}`}>✦</span>
        </div>
      </button>
    </div>
  )
}
