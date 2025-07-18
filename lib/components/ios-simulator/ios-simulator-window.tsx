"use client";

import { GainsChatApp } from "../apps/gains-chat/gains-chat-app";
import { HabitMentorAIApp } from "../apps/habitmentor-ai/habitmentor-ai-app";

interface IOSSimulatorWindowProps {
  appId: string;
  appName: string;
}

export function IOSSimulatorWindow({
  appId,
  appName,
}: IOSSimulatorWindowProps) {
  const renderAppContent = () => {
    switch (appId) {
      case "gains-chat":
        return <GainsChatApp />;

      case "habitmentor-ai":
        return <HabitMentorAIApp />;

      default:
        return (
          <div className="h-full bg-gray-100 flex items-center justify-center">
            <p>App not found</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-black">
      {renderAppContent()}
    </div>
  );
}
