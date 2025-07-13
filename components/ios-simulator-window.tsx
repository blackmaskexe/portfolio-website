"use client"

import { MotivationApp } from "./motivation-app"
import { HabitTrackerApp } from "./habit-tracker-app"

interface IOSSimulatorWindowProps {
  appId: string
  appName: string
}

export function IOSSimulatorWindow({ appId, appName }: IOSSimulatorWindowProps) {
  const renderAppContent = () => {
    switch (appId) {
      case "motivation-app":
        return <MotivationApp />

      case "habit-tracker":
        return <HabitTrackerApp />

      default:
        return (
          <div className="h-full bg-gray-100 flex items-center justify-center">
            <p>App not found</p>
          </div>
        )
    }
  }

  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-black">
      {renderAppContent()}
    </div>
  )
}
