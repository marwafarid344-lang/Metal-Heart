import { ArrowLeft, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import Script from "next/script"

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden" id="home">
      <Script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module" strategy="lazyOnload" />
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-6 md:space-y-8">
          <h1 className="text-[42px] leading-[1.4] md:text-[62px] font-black md:leading-[1.5] text-zinc-900 dark:text-zinc-100">
            هنطمن على <span className="bg-[#FF6B7A] text-white px-3 py-1 inline-flex items-center border-4 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.1)] -rotate-2">صحة قلبك</span> بالذكاء الاصطناعي بناءً على تحليل{" "}
            <span className="bg-[#2F81F7] text-white px-3 py-1 inline-flex items-center border-4 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.1)] rotate-2">روتين حياتك</span>
          </h1>

          <p className="text-[#393939] dark:text-gray-300 text-[16px] md:text-[20px] font-medium leading-[28px] md:leading-[34px] max-w-xl">
            شارك معانا في استبيان سريع عن أكلك ونشاطك وحالتك الصحية، عشان الروبوت بتاعك يقدر يتوقع احتمالية إصابتك بأمراض القلب!
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-7 pt-4">
            <Button asChild className="bg-[#0B0B0B] dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 rounded-[16px] py-5 px-8 md:py-[22px] md:px-[62px] text-base md:text-xl font-bold h-auto w-full sm:w-auto sm:min-w-[240px] border-4 border-black dark:border-white shadow-[4px_4px_0_0_#2F81F7] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.2)] transition-transform hover:-translate-y-1">
              <a href="/survey" className="flex items-center justify-center">
                ابدأ الفحص دلوقتي
                <ArrowLeft className="w-6 h-6 mr-2" />
              </a>
            </Button>
          </div>
        </div>

        <div className="flex justify-center md:justify-start w-full">
          <div className="relative w-full h-[400px] md:h-[500px] bg-transparent border-4 border-black dark:border-white rounded-[40px] overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] flex justify-center items-center p-4">
              <div dangerouslySetInnerHTML={{ __html: `<dotlottie-player src="https://lottie.host/602241a3-7c1f-44bb-bbeb-333c0062dd38/yQsjbtEE1g.lottie" background="transparent" speed="1" style="width: 100%; height: 100%" loop autoplay></dotlottie-player>` }} className="w-full h-full flex items-center justify-center" />
          </div>
        </div>
      </div>
    </section>
  )
}
