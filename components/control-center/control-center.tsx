"use client"

import { ToggleLeft, Settings } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface ControlCenterProps {
  onClose: () => void
}

export function ControlCenter({ onClose }: ControlCenterProps) {
  return (
    <div className="absolute top-8 right-4 w-80 z-50">
      <Card className="bg-white/90 backdrop-blur-md border-white/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center bg-transparent">
              <ToggleLeft className="w-6 h-6 mb-1" />
              <span className="text-xs">Wi-Fi</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center bg-transparent">
              <ToggleLeft className="w-6 h-6 mb-1" />
              <span className="text-xs">Bluetooth</span>
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <ToggleLeft className="w-5 h-5" />
              <span className="text-sm">Volume</span>
              <Slider defaultValue={[70]} max={100} step={1} className="flex-1" />
            </div>

            <div className="flex items-center space-x-3">
              <ToggleLeft className="w-5 h-5" />
              <span className="text-sm">Brightness</span>
              <Slider defaultValue={[80]} max={100} step={1} className="flex-1" />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
              <div className="flex items-center space-x-3">
                <ToggleLeft className="w-5 h-5" />
                <span className="text-sm">Battery</span>
              </div>
              <span className="text-sm font-medium">85%</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <Button variant="ghost" className="w-full justify-start" onClick={onClose}>
              <Settings className="w-4 h-4 mr-2" />
              System Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
