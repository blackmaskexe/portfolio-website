import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pratham Snehi - Developer Portfolio",
  description: "Full Stack Developer & UI/UX Enthusiast",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased dark-theme`}
        style={{ backgroundColor: "var(--theme-bg)", color: "var(--theme-text)" }}
      >
        {children}
      </body>
    </html>
  )
}
