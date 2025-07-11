"use client"

import { Trash2 } from "lucide-react"

interface AppContentProps {
  appId: string
}

export function AppContent({ appId }: AppContentProps) {
  switch (appId) {
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
