"use client";

import { useState } from "react";
import { Desktop } from "@/components/desktop";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  return <Desktop theme={theme} />;
}
