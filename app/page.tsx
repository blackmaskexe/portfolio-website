"use client";

import { useState } from "react";
import { Desktop } from "@/components/desktop";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  return (
    <div className="h-screen w-screen overflow-hidden fixed inset-0">
      <Desktop theme={theme} />
    </div>
  );
}
