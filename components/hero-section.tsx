import { Button } from "@/components/ui/button"
import { InteractiveGrid } from "@/components/ui/interactive_grid"
import { AnimatedTerminalWindow } from "@/components/animated-terminal-window"
import { Github, Mail, ExternalLink } from "lucide-react"
import { ShineBorder } from "@/components/ui/shine-border"
import Image from "next/image"

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
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
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

        {/* macOS Window */}
        <div className="mt-16">
          <ShineBorder className="relative mx-auto" borderClassName="border border-white/10 rounded-xl overflow-hidden">
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero%20image.jpg-mE5vAT4d864MlVhdkcrk1Vn2WcNONq.jpeg"
                alt="Background Gradient"
                width={1920}
                height={1080}
                className="w-full h-auto"
                priority
              />
              <div className="absolute inset-0 flex items-end justify-center pb-16">
                <div className="bg-black/20 backdrop-blur-sm p-4 rounded-xl w-[90%] h-[70%] flex">
                  <div className="flex-1 pr-2">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Browser-HZNDOssbyLixIa4lABR27yelWXveQ0.png"
                      alt="Browser Preview"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover rounded-lg"
                      priority
                    />
                  </div>
                  <div className="flex-1 pl-2">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Editor%20Window-sJ4sXlXpgDhv7gLvQylqH5VTb3L0rc.png"
                      alt="Code Editor"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover rounded-lg"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </ShineBorder>
        </div>
      </div>
    </section>
  )
}
