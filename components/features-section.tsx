import { GradientCard } from "@/components/ui/gradient-card"
import Image from "next/image"

export function FeaturesSection() {
  const features = [
    {
      title: "Save Time, Share Faster",
      description: "Quick and efficient screen sharing",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Seamless Integration",
      description: "Works with your favorite tools",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Low CPU Usage",
      description: "Optimized performance",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
          Advanced Screen Sharing
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Effortlessly share specific sections of your screen during calls without revealing unnecessary information.
          Our innovative cropping feature ensures that you can focus on what matters most without compromising privacy
          or security.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <GradientCard key={feature.title}>
              <Image
                src={feature.image || "/placeholder.svg"}
                alt={feature.title}
                width={300}
                height={200}
                className="rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </GradientCard>
          ))}
        </div>
      </div>
    </section>
  )
}
