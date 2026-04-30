import type React from "react"
import type { Metadata } from "next"

import "./globals.css"

import { Beiruti } from "next/font/google"

// Initialize Beiruti font
const beiruti = Beiruti({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-beiruti",
})

import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "نبض الذكاء | فحص صحة القلب",
  description: "توقع احتمالية الإصابة بأمراض القلب باستخدام تقنيات الذكاء الاصطناعي",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${beiruti.variable} font-sans antialiased overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
