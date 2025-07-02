import { MacOSScreen } from "@/components/macos-screen"

export function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen py-20" style={{ backgroundColor: "var(--theme-bg)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8 theme-primary text-center">Projects</h2>
        <p className="text-center theme-text-secondary mb-12 max-w-2xl mx-auto">
          Here's a glimpse into my development environment and the projects I work on daily.
        </p>

        {/* macOS Screen Component */}
        <div className="flex justify-center">
          <MacOSScreen className="max-w-4xl w-full" />
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-4 theme-text">Development Environment</h3>
          <p className="theme-text-secondary max-w-3xl mx-auto">
            I work primarily on macOS using modern development tools and frameworks. My setup includes VS Code,
            Terminal, and various productivity apps that help me build efficient and scalable applications.
          </p>
        </div>
      </div>
    </section>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen py-20" style={{ backgroundColor: "var(--theme-bg-secondary)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8 theme-primary">Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {["React", "Next.js", "TypeScript", "Node.js", "Python", "Swift", "Kotlin", "PostgreSQL"].map((skill) => (
            <div key={skill} className="bg-gray-800/50 rounded-lg p-6 text-center border border-gray-700">
              <h3 className="text-lg font-semibold theme-text">{skill}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ExperienceSection() {
  return (
    <section id="experience" className="min-h-screen py-20" style={{ backgroundColor: "var(--theme-bg)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8 theme-primary">Experience</h2>
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-semibold mb-2 theme-text">Senior Developer</h3>
              <p className="theme-primary mb-4">Company Name • 2022 - Present</p>
              <p className="theme-text-secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="min-h-screen py-20" style={{ backgroundColor: "var(--theme-bg-secondary)" }}>
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8 theme-primary">About</h2>
        <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
          <p className="text-lg theme-text-secondary leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <p className="text-lg theme-text-secondary leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
        </div>
      </div>
    </section>
  )
}

export function ContactSection() {
  return (
    <section id="contact" className="min-h-screen py-20" style={{ backgroundColor: "var(--theme-bg)" }}>
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8 theme-primary">Contact</h2>
        <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 theme-text">Get in Touch</h3>
              <p className="theme-text-secondary mb-6">
                Feel free to reach out for collaborations or just a friendly hello!
              </p>
              <div className="space-y-4">
                <p className="theme-text-secondary">📧 hello@prathamsnehi.com</p>
                <p className="theme-text-secondary">📱 +1 (555) 123-4567</p>
                <p className="theme-text-secondary">📍 San Francisco, CA</p>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg theme-text placeholder-gray-400"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg theme-text placeholder-gray-400"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg theme-text placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="w-full p-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--theme-primary)", color: "var(--theme-bg)" }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
