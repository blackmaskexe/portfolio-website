"use client"

import { useState } from "react"
import { Folder, Grid3X3, Globe, Music, MessageSquare, Settings, Trash2 } from "lucide-react"
import type { AppWindow } from "./desktop"

interface DockProps {
  openWindows: AppWindow[]
  onOpenApp: (appId: string, title: string) => void
  onRestoreWindow: (windowId: string) => void
}

const dockApps = [
  { id: "finder", name: "Finder", icon: Folder },
  { id: "launchpad", name: "Launchpad", icon: Grid3X3 },
  { id: "safari", name: "Safari", icon: Globe },
  { id: "music", name: "Music", icon: Music },
  { id: "messages", name: "Messages", icon: MessageSquare },
  { id: "system-preferences", name: "System Preferences", icon: Settings },
  { id: "trash", name: "Trash", icon: Trash2 },
]

export function Dock({ openWindows, onOpenApp, onRestoreWindow }: DockProps) {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null)

  const handleAppClick = (appId: string, appName: string) => {
    const minimizedWindow = openWindows.find((w) => w.appId === appId && w.isMinimized)
    if (minimizedWindow) {
      onRestoreWindow(minimizedWindow.id)
    } else {
      onOpenApp(appId, appName)
    }
  }

  const isAppOpen = (appId: string) => {
    return openWindows.some((w) => w.appId === appId && !w.isMinimized)
  }

  const isAppMinimized = (appId: string) => {
    return openWindows.some((w) => w.appId === appId && w.isMinimized)
  }

  return (
    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/20">
        <div className="flex items-end space-x-1">
          {dockApps.map((app) => {
            const Icon = app.icon
            const isOpen = isAppOpen(app.id)
            const isMinimized = isAppMinimized(app.id)
            const isHovered = hoveredApp === app.id

            return (
              <div key={app.id} className="relative flex flex-col items-center">
                <button
                  onClick={() => handleAppClick(app.id, app.name)}
                  onMouseEnter={() => setHoveredApp(app.id)}
                  onMouseLeave={() => setHoveredApp(null)}
                  className={`
                    relative p-2 rounded-xl transition-all duration-200 ease-out
                    ${isHovered ? "transform -translate-y-2 scale-110" : ""}
                    hover:bg-white/10
                  `}
                >
                  <Icon
                    className={`
                      w-12 h-12 text-white transition-all duration-200
                      ${isHovered ? "w-14 h-14" : ""}
                    `}
                  />

                  {/* Running indicator */}
                  {(isOpen || isMinimized) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                  )}
                </button>

                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap">
                    {app.name}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
