"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface MacOSScreenProps {
  className?: string
}

export function MacOSScreen({ className = "" }: MacOSScreenProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const dockApps = [
    { name: "Finder", color: "bg-blue-500" },
    { name: "Safari", color: "bg-blue-400" },
    { name: "Mail", color: "bg-blue-600" },
    { name: "Messages", color: "bg-green-500" },
    { name: "Photos", color: "bg-yellow-500" },
    { name: "Calendar", color: "bg-red-500" },
    { name: "Notes", color: "bg-yellow-400" },
    { name: "Reminders", color: "bg-red-400" },
    { name: "Maps", color: "bg-green-400" },
    { name: "Music", color: "bg-red-600" },
    { name: "App Store", color: "bg-blue-500" },
    { name: "System Preferences", color: "bg-gray-500" },
  ]

  return (
    <div className={`relative ${className}`}>
      <div
        className={`transition-all duration-1000 ease-out transform ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* macOS Screen Container - Slightly Larger */}
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
          {/* Screen Bezel */}
          <div className="absolute inset-0 rounded-2xl border-8 border-gray-900 pointer-events-none z-10"></div>

          {/* Desktop Background - Increased height from 500px to 580px */}
          <div className="relative w-full h-[580px] overflow-hidden">
            <Image
              src="/images/macos-sonoma-desktop.png"
              alt="macOS Sonoma Desktop"
              fill
              className="object-cover"
              priority
            />

            {/* Menu Bar */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-md border-b border-white/10">
              <div className="flex items-center justify-between px-4 h-full text-white text-sm">
                <div className="flex items-center gap-4">
                  <span className="font-semibold">🍎</span>
                  <span>Finder</span>
                  <span>File</span>
                  <span>Edit</span>
                  <span>View</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>🔋</span>
                  <span>📶</span>
                  <span>🔊</span>
                  <span>12:34 PM</span>
                </div>
              </div>
            </div>

            {/* Desktop Icons */}
            <div className="absolute top-12 left-4 space-y-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-blue-500 rounded-lg shadow-lg"></div>
                <span className="text-white text-xs">Projects</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-green-500 rounded-lg shadow-lg"></div>
                <span className="text-white text-xs">Code</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-purple-500 rounded-lg shadow-lg"></div>
                <span className="text-white text-xs">Design</span>
              </div>
            </div>

            {/* Dock */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/20">
                {dockApps.map((app, index) => (
                  <div
                    key={app.name}
                    className={`w-12 h-12 ${app.color} rounded-xl shadow-lg hover:scale-110 transition-transform cursor-pointer`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Floating Window */}
            <div className="absolute top-20 right-8 w-80 h-48 bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-white/20">
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-700 text-sm font-medium">Portfolio</span>
                <div className="w-16"></div>
              </div>
              <div className="p-4">
                <h3 className="text-gray-800 font-semibold mb-2">Featured Projects</h3>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-300 rounded w-full"></div>
                  <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                </div>
                <div className="mt-4 flex gap-2">
                  <div className="px-3 py-1 bg-blue-500 text-white text-xs rounded">React</div>
                  <div className="px-3 py-1 bg-green-500 text-white text-xs rounded">Node.js</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
