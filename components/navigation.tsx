"use client"

import { Moon, Sun, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function Navigation() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="container mx-auto px-4 pt-8 pb-4 absolute top-0 left-0 right-0 z-50">
      <nav className="flex items-center justify-between bg-white dark:bg-zinc-950 border-4 border-black dark:border-zinc-800 rounded-xl px-5 py-3 max-w-4xl mx-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] transition-colors">
        <a href="/" className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
          <div className="w-6 h-6 bg-white dark:bg-black rounded-full"></div>   
        </a>

        <div className="hidden md:flex items-center gap-6 flex-1 justify-center text-black dark:text-white">
          <a href="/" className="text-[18px] font-bold leading-[20px] hover:opacity-70 transition-opacity">
            الرئيسية
          </a>
          <a href="/survey" className="text-[18px] font-bold leading-[20px] hover:opacity-70 transition-opacity">
            اطمن على قلبك
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}      
            className="rounded-full w-10 h-10 hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
             <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-black" />
             <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
          </Button>

          <Button variant="outline" className="border-2 border-black dark:border-white text-black dark:text-white font-bold hidden sm:flex gap-2">
            <User className="w-4 h-4" /> دخول
          </Button>

          <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 rounded-sm px-5 h-12 min-w-[48px] flex-shrink-0 font-bold transition-colors">
            اشترك دلوقتي
          </Button>
        </div>
      </nav>
    </div>
  )
}
