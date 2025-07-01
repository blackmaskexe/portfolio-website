import { Header } from "@/components/header"
import { ScrollNavbar } from "@/components/scroll-navbar"
import { HeroSection } from "@/components/hero-section"
import {
  ProjectsSection,
  SkillsSection,
  ExperienceSection,
  AboutSection,
  ContactSection,
} from "@/components/dummy-sections"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <ScrollNavbar />
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}
