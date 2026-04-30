import { Navigation } from "@/components/navigation"
import { PredictionSection } from "@/components/prediction-section"
import { Footer } from "@/components/footer"

export default function SurveyPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] dark:bg-zinc-950 transition-colors duration-300">
      <Navigation />
      <div className="pt-24 md:pt-32 pb-12 min-h-[calc(100vh-200px)] flex items-start justify-center">
        <PredictionSection />
      </div>
      <Footer />
    </main>
  )
}
