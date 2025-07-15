"use client";

import { ToggleLeft, Settings } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

interface ControlCenterProps {
  theme?: "light" | "dark";
  onClose: () => void;
}

export function ControlCenter({
  theme = "light",
  onClose,
}: ControlCenterProps) {
  const isDark = theme === "dark";
  const bgClass = isDark
    ? "bg-gray-800/90 border-gray-700/20 text-white"
    : "bg-white/90 border-white/20 text-black";
  const itemBgClass = isDark ? "bg-gray-700" : "bg-gray-100";

  return (
    <div className="absolute top-8 right-4 w-80 z-50">
      <Card className={`${bgClass} backdrop-blur-md`}>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center bg-transparent"
            >
              <ToggleLeft className="w-6 h-6 mb-1" />
              <span className="text-xs">Wi-Fi</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center bg-transparent"
            >
              <ToggleLeft className="w-6 h-6 mb-1" />
              <span className="text-xs">Bluetooth</span>
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <ToggleLeft className="w-5 h-5" />
              <span className="text-sm">Volume</span>
              <Slider
                defaultValue={[70]}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>

            <div className="flex items-center space-x-3">
              <ToggleLeft className="w-5 h-5" />
              <span className="text-sm">Brightness</span>
              <Slider
                defaultValue={[80]}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>

            <div
              className={`flex items-center justify-between p-3 ${itemBgClass} rounded-lg`}
            >
              <div className="flex items-center space-x-3">
                <ToggleLeft className="w-5 h-5" />
                <span className="text-sm">Battery</span>
              </div>
              <span className="text-sm font-medium">85%</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={onClose}
            >
              <Settings className="w-4 h-4 mr-2" />
              System Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
