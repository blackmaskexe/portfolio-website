"use client"

import { Trash2 } from "lucide-react"

interface AppContentProps {
  appId: string
}

export function AppContent({ appId }: AppContentProps) {
  switch (appId) {
    case "motivation-app":
      return (
        <div className="h-full p-8 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
          <div className="text-center text-white">
            <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-3xl flex items-center justify-center">
              <div className="text-4xl">💪</div>
            </div>
            <h2 className="text-3xl font-bold mb-4">Stay Motivated</h2>
            <p className="text-xl opacity-90 mb-6">Your daily dose of inspiration and strength</p>
            <div className="space-y-3">
              <div className="bg-white/20 rounded-lg p-4">
                <p className="text-lg font-medium">"Success is not final, failure is not fatal"</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <p className="text-lg font-medium">"Keep pushing forward! 💪"</p>
              </div>
            </div>
          </div>
        </div>
      )

    case "habit-tracker":
      return (
        <div className="h-full p-8 flex items-center justify-center bg-gradient-to-br from-red-400 to-pink-500">
          <div className="text-center text-white">
            <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-3xl flex items-center justify-center">
              <div className="text-4xl font-bold">H</div>
            </div>
            <h2 className="text-3xl font-bold mb-4">Habit Tracker</h2>
            <p className="text-xl opacity-90 mb-6">Build better habits, one day at a time</p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl mb-2">🏃‍♂️</div>
                <p className="font-medium">Exercise</p>
                <p className="text-sm opacity-75">7 day streak</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl mb-2">📚</div>
                <p className="font-medium">Reading</p>
                <p className="text-sm opacity-75">3 day streak</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl mb-2">💧</div>
                <p className="font-medium">Water</p>
                <p className="text-sm opacity-75">12 day streak</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl mb-2">🧘‍♀️</div>
                <p className="font-medium">Meditation</p>
                <p className="text-sm opacity-75">5 day streak</p>
              </div>
            </div>
          </div>
        </div>
      )

    case "trash":
      return (
        <div className="h-full p-4 flex items-center justify-center">
          <div className="text-center">
            <Trash2 className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <h2 className="text-xl font-bold mb-2">Trash is Empty</h2>
            <p className="text-gray-600">Items you delete will appear here.</p>
          </div>
        </div>
      )

    default:
      return (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-xl font-bold mb-2">App Coming Soon</h2>
            <p className="text-gray-600">This application is under development.</p>
          </div>
        </div>
      )
  }
}
