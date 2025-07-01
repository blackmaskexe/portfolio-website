"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export function ScrollNavbar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky nav when we've scrolled past the hero section (roughly 100vh)
      const heroHeight = window.innerHeight
      const scrollPosition = window.scrollY

      setIsVisible(scrollPosition > heroHeight * 0.9)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-16 opacity-0"
      }`}
    >
      <div
        className="backdrop-blur-xl rounded-full px-8 py-3 shadow-2xl border"
        style={{
          backgroundColor: "var(--theme-bg)",
          borderColor: "var(--theme-border)",
          opacity: 0.95,
        }}
      >
        <div className="flex items-center gap-8">
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
        </div>
      </div>
    </nav>
  )
}
