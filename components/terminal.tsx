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

  return (
    <div className="terminal-bg rounded-lg p-6 font-mono text-sm max-w-4xl mx-auto h-96 overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-gray-400 ml-4">developer-portfolio.sh</span>
      </div>

      {/* Terminal Content */}
      <div className="space-y-2">
        {displayedLines.map((line, index) => (
          <div key={index} className="matrix-green">
            <span className="text-gray-500">$ </span>
            {line}
            {index === currentLineIndex && <span className="terminal-cursor matrix-green">|</span>}
          </div>
        ))}
        {currentLineIndex < lines.length && displayedLines.length === 0 && (
          <div className="matrix-green">
            <span className="text-gray-500">$ </span>
            <span className="terminal-cursor">|</span>
          </div>
        )}
      </div>
    </div>
  )
}
