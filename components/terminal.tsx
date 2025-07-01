"use client"

import { useState, useEffect } from "react"

interface TerminalProps {
  lines: string[]
  typingSpeed?: number
  lineDelay?: number
}

export function Terminal({ lines, typingSpeed = 50, lineDelay = 1000 }: TerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (currentLineIndex >= lines.length) return

    const currentLine = lines[currentLineIndex]

    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev]
          if (newLines[currentLineIndex]) {
            newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1)
          } else {
            newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1)
          }
          return newLines
        })
        setCurrentCharIndex((prev) => prev + 1)
      }, typingSpeed)

      return () => clearTimeout(timer)
    } else {
      // Line is complete, move to next line after delay
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1)
        setCurrentCharIndex(0)
      }, lineDelay)

      return () => clearTimeout(timer)
    }
  }, [currentLineIndex, currentCharIndex, lines, typingSpeed, lineDelay])

  // Create array of all lines (displayed + empty placeholders)
  const allLines = Array.from({ length: lines.length }, (_, index) => {
    if (index < displayedLines.length) {
      return displayedLines[index] || ""
    }
    return ""
  })

  return (
    <div
      className="terminal-bg rounded-lg p-6 font-mono text-sm w-full h-96 flex flex-col"
      style={{ minWidth: "600px", maxWidth: "600px" }}
    >
      {/* Terminal Content - Fixed Height and Width */}
      <div className="flex-1 space-y-2 overflow-y-auto overflow-x-hidden">
        {allLines.map((line, index) => (
          <div key={index} className="matrix-green min-h-[1.5rem] w-full">
            <span className="text-gray-500">$ </span>
            <span className="inline-block" style={{ minWidth: "500px" }}>
              {line}
              {index === currentLineIndex && <span className="terminal-cursor matrix-green">|</span>}
            </span>
          </div>
        ))}
        {currentLineIndex < lines.length && displayedLines.length === 0 && (
          <div className="matrix-green min-h-[1.5rem] w-full">
            <span className="text-gray-500">$ </span>
            <span className="inline-block" style={{ minWidth: "500px" }}>
              <span className="terminal-cursor">|</span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
