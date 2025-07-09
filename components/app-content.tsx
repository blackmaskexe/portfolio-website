"use client"

import {
  Folder,
  Search,
  Home,
  Download,
  ImageIcon,
  Globe,
  MusicIcon,
  MessageSquare,
  SettingsIcon,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface AppContentProps {
  appId: string
}

export function AppContent({ appId }: AppContentProps) {
  switch (appId) {
    case "finder":
      return (
        <div className="h-full flex">
          {/* Sidebar */}
          <div className="w-48 bg-gray-50 border-r p-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Download className="w-4 h-4" />
                <span>Downloads</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ImageIcon className="w-4 h-4" />
                <span>Pictures</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Folder className="w-4 h-4" />
                <span>Documents</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4">
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-4 h-4 text-gray-400" />
                <Input placeholder="Search" className="flex-1" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {["Documents", "Downloads", "Pictures", "Music", "Videos", "Desktop"].map((folder) => (
                <div key={folder} className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <Folder className="w-12 h-12 text-blue-500 mb-2" />
                  <span className="text-sm text-gray-700">{folder}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )

    case "launchpad":
      return (
        <div className="h-full p-8 bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="grid grid-cols-6 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Finder", icon: Folder, color: "text-blue-500" },
              { name: "Safari", icon: Globe, color: "text-blue-600" },
              { name: "Music", icon: MusicIcon, color: "text-red-500" },
              { name: "Messages", icon: MessageSquare, color: "text-green-500" },
              { name: "Settings", icon: SettingsIcon, color: "text-gray-600" },
              { name: "Trash", icon: Trash2, color: "text-gray-500" },
            ].map((app) => (
              <div
                key={app.name}
                className="flex flex-col items-center p-4 hover:bg-white/50 rounded-xl cursor-pointer transition-all"
              >
                <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center mb-2">
                  <app.icon className={`w-8 h-8 ${app.color}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">{app.name}</span>
              </div>
            ))}
          </div>
        </div>
      )

    case "safari":
      return (
        <div className="h-full flex flex-col">
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                ←
              </Button>
              <Button variant="ghost" size="sm">
                →
              </Button>
              <Input
                placeholder="Search or enter website name"
                className="flex-1"
                defaultValue="https://www.apple.com"
              />
            </div>
          </div>
          <div className="flex-1 p-8 bg-white">
            <div className="text-center">
              <Globe className="w-16 h-16 mx-auto mb-4 text-blue-500" />
              <h2 className="text-2xl font-bold mb-2">Welcome to Safari</h2>
              <p className="text-gray-600">Start browsing by entering a URL in the address bar above.</p>
            </div>
          </div>
        </div>
      )

    case "music":
      return (
        <div className="h-full p-4">
          <div className="text-center">
            <MusicIcon className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <h2 className="text-2xl font-bold mb-2">Apple Music</h2>
            <p className="text-gray-600 mb-4">Discover millions of songs</p>
            <Button>Browse Music</Button>
          </div>
        </div>
      )

    case "messages":
      return (
        <div className="h-full flex">
          <div className="w-64 bg-gray-50 border-r p-4">
            <div className="space-y-2">
              <div className="font-medium text-blue-600">Messages</div>
              <div className="text-gray-600">John Doe</div>
              <div className="text-gray-600">Jane Smith</div>
              <div className="text-gray-600">Work Group</div>
            </div>
          </div>
          <div className="flex-1 p-4 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h2 className="text-xl font-bold mb-2">Select a conversation</h2>
              <p className="text-gray-600">Choose a conversation from the sidebar to start messaging.</p>
            </div>
          </div>
        </div>
      )

    case "system-preferences":
      return (
        <div className="h-full p-4">
          <div className="grid grid-cols-4 gap-4">
            {[
              "General",
              "Desktop & Screen Saver",
              "Dock & Menu Bar",
              "Mission Control",
              "Language & Region",
              "Security & Privacy",
              "Spotlight",
              "Notifications",
              "Displays",
              "Energy Saver",
              "Keyboard",
              "Mouse",
            ].map((pref) => (
              <Card key={pref} className="cursor-pointer hover:bg-gray-50">
                <CardContent className="p-4 text-center">
                  <SettingsIcon className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                  <div className="text-sm">{pref}</div>
                </CardContent>
              </Card>
            ))}
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
