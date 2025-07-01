import Link from "next/link"
import { TypewriterText } from "@/components/typewriter-text"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const words = ["Snehi", "web", "ios", "android", "backend"]

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-black/80 border-b theme-border">
        {/* Typewriter - Fixed Width Container */}
        <div className="font-mono text-lg w-32">
          <TypewriterText words={words} typingSpeed={300} deletingSpeed={150} pauseDuration={3000} />
        </div>

        {/* Navigation - Separate Container */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#"
            className="text-sm theme-primary-dim hover:text-[var(--theme-primary)] transition-colors font-mono"
          >
            Projects
          </Link>
          <Link
            href="#"
            className="text-sm theme-primary-dim hover:text-[var(--theme-primary)] transition-colors font-mono"
          >
            Skills
          </Link>
          <Link
            href="#"
            className="text-sm theme-primary-dim hover:text-[var(--theme-primary)] transition-colors font-mono"
          >
            Experience
          </Link>
          <Link
            href="#"
            className="text-sm theme-primary-dim hover:text-[var(--theme-primary)] transition-colors font-mono"
          >
            About
          </Link>
          <Link
            href="#"
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
