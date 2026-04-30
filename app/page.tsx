import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] dark:bg-zinc-950 transition-colors duration-300">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <Footer />
    </main>
  )
}
