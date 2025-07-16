"use client"

import { useState } from "react"
import { Folder, Globe, MusicIcon, MessageSquare, SettingsIcon, Trash2 } from "lucide-react"

interface DesktopIcon {
  id: string
  name: string
  icon: string
  position: { x: number; y: number }
}

interface DesktopIconsProps {
  icons: DesktopIcon[]
  onOpenApp: (appId: string, title: string) => void
}

const iconComponents = {
  Folder,
  Globe,
  MusicIcon,
  MessageSquare,
  SettingsIcon,
  Trash2,
}

export function DesktopIcons({ icons, onOpenApp }: DesktopIconsProps) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [openingIcon, setOpeningIcon] = useState<string | null>(null)

  const handleIconClick = (icon: DesktopIcon) => {
    setSelectedIcon(icon.id)
    setOpeningIcon(icon.id)

    // Add a small delay to show the opening animation
    setTimeout(() => {
      onOpenApp(icon.id, icon.name)
      setOpeningIcon(null)
    }, 200)
  }

  const handleIconDoubleClick = (icon: DesktopIcon) => {
    setOpeningIcon(icon.id)
    setTimeout(() => {
      onOpenApp(icon.id, icon.name)
      setOpeningIcon(null)
    }, 100)
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {icons.map((icon) => {
        const IconComponent = iconComponents[icon.icon as keyof typeof iconComponents]
        const isSelected = selectedIcon === icon.id
        const isOpening = openingIcon === icon.id

        return (
          <div
            key={icon.id}
            className={`
              absolute pointer-events-auto cursor-pointer select-none
              transition-all duration-200 ease-out
              ${isOpening ? "scale-110" : "scale-100"}
              ${isSelected ? "bg-blue-500/20" : ""}
              rounded-lg p-2
            `}
            style={{
              left: icon.position.x,
              top: icon.position.y,
              transform: isOpening ? "scale(1.1)" : "scale(1)",
            }}
            onClick={() => handleIconClick(icon)}
            onDoubleClick={() => handleIconDoubleClick(icon)}
            onBlur={() => setSelectedIcon(null)}
            tabIndex={0}
          >
            <div className="flex flex-col items-center space-y-1">
              {/* Icon Background */}
              <div
                className={`
                  w-16 h-16 rounded-xl flex items-center justify-center
                  transition-all duration-200
                  ${
                    isSelected
                      ? "bg-white/30 backdrop-blur-sm shadow-lg"
                      : "bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  }
                  ${isOpening ? "shadow-2xl" : "shadow-md"}
                `}
              >
                <IconComponent
                  className={`
                    w-8 h-8 text-white transition-all duration-200
                    ${isOpening ? "scale-110" : "scale-100"}
                  `}
                />
              </div>

              {/* Icon Label */}
              <div
                className={`
                  text-xs font-medium text-white text-center px-2 py-1 rounded
                  transition-all duration-200 max-w-20
                  ${isSelected ? "bg-blue-500/80 backdrop-blur-sm" : "bg-black/40 backdrop-blur-sm"}
                `}
              >
                <div className="truncate">{icon.name}</div>
              </div>
            </div>

            {/* Opening Animation Overlay */}
            {isOpening && <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse" />}
          </div>
        )
      })}
    </div>
  )
}
