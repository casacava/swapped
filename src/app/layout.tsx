import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google"
import '../styles/globals.css'

const headingFont = DM_Serif_Display({ subsets: ['latin'], weight: '400' })
const bodyFont = Inter({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: "Swapped",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.className}`}>{children}</body>
    </html>
  )
}