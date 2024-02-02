import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppin = Poppins({ weight: "500", subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Amigo-perfect pal',
  description: 'Generated by Mark-10',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppin.className}>{children}</body>
    </html>
  )
}
