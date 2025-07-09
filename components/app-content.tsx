"use client"

import { useState } from "react"
import { Folder, Search, Home, Download, ImageIcon, Globe, MusicIcon, Camera, SettingsIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface AppContentProps {
  appId: string
}

export function AppContent({ appId }: AppContentProps) {
  const [calculatorDisplay, setCalculatorDisplay] = useState("0")
  const [calculatorPrevious, setCalculatorPrevious] = useState<number | null>(null)
  const [calculatorOperation, setCalculatorOperation] = useState<string | null>(null)

  const handleCalculatorInput = (value: string) => {
    if (value === "C") {
      setCalculatorDisplay("0")
      setCalculatorPrevious(null)
      setCalculatorOperation(null)
    } else if (["+", "-", "*", "/"].includes(value)) {
      setCalculatorPrevious(Number.parseFloat(calculatorDisplay))
      setCalculatorOperation(value)
      setCalculatorDisplay("0")
    } else if (value === "=") {
      if (calculatorPrevious !== null && calculatorOperation) {
        const current = Number.parseFloat(calculatorDisplay)
        let result = 0
        switch (calculatorOperation) {
          case "+":
            result = calculatorPrevious + current
            break
          case "-":
            result = calculatorPrevious - current
            break
          case "*":
            result = calculatorPrevious * current
            break
          case "/":
            result = calculatorPrevious / current
            break
        }
        setCalculatorDisplay(result.toString())
        setCalculatorPrevious(null)
        setCalculatorOperation(null)
      }
    } else {
      setCalculatorDisplay((prev) => (prev === "0" ? value : prev + value))
    }
  }

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

    case "calculator":
      return (
        <div className="h-full bg-gray-900 text-white p-4">
          <div className="max-w-xs mx-auto">
            <div className="bg-black p-4 rounded-lg mb-4 text-right text-3xl font-mono">{calculatorDisplay}</div>
            <div className="grid grid-cols-4 gap-2">
              {["C", "±", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "=", "="].map(
                (btn, i) => (
                  <Button
                    key={i}
                    onClick={() => handleCalculatorInput(btn)}
                    variant={["/", "*", "-", "+", "="].includes(btn) ? "default" : "secondary"}
                    className={`h-12 ${btn === "0" ? "col-span-2" : ""} ${btn === "=" ? "col-span-1" : ""}`}
                  >
                    {btn}
                  </Button>
                ),
              )}
            </div>
          </div>
        </div>
      )

    case "calendar":
      return (
        <div className="h-full p-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold">January 2025</h2>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 font-medium text-gray-600">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => (
              <div key={i} className="p-2 hover:bg-blue-100 rounded cursor-pointer">
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      )

    case "mail":
      return (
        <div className="h-full flex">
          <div className="w-64 bg-gray-50 border-r p-4">
            <div className="space-y-2">
              <div className="font-medium text-blue-600">Inbox (3)</div>
              <div className="text-gray-600">Sent</div>
              <div className="text-gray-600">Drafts</div>
              <div className="text-gray-600">Trash</div>
            </div>
          </div>
          <div className="flex-1 p-4">
            <div className="space-y-4">
              {[
                { from: "Apple", subject: "Welcome to macOS", time: "10:30 AM" },
                { from: "GitHub", subject: "Your weekly digest", time: "9:15 AM" },
                { from: "Vercel", subject: "Deployment successful", time: "Yesterday" },
              ].map((email, i) => (
                <Card key={i} className="cursor-pointer hover:bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{email.from}</div>
                        <div className="text-gray-600">{email.subject}</div>
                      </div>
                      <div className="text-sm text-gray-500">{email.time}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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

    case "photos":
      return (
        <div className="h-full p-4">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
            ))}
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
