"use client"

import Link from "next/link"
import { TypewriterText } from "@/components/typewriter-text"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const words = ["Snehi", "web", "ios", "android", "backend"]

  return (
    <header className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-6xl px-6">
      <div
        className="flex items-center justify-between px-8 py-4 backdrop-blur-xl rounded-full shadow-2xl border"
        style={{
          backgroundColor: "var(--theme-bg)",
          borderColor: "var(--theme-border)",
          opacity: 0.95,
        }}
      >
        {/* Typewriter - Fixed Width Container */}
        <div className="font-mono text-lg w-32">
          <TypewriterText words={words} typingSpeed={300} deletingSpeed={150} pauseDuration={3000} />
        </div>

        {/* Navigation - Separate Container */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#projects"
            className="text-sm theme-primary-dim hover:text-[var(--theme-primary)] transition-colors font-mono"
          >
            Projects
          </Link>
          <Link
            href="#skills"
            className="text-sm theme-primary-dim hover:text-[var(--theme-primary)] transition-colors font-mono"
          >
            Skills
          </Link>
          <Link
            href="#experience"
            className="text-sm theme-primary-dim hover:text-[var(--theme-primary)] transition-colors font-mono"
          >
            Experience
          </Link>
          <Link
            href="#about"
            className="text-sm theme-primary-dim hover:text-[var(--theme-primary)] transition-colors font-mono"
          >
            About
          </Link>
          <Link
            href="#contact"
            className="text-sm theme-primary-dim hover:text-[var(--theme-primary)] transition-colors font-mono"
          >
            Contact
          </Link>
        </nav>

        {/* Theme Toggle - Separate Container */}
        <ThemeToggle />
      </div>
    </header>
  )
}
