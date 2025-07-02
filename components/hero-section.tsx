import { Button } from "@/components/ui/button"
import { InteractiveGrid } from "@/components/ui/interactive_grid"
import { AnimatedTerminalWindow } from "@/components/animated-terminal-window"
import { Github, Mail, ExternalLink } from "lucide-react"

export function HeroSection() {
  const terminalLines = [
    "echo 'Welcome to my digital workspace'",
    "whoami",
    "> Full Stack Developer & UI/UX Enthusiast",
    "",
    "cat about.txt",
    "> Passionate about creating beautiful, functional web experiences",
    "> Specializing in React, Next.js, TypeScript, and modern web technologies",
    "> Always learning, always building, always improving",
  ]

  return (
    <section
      className="relative min-h-screen pt-32 pb-16 overflow-hidden"
      style={{ backgroundColor: "var(--theme-bg)" }}
    >
      <InteractiveGrid containerClassName="absolute inset-0" className="opacity-20" points={40} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Hero Content - Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text and Buttons */}
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight theme-primary">{"Pratham Snehi"}</h1>
            <p className="theme-text-secondary text-lg mb-8 max-w-xl">
              Crafting digital experiences with clean code and creative solutions
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                className="gap-2 theme-border theme-primary-bg hover:bg-[var(--theme-primary-bg)] theme-primary hover:text-[var(--theme-primary)] bg-transparent"
                style={{
                  borderColor: "var(--theme-border)",
                  backgroundColor: "var(--theme-primary-bg)",
                  color: "var(--theme-primary)",
                }}
              >
                <Github className="w-4 h-4" />
                View Projects
              </Button>
              <Button
                variant="outline"
                className="gap-2 theme-border theme-primary-bg hover:bg-[var(--theme-primary-bg)] theme-primary hover:text-[var(--theme-primary)] bg-transparent"
                style={{
                  borderColor: "var(--theme-border)",
                  backgroundColor: "var(--theme-primary-bg)",
                  color: "var(--theme-primary)",
                }}
              >
                <Mail className="w-4 h-4" />
                Get In Touch
              </Button>
              <Button
                className="gap-2 hover:opacity-90 font-medium"
                style={{
                  backgroundColor: "var(--theme-primary)",
                  color: "var(--theme-bg)",
                }}
              >
                <ExternalLink className="w-4 h-4" />
                Download Resume
              </Button>
            </div>
          </div>

          {/* Right Side - Animated Terminal Window */}
          <AnimatedTerminalWindow lines={terminalLines} typingSpeed={30} lineDelay={500} />
        </div>
      </div>
    </section>
  )
}
