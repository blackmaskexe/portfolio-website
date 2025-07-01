"use client"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

interface ThemeToggleProps {
  onThemeChange?: (isMatrix: boolean) => void
}

export function ThemeToggle({ onThemeChange }: ThemeToggleProps) {
  const [isMatrix, setIsMatrix] = useState(true)

  useEffect(() => {
    // Initialize theme on mount
    updateTheme(isMatrix)
  }, [])

  const updateTheme = (matrix: boolean) => {
    const root = document.documentElement
    const body = document.body

    if (matrix) {
      // Matrix theme (dark background, green accents)
      root.style.setProperty("--theme-primary", "#00ff41")
      root.style.setProperty("--theme-primary-dim", "rgba(0, 255, 65, 0.7)")
      root.style.setProperty("--theme-primary-bg", "rgba(0, 255, 65, 0.1)")
      root.style.setProperty("--theme-border", "rgba(0, 255, 65, 0.4)")
      root.style.setProperty("--theme-bg", "#000000")
      root.style.setProperty("--theme-bg-secondary", "#111111")
      root.style.setProperty("--theme-text", "#ffffff")
      root.style.setProperty("--theme-text-secondary", "#808080")
      body.className = body.className.replace(/\s*light-theme/g, "") + " dark-theme"
    } else {
      // Normal theme (white background, blue accents)
      root.style.setProperty("--theme-primary", "#3b82f6")
      root.style.setProperty("--theme-primary-dim", "rgba(59, 130, 246, 0.7)")
      root.style.setProperty("--theme-primary-bg", "rgba(59, 130, 246, 0.1)")
      root.style.setProperty("--theme-border", "rgba(59, 130, 246, 0.4)")
      root.style.setProperty("--theme-bg", "#ffffff")
      root.style.setProperty("--theme-bg-secondary", "#f8fafc")
      root.style.setProperty("--theme-text", "#1f2937")
      root.style.setProperty("--theme-text-secondary", "#6b7280")
      body.className = body.className.replace(/\s*dark-theme/g, "") + " light-theme"
    }
  }

  const handleToggle = () => {
    const newTheme = !isMatrix
    setIsMatrix(newTheme)
    updateTheme(newTheme)
    onThemeChange?.(newTheme)
  }

  return (
    <button
      onClick={handleToggle}
      className="relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none"
      style={{ backgroundColor: isMatrix ? "#1f2937" : "#e5e7eb" }}
      aria-label="Toggle theme"
    >
      {/* Slider */}
      <div
        className={`absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 transform flex items-center justify-center ${
          isMatrix ? "left-0.5 bg-green-500" : "left-6 bg-blue-500"
        }`}
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-full h-full">
          {isMatrix ? <Moon className="w-3 h-3 text-white" /> : <Sun className="w-3 h-3 text-white" />}
        </div>
      </div>
    </button>
  )
}
